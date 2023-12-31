import React, { Component } from 'react';
import { toast } from 'react-toastify';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import moment from 'moment';
import ProLabel from 'block/pro-alert/label';
import pro from 'block/pro-alert';
import { Add } from 'block/icon';
import Preloader from "block/preloader/spinner";

import api from 'api';
export default class Send extends Component {
    constructor(props) {
        super(props);

        this.state = {
            submitPreloader: false,
            form: {
                invoice_id: null,
                path: '',
                fromData: {
                    id: '',
                    email: ''
                },
                toData: {
                    id: '',
                    name: '',
                    email: ''
                },
                subject: '',
                msg: '',
                invoice_img: null,
            },
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    convertDate = dateStr => {
        return moment(dateStr).format(ndpv.date_format);
    }

    //try to call it from invoice to avoid duplication code
    calcItemsTotal = () => {
        return this.props.data.invoice.items.reduce((prev, cur) => (prev + (cur.qty * cur.price)), 0)
    }

    calcGrandTotal = () => {
        let item_total = this.calcItemsTotal();
        let total = item_total;
        let extra_field = this.props.data.invoice.extra_field;
        extra_field.map((item, i) => {
            if (item.val_type == 'percent') {
                if (item.type == 'tax' || item.type == 'fee') {
                    total += item_total * (item.val / 100);
                } else {
                    total -= item_total * (item.val / 100);
                }
            } else {
                if (item.type == 'tax' || item.type == 'fee') {
                    total += parseFloat(item.val);
                } else {
                    total -= parseFloat(item.val);
                }
            }
        });
        return total;
    }
    //end try to call it from invoice to avoid duplication code

    componentDidMount() {
        let data = this.props.data;

        if (data.fromData == null || data.toData == null) {
            toast.error('First fill up necessary information, From content tab');
            return;
        }

        let path = this.props.path;

        let path_title = path == 'invoice' ? ndpv.i18n.inv : ndpv.i18n.est;
        let formState = { ...this.state.form }

        let id = data.invoice.id;
        let currency = data.invoice.currency;
        let date = this.convertDate(data.invoice.date);
        let due_date = this.convertDate(data.invoice.due_date);
        let amount = this.calcGrandTotal();

        let org_name = data.fromData.name;
        let client_name = (data.toData.type == 'person') ? data.toData.first_name : data.toData.org_name;

        formState.invoice_id = id;
        formState.title = path_title;
        formState.path = path == 'invoice' ? 'invoice' : 'estimate';
        formState.fromData = {
            id: data.fromData.id,
            name: org_name,
            email: data.fromData.email,
        };

        formState.toData = {
            id: data.toData.id,
            name: client_name,
            email: data.toData.email,
        };

        let mail = this.props.mail;

        let subject = mail.subject.replaceAll('{id}', id)
            .replaceAll('{client_name}', client_name)
            .replaceAll('{org_name}', org_name);

        let msg = mail.msg.replaceAll('{id}', id)
            .replaceAll('{org_name}', org_name)
            .replaceAll('{client_name}', client_name)
            .replaceAll('{date}', date)
            .replaceAll('{due_date}', due_date)
            .replaceAll('{amount}', amount + ' ' + currency);

        formState.subject = subject;
        formState.msg = msg;

        this.setState({ form: formState });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        // TODO: send with attachment pdf
        if (false) {
            /* html2canvas(document.querySelector(".pv-inv")).then(canvas => { 
                const imgData = canvas.toDataURL('image/jpg'); 
                
                let formState = {...this.state.form} 
                formState.invoice_img = imgData;

                this.setState({ form: formState }, () => {
                    this.sendEmail();
                });
            }); */
        } else {
            this.sendEmail();
        }
    }

    sendEmail = () => {
        let form = { ...this.state.form }
        form.type = 'sent';

        this.setState({ submitPreloader: true });

        api.add('emails', form).then(resp => {
            this.setState({ submitPreloader: false });
            if (resp.data.success) {
                toast.success(ndpv.i18n.aMail);
                this.props.close();
            } else {
                resp.data.data.forEach(function (value) {
                    toast.error(value);
                });
            }
        });
    }

    render() {

        let path = this.props.path;
        let path_title = path == 'invoice' ? ndpv.i18n.inv : ndpv.i18n.est;
        const i18n = ndpv.i18n;
        const { submitPreloader, form } = this.state;
        return (
            <div className="pv-overlay pv-show">
                <div className="pv-modal-content">

                    <div className="pv-modal-header pv-gradient">
                        <span className="pv-close" onClick={() => this.props.close()}>
                            <Add />
                        </span>
                        <h2 className="pv-modal-title">{i18n.email} {path_title}</h2>
                        <p>{i18n.email} {path} {i18n.here}</p>
                    </div>
                    <form onSubmit={this.handleSubmit} >
                        <div className="pv-content">
                            <div className="pv-form-style-one">
                                <div className="row">
                                    <div className="col-lg">
                                        <label htmlFor="form-name">
                                            {i18n.client} {i18n.name}
                                        </label>

                                        <input
                                            id="form-name"
                                            type="text"
                                            required
                                            readOnly
                                            name="name"
                                            value={form.toData.name}
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="col-lg">
                                        <label htmlFor="form-email">
                                            {i18n.email}
                                        </label>

                                        <input
                                            id="form-email"
                                            type="text"
                                            required
                                            readOnly
                                            name="email"
                                            value={form.toData.email}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="form-subject">
                                            {i18n.sub}
                                        </label>

                                        <input
                                            id="form-subject"
                                            type="text"
                                            required
                                            name="subject"
                                            value={form.subject}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="form-msg">
                                            {i18n.msg}
                                        </label>
                                        <textarea
                                            id="form-msg"
                                            rows={8}
                                            name="msg"
                                            value={form.msg}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pv-modal-footer">
                            <div className="row">
                                <div className="col">
                                    <button type='reset' className="pv-btn pv-text-hover-blue" onClick={() => this.props.close()}>{i18n.cancel}</button>
                                </div>
                                <div className="col">
                                    <button type='submit' disabled={submitPreloader} className="pv-btn pv-bg-blue pv-bg-hover-blue pv-btn-big pv-float-right pv-color-white">
                                        {submitPreloader && <Preloader submit />} {i18n.send_email}
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
