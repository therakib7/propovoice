import WithApi from 'hoc/Api';
import WithRouter from 'hoc/Router';
import React, { Component, lazy } from 'react';
import { toast } from 'react-toastify';

import Contact from 'block/field/contact';
import { Cross } from 'block/icon';
import Select from 'react-select';

const DateField = lazy(() => import('block/date-picker'));

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
            deal_id: '',
            status_id: '',
            budget: '',
            currency: 'USD',
            start_date: null,
            due_date: null,
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
        this.setState({ form: { ...this.state.form, ['status_id']: val } });
    }

    handleTagChange = val => {
        this.setState({ form: { ...this.state.form, ['tags']: val } });
    }

    componentDidMount() {
        this.props.getAll('taxonomies', 'taxonomy=project_status,tag').then(resp => {
            if (resp.data.success) {
                if (this.state.form.status_id) {
                    this.setState({
                        stages: resp.data.data.project_status,
                        tags: resp.data.data.tag,
                    });
                } else {
                    let form = { ...this.state.form }
                    form.status_id = resp.data.data.project_status[0];
                    this.setState({
                        form,
                        stages: resp.data.data.project_status,
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
                    form.deal_id = form.id;
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

                if (form.hasOwnProperty('start_date') && form.start_date) {
                    form.start_date = new Date(form.start_date);
                }
                if (form.hasOwnProperty('due_date') && form.due_date) {
                    form.due_date = new Date(form.due_date);
                }

                this.setState({ form });
            }
        } else {
            if (this.state.form.id != null) {
                this.setState({ form: this.initialState });
            }

            /* else {
                if ( this.props.data && ! this.state.form.status_id && this.props.data.hasOwnProperty('label') ) { // new project from stage
                    let form = {...this.initialState}
                    form.status_id = this.props.data;
                    this.setState({ form });
                }
            }  */
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let form = { ...this.state.form }

        if (form.status_id) {
            form.status_id = form.status_id.id;
        }

        if (form.tags.length) {
            let finalArray = form.tags.map(function (obj) {
                return obj.id;
            });
            form.tags = finalArray;
        }

        if (this.props.reload) {

            if (this.props.modalType == 'move') {

                this.props.create('projects', form).then(resp => {
                    if (resp.data.success) {
                        toast.success('Successfully moved to project');
                        let id = resp.data.data;
                        this.props.close();
                        this.props.navigate(`/project/single/${id}`);
                        this.props.reload();
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                });

            } else {
                this.props.update('projects', form.id, form);
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

    onDateChange = (date, type = null) => {
        let form = { ...this.state.form }

        if (type == 'date') {
            form.start_date = date;
        } else {
            form.due_date = date;
        }
        this.setState({ form });
    }

    render() {
        const stageList = this.state.stages;
        const tagList = this.state.tags;
        const form = this.state.form;

        let title = '';
        if (this.props.modalType == 'new') {
            title = 'New'
        } else if (this.props.modalType == 'edit') {
            title = 'Edit'
        } else if (this.props.modalType == 'move') {
            title = 'Move to'
        }
        return (
            <div className="pi-overlay pi-show">
                <div className="pi-modal-content">

                    <div className="pi-modal-header pi-gradient">
                        <span className="pi-close" onClick={() => this.props.close()}>
                            <Cross />
                        </span>
                        <h2 className="pi-modal-title">{title} Project</h2>
                        <p>Add new project from here</p>
                    </div>

                    <form onSubmit={this.handleSubmit} >
                        <div className="pi-content">
                            <div className="pi-form-style-one">

                                {/* {!this.props.reload && <> */}
                                <Contact
                                    first_name={form.first_name}
                                    org_name={form.org_name}
                                    onChange={this.handleContactChange}
                                    onSelect={this.handleContactSelect}
                                />

                                <div className="row">
                                    <div className="col-lg">
                                        <label htmlFor="form-email">
                                            Email
                                        </label>
                                        <input
                                            id="form-email"
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="col-lg">
                                        <label htmlFor="form-mobile">
                                            Mobile Number
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

                                <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="field-status_id">
                                            Status
                                        </label>

                                        <Select
                                            className={'pi-field-select'}
                                            value={form.status_id}
                                            onChange={this.handleStageChange}
                                            getOptionValue={(stageList) => stageList.id}
                                            getOptionLabel={(stageList) => stageList.label}
                                            options={stageList}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="field-start_date">
                                            Start Date
                                        </label>
                                        <div className='pi-field-date'>
                                            <DateField date={form.start_date} type='date' onDateChange={this.onDateChange} />
                                        </div>
                                    </div>

                                    <div className="col-md">
                                        <label htmlFor="field-start_date">
                                            Due Date
                                        </label>
                                        <div className='pi-field-date'>
                                            <DateField date={form.due_date} type='due_date' onDateChange={this.onDateChange} />
                                        </div>
                                    </div>
                                </div>

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