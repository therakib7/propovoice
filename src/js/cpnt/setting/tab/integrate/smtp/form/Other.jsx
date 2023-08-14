import React, { Component } from 'react';
import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
import { TextInput } from 'block/form/input';
import { FormWrapper, FormContent } from 'block/form';

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
            <FormWrapper submitHandler={this.handleSubmit} submitLabel={i18n.act}>
                <FormContent formStyleClass="pv-form-style-one">
                    <h4 className='pv-title-medium pv-mb-15' style={{ textTransform: 'capitalize' }}>Other SMTP</h4>

                    <div className="row">

                        <TextInput
                            label="SMTP Host"
                            id="field-host"
                            type="text"
                            name="host"
                            value={host}
                            wrapperClassName='col-md'
                            onChange={this.handleChange}
                            validation={{ required: { value: true } }}
                        />

                        <TextInput
                            label="SMTP Port"
                            id="field-port"
                            type="number"
                            style={{ display: 'block', width: '100px' }}
                            name="port"
                            value={port}
                            wrapperClassName='col-md'
                            onChange={this.handleChange}
                            validation={{ required: { value: true } }}
                        />
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

                        <TextInput
                            label="Username"
                            id="field-user"
                            type="text"
                            name="user"
                            value={user}
                            wrapperClassName="col-md"
                            onChange={this.handleChange}
                            validation={{ required: { value: true } }}
                        />

                        <TextInput
                            label="Password"
                            id="field-pass"
                            type="password"
                            name="pass"
                            value={pass}
                            wrapperClassName="col-md"
                            onChange={this.handleChange}
                            validation={{ required: { value: true } }}
                        />
                    </div>

                </FormContent>
            </FormWrapper>
        );
    }
}
