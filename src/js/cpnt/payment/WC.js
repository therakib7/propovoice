import React, { Component } from 'react';

import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
import api from 'api';
import ProLabel from 'block/pro-alert/label';
import pro from 'block/pro-alert';

export default class WC extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                status: false
            }
        };
    }

    static contextType = AppContext;

    componentDidMount() {
        api.get('settings', 'tab=payment_wc')
            .then(resp => {
                if (resp.data.success) {
                    this.setState({ form: resp.data.data });
                }
            });
    }

    handleChange = (e, type) => {
        let reminder = { ...this.state.form }
        const target = e.target;
        const name = target.name;
        const value = (name === 'status') ? target.checked : target.value;
        if (type) {
            let arr = reminder[type];
            if (target.checked) {
                arr.push(parseInt(value));
            } else {
                arr.splice(arr.indexOf(parseInt(value)), 1);
            }
        } else {
            reminder[name] = value;
        }

        if (wage.length > 0 && (name == 'status')) {
            pro();
            return;
        }

        this.setState({ form: reminder })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (ndpv.isDemo) { toast.error(ndpv.demoMsg); return; }

        let form = this.state.form;
        form.tab = 'payment_wc';

        api.add('settings', form).then(resp => {
            if (resp.data.success) {
                toast.success(ndpv.i18n.aUpd);
            } else {
                resp.data.data.forEach(function (value) {
                    toast.error(value);
                });
            }
        })
    }

    render() {
        const form = this.state.form;
        const i18n = ndpv.i18n;
        return (
            <form onSubmit={this.handleSubmit} className="pv-form-style-one">

                <div className="row">
                    <div className="col">
                        <label>
                            {i18n.status}
                            <ProLabel />
                        </label>
                        <div className="pv-field-switch pv-ml-10">
                            <label className='pv-switch'>
                                <input type='checkbox'
                                    id="reminder-status"
                                    name='status'
                                    checked={form.status ? 'checked' : ''}
                                    onChange={this.handleChange}
                                />
                                <span className='pv-switch-slider pv-round'></span>
                            </label>
                        </div>
                        <p className='pv-field-desc'><b>{i18n.note}:</b> When you active WooCommerce, other Propovoice payment method will be disabled.</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <button className="pv-btn pv-bg-blue pv-bg-hover-blue" style={{ margin: '0' }}>
                            {i18n.save}
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}
