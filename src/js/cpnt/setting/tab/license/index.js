import React, { Component } from 'react';

import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
import Moment from 'react-moment';
import Spinner from 'block/preloader/spinner';

export default class License extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                key: '',
                type: 'activate_license',
                status: '',
            },
            loading: false,
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
        this.setState({ loading: true });
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
                this.setState({ form });

                setTimeout(function () {
                    window.location.reload(1);
                }, 1000);
            } else {
                data.forEach(function (value, index, array) {
                    toast.error(value);
                });
            }
            this.setState({ loading: false });
        });
    }

    render() {
        const form = this.state.form;
        const i18n = ndpi.i18n;
        return (
            <>
                {this.state.loading ? <Spinner /> : <form onSubmit={this.handleSubmit} className="pi-form-style-one">

                    <div className="row">
                        <div className="col">
                            <label htmlFor="form-key">
                            {i18n.license} {i18n.key}
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
                                {i18n.license} {i18n.status}:
                                    <span className="pi-pro-label pi-bg-green pi-color-white">{i18n.valid}</span>
                                </label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="form-status">
                                {i18n.license} For: <span style={{ color: '#2D3748' }}>
                                        {form.for == '1' || form.for == '3' ? 'Freelancer' : 'Agency'}
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="form-status">
                                {i18n.license} {i18n.exp}: <span style={{ color: '#2D3748' }}>
                                        {form.expires == 'lifetime' ? 'Lifetime' : <Moment format="YYYY-MM-DD">{form.expires}</Moment>}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </>}

                    <div className="row">
                        <div className="col">
                            <button className="pi-btn pi-bg-blue pi-bg-hover-blue">
                                {form.type == 'activate_license' ? i18n.activate + ' '+i18n.license : i18n.dactivate + ' '+i18n.license}
                            </button>
                        </div>
                    </div>
                </form>}
            </>
        );
    }
} 