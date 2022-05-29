import React, { Component } from 'react';
import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
import Upload from 'block/field/upload';
import Api from 'api/business';

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

    /* componentDidUpdate() {
        //condition added to stop multiple rendering
        if (this.props.modalType == 'edit') {
            
            if (this.state.form.id != this.props.data.id) {
                this.setState({ form: this.props.data });
            }
        } else {
            if (this.state.form.id != null) {
                this.setState({ form: this.initialState });
            }
        }
    } */

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        Api.getAll('default=1')
            .then(resp => {
                let businessData = resp.data.data.result;
                if (businessData.length) {
                    this.setState({ form: businessData[0] });
                }
            });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        let business = this.state.form;

        if (!business.id) {
            Api.create(business)
                .then(resp => {
                    if (resp.data.success) {
                        toast.success(this.context.CrudMsg.create);
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        } else {
            Api.update(business.id, business)
                .then(resp => {
                    if (resp.data.success) {
                        toast.success(this.context.CrudMsg.update);
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
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
        return (
            <form onSubmit={this.handleSubmit} style={{ maxWidth: '700px' }} className="pi-form-style-one">
                <div className="row">
                    <div className="col-md">
                        <label
                            htmlFor="field-name">
                            Name
                        </label>

                        <input
                            id="field-name"
                            type="text" 
                            name="name"
                            value={this.state.form.name}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="col-md">
                        <label
                            htmlFor="field-org_name">
                            Company/Organization Name
                        </label>

                        <input
                            id="field-org_name"
                            type="text" 
                            name="org_name"
                            value={this.state.form.org_name}
                            onChange={this.handleChange}
                        />
                    </div>

                </div>

                <div className="row">
                    <div className="col-md">
                        <label
                            htmlFor="field-web">
                            Website
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
                            Email
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
                            Mobile Number
                        </label>

                        <input
                            id="field-mobile"
                            type="text"
                            required
                            name="mobile"
                            value={this.state.form.mobile}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="col-md">
                        <label
                            htmlFor="field-zip">
                            Zip Code
                        </label>

                        <input
                            id="field-zip"
                            type="number"
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
                            Address
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
                        <label htmlFor="field-logo">Upload Logo</label>
                        <Upload label={'Logo'} library={false} data={this.state.form.logo} changeHandler={this.handleLogoChange} />
                    </div>
                </div>

                <div className="row" style={{ marginTop: '10px' }}>
                    <div className="col">
                        <button className="pi-btn pi-bg-blue pi-bg-hover-blue">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        );
    }
} 