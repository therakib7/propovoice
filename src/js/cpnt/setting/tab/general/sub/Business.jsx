import React, { Component } from 'react';
import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
import Upload from 'block/field/upload';
import api from 'api';
export default class Business extends Component {
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

    static contextType = AppContext;

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    toggleChange = () => {
        let value = !this.state.form.default;
        this.setState({ form: { ...this.state.form, ['default']: value } });
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        this.props.getAll('businesses', 'default=1').then(resp => {
            let businessData = resp.data.data.result;
            if (businessData.length) {
                this.setState({ form: businessData[0] });
            }
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if (ndpv.isDemo) { toast.error(ndpv.demoMsg); return; }

        let form = { ...this.state.form }

        if (!form.id) {
            api.add('businesses', form).then(resp => {
                if (resp.data.success) {
                    toast.success(ndpv.i18n.aAdd);
                } else {
                    resp.data.data.forEach(function (value) {
                        toast.error(value);
                    });
                }
            })
        } else {
            api.edit('businesses', form.id, form).then(resp => {
                if (resp.data.success) {
                    toast.success(ndpv.i18n.aUpd);
                } else {
                    resp.data.data.forEach(function (value) {
                        toast.error(value);
                    });
                }
            })
        }
    }

    handleLogoChange = (data, type = null) => {
        let form = { ...this.state.form }
        form.logo = data;
        this.setState({ form })
    }

    render() {
        const i18n = ndpv.i18n;
        return (
            <form onSubmit={this.handleSubmit} className="pv-form-style-one">
                <div className="row">
                    <div className="col-md">
                        <label htmlFor="field-name">
                            {i18n.name}
                        </label>

                        <input
                            id="field-name"
                            type="text"
                            name="name"
                            value={this.state.form.name}
                            onChange={this.handleChange}
                        />
                    </div>

                    {/* <div className="col-md">
                        <label htmlFor="field-org_name">
                            Company/Organization Name
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
                        <label htmlFor="field-web">
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
                        <label htmlFor="field-email">
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
                        <label htmlFor="field-mobile">
                            {i18n.mob}
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
                        <label htmlFor="field-zip">
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
                        <label htmlFor="field-address">
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

                <div className="row">
                    <div className="col">
                        <button className="pv-btn pv-btn-big pv-bg-blue pv-bg-hover-blue">
                            {i18n.save}
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}
