import React, { Component } from 'react';
import { toast } from 'react-toastify';
import api from 'api';

export default class TestMail extends Component {
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
        api.get('settings', 'tab=email_smtp_test').then(resp => {
            if (resp.data.success) {
                this.setState({ form: resp.data.data });
            }
        });
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let form = this.state.form;
        form.tab = 'email_smtp_test';

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
        const form = this.state.form;
        return (
            <form onSubmit={this.handleSubmit} className="pv-form-style-one">
                <h4 className='pv-title-medium pv-mb-15 pv-mt-30' style={{ textTransform: 'capitalize' }}>Test Mail</h4>
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
                            value={form.subject}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="form-msg">{i18n.msg}</label>
                        <textarea
                            id="form-msg"
                            required
                            rows={6}
                            name="msg"
                            value={form.msg}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <button className="pv-btn pv-bg-blue pv-bg-hover-blue">
                            {i18n.send}
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}
