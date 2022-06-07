import React, { Component } from 'react';
 
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import ApiTaxonomy from 'api/taxonomy';

import ApiPerson from 'api/person';
import ApiOrg from 'api/org';

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
            contact_id: null,
            contact_type: 'person', //org/person
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

        //find person
        let args = {
            page: 1,
            per_page: 10
        }
        let params = new URLSearchParams(args).toString();

        ApiPerson.getAll(params).then(resp => {
            if (resp.data.success) {
                let personList = resp.data.data.result;
                this.setState({ personList });
            }
        });

        ApiOrg.getAll(params).then(resp => {
            if (resp.data.success) {
                let orgList = resp.data.data.result;
                this.setState({ orgList });
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

    handleFindPerson = (val, callback) => {
        if (val.length < 2) return;

        //search when typing stop
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            //search function
            ApiPerson.getAll('first_name=' + val + '&last_name=' + val)
                .then(resp => {
                    let toData = resp.data.data.result;
                    callback(toData);
                });
        }, 300);
    }

    handlePersonSelect = (val) => {
        this.setState({ to: val });
        // this.props.setTo(val);
    }

    handleFindOrg = (val, callback) => {
        if (val.length < 2) return;

        //search when typing stop
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            //search function
            ApiOrg.getAll('first_name=' + val + '&last_name=' + val)
                .then(resp => {
                    let toData = resp.data.data.result;
                    callback(toData);
                });
        }, 300);
    }

    handleOrgSelect = (val) => {
        this.setState({ to: val });
        // this.props.setTo(val);
    }

    render() {
        const contact = this.state.form.contact;
        const levelList = this.state.levels;
        const tagList = this.state.tags;

        const { personList, orgList } = this.state;

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
                                        <label htmlFor="first_name">
                                            Contact Person
                                        </label>

                                        <AsyncSelect
                                            loadOptions={this.handleFindPerson}
                                            value={this.state.form.contact_id}
                                            defaultOptions={personList}
                                            onChange={this.handlePersonSelect}
                                            getOptionValue={(data) => data.id}
                                            getOptionLabel={(data) => (data.first_name) ? data.first_name : ''}
                                        />

                                        {/* <input
                                            id="first_name"
                                            type="text"
                                            name="first_name"
                                            value={contact.first_name}
                                            onChange={(e) => this.handleChange(e, 'contact')}
                                        /> */}
                                    </div> 
                                </div>

                                <div className="row">
                                    <div className="col-lg">
                                        <label htmlFor="form-org_name">
                                            Organization Name
                                        </label>

                                        <AsyncSelect
                                            loadOptions={this.handleFindOrg}
                                            value={this.state.form.contact_id}
                                            defaultOptions={orgList}
                                            onChange={this.handleOrgSelect}
                                            getOptionValue={(data) => data.id}
                                            getOptionLabel={(data) => (data.first_name) ? data.first_name : ''}
                                        />

                                        {/* <input
                                            id="form-org_name"
                                            type="text"
                                            name="org_name"
                                            value={contact.org_name}
                                            onChange={(e) => this.handleChange(e, 'contact')}
                                        /> */}
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
