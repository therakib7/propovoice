import React, { Component } from 'react';
import Upload from 'block/field/upload';
import { Address } from 'block/form/input';

class Info extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            name: '',
            org_name: '',
            web: '',
            email: '',
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
        //condition added to stop multi rendering
        if (this.state.form.id != this.props.data.id) {
            this.setState({ form: this.props.data });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleSubmit(this.state.form);
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    toggleChange = () => {
        let value = !this.state.form.default;
        this.setState({ form: { ...this.state.form, ['default']: value } });
    }

    selectCountry(val) {
        this.setState({ form: { ...this.state.form, ['country']: val } });
    }

    handleLogoChange = (data) => {
        let form = { ...this.state.form }
        form.logo = data;
        this.setState({ form })
    }

    render() {
        const i18n = ndpv.i18n;
        const form = this.state.form;
        return (
            <div id="pv-business">
                <div className="pv-welcome-title-content pv-text-center">
                    <h2 className="pv-welcome-title pv-color-blue">Welcome to Propovoice</h2>
                    <p className="pv-welcome-disc">
                        The best CRM and billing plugins to manage your service business
                    </p>
                </div>
                <div className="pv-welcome-title-content" style={{ marginBottom: 15 }}>
                    <h3 className="pv-tab-title">Create business profile</h3>
                </div>

                <form onSubmit={this.handleSubmit}>
                    <div className="pv-form-style-one">
                        <div className="row">
                            <div className="col-md">
                                <label htmlFor="field-name">{i18n.name}</label>
                                <input
                                    id="field-name"
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md">
                                <label
                                    htmlFor="field-email">
                                    {i18n.email}
                                </label>

                                <input
                                    id="field-email"
                                    type="email"
                                    required
                                    name="email"
                                    value={form.email}
                                    onChange={this.handleChange}
                                />
                            </div>

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
                            <div className="col-md">
                                <label htmlFor="field-logo">{i18n.upload} {i18n.logo}</label>
                                <Upload label={i18n.logo} library={false} data={form.logo} changeHandler={this.handleLogoChange} />
                            </div>
                        </div>
                    </div>

                    <div className="pv-button pv-text-right">
                        <a href={ndpv.dashboard} className="pv-text-hover-blue">{i18n.skip} {i18n.nd} {i18n.go} {i18n.db}</a>
                        <button type="submit" className="pv-btn pv-bg-blue pv-bg-hover-blue">{i18n.cont}</button>
                    </div>
                </form>
            </div >
        );
    }
}
export default Info;
