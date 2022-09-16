import React, { Component } from 'react';
import { toast } from 'react-toastify';
import api from 'api';

export default class Send extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                name: '',
                email: '',
                subject: '',
                details: ''
            },
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.sendEmail();
    }

    sendEmail = () => {
        let form = { ...this.state.form }
        form.type = 'dashboard';
        form.feedback_type = this.props.type;

        api.add('emails', form).then(resp => {
            if (resp.data.success) {
                toast.success('Thanks for your message');
                this.props.close();
            } else {
                resp.data.data.forEach(function (value, index, array) {
                    toast.error(value);
                });
            }
        });
    }
    render() {
        const type = this.props.type;
        const i18n = ndpv.i18n;
        return (
            <div className="pv-overlay pv-show">
                <div className="pv-modal-content">
                    <div className="pv-modal-header">
                        <h2 className="pv-modal-title pv-text-center">{type == 'features' ? 'Features Request' : 'Facing Problem'} </h2>
                        <span className="pv-close" onClick={() => this.props.close()}>×</span>
                    </div>

                    <div className="pv-content">
                        <form onSubmit={this.handleSubmit} className="pv-form-style-one">

                            <div className="row">
                                <div className="col">
                                    <label
                                        htmlFor="form-subject">
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
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label
                                        htmlFor="form-details">
                                        {i18n.d}
                                    </label>

                                    <textarea
                                        id="form-details"
                                        required
                                        name="details"
                                        value={this.state.form.details}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <button className="pv-btn pv-bg-blue pv-bg-hover-blue pv-m-auto">
                                        {i18n.submit}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
    