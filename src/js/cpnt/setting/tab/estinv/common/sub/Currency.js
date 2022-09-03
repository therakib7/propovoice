import React, { Component } from 'react';

import { toast } from 'react-toastify';
import AppContext from 'context/app-context';

import pro from 'block/pro-alert';
import CurrencyField from 'block/field/currency';

export default class Currency extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                currency: 'USD',
                currency_pos: 1, //0 = Hide, 1  = before, 2 = after
            }

        };
    }

    static contextType = AppContext;

    componentDidMount() {
        this.props.getAll('settings', 'tab=estinv_currency').then(resp => {
            if (resp.data.success) {
                this.setState({ form: resp.data.data });
            }
        });
    }

    curencyChange = val => {
        /* if ( wage.length > 0 ) {
            pro();
            return;
        } */

        this.setState({ form: { ...this.state.form, ['currency']: val } });
    }

    handleChange = (e) => {
        let form = { ...this.state.form }
        const target = e.target;
        const name = target.name;
        const value = target.type == 'checkbox' ? target.checked : target.value;
        form[name] = value; 
        this.setState({ form });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let form = this.state.form;
        form.tab = 'estinv_currency';

        this.props.create('settings', form).then(resp => {
            /* if (resp.data.success) {
                toast.success(this.context.CrudMsg.update);
            } else {
                resp.data.data.forEach(function (value, index, array) {
                    toast.error(value);
                });
            } */
        });
    }


    render() {
        const { currency, currency_pos } = this.state.form;
        const currencies = this.state.currencies;
        const i18n = ndpv.i18n;
        return (

            <form onSubmit={this.handleSubmit} className="pv-form-style-one">
                <div className="row">
                    <div className="col">
                        <label htmlFor="field-currency_id">
                            {i18n.cur}
                        </label>

                        <CurrencyField onChange={this.curencyChange} val={currency} />
                    </div>
                    <div className="col">

                    </div>
                </div>

                <div className="row">
                    <div className="col-md">
                        <label htmlFor="field-cur-pos">{i18n.cur} {i18n.pos}</label>
                        <select name="item_tax_val_type" value={currency_pos} onChange={this.handleChange}>
                            <option value={0}>{i18n.hide}</option>
                            <option value={1}>{i18n.before}</option>
                            <option value={2}>{i18n.after}</option>
                        </select>
                    </div>
                    <div className="col-md"></div>
                </div>

                <div className="row">
                    <div className="col">
                        <button className="pv-btn pv-bg-blue pv-bg-hover-blue">
                            {i18n.save}
                        </button>
                    </div>
                </div>
            </form>
        );
    }
} 