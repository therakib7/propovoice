import React, { Component } from 'react';
import { Add } from 'block/icon';
import { sprintf } from 'sprintf-js';
import { toast } from "react-toastify";
import api from 'api';
import pro from "block/pro-alert";
import { Text } from 'block/form/input';
import { FormWrapper, FormContent } from 'block/form';

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            name: '',
            email: '',
            role: '',
            caps: [],
            date: false,
        };

        this.state = {
            submitPreloader: false,
            form: this.initialState,
            capsList: [
                { label: 'Dashbaord', value: 'ndpv_dashboard' },
                { label: 'Lead', value: 'ndpv_lead' },
                { label: 'Deal', value: 'ndpv_deal' },
                { label: 'Estimate', value: 'ndpv_estimate' },
                { label: 'Invoice', value: 'ndpv_invoice' },
                { label: 'Client', value: 'ndpv_client' },
                { label: 'Project', value: 'ndpv_project' },
                { label: 'Task & Activity', value: 'ndpv_task' },
                { label: 'Contact', value: 'ndpv_contact' },
            ]
        };
    }

    handleChange = (e, type) => {
        const { name, value } = e.target;
        if (this.props.modalType == 'new' && name == 'role') {
            let form = { ...this.state.form };
            form[name] = value;

            if (value == 'ndpv_admin') {
                form.caps = [
                    'ndpv_dashboard',
                    'ndpv_lead',
                    'ndpv_deal',
                    'ndpv_estimate',
                    'ndpv_invoice',
                    'ndpv_client',
                    'ndpv_project',
                    'ndpv_contact'
                ];
            } else if (value == 'ndpv_manager') {
                form.caps = [
                    'ndpv_dashboard',
                    'ndpv_lead',
                    'ndpv_deal',
                    'ndpv_estimate',
                    'ndpv_invoice',
                    'ndpv_client',
                    'ndpv_project',
                    'ndpv_contact'
                ];
            } else if (value == 'ndpv_staff') {
                form.caps = [
                    'ndpv_dashboard',
                    'ndpv_lead',
                    'ndpv_deal',
                    'ndpv_client',
                    'ndpv_project',
                    'ndpv_task'
                ];
            }
            // console.log(form)
            this.setState({ form });
        } else {
            this.setState({ form: { ...this.state.form, [name]: value } });
        }
    }

    handleCheckboxChange = (event) => {
        const value = event.target.value;
        let caps = this.state.form.caps;
        if (caps.includes(value)) {
            this.setState({ form: { ...this.state.form, ['caps']: caps.filter(c => c !== value) } });
        } else {
            this.setState({ form: { ...this.state.form, ['caps']: [...caps, value] } });
        }
    };

    componentDidMount() {

        //added this multi place, because not working in invoice single
        this.editData();
    }

    componentDidUpdate() {
        this.editData();
    }

    editData = () => {
        //condition added to stop multi rendering
        if (this.props.modalType == 'edit') {
            if (this.state.form.id != this.props.data.id) {
                let form = this.props.data;
                this.setState({ form });
            }
        } else {
            if (this.state.form.id != null) {
                this.setState({ form: this.initialState });
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (ndpv.isDemo) { toast.error(ndpv.demoMsg); return; }

        if (wage.length > 0) {
            pro();
            return;
        }

        let form = { ...this.state.form }

        if (this.props.reload) {
            this.setState({ submitPreloader: true });
            api.edit('teams', form.id, form).then(resp => {
                this.setState({ submitPreloader: false });
                if (resp.data.success) {
                    this.props.close();
                    toast.success(ndpv.i18n.aUpd);
                    this.props.reload();
                } else {
                    resp.data.data.forEach(function (value) {
                        toast.error(value);
                    });
                }
            });

        } else {
            this.props.handleSubmit(form);
        }
    }

    render() {

        const form = this.state.form;
        const i18n = ndpv.i18n;

        const modalType = this.props.modalType == 'new' ? i18n.add + ' ' + i18n.new : i18n.edit;

        const submitPreloader = this.props.reload ? this.state.submitPreloader : this.props.submitPreloader;
        return (
            <div className="pv-overlay pv-show">
                <div className="pv-modal-content">

                    <div className="pv-modal-header pv-gradient">
                        <span className="pv-close" onClick={() => this.props.close()}>
                            <Add />
                        </span>
                        <h2 className="pv-modal-title">{modalType} {i18n.team + ' ' + i18n.member}</h2>
                        <p>{sprintf(i18n.formDesc, modalType, i18n.team + ' ' + i18n.member)}</p>
                    </div>
                    <FormWrapper submitHandler={this.handleSubmit} close={this.props.close} isPro={true}>
                        <FormContent formStyleClass="pv-form-style-one">

                            <div className="row">
                                <Text
                                    label={i18n.name}
                                    id="form-name"
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    wrapperClassName="col-lg"
                                    onChange={this.handleChange}
                                    validation={{ required: { value: true } }}
                                />
                            </div>

                            <div className="row">
                                <Text
                                    label={i18n.email}
                                    id="form-email"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    wrapperClassName="col-lg"
                                    onChange={this.handleChange}
                                    validation={{ required: { value: true }, email: { value: true } }}
                                />
                            </div>

                            <div className="row">
                                <div className="col-7">
                                    <label>Role</label>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="pv-field-checkbox" style={{ marginBottom: 0 }}>
                                                <input
                                                    type="radio"
                                                    id="role-admin"
                                                    name="role"
                                                    value='ndpv_admin'
                                                    checked={this.state.form.role == "ndpv_admin"}
                                                    onChange={this.handleChange}
                                                />
                                                <label htmlFor="role-admin">Admin</label>
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="pv-field-checkbox" style={{ marginBottom: 0 }}>
                                                <input
                                                    type="radio"
                                                    id="role-manager"
                                                    name="role"
                                                    value='ndpv_manager'
                                                    checked={this.state.form.role == "ndpv_manager"}
                                                    onChange={this.handleChange}
                                                />
                                                <label htmlFor="role-manager">Manager</label>
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="pv-field-checkbox" style={{ marginBottom: 0 }}>
                                                <input
                                                    type="radio"
                                                    id="role-contributor"
                                                    name="role"
                                                    value='ndpv_staff'
                                                    checked={this.state.form.role == "ndpv_staff"}
                                                    onChange={this.handleChange}
                                                />
                                                <label htmlFor="role-contributor">Staff</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {this.state.form.role && (this.state.form.role != 'ndpv_admin') && <div className="row">
                                <div className="col-10">
                                    <label>Capabilities</label>
                                    <div className="row">

                                        {this.state.capsList.map((c) => {
                                            if (this.state.form.role == 'ndpv_staff' && (
                                                c.value == 'ndpv_estimate' ||
                                                c.value == 'ndpv_invoice' ||
                                                c.value == 'ndpv_contact'
                                            )) return;
                                            return (
                                                <div className="col-4" key={c.value}>
                                                    <div className="pv-field-switch pv-mr-10">
                                                        <label className="pv-switch">
                                                            <input
                                                                type="checkbox"
                                                                id={c.value}
                                                                name="cap"
                                                                value={c.value}
                                                                checked={this.state.form.caps.includes(c.value)}
                                                                onChange={this.handleCheckboxChange}
                                                            />
                                                            <span className="pv-switch-slider pv-round" />
                                                        </label>
                                                    </div>
                                                    <label htmlFor={c.value}>{c.label}</label>
                                                </div>
                                            )
                                        })}

                                        {/* {capabilityList.map((c) => (
                                                <div key={c.value}>
                                                    <input
                                                        type="checkbox"
                                                        id={c.value}
                                                        name={c.value}
                                                        value={c.value}
                                                        checked={capabilities.includes(c.value)}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <label htmlFor={c.value}>{c.label}</label>
                                                </div>
                                            ))} */}

                                    </div>
                                </div>
                            </div>}

                        </FormContent>
                    </FormWrapper>
                </div >
            </div >
        );
    }
}
