import React, { Component } from 'react';

import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Select from 'react-select';
import ApiTaxonomy from 'api/taxonomy';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            source: '',
            level_id: '', //tax
            tags: [], //tax
            budget: '',
            currency: 'USD',
            desc: '',
            note: '',
            date: false,
            contact: {
                id: null,
                first_name: '',
                last_name: '',
                org_name: '',
                email: '',
                web: '',
                mobile: '',
                country: '',
                region: '',
                address: '',
                date: false
            },
        };

        this.state = {
            form: this.initialState,
            levels: [],
            tags: [],
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

    handleLevelChange = val => {
        this.setState({ form: { ...this.state.form, ['level_id']: val } });
    }

    handleTagChange = val => {
        this.setState({ form: { ...this.state.form, ['tags']: val } });
    }

    selectCountry(val) {
        let contact = { ...this.state.form.contact, ['country']: val };
        let form = { ...this.state.form }
        form.contact = contact;
        this.setState({ form });
    }

    selectRegion(val) {
        let contact = { ...this.state.form.contact, ['region']: val };
        let form = { ...this.state.form }
        form.contact = contact;
        this.setState({ form });
    }

    componentDidMount() {
        ApiTaxonomy.getAll('taxonomy=lead_level_tag').then(resp => {
            if (resp.data.success) {
                if (this.state.form.level_id) {
                    this.setState({
                        levels: resp.data.data.levels,
                        tags: resp.data.data.tags,
                    });
                } else {
                    let form = { ...this.state.form }
                    form.level_id = resp.data.data.levels[0];
                    this.setState({
                        form,
                        levels: resp.data.data.levels,
                        tags: resp.data.data.tags,
                    });
                }
            }
        });
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

    handleSubmit = (e) => {
        e.preventDefault();
        let form = { ...this.state.form }

        if (form.level_id) {
            form.level_id = form.level_id.id;
        }

        if (form.tags.length) {
            let finalArray = form.tags.map(function (obj) {
                return obj.id;
            });
            form.tags = finalArray;
        }

        this.props.handleSubmit(form);
        this.setState({ form: this.initialState });
    }

    render() {
        const contact = this.state.form.contact;
        const levelList = this.state.levels;
        const tagList = this.state.tags;

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
                        <h2 className="pi-modal-title">{this.props.modalType == 'new' ? 'New' : 'Edit'} Lead</h2>
                        <p>Add new lead from here</p>
                    </div>
                    <form onSubmit={this.handleSubmit} >
                        <div className="pi-content">
                            <div className="pi-form-style-one">
                                <div className="row">
                                    <div className="col-lg">
                                        <label
                                            htmlFor="first_name">
                                            Full Name
                                        </label>

                                        <input
                                            id="first_name"
                                            type="text"
                                            name="first_name"
                                            value={contact.first_name}
                                            onChange={(e) => this.handleChange(e, 'contact')}
                                        />
                                    </div>
                                    {/* <div className="col-lg">
                                        <label
                                            htmlFor="last_name">
                                            Last Name
                                        </label>

                                        <input
                                            id="last_name"
                                            type="text"
                                            name="last_name"
                                            value={contact.last_name}
                                            onChange={(e) => this.handleChange(e, 'contact')}
                                        />
                                    </div>  */}
                                </div>

                                <div className="row">
                                    <div className="col-lg">
                                        <label
                                            htmlFor="form-org_name">
                                            Company/Organization Name
                                        </label>

                                        <input
                                            id="form-org_name"
                                            type="text"
                                            name="org_name"
                                            value={contact.org_name}
                                            onChange={(e) => this.handleChange(e, 'contact')}
                                        />
                                    </div>
                                    <div className="col-lg">
                                        <label
                                            htmlFor="form-web">
                                            Website
                                        </label>

                                        <input
                                            id="form-web"
                                            type="text"
                                            name="web"
                                            value={contact.web}
                                            onChange={(e) => this.handleChange(e, 'contact')}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg">
                                        <label
                                            htmlFor="form-email">
                                            Email
                                        </label>

                                        <input
                                            id="form-email"
                                            type="email"
                                            required
                                            name="email"
                                            value={contact.email}
                                            onChange={(e) => this.handleChange(e, 'contact')}
                                        />
                                    </div>
                                    <div className="col-lg">
                                        <label
                                            htmlFor="form-mobile">
                                            Mobile Number
                                        </label>

                                        <input
                                            id="form-mobile"
                                            type="text"
                                            name="mobile"
                                            value={contact.mobile}
                                            onChange={(e) => this.handleChange(e, 'contact')}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label
                                            htmlFor="form-country">
                                            Country
                                        </label>

                                        <CountryDropdown
                                            value={contact.country}
                                            valueType='short'
                                            onChange={(val) => this.selectCountry(val)}
                                        />
                                    </div>

                                    <div className="col">
                                        <label
                                            htmlFor="form-region">
                                            Region
                                        </label>

                                        <RegionDropdown
                                            country={contact.country}
                                            countryValueType='short'
                                            value={contact.region}
                                            onChange={(val) => this.selectRegion(val)}
                                        />
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label
                                            htmlFor="form-address">
                                            Address
                                        </label>

                                        <input
                                            id="form-address"
                                            type="text"
                                            name="address"
                                            value={contact.address}
                                            onChange={(e) => this.handleChange(e, 'contact')}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md">
                                        <label
                                            htmlFor="field-budget">
                                            Budget
                                        </label>

                                        <input
                                            id="field-budget"
                                            type="text"
                                            name="budget"
                                            value={this.state.form.budget}
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="col-md">
                                        <label
                                            htmlFor="field-currency">
                                            Currency
                                        </label>

                                        <input
                                            id="field-currency"
                                            type="text"
                                            readOnly
                                            name="currency"
                                            value={this.state.form.currency}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md">
                                        <label
                                            htmlFor="field-level_id">
                                            Level
                                        </label>

                                        <Select
                                            value={this.state.form.level_id}
                                            onChange={this.handleLevelChange}
                                            getOptionValue={(levelList) => levelList.id}
                                            getOptionLabel={(levelList) => levelList.label}
                                            options={levelList}
                                        />
                                    </div>

                                    <div className="col-md">
                                        <label htmlFor="field-tags">
                                            Tags
                                        </label>
                                        <Select
                                            value={this.state.form.tags}
                                            onChange={this.handleTagChange}
                                            getOptionValue={(tagList) => tagList.id}
                                            getOptionLabel={(tagList) => tagList.label}
                                            options={tagList}
                                            isMulti
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label
                                            htmlFor="form-desc">
                                            Description
                                        </label>

                                        <textarea
                                            id="form-desc"
                                            type="text"
                                            name="desc"
                                            value={this.state.form.desc}
                                            onChange={(e) => this.handleChange(e, 'lead')}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label
                                            htmlFor="form-note">
                                            Note
                                        </label>

                                        <textarea
                                            id="form-note"
                                            type="text"
                                            name="note"
                                            value={this.state.form.note}
                                            onChange={(e) => this.handleChange(e, 'lead')}
                                        />
                                    </div>
                                </div>

                                {/* <div className="row">
                                    <div className="col">
                                        <button className="pi-btn pi-bg-blue pi-bg-hover-blue pi-m-auto">
                                            Save
                                        </button>
                                    </div>
                                </div> */}
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
