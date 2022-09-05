import { useEffect } from "react";

import Currency from 'block/field/currency';
import Lang from 'block/field/lang';

export default (props) => {

    useEffect(() => {
        if (!props.id) {
            props.getAll('settings', 'tab=estinv_currency').then(resp => {
                if (resp.data.success) {
                    props.handleDefault(resp.data.data);
                }
            });
        }
    }, []);

    const currencyChange = ( val ) => {
        props.onChange(val, 'currency');
    }

    const langChange = ( val ) => {
        props.onChange(val, 'lang');
    }

    // const reminder = props.data;
    const i18n = ndpv.i18n; 
    return (
        <div>
            <div className="pv-form-style-one">
                <div className="row">
                    <div className="col">
                        <label htmlFor="field-currency">
                            {i18n.cur}
                        </label>
                        <Currency key={props.currency} onChange={currencyChange} value={props.currency} />
                    </div> 
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="field-lang">{i18n.cur} {i18n.lang}</label>
                        <Lang key={props.lang} onChange={langChange} value={props.lang} />
                    </div> 
                </div>
            </div>
        </div>
    );
} 