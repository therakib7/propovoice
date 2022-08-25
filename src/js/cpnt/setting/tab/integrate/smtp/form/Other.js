import React, { Component } from 'react';
import { toast } from 'react-toastify';
import AppContext from 'context/app-context';

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            host: '',
            port: '',
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

        let form = this.state.form;
        form.tab = 'smtp_other';

        this.props.create('settings', form).then(resp => {
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
        const i18n = ndpi.i18n;
        const { host, port, secure, auth, user, pass } = this.state.form;
        return (
            <form onSubmit={this.handleSubmit} className="pi-form-style-one">
                <h4 className='pi-title-medium pi-mb-15' style={{ textTransform: 'capitalize' }}>Other SMTP</h4>

                <div className="row">
                    <div className="col-md">
                        <label htmlFor="field-host">
                            Host
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
                            Port
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

                        <input
                            id="field-secure"
                            type="text"
                            required
                            name="secure"
                            value={secure}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="col-md">
                        <label htmlFor="field-auth">
                            Authentication
                        </label>

                        <div className="pi-field-switch" style={{display: 'block'}}>
                            <label className='pi-switch'>
                                <input type='checkbox'
                                    id="reminder-auth"
                                    name='auth'
                                    checked={auth ? 'checked' : ''}
                                    onChange={this.handleChange}
                                />
                                <span className='pi-switch-slider pi-round'></span>
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
                        <button className="pi-btn pi-bg-blue pi-bg-hover-blue">
                            {i18n.save}
                        </button>
                    </div>
                </div>
            </form>
        );
    }
} 