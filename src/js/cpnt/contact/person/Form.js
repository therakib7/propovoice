import React, { Component } from 'react';
import Upload from 'block/field/upload';
import { Add } from 'block/icon';
import { sprintf } from 'sprintf-js';

import Contact from 'block/field/contact';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            first_name: '',
            org_name: '',
            org_id: null,
            email: '',
            web: '',
            mobile: '',
            country: '',
            region: '',
            address: '',
            img: null,
            date: false
        };

        this.state = {
            form: this.initialState
        };
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

    handleSubmit = (e) => {
        e.preventDefault();
        let form = { ...this.state.form }
        if (form.img) {
            form.img = form.img.id;
        }
        this.props.handleSubmit(form);
        // this.setState({ form: this.initialState });
    }

    handleImgChange = (data, type = null) => {
        let form = { ...this.state.form }
        form.img = data;
        this.setState({ form })
    }

    render() {
        const form = this.state.form;
        const i18n = ndpv.i18n;
        const modalType = this.props.modalType == 'new' ? i18n.new : i18n.edit;
        return (
            <div className="pv-overlay pv-show">
                <div className="pv-modal-content">

                    <div className="pv-modal-header pv-gradient">
                        <span className="pv-close" onClick={() => this.props.close()}>
                            <Add />
                        </span>
                        <h2 className="pv-modal-title">{modalType} {i18n.prsn}</h2>
                        <p>{sprintf(i18n.formDesc, modalType, i18n.prsn)}</p>
                    </div>

                    <form onSubmit={this.handleSubmit} >
                        <div className="pv-content">
                            <div className="pv-form-style-one">
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

                                <div className="row">
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
                                    <div className="col">
                                        <label
                                            htmlFor="field-img">
                                            {i18n.img}
                                        </label>
                                        <Upload data={form.img} changeHandler={this.handleImgChange} />
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

export default Form;
