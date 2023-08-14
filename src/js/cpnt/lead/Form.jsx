import React, { Component, lazy } from 'react';
import { Add } from 'block/icon';
import { sprintf } from 'sprintf-js';
import { toast } from "react-toastify";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Upload from 'block/field/upload';
import Currency from 'block/field/currency';
import Taxonomy from 'block/field/taxonomy';
import Contact from 'block/field/contact';
import CustomField from 'block/field/custom-field';
import Preloader from "block/preloader/spinner";
import api from 'api';
import { TextInput } from 'block/form/input';
import { FormWrapper, FormContent } from 'block/form';

export default class Form extends Component {
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
            web: '',
            source_id: '', //tax
            level_id: '', //tax
            tags: [], //tax
            budget: '',
            currency: 'USD',
            desc: '',
            note: '',
            country: '',
            region: '',
            address: '',
            img: '',
            date: false,
        };

        this.state = {
            form: this.initialState,
            custom_field: false,
            levels: [],
            tags: [],
            personList: [],
            orgList: [],
        };
    }

    handleChange = (e, type) => {

        const { name, value } = e.target;

        if (type == 'contact') {
            let contact = { ...this.state.form.contact, [name]: value };
            let form = { ...this.state.form }
            form.contact = contact;
            this.setState({ form });
        } else {
            this.setState({ form: { ...this.state.form, [name]: value } });
        }
    }

    handleCFChange = (e) => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    componentDidMount() {
        //custom fields
        if (this.props.custom_field) {
            let obj = {};
            this.props.custom_field.map((item, i) => {
                obj[item.slug] = '';
            });
            const merge_obj = { ...this.state.form, ...obj };
            this.setState({ form: merge_obj, custom_field: true });
        }

        //find person
        let args = {
            page: 1,
            per_page: 10
        }
        let params = new URLSearchParams(args).toString();

        api.get('persons', params).then(resp => {
            if (resp.data.success) {
                let personList = resp.data.data.result;
                this.setState({ personList });
            }
        });

        api.get('organizations', params).then(resp => {
            if (resp.data.success) {
                let orgList = resp.data.data.result;
                this.setState({ orgList });
            }
        });

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
                form.first_name = (form.person) ? form.person.first_name : '';
                if (form.person) {
                    form.person_id = (form.person) ? form.person.id : null;
                    form.email = (form.person) ? form.person.email : '';
                    form.mobile = (form.person) ? form.person.mobile : '';
                    form.web = (form.person) ? form.person.web : '';
                    form.country = (form.person) ? form.person.country : '';
                    form.region = (form.person) ? form.person.region : '';
                    form.address = (form.person) ? form.person.address : '';
                    form.img = (form.person) ? form.person.img : '';
                } else {
                    form.email = (form.org) ? form.org.email : '';
                    form.mobile = (form.org) ? form.org.mobile : '';
                    form.web = (form.org) ? form.org.web : '';
                    form.country = (form.org) ? form.org.country : '';
                    form.region = (form.org) ? form.org.region : '';
                    form.address = (form.org) ? form.org.address : '';
                    form.img = (form.org) ? form.org.img : '';
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
        }
    }

    currencyChange = val => {
        this.setState({ form: { ...this.state.form, ['currency']: val } });
    }

    handleLevelChange = val => {
        this.setState({ form: { ...this.state.form, ['level_id']: val } });
    }

    handleTagChange = val => {
        this.setState({ form: { ...this.state.form, ['tags']: val } });
    }

    selectCountry(val) {
        this.setState({ form: { ...this.state.form, ['country']: val } });
    }

    selectRegion(val) {
        this.setState({ form: { ...this.state.form, ['region']: val } });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let form = { ...this.state.form }

        if (form.level_id) {
            form.level_id = form.level_id.id;
        }

        if (form.img) {
            form.img = form.img.id;
        }

        if (form.tags.length) {
            let finalArray = form.tags.map(function (obj) {
                return obj.id;
            });
            form.tags = finalArray;
        }

        delete form.person;
        delete form.org;

        if (this.props.reload) {
            api.edit('leads', form.id, form);
            this.props.close();
            toast.success(ndpv.i18n.aUpd);
            this.props.reload();
        } else {
            this.props.handleSubmit(form);
        }
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
            if (!form.first_name) {
                form.email = (val) ? val.email : '';
                form.mobile = (val) ? val.mobile : '';
                form.web = (val) ? val.web : '';
                form.country = (val) ? val.country : '';
                form.region = (val) ? val.region : '';
                form.address = (val) ? val.address : '';
                form.img = (val) ? val.img : '';
            }
        }

        this.setState({ form });
    }

    handleImgChange = (data) => {
        let form = { ...this.state.form }
        form.img = data;
        this.setState({ form })
    }

    render() {

        const form = this.state.form;
        const i18n = ndpv.i18n;

        const modalType = this.props.modalType == 'new' ? i18n.add + ' ' + i18n.new : i18n.edit;

        const emailInput = {
            label: ndpv.i18n.email,
            type: 'email',
            id: 'form-email',
            name: 'email',
            value: form.email,
            wrapperClassName: 'col-lg',
            onChange: this.handleChange,
            validation: {
                required: {
                    value: true,
                    message: "Email Required"
                },
                email: {
                    value: true
                }
            },
        };

        const mobileInput = {
            label: i18n.mob,
            id: "form-mobile",
            type: "text",
            name: "mobile",
            value: form.mobile,
            wrapperClassName: 'col-lg',
            onChange: this.handleChange,
        };


        return (
            <div className="pv-overlay pv-show">
                <div className="pv-modal-content">

                    <div className="pv-modal-header pv-gradient">
                        <span className="pv-close" onClick={() => this.props.close()}>
                            <Add />
                        </span>
                        <h2 className="pv-modal-title">{modalType} {i18n.lead}</h2>
                        <p>{sprintf(i18n.formDesc, modalType, i18n.lead)}</p>
                    </div>

                    <FormWrapper submitHandler={this.handleSubmit} close={this.props.close}>
                        <FormContent formStyleClass="pv-form-style-one">
                            <Contact
                                first_name={form.first_name}
                                org_name={form.org_name}
                                onChange={this.handleContactChange}
                                onSelect={this.handleContactSelect}
                            />

                            <div className="row">
                                <TextInput  {...emailInput} />
                                <TextInput {...mobileInput} />
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="form-country">
                                        {i18n.country}
                                    </label>

                                    <CountryDropdown
                                        value={form.country}
                                        valueType='short'
                                        onChange={(val) => this.selectCountry(val)}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="form-region">
                                        {i18n.region}
                                    </label>

                                    <RegionDropdown
                                        country={form.country}
                                        countryValueType='short'
                                        value={form.region}
                                        onChange={(val) => this.selectRegion(val)}
                                    />
                                </div>

                            </div>

                            <div className="row">
                                <div className="col">
                                    <label htmlFor="form-address">
                                        {i18n.addr}
                                    </label>

                                    <input
                                        id="form-address"
                                        type="text"
                                        name="address"
                                        value={form.address}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

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
                                    <label htmlFor="field-level_id">
                                        {i18n.level}
                                    </label>
                                    <Taxonomy
                                        data={form.level_id}
                                        // list={levelList}
                                        taxonomy='lead_level'
                                        title={i18n.level}
                                        onChange={this.handleLevelChange}
                                        color
                                    />
                                </div>

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
                                    <label htmlFor="form-desc">
                                        {i18n.desc}
                                    </label>

                                    <textarea
                                        id="form-desc"
                                        type="text"
                                        name="desc"
                                        value={form.desc}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label htmlFor="form-note">
                                        {i18n.note}
                                    </label>

                                    <textarea
                                        id="form-note"
                                        type="text"
                                        name="note"
                                        value={form.note}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label htmlFor="field-img">
                                        {i18n.img}
                                    </label>
                                    <Upload data={form.img} changeHandler={this.handleImgChange} />
                                </div>
                            </div>

                            {this.state.custom_field && <CustomField mod='lead' type={this.props.modalType} form={form} onChange={this.handleCFChange} />}
                        </FormContent>
                    </FormWrapper>
                </div >
            </div >
        );
    }
}
