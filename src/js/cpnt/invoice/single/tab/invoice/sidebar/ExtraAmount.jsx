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
                /* let tax_fields = [];
                let fee_fields = [];
                let discount_fields = [];
                let addi_amount = [];
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
                    addi_amount = [...tax_fields, ...fee_fields, ...discount_fields]
                    setList(addi_amount);
                } */

                setList(extra_amount);
            }
        });
    }, []);

    const setAddi = (i, data, type, type_val = null) => {
        props.handleChange(i, data, type, type_val);
    }

    const itemTaxChange = (e) => {

        if (wage.length > 0) {
            pro();
            return;
        }

        props.itemTaxChange(e);
    }

    const extra_field = props.data;
    const i18n = ndpv.i18n;
    const extraField = ['discount', 'fee', 'tax'];
    return (
        extraField.map((val, i) => {
            return (
                (!props.sidebar || props.sidebar == val) && <li key={i}>
                    <input type="checkbox" defaultChecked="checked" onClick={() => props.setSidebar(val)} />
                    <i />
                    <h3 className='pv-title-small'>{i18n[val]}</h3>
                    <div className="pv-form-accordion pv-additional">
                        {val == 'tax' && <div className="pv-form-style-one">
                            <div className="row">
                                <div className="col" style={{ marginBottom: '0' }}>
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
                        </div>}

                        {list.map((item, i) => {

                            if (item.extra_amount_type != val) return;

                            let hasItem = extra_field.find(x => x.id == item.id);
                            let pct_val_type = false;
                            let fixed_val_type = false;

                            let tax_cal = '';
                            let fee_cal = '';

                            if (hasItem) {
                                if (hasItem.val_type === 'percent') {
                                    pct_val_type = true;
                                } else {
                                    fixed_val_type = true;
                                }

                                tax_cal = item.hasOwnProperty('tax_cal') ? hasItem.tax_cal : '';
                                fee_cal = item.hasOwnProperty('fee_cal') ? hasItem.fee_cal : '';

                            } else {
                                if (item.val_type === 'percent') {
                                    pct_val_type = true;
                                } else {
                                    fixed_val_type = true;
                                }

                                tax_cal = item.hasOwnProperty('tax_cal') ? item.tax_cal : '';
                                fee_cal = item.hasOwnProperty('fee_cal') ? item.fee_cal : '';
                            }

                            let tax_field = true;
                            if ((item.extra_amount_type == 'tax' || item.type == 'tax') && !props.item_tax) {
                                tax_field = false
                            }
                            return (
                                <div className="pv-tab" key={i}>
                                    <input checked={hasItem ? true : false} onChange={() => setAddi(i, item, 'field')} type="checkbox" id={'addi-field-' + i} name="addi-field" />
                                    <label className={(hasItem ? 'pv-active' : '') + ' pv-tab-label'} htmlFor={'addi-field-' + i}>
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
                                                                <input onChange={() => setAddi(i, item, 'type', 'percent')}
                                                                    checked={pct_val_type ? 'checked' : ''}
                                                                    type="radio" name={"val-type-" + i} id={"val-type-percent-" + i} value='percent' />
                                                                <label htmlFor={"val-type-percent-" + i}>{i18n.pct}</label>
                                                            </div>
                                                        </div>
                                                        <div className='col pv-p-0'>
                                                            <div className='pv-field-radio'>
                                                                <input onChange={() => setAddi(i, item, 'type', 'fixed')}
                                                                    checked={fixed_val_type ? 'checked' : ''}
                                                                    type="radio" name={"val-type-" + i} id={"val-type-fixed-" + i} value='fixed' />
                                                                <label htmlFor={"val-type-fixed-" + i}>{i18n.fix}</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {pct_val_type && tax_field && <>
                                                        <h4>{i18n.tax} {i18n.cal}:</h4>
                                                        <div className='row'>
                                                            <div className="col">
                                                                <select style={{ padding: 10 }} name="tax_cal" value={tax_cal} onChange={(e) => setAddi(i, item, 'cal', e)}>
                                                                    <option value="">{i18n.with} {item.extra_amount_type == 'tax' ? i18n.item : ''} {i18n.tax}</option>
                                                                    <option value="1">{i18n.witho} {item.extra_amount_type == 'tax' ? i18n.item : ''} {i18n.tax}</option>
                                                                </select>
                                                            </div>
                                                        </div></>}

                                                    {pct_val_type && (item.extra_amount_type == 'discount' || item.type == 'discount') && <>
                                                        <h4 className="pv-mt-10">{i18n.fee} {i18n.cal}:</h4>
                                                        <div className='row'>
                                                            <div className="col">
                                                                <select style={{ padding: 10 }} name="fee_cal" value={fee_cal} onChange={(e) => setAddi(i, item, 'cal', e)}>
                                                                    <option value="">{i18n.with} {i18n.fee}</option>
                                                                    <option value="1">{i18n.witho} {i18n.fee}</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </>}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </li>
            )
        })
    );
} 