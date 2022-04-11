import React, { Component } from 'react';
import { toast } from 'react-toastify';

import Api from 'api/email';

class Send extends Component {
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
        Api.create(form)
            .then(resp => {
                if (resp.data.success) {
                    toast.success('Thanks for your message');
                    this.props.close();
                } else {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                }
            })
    }
    render() {
        const type = this.props.type;
        return (
            <>
                {this.props.show && (
                    <>
                        <div className="pi-overlay pi-show">
                            <div className="pi-popup-content">
                                <div className="pi-modal-header">
                                    <h2 className="pi-modal-title pi-text-center">{type == 'features' ? 'Features Request' : 'Facing Problem'} </h2>
                                    <span className="pi-close" onClick={() => this.props.close()}>×</span>
                                </div>

                                <div className="pi-content">
                                    <form onSubmit={this.handleSubmit} className="pi-form-style-one">

                                        <div className="row">
                                            <div className="col">
                                                <label
                                                    htmlFor="form-subject">
                                                    Subject
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
                                                    Details
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
                                                <button className="pi-btn pi-bg-blue pi-bg-hover-blue pi-m-auto">
                                                    Submit
                                                </button> 
                                            </div> 
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
                )
                }
            </>
        );
    }
}

export default Send;
