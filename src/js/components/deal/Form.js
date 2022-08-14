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
            first_name: '',
            org_name: '',
            person_id: null,
            org_id: null,
            email: '',
            mobile: '',
            title: '',
            lead_id: '',
            stage_id: '',
            budget: '',
            currency: 'USD',
            probability: 50,
            tags: [],
            desc: '',
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
        this.props.getAll('taxonomies', 'taxonomy=deal_stage,tag').then(resp => {
            if (resp.data.success) {
                if (this.state.form.stage_id) {
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

                let form = { ...this.props.data }
                if (this.props.modalType == 'move') {
                    form.lead_id = form.id;
                    form.probability = 50;
                }

                form.first_name = (form.person) ? form.person.first_name : '';
                if (form.person) {
                    form.person_id = (form.person) ? form.person.id : null;
                    form.email = (form.person) ? form.person.email : '';
                    form.mobile = (form.person) ? form.person.mobile : '';
                    form.web = (form.person) ? form.person.web : '';
                } else {
                    form.email = (form.org) ? form.org.email : '';
                    form.mobile = (form.org) ? form.org.mobile : '';
                    form.web = (form.org) ? form.org.web : '';
                }
                form.org_name = (form.org) ? form.org.name : '';

                if (form.org) {
                    form.org_id = (form.org) ? form.org.id : null;
                }

                this.setState({ form });
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

        if (this.props.reload) {

            if (this.props.modalType == 'move') {

                this.props.create('deals', form).then(resp => {
                    if (resp.data.success) {
                        toast.success('Successfully moved to deal');
                        let id = resp.data.data;
                        this.props.close();
                        this.props.navigate(`/deal/single/${id}`);
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

    handleContactChange = (val, type) => {
        let form = { ...this.state.form }
        if (type == 'person') {
            form.first_name = val;
        } else {
            form.org_name = val;
        }
        this.setState({ form });
    }

    handleContactSelect = (val, type) => {
        let form = { ...this.state.form }
        if (!val) return;
        if (type == 'person') {
            form.first_name = val.first_name;
            form.person_id = (val) ? val.id : null;
            form.email = (val) ? val.email : '';
            form.mobile = (val) ? val.mobile : '';
            form.web = (val) ? val.web : '';
        } else {
            form.org_name = val.name;
            form.org_id = (val) ? val.id : null;
            if (!form.first_name) {
                form.email = (val) ? val.email : '';
                form.mobile = (val) ? val.mobile : '';
                form.web = (val) ? val.web : '';
            }
        }

        this.setState({ form });
    }

    render() {
        const i18n = ndpi.i18n;
        const stageList = this.state.stages;
        const tagList = this.state.tags;
        const form = this.state.form;
        const probabilityPercent = (form.probability / 100) * 100;

        let title = '';
        if (this.props.modalType == 'new') {
            title = 'New'
        } else if (this.props.modalType == 'edit') {
            title = 'Edit'
        } else if (this.props.modalType == 'move') {
            title = 'Move to'
        }
        const i18n = ndpi.i18n;
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
                                {/* {!this.props.reload && <>  */}
                                <Contact
                                    first_name={form.first_name}
                                    org_name={form.org_name}
                                    onChange={this.handleContactChange}
                                    onSelect={this.handleContactSelect}
                                />

                                <div className="row">
                                    <div className="col-lg">
                                        <label htmlFor="form-email">
                                            {i18n.email}
                                        </label>
                                        <input
                                            id="form-email"
                                            type="email"
                                            name="email"
                                            required
                                            value={form.email}
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="col-lg">
                                        <label htmlFor="form-mobile">
                                            {i18n.mbl}
                                        </label>

                                        <input
                                            id="form-mobile"
                                            type="text"
                                            name="mobile"
                                            value={form.mobile}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                {/* </>} */}

                                <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="field-title">
                                            Title
                                        </label>

                                        <input
                                            id="field-title"
                                            type="text"
                                            name="title"
                                            required
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
                                            className={'pi-field-select'}
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
                                        <label htmlFor="field-budget">
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
                                        <label htmlFor="field-currency">
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

                                {!wage.length && <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="field-probability">
                                            Probability <span style={{ position: 'absolute', right: '15px' }}>({form.probability}%)</span>
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
                                </div>}

                                <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="field-tags">
                                            Tags
                                        </label>
                                        <Select
                                            className={'pi-field-select'}
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
                                    <button type='reset' className="pi-btn pi-text-hover-blue">{i18n.clear}</button>
                                </div>
                                <div className="col">
                                    <button type='submit' className="pi-btn pi-bg-blue pi-bg-hover-blue pi-btn-big pi-float-right pi-color-white">
                                        {i18n.save}
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