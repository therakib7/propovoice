import React, { Component } from 'react'; 
import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
// import api from "api";
import CurrencyField from 'block/field/currency'; 
import Lang from 'block/field/lang'; 
import ProLabel from 'block/pro-alert/label';
import pro from 'block/pro-alert';

export default class Currency extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            form: {
                currency: null,
                lang: null, 
            } 
        };
    }

    static contextType = AppContext;

    componentDidMount() { 
        this.props.getAll('settings', 'tab=estinv_currency').then(resp => {
            if (resp.data.success) {
                let newForm = resp.data.data;  
                this.setState({ form: newForm });
            }
        });
    } 

    currencyChange = val => {
        
        this.setState({ form: { ...this.state.form, ['currency']: val } });
    } 

    langChange = val => {   
        this.setState({ form: { ...this.state.form, ['lang']: val } });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if ( wage.length > 0 ) {
            pro();
            return;
        }

        let form = {...this.state.form};
        form.tab = 'estinv_currency';
        
        if ( form.lang.hasOwnProperty('id') ) {
            form.lang = form.lang.id;
        } 

        this.props.create('settings', form).then(resp => {
            if (resp.data.success) {
                toast.success(ndpv.i18n.aUpd);
            } else {
                resp.data.data.forEach(function (value, index, array) {
                    toast.error(value);
                });
            }
        });
    }

    render() {
        const { currency, lang } = this.state.form; 
        const i18n = ndpv.i18n;
        return ( 
            <form onSubmit={this.handleSubmit} className="pv-form-style-one">
                <div className="row">
                    <div className="col">
                        <label htmlFor="field-currency">{i18n.cur} <ProLabel /></label>  
                        <CurrencyField key={currency} onChange={this.currencyChange} value={currency} /> 
                    </div>
                    <div className="col"></div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="field-lang">{i18n.cur} {i18n.lang} <ProLabel /></label>  
                        <Lang key={lang} onChange={this.langChange} value={lang} /> 
                    </div>
                    <div className="col"></div>
                </div>

                <div className="row">
                    <div className="col">
                        <button className="pv-btn pv-bg-blue pv-bg-hover-blue">
                            {i18n.save} <ProLabel blueBtn />
                        </button>
                    </div>
                </div>
            </form>
        );
    }
} 