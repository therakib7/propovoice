import React, { Component } from 'react';
import WithApi from 'hoc/Api';

class Contact extends Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {
                first_name: '',
                org_name: '',
            },
            personList: [],
            orgList: [],
            personModal: false,
            orgModal: false,
        };

        this.timeout = 0;
    }

    handleChange = e => {
        const { name, value } = e.target;

        if (value.length < 1) {
            this.setState({ personModal: false, personList: [], form: { ...this.state.form, [name]: value } });
            if (name == 'first_name') {
                this.props.onChange('', 'person');
            } else {
                this.props.onChange('', 'org');
            }
            return;
        }

        this.setState({ form: { ...this.state.form, [name]: value } }, () => {
            if (name == 'first_name') {
                this.props.onChange(value, 'person');
            } else {
                this.props.onChange(value, 'org');
            }
            //search when typing stop
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                if (name == 'first_name') {
                    this.props.getAll('persons', 'first_name=' + value).then(resp => {
                        let persons = resp.data.data.result;
                        this.setState({ personModal: true, personList: persons });
                    });
                } else {
                    this.props.getAll('organizations', 'name=' + value).then(resp => {
                        let orgs = resp.data.data.result;
                        this.setState({ orgModal: true, orgList: orgs });
                    });
                }

            }, 300);
        });
    }

    handleSelect = (e, val, type) => {
        e.preventDefault();

        this.props.onSelect(val, type);

        let form = this.state.form;
        if (type == 'person') {
            if (val) {
                form.first_name = val.first_name;
            }
            this.setState({ personModal: false, personList: [], form });
        } else {
            if (val) {
                form.org_name = val.name;
            }
            this.setState({ orgModal: false, orgList: [], form });
        }
    }

    render() {
        const person = (
            <div className="col-lg">
                <label htmlFor="first_name">
                    Contact Person
                </label>
                <div className="pi-field-search">
                    <div className="pi-action-content">
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            autoComplete='off'
                            value={this.state.form.first_name}
                            onChange={this.handleChange}
                        />

                        {this.state.personModal && <div className="pi-dropdown-content pi-show">
                            <button style={{ color: '#4c6fff' }} onClick={(e) => this.handleSelect(e, null, 'person')}>+ Add '{this.state.form.first_name}' as New Contact</button>
                            {this.state.personList.map((item, i) => (
                                <a key={i} onClick={(e) => this.handleSelect(e, item, 'person')}>{item.first_name}</a>
                            ))}
                        </div>}
                    </div>
                </div>
            </div>
        );

        const org = (
            <div className="col-lg">
                <label htmlFor="org_name">
                    Contact Organization
                </label>
                <div className="pi-field-search">
                    <div className="pi-action-content">
                        <input
                            id="org_name"
                            type="text"
                            name="org_name"
                            autoComplete='off'
                            value={this.state.form.org_name}
                            onChange={this.handleChange}
                        />

                        {this.state.orgModal && <div className="pi-dropdown-content pi-show">
                            <button style={{ color: '#4c6fff' }} onClick={(e) => this.handleSelect(e, null, 'org')}>+ Add '{this.state.form.org_name}' as New Organization</button>
                            {this.state.orgList.map((item, i) => (
                                <a key={i} onClick={(e) => this.handleSelect(e, item, 'org')}>{item.name}</a>
                            ))}
                        </div>}
                    </div>
                </div>
            </div>
        );

        return (
            <div className="row"> 
                { ! this.props.personLast && person}
                {org} 
                { this.props.personLast && person}
            </div>
        );
    }
}

export default WithApi(Contact);  