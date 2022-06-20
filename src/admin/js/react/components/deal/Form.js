import React, { Component } from 'react';
import { toast } from 'react-toastify';
import WithApi from 'hoc/Api'; 
import WithRouter from 'hoc/Router'; 

import Select from 'react-select';  
import Contact from 'block/field/contact';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            title: '',
            lead_id: '', 
            stage_id: '', 
            budget: '',
            currency: 'USD',
            probability: 50,
            tags: [],
            desc: '',
            note: '',
            person_id: null, 
            org_id: null, 
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
        this.props.getAll('taxonomies', 'taxonomy=deal_stage,tag').then(resp => { 
                if ( resp.data.success ) {
                    if ( this.state.form.stage_id ) {
                        this.setState({
                            stages: resp.data.data.deal_stage,
                            tags: resp.data.data.tag,
                        });
                    } else {
                        let form = { ...this.state.form }
                        form.stage_id = resp.data.data.deal_stage[0];
                        this.setState({
                            form,
                            stages: resp.data.data.deal_stage,
                            tags: resp.data.data.tag,
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
        if (this.props.modalType == 'edit' || this.props.modalType == 'move') {
            if (this.state.form.id != this.props.data.id) {
                let data = {...this.props.data}
                if ( this.props.modalType == 'move' ) {
                    data.lead_id = data.id;
                    data.probability = 50;
                }

                this.setState({ form: data });
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

        if ( form.person_id ) {
            form.person_id = form.person_id.id;
        }

        if ( form.org_id ) {
            form.org_id = form.org_id.id;
        }

        if (form.tags.length) {
            let finalArray = form.tags.map(function (obj) {
                return obj.id;
            });
            form.tags = finalArray;
        }

        if ( this.props.reload ) {
            

            if ( this.props.modalType == 'move' ) {

                this.props.create('deals', form).then(resp => { 
                    if (resp.data.success) { 
                        toast.success('Successfully moved to deal');
                        let id = resp.data.data;
                        this.props.close();
                        this.props.navigate(`/deal/single/${id}`, { replace: true }); 
                        this.props.reload();
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                });

            } else {
                this.props.update('deals', form.id, form);
                this.props.close();
                this.props.reload();
            } 
        } else {
            this.props.handleSubmit(form);
        }
        this.setState({ form: this.initialState });
    }

    handlePersonSelect = ( val ) => { 
        let form = { ...this.state.form }
        form.person_id = val; 
        this.setState({ form }); 
    } 

    handleOrgSelect = ( val ) => {
        let form = { ...this.state.form }
        form.org_id = val; 
        this.setState({ form }); 
    }

    render() {
        const stageList = this.state.stages;
        const tagList = this.state.tags;
        const form = this.state.form;
        const probabilityPercent = (form.probability / 100) * 100;

        let title = '';
        if ( this.props.modalType == 'new' ) {
            title = 'New'
        } else if ( this.props.modalType == 'edit' ) {
            title = 'Edit'
        } else if ( this.props.modalType == 'move' ) {
            title = 'Move to'
        } 
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
                        <h2 className="pi-modal-title">{title} Deal</h2>
                        <p>Add new deal from here</p>
                    </div>

                    <form onSubmit={this.handleSubmit} >
                        <div className="pi-content">
                            <div className="pi-form-style-one">
                                { !this.props.reload && <Contact 
                                    data={{
                                        person: this.state.form.person_id,
                                        org: this.state.form.org_id 
                                    }}
                                    onPersonChange={this.handlePersonSelect}
                                    onOrgChange={this.handleOrgSelect}
                                />} 

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
                                        <label htmlFor="field-stage_id">
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
                                            htmlFor="field-probability">
                                            Probability <span style={{position: 'absolute', right: '15px'}}>({form.probability}%)</span>
                                        </label>

                                        <input
                                            id="field-probability"
                                            type="range"
                                            min="1" max="100"
                                            name="probability"
                                            value={form.probability}
                                            style={{ background: `linear-gradient(to right, #3264fe ${probabilityPercent}%, #ccd6ff ${probabilityPercent}%)` }}
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
                                        <label htmlFor="field-desc">
                                            Description
                                        </label>

                                        <textarea
                                            id="form-desc"
                                            rows={2}
                                            name="desc"
                                            value={form.desc}
                                            onChange={this.handleChange}
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

const FormData = WithApi(Form);  
export default WithRouter(FormData);  