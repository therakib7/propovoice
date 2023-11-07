import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Api from 'api/payment-process';
import Upload from 'block/field/upload';
import { Add } from 'block/icon';

const { i18n, caps } = ndpv;
const isClient = caps.includes("ndpv_client_role");

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
        const i18n = ndpv.i18n;
        let form = { ...this.state.form }
        form.payment_method = 'bank';
        form.invoice_id = this.props.data.id;
        form.mark_as_paid = true;
        Api.create(form)
            .then(resp => {
                if (resp.data.success) {
                    this.props.close();
                    this.props.reload();
                    toast.success(i18n.scf + ' ' + i18n.paid);
                } else {
                    resp.data.data.forEach(function (value) {
                        toast.error(value);
                    });
                }
            })
    }

    render() {
        const data = this.props.data;
        const i18n = ndpv.i18n;
        const receipt = this.state.form.receipt
        return (
            <div className="pv-overlay pv-show">
                <div className="pv-modal-content">

                    <div className="pv-modal-header pv-gradient">
                        <span className="pv-close" onClick={() => this.props.close()}>
                            <Add />
                        </span>
                        <h2 className="pv-modal-title">{i18n.payment} {i18n.info}</h2>
                        <p>Here is the payment information</p>
                    </div>
                    <form onSubmit={this.handleSubmit} >
                        <div className="pv-content">
                            <div className="pv-form-style-one">
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
                                        <Upload label={'Upload'} attach_type='secret' permission={true} library={false} data={receipt} changeHandler={this.handleUploadChange} />
                                    </div>
                                </div>

                                {!isClient && <div className="row">
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
                                </div>}
                            </div>
                        </div>

                        <div className="pv-modal-footer">
                            <div className="row">
                                <div className="col">
                                    <button type='reset' className="pv-btn pv-text-hover-blue" onClick={() => this.props.close()}>{i18n.cancel}</button>
                                </div>
                                <div className="col">
                                    {!isClient && <button type='submit' className="pv-btn pv-bg-blue pv-bg-hover-blue pv-btn-big pv-float-right pv-color-white">
                                        {i18n.mark_as_paid}
                                    </button>}
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
