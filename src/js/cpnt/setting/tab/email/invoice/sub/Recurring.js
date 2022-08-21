import React, { Component } from 'react';
import pro from 'block/pro-alert';
import ProLabel from 'block/pro-alert/label';
import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
import Api from 'api/setting';

export default class Recurring extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                subject: '',
                msg: ''
            }
        };
    }

    static contextType = AppContext;

    componentDidMount() {
        Api.getAll('tab=email_invoice_recurring')
            .then(resp => {
                if (resp.data.success) {
                    this.setState({ form: resp.data.data });
                }
            });
    }

    handleChange = (e) => {
        let recurring = { ...this.state.form }
        const target = e.target;
        const name = target.name;
        const value = target.value
        recurring[name] = value;

        this.setState({ form: recurring })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (wage.length > 0) {
            pro();
            return;
        }

        let form = this.state.form;
        form.tab = 'email_invoice_recurring';

        Api.create(form)
            .then(resp => {
                if (resp.data.success) {
                    toast.success(this.context.CrudMsg.update);
                } else {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                }
            })
    }

    render() {
        const i18n = ndpi.i18n;
        return (
            <form onSubmit={this.handleSubmit} className="pi-form-style-one">

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
                            value={this.state.form.subject}
                            onChange={this.handleChange}
                        />
                        <p className='pi-field-desc'><b>{i18n.var}:</b> {'{id}'}, {'{org_name}'}, {'{client_name}'} </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="form-msg">{i18n.msg}</label>
                        <textarea
                            id="form-msg"
                            required
                            rows={9}
                            name="msg"
                            value={this.state.form.msg}
                            onChange={this.handleChange}
                        />
                        <p className='pi-field-desc'><b>{i18n.var}:</b> {'{id}'}, {'{client_name}'}, {'{date}'}, {'{due_date}'}, {'{amount}'}, {'{org_name}'}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <button className="pi-btn pi-bg-blue pi-bg-hover-blue">
                            {i18n.save} {wage.length > 0 && <ProLabel blueBtn />}
                        </button>
                    </div>
                </div>
            </form>
        );
    }
} 