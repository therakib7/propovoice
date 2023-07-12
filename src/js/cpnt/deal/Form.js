import React, { Component } from 'react';
import { toast } from 'react-toastify';
import api from 'api';
import WithRouter from 'hoc/Router';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Upload from 'block/field/upload';
import { Add } from 'block/icon';
import Currency from 'block/field/currency';
import Taxonomy from 'block/field/taxonomy';
import Contact from 'block/field/contact';
import CustomField from 'block/field/custom-field';
import { sprintf } from 'sprintf-js';

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
            lead_id: '',
            stage_id: '',
            budget: '',
            currency: 'USD',
            probability: 50,
            tags: [],
            desc: '',
            note: '',
            country: '',
            region: '',
            address: '',
            img: '',
            date: false
        };

        this.state = {
            form: this.initialState,
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
                    form.lead_id = form.id;
                    form.probability = 50;
                }

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

            /* else {
                if ( this.props.data && ! this.state.form.stage_id && this.props.data.hasOwnProperty('label') ) { // new deal from stage
                    let form = {...this.initialState}
                    form.stage_id = this.props.data;
                    this.setState({ form });
                }
            }  */
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

    handleStageChange = val => {
        this.setState({ form: { ...this.state.form, ['stage_id']: val } });
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

        if (form.stage_id) {
            form.stage_id = form.stage_id.id;
        }

        if (!form.stage_id) {
            toast.error(ndpv.i18n.stage + ' ' + ndpv.i18n.isReq);
            return;
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

        if (this.props.reload) {

            if (this.props.modalType == 'move') {

                api.add('deals', form).then(resp => {
                    if (resp.data.success) {
                        toast.success(ndpv.i18n.aDelM);
                        let id = resp.data.data;
                        this.props.close();
                        this.props.navigate(`/deal/${id}`);
                        this.props.reload();
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                });

            } else {
                api.edit('deals', form.id, form);
                this.props.close();
                this.props.reload();
            }
        } else {
            let args = null;
            if (!this.props.boardView) {
                args = { table_view: true };
            }
            this.props.handleSubmit(form, null, args);
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

    handleImgChange = (data, type = null) => {
        let form = { ...this.state.form }
        form.img = data;
        this.setState({ form })
    }

    render() {
        const i18n = ndpv.i18n;
        const form = this.state.form;
        const probabilityPercent = (form.probability / 100) * 100;

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
                            <Add />
                        </span>
                        <h2 className="pv-modal-title">{title} {i18n.deal}</h2>
                        <p>{sprintf(i18n.formDesc, title, i18n.deal)}</p>

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
                                        <label htmlFor="field-stage_id">
                                            {i18n.stage}
                                        </label>
                                        <Taxonomy
                                            selectedFirst
                                            data={form.stage_id}
                                            taxonomy='deal_stage'
                                            title={i18n.stage}
                                            onChange={this.handleStageChange}
                                            color
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

                                {!wage.length && <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="field-probability">
                                            {i18n.proba} <span style={{ position: 'absolute', right: '15px' }}>({form.probability}%)</span>
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

                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="field-img">
                                            {i18n.img}
                                        </label>
                                        <Upload data={form.img} changeHandler={this.handleImgChange} />
                                    </div>
                                </div>

                                {this.state.custom_field && <CustomField mod='deal' type={this.props.modalType} form={form} onChange={this.handleCFChange} />}

                            </div>
                        </div>

                        <div className="pv-modal-footer">
                            <div className="row">
                                <div className="col">
                                    <button type='reset' className="pv-btn pv-text-hover-blue" onClick={() => this.props.close()}>{i18n.cancel}</button>
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