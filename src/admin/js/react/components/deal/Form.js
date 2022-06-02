import React, { Component } from 'react';

import Select from 'react-select';
import ApiTaxonomy from 'api/taxonomy';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            title: '',
            stage_id: '',
            contact_id: 770,
            contact_type: 'people', //org/people
            budget: '',
            currency: 'USD',
            provability: 50,
            tags: [],
            note: '',
            date: false
        };

        this.state = {
            form: this.initialState,
            stages: [],
            tags: [],
        };
    }

    handleChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    handleStageChange = val => {
        this.setState({ form: { ...this.state.form, ['stage_id']: val } });
    }

    handleTagChange = val => {
        this.setState({ form: { ...this.state.form, ['tags']: val } });
    }

    componentDidMount() {
        ApiTaxonomy.getAll('taxonomy=deal_stage_tag')
            .then(resp => {
                if (resp.data.success) {
                    if (this.state.form.stage_id) {
                        this.setState({
                            stages: resp.data.data.stages,
                            tags: resp.data.data.tags,
                        });
                    } else {
                        let form = { ...this.state.form }
                        form.stage_id = resp.data.data.stages[0];
                        this.setState({
                            form,
                            stages: resp.data.data.stages,
                            tags: resp.data.data.tags,
                        });
                    }
                }
            });

        //added this multiple place, because not working in invoice single
        this.editData();
    }

    componentDidUpdate() {
        this.editData();
    }

    editData = () => {
        //condition added to stop multiple rendering 
        if (this.props.modalType == 'edit') {
            if (this.state.form.id != this.props.data.id) {
                this.setState({ form: this.props.data });
            }
        } else {
            if (this.state.form.id != null) {
                this.setState({ form: this.initialState });
            }

            /* else {
                if ( this.props.data && ! this.state.form.stage_id && this.props.data.hasOwnProperty('label') ) { // new deal from stage
                    let form = {...this.initialState}
                    form.stage_id = this.props.data;
                    this.setState({ form });
                }
            }  */
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let form = { ...this.state.form }

        if (form.stage_id) {
            form.stage_id = form.stage_id.id;
        }

        if (form.tags.length) {
            let finalArray = form.tags.map(function (obj) {
                return obj.id;
            });
            form.tags = finalArray;
        }

        this.props.handleSubmit(form);
        this.setState({ form: this.initialState });
    }

    render() {
        const stageList = this.state.stages;
        const tagList = this.state.tags;
        const form = this.state.form;
        const provabilityPercent = (form.provability / 100) * 100;

        return (
            <div className="pi-overlay pi-show">
                <div className="pi-modal-content">

                    <div className="pi-modal-header pi-gradient">
                        <span className="pi-close" onClick={() => this.props.close()}>
                            <svg
                                width={25}
                                height={25}
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12.5 3.5L3.5 12.5"
                                    stroke="#718096"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12.5 12.5L3.5 3.5"
                                    stroke="#718096"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                        <h2 className="pi-modal-title">{this.props.modalType == 'new' ? 'New' : 'Edit'} Deal</h2>
                        <p>Add new deal from here</p>
                    </div>

                    <form onSubmit={this.handleSubmit} >
                        <div className="pi-content">
                            <div className="pi-form-style-one">
                                <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="field-title">
                                            Title
                                        </label>

                                        <input
                                            id="field-title"
                                            type="text"
                                            name="title"
                                            value={form.title}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md">
                                        <label
                                            htmlFor="field-stage_id">
                                            Stage
                                        </label>

                                        <Select
                                            value={form.stage_id}
                                            onChange={this.handleStageChange}
                                            getOptionValue={(stageList) => stageList.id}
                                            getOptionLabel={(stageList) => stageList.label}
                                            options={stageList}
                                        />
                                    </div>

                                    <div className="col-md">
                                        <label
                                            htmlFor="field-contact_id">
                                            Contact
                                        </label>

                                        <input
                                            id="field-contact_id"
                                            type="text"
                                            name="contact_id"
                                            value={form.contact_id}
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-md">
                                        <label
                                            htmlFor="field-budget">
                                            Budget
                                        </label>

                                        <input
                                            id="field-budget"
                                            type="text"
                                            name="budget"
                                            value={form.budget}
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="col-md">
                                        <label
                                            htmlFor="field-currency">
                                            Currency
                                        </label>

                                        <input
                                            id="field-currency"
                                            type="text"
                                            readOnly
                                            name="currency"
                                            value={form.currency}
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-md">
                                        <label
                                            htmlFor="field-provability">
                                            Provability <span className='pi-float-right'>({form.provability}%)</span>
                                        </label>

                                        <input
                                            id="field-provability"
                                            type="range"
                                            min="1" max="100"
                                            name="provability"
                                            value={form.provability}
                                            style={{ background: `linear-gradient(to right, #3264fe ${provabilityPercent}%, #ccd6ff ${provabilityPercent}%)` }}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="field-tags">
                                            Tags
                                        </label>
                                        <Select
                                            value={form.tags}
                                            onChange={this.handleTagChange}
                                            getOptionValue={(tagList) => tagList.id}
                                            getOptionLabel={(tagList) => tagList.label}
                                            options={tagList}
                                            isMulti
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="field-note">
                                            Note
                                        </label>

                                        <textarea
                                            id="form-note"
                                            rows={2}
                                            name="note"
                                            value={form.note}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div> 
                            </div>
                        </div>

                        <div className="pi-modal-footer">
                            <div className="row">
                                <div className="col">
                                    <button type='reset' className="pi-btn pi-text-hover-blue">Clear</button>
                                </div>
                                <div className="col">
                                    <button type='submit' className="pi-btn pi-bg-blue pi-bg-hover-blue pi-btn-big pi-float-right pi-color-white">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Form;
