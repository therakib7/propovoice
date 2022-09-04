import React, { Component } from 'react';

import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
import Select from 'block/field/select';

import pro from 'block/pro-alert';
import CurrencyField from 'block/field/currency'; 

export default class Currency extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            form: {
                currency: null,
                currency_pos: null, //0 = Hide, 1  = before, 2 = after
            },
            pos: [
                {
                    id: 0,
                    label: ndpv.i18n.hide,
                },
                {
                    id: 1,
                    label: ndpv.i18n.before,
                },
                {
                    id: 2,
                    label: ndpv.i18n.after,
                },
            ]
        };
    }

    static contextType = AppContext;

    componentDidMount() {
        this.props.getAll('settings', 'tab=estinv_currency').then(resp => {
            if (resp.data.success) {
                let newForm = resp.data.data;
                const pos_name = this.state.pos.find(x => x.id === newForm.currency_pos);
                newForm.currency_pos = pos_name
                this.setState({ form: newForm });
            }
        });
    } 

    currencyChange = val => {
        /* if ( wage.length > 0 ) {
            pro();
            return;
        } */ 
        this.setState({ form: { ...this.state.form, ['currency']: val } });
    } 

    onPosChange = val => {  
        this.setState({ form: { ...this.state.form, ['currency_pos']: val } });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let form = {...this.state.form};
        form.tab = 'estinv_currency';
        
        if ( form.currency_pos ) {
            form.currency_pos = form.currency_pos.id;
        } 

        this.props.create('settings', form).then(resp => {
            if (resp.data.success) {
                toast.success(this.context.CrudMsg.update);
            } else {
                resp.data.data.forEach(function (value, index, array) {
                    toast.error(value);
                });
            }
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

                        <CurrencyField key={currency} onChange={this.currencyChange} value={currency} /> 
                    </div>
                    <div className="col">

                    </div>
                </div>

                <div className="row">
                    <div className="col-md">
                        <label htmlFor="field-cur-pos">{i18n.cur} {i18n.country}</label> 
                        <Select
                            key={currency_pos}
                            search={false}
                            className={'pv-field-select'}
                            value={currency_pos}
                            onChange={this.onPosChange}
                            options={this.state.pos}
                        />
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