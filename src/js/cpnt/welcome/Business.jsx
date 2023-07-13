import React, { Component } from 'react';
import Upload from 'block/field/upload';

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
            address: '',
            logo: null,
            zip: '',
            default: true,
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

    toggleChange = () => {
        let value = !this.state.form.default;
        this.setState({ form: { ...this.state.form, ['default']: value } });
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

    handleLogoChange = (data) => {
        let form = { ...this.state.form }
        form.logo = data;
        this.setState({ form })
    }

    render() {
        const i18n = ndpv.i18n;
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
                                    value={this.state.form.name}
                                    onChange={this.handleChange}
                                />
                            </div>

                            {/* <div className="col-md">
                                <label
                                    htmlFor="field-org_name">
                                    Company Name
                                </label>

                                <input
                                    id="field-org_name"
                                    type="text" 
                                    name="org_name"
                                    value={this.state.form.org_name}
                                    onChange={this.handleChange}
                                />
                            </div> */}
                        </div>

                        <div className="row">
                            <div className="col-md">
                                <label
                                    htmlFor="field-web">
                                    {i18n.web}
                                </label>

                                <input
                                    id="field-web"
                                    type="text"
                                    name="web"
                                    value={this.state.form.web}
                                    onChange={this.handleChange}
                                />
                            </div>

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
                                    value={this.state.form.email}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md">
                                <label
                                    htmlFor="field-mobile">
                                    {i18n.mob} {i18n.num}
                                </label>

                                <input
                                    id="field-mobile"
                                    type="text"
                                    name="mobile"
                                    value={this.state.form.mobile}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="col-md">
                                <label
                                    htmlFor="field-zip">
                                    {i18n.zip}
                                </label>

                                <input
                                    id="field-zip"
                                    type="text"
                                    name="zip"
                                    value={this.state.form.zip}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label
                                    htmlFor="field-address">
                                    {i18n.addr}
                                </label>

                                <input
                                    id="field-address"
                                    type="text"
                                    name="address"
                                    placeholder='Write you full address here'
                                    value={this.state.form.address}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md">
                                <label htmlFor="field-logo">{i18n.upload} {i18n.logo}</label>
                                <Upload label={'Logo'} library={false} data={this.state.form.logo} changeHandler={this.handleLogoChange} />
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
