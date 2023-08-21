import React, { Component } from 'react';
import Upload from 'block/field/upload';
import { Add } from 'block/icon';

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
        const i18n = ndpv.i18n;
        return (
            <div className="pv-overlay pv-show">
                <div className="pv-modal-content">

                    <div className="pv-modal-header pv-gradient">
                        <span className="pv-close" onClick={() => this.props.close()}>
                            <Add />
                        </span>
                        <h2 className="pv-modal-title">{i18n.fdbk}</h2>
                        <p>Here is the client feedback</p>
                    </div>
                    <div className="pv-content">
                        <div className="pv-form-style-one">
                            <div className="row">
                                <div className="col-lg">
                                    <label htmlFor="form-note">
                                        {i18n.addi} {i18n.note}
                                    </label>
                                    {/* <textarea
                                        id="form-note"
                                        rows={2}
                                        name="note"
                                        value={data.feedback.note}
                                        onChange={this.handleChange}
                                    /> */}
                                    <p
                                        style={{ margin: 0 }}
                                        dangerouslySetInnerHTML={{ __html: data.feedback.note }}
                                    ></p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md">
                                    <label htmlFor="field-receipt">{i18n.addi} {i18n.atch}</label>
                                    <Upload attach_type='secret' viewOnly library={false} data={data.feedback.attachment} changeHandler={this.handleUploadChange} remove={false} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pv-modal-footer">
                    </div>
                </div>
            </div>
        );
    }
}

export default Feedback;
