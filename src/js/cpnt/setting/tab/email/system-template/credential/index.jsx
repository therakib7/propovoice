import React, { Component } from 'react';
import pro from 'block/pro-alert';
import ProLabel from 'block/pro-alert/label';
import { toast } from 'react-toastify';
import api from 'api';

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

    componentDidMount() {
        api.get('settings', 'tab=email_' + this.props.type + '_password').then(resp => {
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
        if (wage.length > 0) {
            pro();
            return;
        }

        let form = this.state.form;
        form.tab = 'email_' + this.props.type + '_password';

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
                <h4 className='pv-title-medium pv-mb-15 pv-mt-30' style={{ textTransform: 'capitalize' }}>{this.props.type == 'team' ? 'Team' : 'Client Portal'} Invitation</h4>
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
                        <p className='pv-field-desc'><b>{i18n.var}:</b> {'{org_name}'}</p>
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
                        <p className='pv-field-desc'><b>{i18n.var}:</b> {'{client_name}'}, {'{login_url}'}, {'{email}'}, {'{password}'}, {'{org_name}'}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <button className="pv-btn pv-bg-blue pv-bg-hover-blue">
                            {i18n.save} <ProLabel blueBtn />
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}
