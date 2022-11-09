import WithRouter from 'hoc/Router';
import React, { Component, lazy } from 'react';
import { toast } from 'react-toastify';
import api from 'api';
import Contact from 'block/field/contact';
import { Cross } from 'block/icon';
import Taxonomy from 'block/field/taxonomy';
import Currency from 'block/field/currency';

const DateField = lazy(() => import('block/date-picker'));

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            title: '',
            first_name: '',
            org_name: '',
            person_id: null,
            org_id: null,
            email: '',
            mobile: '',
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

    currencyChange = val => {
        this.setState({ form: { ...this.state.form, ['currency']: val } });
    }

    handleStatusChange = val => {
        this.setState({ form: { ...this.state.form, ['status_id']: val } });
    }

    handleTagChange = val => {
        this.setState({ form: { ...this.state.form, ['tags']: val } });
    }

    componentDidMount() {

        //added this multi place, because not working in invoice single
        this.editData();
    }

    componentDidUpdate() {
        this.editData();
    }

    editData = () => {
        //condition added to stop multi rendering 
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

                api.add('projects', form).then(resp => {
                    if (resp.data.success) {
                        toast.success(ndpv.i18n.aProM);
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
                api.edit('projects', form.id, form);
                this.props.close();
                this.props.reload();
            }
        } else {
            this.props.handleSubmit(form);
        }
        // this.setState({ form: this.initialState });
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
        const i18n = ndpv.i18n;
        // const stageList = this.state.stages;
        // const tagList = this.state.tags;
        const form = this.state.form;

        let title = '';
        if (this.props.modalType == 'new') {
            title = i18n.new
        } else if (this.props.modalType == 'edit') {
            title = i18n.edit
        } else if (this.props.modalType == 'move') {
            title = i18n.moveto
        }
        return (
            <div className="pv-overlay pv-show">
                <div className="pv-modal-content">

                    <div className="pv-modal-header pv-gradient">
                        <span className="pv-close" onClick={() => this.props.close()}>
                            <Cross />
                        </span>
                        <h2 className="pv-modal-title">{title} {i18n.project}</h2>
                        <p>{i18n.add + ' ' + i18n.new + ' ' + i18n.project + ' ' + i18n.from + ' ' + i18n.here}</p>
                    </div>

                    <form onSubmit={this.handleSubmit} >
                        <div className="pv-content">
                            <div className="pv-form-style-one">

                                <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="field-title">
                                            {i18n.title}
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
                                            {i18n.email}
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
                                            {i18n.mob}
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
                                        <label htmlFor="field-budget">
                                            {i18n.budget}
                                        </label>

                                        <input
                                            id="field-budget"
                                            type="number"
                                            name="budget"
                                            value={form.budget}
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="col-md">
                                        <label htmlFor="field-currency">
                                            {i18n.cur}
                                        </label>
                                        <Currency key={form.currency} onChange={this.currencyChange} value={form.currency} form />
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="field-status_id">
                                            {i18n.status}
                                        </label>

                                        <Taxonomy
                                            data={form.status_id}
                                            taxonomy='project_status'
                                            title={i18n.status}
                                            onChange={this.handleStatusChange}
                                            color
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="field-start_date">
                                            {i18n.start} {i18n.date}
                                        </label>
                                        <div className='pv-field-date'>
                                            <DateField date={form.start_date} type='date' onDateChange={this.onDateChange} />
                                        </div>
                                    </div>

                                    <div className="col-md">
                                        <label htmlFor="field-start_date">
                                            {i18n.dueDate}
                                        </label>
                                        <div className='pv-field-date'>
                                            <DateField date={form.due_date} type='due_date' onDateChange={this.onDateChange} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="field-tags">
                                            {i18n.tag}
                                        </label>
                                        <div className="pi-field-multi">
                                            <Taxonomy
                                                onChange={this.handleTagChange}
                                                data={form.tags}
                                                taxonomy='tag'
                                                title={i18n.tag}
                                                multi
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="field-desc">
                                            {i18n.desc}
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
                                            {i18n.note}
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

                        <div className="pv-modal-footer">
                            <div className="row">
                                <div className="col">
                                    <button type='reset' className="pv-btn pv-text-hover-blue">{i18n.clear}</button>
                                </div>
                                <div className="col">
                                    <button type='submit' className="pv-btn pv-bg-blue pv-bg-hover-blue pv-btn-big pv-float-right pv-color-white">
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
export default WithRouter(Form);  