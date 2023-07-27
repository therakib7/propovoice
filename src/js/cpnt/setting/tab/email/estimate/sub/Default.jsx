import React, { Component } from 'react';

import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
import api from 'api';

export default class DefaultMail extends Component {
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
        api.get('settings', 'tab=email_estimate_default').then(resp => {
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

        if (ndpv.isDemo) { toast.error(ndpv.demoMsg); return; }
        let form = this.state.form;
        form.tab = 'email_estimate_default';

        api.add('settings', form).then(resp => {
            if (resp.data.success) {
                toast.success(ndpv.i18n.aUpd);
            } else {
                resp.data.data.forEach(function (value) {
                    toast.error(value);
                });
            }
        })
    }

    render() {
        const i18n = ndpv.i18n;
        return (
            <form onSubmit={this.handleSubmit} className="pv-form-style-one">

                <div className="row">
                    <div className="col">
                        <label htmlFor="form-subject">
                            {i18n.sub}
                        </label>
                        <input
                            id="form-subject"
                            type="text"
                            required
                            name="subject"
                            value={this.state.form.subject}
                            onChange={this.handleChange}
                        />
                        <p className='pv-field-desc'><b>{i18n.var}:</b> {'{id}'}, {'{org_name}'}, {'{client_name}'} </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="form-msg">{i18n.msg}</label>
                        <textarea
                            id="form-msg"
                            required
                            rows={9}
                            name="msg"
                            value={this.state.form.msg}
                            onChange={this.handleChange}
                        />
                        <p className='pv-field-desc'><b>{i18n.var}:</b> {'{id}'}, {'{client_name}'}, {'{date}'}, {'{due_date}'}, {'{amount}'}, {'{org_name}'}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <button className="pv-btn pv-bg-blue pv-bg-hover-blue">
                            {i18n.save}
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}
