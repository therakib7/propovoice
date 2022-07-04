import React, { Component } from 'react';

import Contact from 'block/field/contact';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            first_name: '', 
            org_name: '',
            email: '',
            web: '',
            mobile: '',
            country: '',
            region: '',
            address: '',
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
        //added this multiple place, because not working in invoice single
        this.editData();
    }

    componentDidUpdate() {
        this.editData();
    }

    editData = () => {
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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleSubmit(this.state.form);
        // this.setState({ form: this.initialState });
    }

    render() {
        const form = this.state.form;
        return (
            <div className="pi-overlay pi-show">
                <div className="pi-modal-content">

                    <div className="pi-modal-header pi-gradient">
                        <span className="pi-close" onClick={() => this.props.close()}>
                            <svg
                                width={25}
                                height={25}
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12.5 3.5L3.5 12.5"
                                    stroke="#718096"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12.5 12.5L3.5 3.5"
                                    stroke="#718096"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                        <h2 className="pi-modal-title">{this.props.modalType == 'new' ? 'New' : 'Edit'} Person</h2>
                        <p>Add new person from here</p>
                    </div>

                    <form onSubmit={this.handleSubmit} >
                        <div className="pi-content">
                            <div className="pi-form-style-one">
                                 
                                <Contact
                                    data={{
                                        first_name: form.first_name,
                                        org_name: form.org_name
                                    }}
                                    review={true}
                                    onChange={this.handleContactChange} 
                                />

                                <div className="row">
                                    {/* <div className="col-lg">
                                        <label htmlFor="form-org_name">
                                            Company/Organization Name
                                        </label>

                                        <input
                                            id="form-org_name"
                                            type="text"
                                            name="org_name"
                                            value={this.state.form.org_name}
                                            onChange={this.handleChange}
                                        />
                                    </div> */}
                                    <div className="col-lg">
                                        <label htmlFor="form-web">
                                            Website
                                        </label>

                                        <input
                                            id="form-web"
                                            type="text"
                                            name="web"
                                            value={this.state.form.web}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg">
                                        <label htmlFor="form-email">
                                            Email
                                        </label>

                                        <input
                                            id="form-email"
                                            type="email"
                                            required
                                            name="email"
                                            value={this.state.form.email}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="col-lg">
                                        <label htmlFor="form-mobile">
                                            Mobile Number
                                        </label>

                                        <input
                                            id="form-mobile"
                                            type="text"
                                            name="mobile"
                                            value={this.state.form.mobile}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="form-country">
                                            Country
                                        </label>

                                        <CountryDropdown
                                            value={this.state.form.country}
                                            valueType='short'
                                            onChange={(val) => this.selectCountry(val)}
                                        />
                                    </div>

                                    <div className="col">
                                        <label htmlFor="form-region">
                                            Region
                                        </label>

                                        <RegionDropdown
                                            country={this.state.form.country}
                                            countryValueType='short'
                                            value={this.state.form.region}
                                            onChange={(val) => this.selectRegion(val)}
                                        />
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="form-address">
                                            Address
                                        </label>

                                        <input
                                            id="form-address"
                                            type="text"
                                            name="address"
                                            value={this.state.form.address}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pi-modal-footer">
                            <div className="row">
                                <div className="col">
                                    <button type='reset' className="pi-btn pi-text-hover-blue">Clear</button>
                                </div>
                                <div className="col">
                                    <button type='submit' className="pi-btn pi-bg-blue pi-bg-hover-blue pi-btn-big pi-float-right pi-color-white">
                                        Save
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
