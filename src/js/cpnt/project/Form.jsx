import WithRouter from 'hoc/Router';
import React, { Component, lazy } from 'react';
import { toast } from 'react-toastify';
import api from 'api';
import Contact from 'block/field/contact';
import { Cross } from 'block/icon';
import Taxonomy from 'block/field/taxonomy';
import Currency from 'block/field/currency';

import CustomField from 'block/field/custom-field';
import { mergeObjects, checkRoute } from 'helper';

const DateField = lazy(() => import('block/date-picker'));

const { i18n, caps } = ndpv;
const isClient = caps.includes("ndpv_client_role");
import { TextInput } from 'block/form/input';
import { FormWrapper, FormContent } from 'block/form';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initState = {
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

        if (this.props.parentData) {
            this.fromClient = true;
            const { person, org } = this.props.parentData;
            const contactInfo = mergeObjects(person, org)

            if (Object.keys(contactInfo).length > 0) {
                this.initState.first_name = contactInfo.first_name;
                this.initState.email = contactInfo.email;
                this.initState.mobile = contactInfo.mobile;
                this.initState.org_name = contactInfo.name ?? contactInfo.org_name;
            }
        }
        this.state = {
            submitPreloader: false,
            form: this.initState,
            custom_field: false,
            stages: [],
            tags: [],
        };
    }


    componentDidMount() {
        //custom fields
        if (this.props.custom_field) {
            let obj = {};
            this.props.custom_field.map((item, i) => {
                obj[item.id] = '';
            });
            const merge_obj = { ...this.state.form, ...obj };
            this.setState({ form: merge_obj, custom_field: true });
        }

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
                this.setState({ form: this.initState });
            }
        }
    }

    handleChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    handleCFChange = (e) => {

        const { name, value } = e.target;

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

        if (isClient) {
            form.project_req = true;

            this.setState({ submitPreloader: true });
            api.add('deals', form).then(resp => {
                this.setState({ submitPreloader: false });
                if (resp.data.success) {
                    toast.success(ndpv.i18n.aAdd);
                    this.props.close();
                } else {
                    resp.data.data.forEach(function (value) {
                        toast.error(value);
                    });
                }
            });
            return;
        }

        if (this.props.reload) {
            this.setState({ submitPreloader: true });
            if (this.props.modalType == 'move') {
                api.add('projects', form).then(resp => {
                    this.setState({ submitPreloader: false });
                    if (resp.data.success) {
                        toast.success(ndpv.i18n.aProM);
                        let id = resp.data.data;
                        this.props.close();
                        this.props.navigate(`/project/${id}`);
                        checkRoute();
                        this.props.reload();
                    } else {
                        resp.data.data.forEach(function (value) {
                            toast.error(value);
                        });
                    }
                });

            } else {
                api.edit('projects', form.id, form).then(resp => {
                    this.setState({ submitPreloader: false });
                    if (resp.data.success) {
                        this.props.close();
                        this.props.reload();
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                });
            }
        } else {
            this.props.handleSubmit(form);
        }
        // this.setState({ form: this.initState });
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
        if (!val) {
            if (type == 'person') {
                form.person_id = null;
            } else {
                form.org_id = null;
            }
            this.setState({ form });
            return;
        };

        if (type == 'person') {
            form.first_name = val.first_name;
            form.person_id = (val) ? val.id : null;
            form.email = (val) ? val.email : '';
            form.mobile = (val) ? val.mobile : '';
            form.web = (val) ? val.web : '';
            form.country = (val) ? val.country : '';
            form.region = (val) ? val.region : '';
            form.address = (val) ? val.address : '';
            form.img = (val) ? val.img : '';
        } else {
            form.org_name = val.name;
            form.org_id = (val) ? val.id : null;
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

        const form = this.state.form;

        let title = '';
        const modalType = this.props.modalType;
        if (modalType == 'new') {
            title = i18n.new
        } else if (modalType == 'edit') {
            title = i18n.edit
        } else if (modalType == 'move') {
            title = i18n.moveto
        }

        const submitPreloader = (isClient || this.props.reload) ? this.state.submitPreloader : this.props.submitPreloader;
        return (
            <div className="pv-overlay pv-show">
                <div className="pv-modal-content">

                    <div className="pv-modal-header pv-gradient">
                        <span className="pv-close" onClick={() => this.props.close()}>
                            <Cross />
                        </span>
                        <h2 className="pv-modal-title">{isClient ? i18n.new + ' ' + i18n.project + ' ' + i18n.req : title + ' ' + i18n.project}</h2>
                        <p>{sprintf(i18n.formDesc, title, i18n.project)}</p>
                    </div>

                    <FormWrapper submitHandler={this.handleSubmit} close={this.props.close}>
                        <FormContent formStyleClass="pv-form-style-one">

                            <div className="row">
                                <TextInput
                                    label={i18n.title}
                                    id="field-title"
                                    type="text"
                                    name="title"
                                    wrapperClassName='col-md'
                                    value={form.title}
                                    onChange={this.handleChange}
                                    validation={{ required: { value: true } }}
                                />
                            </div>

                            {!isClient && <>
                                <Contact
                                    first_name={form.first_name}
                                    org_name={form.org_name}
                                    fromClient={this.fromClient}
                                    onChange={this.handleContactChange}
                                    onSelect={this.handleContactSelect}
                                />

                                <div className="row">
                                    <TextInput
                                        label={i18n.email}
                                        id="form-email"
                                        type="email"
                                        name="email"
                                        wrapperClassName='col-lg'
                                        disabled={this.fromClient}
                                        value={form.email}
                                        onChange={this.handleChange}
                                        validation={{
                                            required: { value: true },
                                            email: { value: true }
                                        }}
                                    />

                                    <div className="col-lg">
                                        <label htmlFor="form-mobile">
                                            {i18n.mob}
                                        </label>

                                        <input
                                            id="form-mobile"
                                            type="text"
                                            name="mobile"
                                            disabled={this.fromClient}
                                            value={form.mobile}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                            </>}

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

                            {!isClient && <div className="row">
                                <div className="col-md">
                                    <label htmlFor="field-status_id">
                                        {i18n.status}
                                    </label>

                                    <Taxonomy
                                        selectedFirst
                                        modalType={modalType}
                                        data={form.status_id}
                                        taxonomy='project_status'
                                        title={i18n.status}
                                        onChange={this.handleStatusChange}
                                        formTag={false}
                                        color
                                    />
                                </div>
                            </div>}

                            {!isClient && <div className="row">
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
                            </div>}

                            {!isClient && <div className="row">
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
                                            formTag={false}
                                            multi
                                        />
                                    </div>
                                </div>
                            </div>}

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

                            {!isClient && this.state.custom_field && <CustomField mod='project' type={modalType} form={form} onChange={this.handleCFChange} />}

                        </FormContent>
                    </FormWrapper>
                </div >
            </div >
        );
    }
}
export default WithRouter(Form);
