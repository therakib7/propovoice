import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Upload from 'block/field/upload';

class Feedback extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                // invoice_id: null,
                // date: '',
                // note: '',
                // attachment: null,
            },
        };
    }

    componentDidMount() {
        // this.setState({ note: this.props.data.note });
        /* if (this.state.form.invoice_id != this.props.data.id) { 
            this.setState({ form: this.props.data.payment_info });
        } */
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    handleUploadChange = (data, type = null) => {
        let form = { ...this.state.form }
        form.attachment = data;
        this.setState({ form })
    }

    render() {
        const data = this.props.data;
        const i18n = ndpi.i18n;
        return (
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
                        <h2 className="pi-modal-title">{i18n.feedback}</h2>
                        <p>Here is the client feedback</p>
                    </div>
                    <div className="pi-content">
                        <div className="pi-form-style-one">
                            <div className="row">
                                <div className="col-lg">
                                    <label htmlFor="form-note">
                                        Additional Note
                                    </label>
                                    <textarea
                                        id="form-note"
                                        rows={2}
                                        name="note"
                                        value={data.feedback.note}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md">
                                    <label htmlFor="field-receipt">Additional Attachment</label>
                                    <Upload label={'Upload'} attach_type='secret' library={false} data={data.feedback.attachment} changeHandler={this.handleUploadChange} remove={false} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pi-modal-footer">

                    </div>
                </div>
            </div>
        );
    }
}

export default Feedback;
