import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Api from 'api/payment-process';
import Upload from 'block/field/upload';

class Bank extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                invoice_id: null,
                payment_details: '',
                receipt: '',
                // amount: '',
                note: '',
                date: '',
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

    handleSubmit = (e) => {
        e.preventDefault();

        let form = { ...this.state.form }
        form.payment_method = 'bank';
        form.invoice_id = this.props.data.id;
        form.mark_as_paid = true;
        Api.create(form)
            .then(resp => {
                if (resp.data.success) {
                    this.props.close();
                    this.props.reload();
                    toast.success('Successfully Paid');
                } else {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                }
            })
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
                        <h2 className="pi-modal-title">{i18n.payment} {i18n.info}</h2>
                        <p>Here is the payment information</p>
                    </div>
                    <form onSubmit={this.handleSubmit} >
                        <div className="pi-content">
                            <div className="pi-form-style-one">
                                <div className="row">
                                    <div className="col-lg">
                                        <label htmlFor="form-payment_details">
                                            {i18n.payment} {i18n.dtl}
                                        </label>
                                        <textarea
                                            id="form-payment_details"
                                            readOnly
                                            rows={4}
                                            name="payment_details"
                                            value={this.state.form.payment_details}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="field-receipt">{i18n.payment} Receipt</label>
                                        <Upload label={'Upload'} attach_type='secret' permission={true} library={false} data={this.state.form.receipt} changeHandler={this.handleUploadChange} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg">
                                        <label htmlFor="form-note">
                                        {i18n.addi} {i18n.note}
                                        </label>
                                        <textarea
                                            id="form-note"
                                            rows={3}
                                            name="note"
                                            value={this.state.form.note}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pi-modal-footer">
                            <div className="row">
                                <div className="col">
                                    <button type='reset' className="pi-btn pi-text-hover-blue">{i18n.clear}</button>
                                </div>
                                <div className="col">
                                    <button type='submit' className="pi-btn pi-bg-blue pi-bg-hover-blue pi-btn-big pi-float-right pi-color-white">
                                    {i18n.mark} {i18n.as} {i18n.paid}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Bank;
