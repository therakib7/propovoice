import React, { Component } from 'react';

import Taxonomy from 'block/field/taxonomy';
import Contact from 'block/field/contact';
import WithApi from 'hoc/Api';

import Select from 'react-select';


class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            first_name: '',
            org_name: '',
            person_id: null,
            org_id: null,
            email: '',
            mobile: '',
            web: '',
            source_id: '', //tax
            level_id: '', //tax
            tags: [], //tax
            budget: '',
            currency: 'USD',
            desc: '',
            note: '', 
            date: false,
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
        this.props.getAll('taxonomies', 'taxonomy=lead_level,lead_source,tag').then(resp => {
            if (resp.data.success) {
                if (this.state.form.level_id) {
                    this.setState({
                        levels: resp.data.data.lead_level,
                        tags: resp.data.data.tag,
                    });
                } else {
                    let form = { ...this.state.form }
                    form.level_id = resp.data.data.lead_level[0];
                    this.setState({
                        form,
                        levels: resp.data.data.lead_level,
                        tags: resp.data.data.tag,
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

        this.props.getAll('persons', params).then(resp => {
            if (resp.data.success) {
                let personList = resp.data.data.result;
                this.setState({ personList });
            }
        });

        this.props.getAll('organizations', params).then(resp => {
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
                let form = this.props.data;
                form.first_name = (form.person) ? form.person.first_name : '';
                if (form.person) { 
                    form.person_id = (form.person) ? form.person.id : null;
                    form.email = (form.person) ? form.person.email : '';
                    form.mobile = (form.person) ? form.person.mobile : '';
                    form.web = (form.person) ? form.person.web : '';
                } else {
                    form.email = (form.org) ? form.org.email : '';
                    form.mobile = (form.org) ? form.org.mobile : '';
                    form.web = (form.org) ? form.org.web : '';
                } 
                form.org_name = (form.org) ? form.org.name : ''; 

                if ( form.org ) {
                    form.org_id = (form.org) ? form.org.id : null;
                }
                this.setState({ form });
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

        if (this.props.reload) {
            this.props.update('leads', form.id, form);
            this.props.close();
            this.props.reload();
        } else {
            this.props.handleSubmit(form);
        }

        this.setState({ form: this.initialState });
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
            form.person_id = (val) ? val.id : null;
            form.email = (val) ? val.email : '';
            form.mobile = (val) ? val.mobile : '';
            form.web = (val) ? val.web : '';
        } else {
            form.org_id = (val) ? val.id : null;
            if (!form.first_name) {
                form.email = (val) ? val.email : '';
                form.mobile = (val) ? val.mobile : '';
                form.web = (val) ? val.web : '';
            }
        }

        this.setState({ form });
    }

    render() {
        const contact = this.state.form.contact;
        const levelList = this.state.levels;
        const tagList = this.state.tags;

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
                        <h2 className="pi-modal-title">{this.props.modalType == 'new' ? 'New' : 'Edit'} Lead</h2>
                        <p>Add new lead from here</p>
                    </div>
                    <form onSubmit={this.handleSubmit} >
                        <div className="pi-content">
                            <div className="pi-form-style-one">
                                <Contact
                                    first_name={form.first_name}
                                    org_name={form.org_name}
                                    onChange={this.handleContactChange}
                                    onSelect={this.handleContactSelect}
                                />

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
                                            value={form.email}
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
                                            value={form.mobile}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="field-budget">
                                            Budget
                                        </label>

                                        <input
                                            id="field-budget"
                                            type="text"
                                            name="budget"
                                            value={form.budget}
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="col-md">
                                        <label htmlFor="field-currency">
                                            Currency
                                        </label>

                                        <input
                                            id="field-currency"
                                            type="text"
                                            readOnly
                                            name="currency"
                                            value={form.currency}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="field-level_id">
                                            Level
                                        </label>
                                        {/* <Taxonomy data={form.level_id} taxonomy='lead_level' title='Level' color={true} /> */}
                                        <Select
                                            className={'pi-field-select'}
                                            value={form.level_id}
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
                                        {/* <Taxonomy data={form.tags} taxonomy='tag' title='Tag' multiple={true} /> */}
                                        <Select
                                            className={'pi-field-select'}
                                            value={form.tags}
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
                                        <label htmlFor="form-desc">
                                            Description
                                        </label>

                                        <textarea
                                            id="form-desc"
                                            type="text"
                                            name="desc"
                                            value={form.desc}
                                            onChange={(e) => this.handleChange(e, 'lead')}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="form-note">
                                            Note
                                        </label>

                                        <textarea
                                            id="form-note"
                                            type="text"
                                            name="note"
                                            value={form.note}
                                            onChange={(e) => this.handleChange(e, 'lead')}
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

export default WithApi(Form);  