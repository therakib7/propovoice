import React, { Component } from 'react';

import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
import Api from 'api/setting';

export default class License extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                key: '',
                type: 'activate_license',
                status: '',
            },
            btn_txt: 'Activate License'
        };
    }

    static contextType = AppContext;

    componentDidMount() {
        this.props.getAll('pro-settings', 'tab=license').then(resp => {
            if (resp.data.success) {
                // this.setState({ form: resp.data.data });
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
            if (resp.data.success) {
                toast.success(resp.data.data.msg);
                this.setState({ btn_txt: resp.data.data.value })
            } else {
                resp.data.data.forEach(function (value, index, array) {
                    toast.error(value);
                });
            }
        });
    }

    render() {
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
                            value={this.state.form.key}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <button className="pi-btn pi-bg-blue pi-bg-hover-blue">
                            {this.state.btn_txt}
                        </button>
                    </div>
                </div>
            </form>
        );
    }
} 