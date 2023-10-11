import React, { Component } from 'react';
import Upload from 'block/field/upload';
import { Add } from 'block/icon';
import { Text, Address } from 'block/form/input';
import { FormWrapper, FormContent } from 'block/form';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            name: '',
            org_name: '',
            email: '',
            web: '',
            mobile: '',
            country: '',
            region: '',
            address: '',
            city: '',
            zip: '',
            logo: null,
            default: true,
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
                if (!wage.length) {
                    this.setState({ form: this.props.data });
                } else {
                    let data = this.props.data;
                    data.default = true;
                    this.setState({ form: data });
                }
            }
        } else {
            if (this.state.form.id != null) {
                if (!wage.length) {
                    this.setState({ form: this.initialState });
                } else {
                    let data = this.initialState;
                    data.default = true;
                    this.setState({ form: data });
                }
            }
        }
    }

    handleChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    selectCountry(val) {
        this.setState({ form: { ...this.state.form, ['country']: val } });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let form = { ...this.state.form }
        /* if (form.logo) {
            form.logo = {
                id: form.logo.id,
                src: form.logo.src
            }
        } */
        this.props.handleSubmit(form);
        //this.setState({ form: this.initialState });
    }

    handleLogoChange = (data, type = null) => {
        let form = { ...this.state.form }
        form.logo = data;
        this.setState({ form })
    }

    render() {
        const form = this.state.form;
        const i18n = ndpv.i18n;
        let title = '';
        if (this.props.modalType == 'new') {
            title = i18n.new
        } else if (this.props.modalType == 'edit') {
            title = i18n.edit
        }
        return (
            <div className="pv-overlay pv-show">
                <div className="pv-modal-content">

                    <div className="pv-modal-header pv-gradient">
                        <span className="pv-close" onClick={() => this.props.close()}>
                            <Add />
                        </span>
                        <h2 className="pv-modal-title">{title} {i18n.biz}</h2>
                        <p>{i18n.add + ' ' + i18n.new + ' ' + i18n.biz + ' ' + i18n.from + ' ' + i18n.here}</p>
                    </div>

                    <FormWrapper submitHandler={this.handleSubmit} close={this.props.close}>
                        <FormContent formStyleClass="pv-form-style-one">
                            <div className="row">

                                <Text
                                    label={i18n.name}
                                    id="field-name"
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    wrapperClassName='col-md'
                                    onChange={this.handleChange}
                                    validation={{ required: { value: true } }}
                                />

                            </div>
                            <div className="row">

                                <Text
                                    label={i18n.email}
                                    id="field-email"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    wrapperClassName='col-md'
                                    onChange={this.handleChange}
                                    validation={{ required: { value: true }, email: { value: true } }}
                                />

                                <div className="col-md">
                                    <label
                                        htmlFor="field-web">
                                        {i18n.web}
                                    </label>

                                    <input
                                        id="field-web"
                                        type="text"
                                        name="web"
                                        value={form.web}
                                        onChange={this.handleChange}
                                    />
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md">
                                    <label
                                        htmlFor="field-mobile">
                                        {i18n.mob}
                                    </label>

                                    <input
                                        id="field-mobile"
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

                            <div className="row">
                                <div className="col">
                                    <label
                                        htmlFor="field-logo">
                                        {i18n.logo}
                                    </label>
                                    <Upload data={form.logo} changeHandler={this.handleLogoChange} />
                                </div>
                            </div>
                        </FormContent>
                    </FormWrapper>
                </div >
            </div >
        );
    }
}

export default Form;
