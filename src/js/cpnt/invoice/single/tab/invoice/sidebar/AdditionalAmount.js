import { useState, useEffect } from "react";
import pro from 'block/pro-alert'; 
import ProLabel from 'block/pro-alert/label';

export default (props) => {
    const [list, setList] = useState([]);
    useEffect(() => {

        props.getAll('settings', 'tab=estvoice_tax').then(resp => {
            if (resp.data.success) {
                // console.log(resp.data.data);
                // props.handleDefault(resp.data.data);
            }
        });

        props.getAll('taxonomies', 'taxonomy=extra_amount').then(resp => {
            if (resp.data.success) {
                let extra_amount = resp.data.data['extra_amount'];
                let tax_fields = [];
                let fee_fields = [];
                let discount_fields = [];
                let additional_amount = [];
                if (extra_amount) {
                    extra_amount.map((item, i) => {
                        if (item.extra_amount_type == 'tax') {
                            tax_fields.push(item);
                        } else if (item.extra_amount_type == 'fee') {
                            fee_fields.push(item);
                        } else {
                            discount_fields.push(item);
                        }
                    });
                    additional_amount = [...tax_fields, ...fee_fields, ...discount_fields]
                    setList(additional_amount);
                }
            }
        });
    }, []);

    const setAdditional = (i, data, type, type_val = null) => {
        props.handleChange(i, data, type, type_val);
    }

    const itemTaxChange = (e) => {

        if ( wage.length > 0 ) {
            pro();
            return;
        }

        props.itemTaxChange(e);
    }

    const extra_field = props.data;
    const i18n = ndpv.i18n;
    return (
        <>
            <div className="pv-form-accordion pv-additional">
                <div className="pv-form-style-one">
                    <div className="row">
                        <div className="col" style={{ marginBottom: '10px' }}>
                            <label id="form-item_tax">
                                {i18n.eachitem} {i18n.tax} {i18n.field}
                                {wage.length > 0 && <>
                                    <ProLabel />
                                </>}
                            </label>
                            <div className="pv-field-switch pv-ml-10">
                                <label className='pv-switch'>
                                    <input type='checkbox'
                                        id="form-item_tax"
                                        name='item_tax'
                                        checked={props.item_tax ? 'checked' : ''}
                                        onChange={itemTaxChange}
                                    />
                                    <span className='pv-switch-slider pv-round'></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {list.map((item, i) => {
                    let hasItem = extra_field.find(x => x.id == item.id);
                    let percent_val_type = false;
                    let fixed_val_type = false;

                    if (hasItem) {
                        if (hasItem.val_type === 'percent') {
                            percent_val_type = true;
                        } else {
                            fixed_val_type = true;
                        }
                    } else {
                        if (item.val_type === 'percent') {
                            percent_val_type = true;
                        } else {
                            fixed_val_type = true;
                        }
                    }

                    return (
                        <div className="pv-tab" key={i}>
                            <input checked={hasItem ? true : false} onChange={() => setAdditional(i, item, 'field')} type="checkbox" id={'additional-field-' + i} name="additional-field" />
                            <label className={(hasItem ? 'pv-active' : '') + ' pv-tab-label'} htmlFor={'additional-field-' + i}>
                                {item.label}
                            </label>
                            <div className="pv-tab-content">
                                <div className="pv-form-style-one">
                                    <div className="pv-radio-content">
                                        <div className="pv-radio-group">
                                            <h4>{item.label} {i18n.type}:</h4>
                                            <div className='row'>
                                                <div className='col'>
                                                    <div className='pv-field-radio'>
                                                        <input onChange={() => setAdditional(i, item, 'type', 'percent')} defaultChecked={percent_val_type} type="radio" name={"val-type-" + i} id={"val-type-percent-" + i} value='percent' />
                                                        <label htmlFor={"val-type-percent-" + i}>{i18n.pct}</label>
                                                    </div>
                                                </div>
                                                <div className='col pv-p-0'>
                                                    <div className='pv-field-radio'>
                                                        <input onChange={() => setAdditional(i, item, 'type', 'fixed')} defaultChecked={fixed_val_type} type="radio" name={"val-type-" + i} id={"val-type-fixed-" + i} value='fixed' />
                                                        <label htmlFor={"val-type-fixed-" + i}>{i18n.fix}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    );
} 