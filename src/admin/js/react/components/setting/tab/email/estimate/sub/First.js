import React, { Component } from 'react';

import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
import Api from 'api/setting';

export default class Reminder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                subject: '',
                msg: ''
            }
        };
    }

    static contextType = AppContext;

    componentDidMount() {
        Api.getAll('tab=email_estimate_first')
            .then(resp => {
                if (resp.data.success) {
                    this.setState({ form: resp.data.data });
                }
            });
    }

    handleChange = (e) => {
        let reminder = { ...this.state.form }
        const target = e.target;
        const name = target.name;
        const value = target.value
        reminder[name] = value;

        this.setState({ form: reminder })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let form = this.state.form;
        form.tab = 'email_estimate_first';

        Api.create(form)
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

    render() {
        return (
            <form onSubmit={this.handleSubmit} style={{ maxWidth: '600px' }} className="pi-form-style-one">

                <div className="row">
                    <div className="col">
                        <label htmlFor="form-subject">
                            Subject
                        </label>
                        <input
                            id="form-subject"
                            type="text"
                            required
                            name="subject"
                            value={this.state.form.subject}
                            onChange={this.handleChange}
                        />
                        <p className='pi-field-desc'><b>Variable:</b> {'{id}'}, {'{company_name}'}, </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="form-msg">Message</label>
                        <textarea
                            id="form-msg"
                            required
                            rows={9}
                            name="msg"
                            value={this.state.form.msg}
                            onChange={this.handleChange}
                        />
                        <p className='pi-field-desc'><b>Variable:</b> {'{id}'}, {'{client_name}'}, {'{date}'}, {'{due_date}'}, {'{amount}'}, {'{company_name}'},</p>
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