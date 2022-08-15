import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Upload from 'block/field/upload';
import Api from 'api/email';

class Feedback extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                invoice_id: null,
                feedback_type: '',
                note: '',
                attachment: null,
            },
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    componentDidMount() {
        let form = { ...this.state.form }
        form.invoice_id = this.props.invoice_id;
        form.feedback_type = this.props.data.feedback_type;
        this.setState({ form });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let form = { ...this.state.form }
        form.type = 'feedback';
        Api.create(form)
            .then(resp => {
                if (resp.data.success) {
                    this.props.close();

                    if (form.feedback_type == 'accept') {
                        this.props.handleSubmit('accept');
                        toast.success('Thanks for accepting');
                    } else {
                        this.props.handleSubmit('decline');
                        toast.success('Sorry for declining');
                    }

                } else {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                }
            })
    }

    handleUploadChange = (data, type = null) => {
        let form = { ...this.state.form }
        form.attachment = data;
        this.setState({ form })
    }

    render() {
        return (
            <>
                {this.props.show && (
                    <div className="pi-overlay pi-show">
                        <div className="pi-modal-content">

                            <div className="pi-modal-header pi-gradient">
                                <span className="pi-close" onClick={() => this.props.close()}>
                                    <svg
                                        width={25}
                                        height={25}
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12.5 3.5L3.5 12.5"
                                            stroke="#718096"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M12.5 12.5L3.5 3.5"
                                            stroke="#718096"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                                <h2 className="pi-modal-title">{this.props.data.feedback_type == 'accept' ? 'Accept' : 'Decline'} Estimate</h2>
                                <p>{this.props.data.feedback_type == 'accept' ? 'Accept' : 'Decline'} Estimate from here</p>
                            </div>
                            <form onSubmit={this.handleSubmit} >
                                <div className="pi-content">
                                    <div className="pi-form-style-one">
                                        <div className="row">
                                            <div className="col-lg">
                                                <label
                                                    htmlFor="form-note">
                                                    Additional Note
                                                </label>
                                                <textarea
                                                    id="form-note"
                                                    rows={2}
                                                    name="note"
                                                    value={this.state.form.note}
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md">
                                                <label htmlFor="field-receipt">Additional Attachment</label>
                                                <Upload label={'Upload'} attach_type='secret' permission={true} library={false} data={this.state.form.attachment} changeHandler={this.handleUploadChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pi-modal-footer">
                                    <div className="row">
                                        <div className="col">
                                            {/* <button type='reset' className="pi-btn pi-text-hover-blue">{i18n.clear}</button> */}
                                        </div>
                                        <div className="col">
                                            <button type='submit' className="pi-btn pi-bg-blue pi-bg-hover-blue pi-btn-big pi-float-right pi-color-white">
                                                {this.props.data.feedback_type == 'accept' ? 'Accept' : 'Decline'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default Feedback; 