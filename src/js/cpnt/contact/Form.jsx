import React, { Component } from 'react'
import { toast } from 'react-toastify';
import { Add } from 'block/icon';
import { sprintf } from 'sprintf-js';
import api from 'api';

import Contact from 'block/field/contact';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { Address } from 'block/form/input';
import { FormWrapper, FormContent } from 'block/form';

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            first_name: '',
            org_id: '',
            org_name: '',
            email: '',
            web: '',
            mobile: '',
            country: '',
            region: '',
            address: '',
            city: '',
            zip: '',
            date: false
        };

        this.state = {
            form: this.initialState
        };

        this.selectCountry = this.selectCountry.bind(this);
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
        if (this.props.modalType == 'edit') {
            if (this.state.form.id != this.props.data.id) {
                this.setState({ form: this.props.data });
            }
        } else {
            if (this.state.form.id != null) {
                this.setState({ form: this.initialState });
            }
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    selectCountry(val) {
        this.setState({ form: { ...this.state.form, ['country']: val } });
    }

    selectRegion(val) {
        this.setState({ form: { ...this.state.form, ['region']: val } });
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
        } else {
            form.org_name = val.name;
            form.org_id = (val) ? val.id : null;
        }

        this.setState({ form });
    }

    handleSubmit = e => {

        e.preventDefault();
        let contact = this.state.form;

        if (this.props.modalType == 'new') {
            api.add('contacts', contact).then(resp => {
                if (resp.data.success) {
                    this.props.close();
                    toast.success(ndpv.i18n.aAdd);
                    contact.id = resp.data.data.id;
                    contact.type = resp.data.data.type;
                    this.props.handleSubmit(contact);
                } else {
                    resp.data.data.forEach(function (value) {
                        toast.error(value);
                    });
                }
            })
        } else {
            api.edit('contacts', contact.id, contact).then(resp => {
                if (resp.data.success) {
                    this.props.close();
                    toast.success(ndpv.i18n.aUpd);
                    this.props.handleSubmit(contact);
                } else {
                    resp.data.data.forEach(function (value) {
                        toast.error(value);
                    });
                }
            })
        }
    }

    render() {
        const form = this.state.form;
        const i18n = ndpv.i18n;
        const formTitle = this.props.modalType == 'new' ? i18n.add_new_ct : i18n.edit_ct;
        return (
            <div className="pv-overlay pv-show">
                <div className="pv-modal-content">

                    <div className="pv-modal-header pv-gradient">
                        <span className="pv-close" onClick={() => this.props.close()}>
                            <Add />
                        </span>
                        <h2 className="pv-modal-title">{formTitle}</h2>
                    </div>

                    <FormWrapper submitHandler={this.handleSubmit} close={this.props.close} >
                        <FormContent formStyleClass="pv-form-style-one">

                            <Contact
                                first_name={form.first_name}
                                org_name={form.org_name}
                                review
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
                                        required
                                        name="email"
                                        value={form.email}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="col-lg">
                                    <label htmlFor="form-web">
                                        {i18n.web}
                                    </label>

                                    <input
                                        id="form-web"
                                        type="text"
                                        name="web"
                                        value={form.web}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="row">
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

                            <Address
                                data={form}
                                selectCountry={this.selectCountry}
                                handleChange={this.handleChange}
                            />


                        </FormContent>
                    </FormWrapper>
                </div >
            </div >
        );
    }
}
