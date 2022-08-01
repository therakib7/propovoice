import React, { Component } from 'react';

import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
import Moment from 'react-moment';


export default class License extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                key: '',
                type: 'activate_license',
                status: '',
            },
        };
    }

    static contextType = AppContext;

    componentDidMount() {
        this.props.getAll('pro-settings', 'tab=license').then(resp => {
            if (resp.data.success) {
                this.setState({ form: resp.data.data });
            }
        });
    }

    handleChange = (e) => {
        let form = { ...this.state.form }
        const target = e.target;
        const name = target.name;
        const value = target.value
        form[name] = value;

        this.setState({ form })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let form = { ...this.state.form }
        form.tab = 'license';
        this.props.create('pro-settings', form).then(resp => {
            let data = resp.data.data;
            if (resp.data.success) {
                toast.success(data.msg);
                if (data.data) {
                    form.type = data.data.type;
                    form.status = data.data.status;
                    form.for = data.data.for;
                    form.expires = data.data.expires;
                }
                this.setState({ form })
            } else {
                data.forEach(function (value, index, array) {
                    toast.error(value);
                });
            }
        });
    }

    render() {
        const form = this.state.form;
        return (
            <form onSubmit={this.handleSubmit} className="pi-form-style-one">

                <div className="row">
                    <div className="col">
                        <label htmlFor="form-key">
                            License Key
                        </label>
                        <input
                            id="form-key"
                            type="text"
                            required
                            name="key"
                            value={form.key}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>

                {form.status == 'valid' && <>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="form-status">
                                License Status:
                                <span className="pi-pro-label pi-bg-green">Valid</span>
                            </label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <label htmlFor="form-status">
                                License For: <span style={{ color: '#2D3748' }}>
                                    {form.for == '1' || form.for == '3' ? 'Freelancer' : 'Agency'}
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <label htmlFor="form-status">
                                License Expires: <span style={{ color: '#2D3748' }}>
                                    {form.expires == 'lifetime' ? 'Lifetime' : <Moment format="YYYY-MM-DD">{form.expires}</Moment>}
                                </span>
                            </label>
                        </div>
                    </div>
                </>}

                <div className="row">
                    <div className="col">
                        <button className="pi-btn pi-bg-blue pi-bg-hover-blue">
                            {form.type == 'activate_license' ? 'Activate License' : 'Deactivate License'}
                        </button>
                    </div>
                </div>
            </form>
        );
    }
} 