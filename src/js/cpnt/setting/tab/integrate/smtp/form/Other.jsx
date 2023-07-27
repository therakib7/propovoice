import React, { Component } from 'react';
import { toast } from 'react-toastify';
import AppContext from 'context/app-context';

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            host: '',
            port: '587',
            secure: '',
            auth: false,
            user: '',
            pass: ''
        };

        this.state = {
            form: this.initialState
        };
    }

    static contextType = AppContext;

    handleChange = e => {
        const { name } = e.target;
        const value = (name === 'auth') ? e.target.checked : e.target.value;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    toggleChange = () => {
        let value = !this.state.form.default;
        this.setState({ form: { ...this.state.form, ['default']: value } });
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        this.props.getAll('settings', 'tab=smtp_other').then(resp => {
            if (resp.data.success) {
                this.setState({ form: resp.data.data });
            }
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if (ndpv.isDemo) { toast.error(ndpv.demoMsg); return; }
        let form = this.state.form;
        form.tab = 'smtp_other';

        this.props.create('settings', form).then(resp => {
            if (resp.data.success) {
                toast.success(ndpv.i18n.aUpd);
                this.props.close();
            } else {
                resp.data.data.forEach(function (value) {
                    toast.error(value);
                });
            }
        })
    }

    render() {
        const i18n = ndpv.i18n;
        const { host, port, secure, auth, user, pass } = this.state.form;
        return (
            <form onSubmit={this.handleSubmit} className="pv-form-style-one">
                <h4 className='pv-title-medium pv-mb-15' style={{ textTransform: 'capitalize' }}>Other SMTP</h4>

                <div className="row">
                    <div className="col-md">
                        <label htmlFor="field-host">
                            SMTP Host
                        </label>

                        <input
                            id="field-host"
                            type="text"
                            required
                            name="host"
                            value={host}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="col-md">
                        <label htmlFor="field-port">
                            SMTP Port
                        </label>

                        <input
                            id="field-port"
                            type="number"
                            required
                            style={{ display: 'block', width: '100px' }}
                            name="port"
                            value={port}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md">
                        <label htmlFor="field-secure">
                            Encryption
                        </label>

                        <div style={{ display: 'flex' }}>
                            <div className="pv-field-radio" style={{ marginRight: 20 }}>
                                <input
                                    type='radio'
                                    id="secure_"
                                    name='secure'
                                    value=''
                                    checked={secure == ''}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="secure_">None</label>
                            </div>

                            <div className="pv-field-radio" style={{ marginRight: 20 }}>
                                <input
                                    type='radio'
                                    id="secure_ssl"
                                    name='secure'
                                    value='ssl'
                                    checked={secure == 'ssl'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="secure_ssl">SSL</label>
                            </div>

                            <div className="pv-field-radio" style={{ marginRight: 20 }}>
                                <input
                                    type='radio'
                                    id="secure_tls"
                                    name='secure'
                                    value='tls'
                                    checked={secure == 'tls'}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="secure_tls">TLS</label>
                            </div>
                        </div>
                        {/* <p class="pv-field-desc">TLS is not the same as STARTTLS, For Most servers SSL is the recommended option.</p> */}
                    </div>
                    <div className="col-md">
                        <label htmlFor="field-auth">
                            Authentication
                        </label>

                        <div className="pv-field-switch pv-field-switch-big" style={{ display: 'block' }}>
                            <label className='pv-switch'>
                                <input type='checkbox'
                                    id="reminder-auth"
                                    name='auth'
                                    checked={auth ? 'checked' : ''}
                                    onChange={this.handleChange}
                                />
                                <span className='pv-switch-slider pv-round'></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md">
                        <label htmlFor="field-user">
                            Username
                        </label>

                        <input
                            id="field-user"
                            type="text"
                            required
                            name="user"
                            value={user}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="col-md">
                        <label htmlFor="field-pass">
                            Password
                        </label>

                        <input
                            id="field-pass"
                            type="password"
                            required
                            name="pass"
                            value={pass}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <button className="pv-btn pv-bg-blue pv-bg-hover-blue">
                            {i18n.act}
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}
