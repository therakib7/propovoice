import React, { Component } from 'react';
import { toast } from 'react-toastify'; 

class Feedback extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                invoice_id: null,
                date: '',
                note: '',
            },
        };
    }

    componentDidMount() {
        // this.setState({ note: this.props.data.note });
        if (this.state.form.invoice_id != this.props.data.id) {
            this.setState({ form: this.props.data.payment_info });
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    render() {
        const data = this.props.data;
        return (
            <>
                {this.props.show && (
                    <div className="pi-overlay pi-show">
                        <div className="pi-popup-content">
                            <div className="pi-modal-header">
                                <h2 className="pi-modal-title pi-text-center">Feedback</h2>
                                <span className="pi-close" onClick={() => this.props.close()}>×</span>
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
                                                rows={5}
                                                name="note"
                                                value={data.feedback.note}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default Feedback;
