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
            contact_id: 758,
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
                    this.setState({ 
                        stages: resp.data.data.stages,
                        tags: resp.data.data.tags,
                    });
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
                if (!wage.length) {
                    this.setState({ form: this.props.data });
                } else {
                    let data = this.props.data;
                    // data.default = true;
                    this.setState({ form: data });
                }
            }
        } else {
            if (this.state.form.id != null) {
                if (!wage.length) {
                    this.setState({ form: this.initialState });
                } else {
                    let data = this.initialState;
                    // data.default = true;
                    this.setState({ form: data });
                }
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleSubmit(this.state.form);
        //this.setState({ form: this.initialState });
    }

    render() {
        const stageList = this.state.stages;
        const tagList = this.state.tags;
        return (
            <div className="pi-overlay pi-show">
                <div className="pi-popup-content">
                    <div className="pi-modal-header">
                        <h2 className="pi-modal-title pi-text-center">{this.props.modalType == 'new' ? 'New' : 'Edit'} Deal</h2>
                        <span className="pi-close" onClick={() => this.props.close()}>×</span>
                    </div>

                    <div className="pi-content">
                        <form onSubmit={this.handleSubmit} className="pi-form-style-one">
                            <div className="row">
                                <div className="col-md">
                                    <label htmlFor="field-title">
                                        Title
                                    </label>

                                    <input
                                        id="field-title"
                                        type="text"
                                        name="title"
                                        value={this.state.form.title}
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
                                        value={this.state.form.stage_id}
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
                                        value={this.state.form.contact_id}
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
                                        value={this.state.form.budget}
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
                                        value={this.state.form.currency}
                                        onChange={this.handleChange}
                                    />
                                </div> 
                                 
                            </div>

                            <div className="row"> 
                                <div className="col-md">
                                    <label
                                        htmlFor="field-provability">
                                        Provability ( {this.state.form.provability}% )
                                    </label>

                                    <div className='pi-field-range'>
                                        <input
                                            id="field-provability" 
                                            type="range"
                                            min="1" max="100"
                                            name="provability"
                                            value={this.state.form.provability}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md">
                                    <label htmlFor="field-tags">
                                        Tags
                                    </label>
                                    <Select
                                        value={this.state.form.tags}
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
                                        value={this.state.form.note}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <button className="pi-btn pi-bg-blue pi-bg-hover-blue pi-m-auto">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form;
