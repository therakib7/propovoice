import React, { useCallback, useRef, useState, useEffect } from "react";

export default (props) => {
    const [list, setList] = useState([]);
    useEffect(() => {
        props.getAll('taxonomies', 'taxonomy=extra_amount').then(resp => {
            if ( resp.data.success ) {
                let extra_amount = resp.data.data['extra_amount'];
                let tax_fields = [];
                let discount_fields = [];
                let additional_amount = [];
                if ( extra_amount ) { 
                    extra_amount.map( ( item, i ) => {
                        if ( item.extra_amount_type == 'tax' ) {
                            tax_fields.push(item);
                        } else {
                            discount_fields.push(item);
                        }
                    });
                    additional_amount = [...tax_fields, ...discount_fields]
                    setList(additional_amount);
                }
            }
        });
    }, []);

    const setAdditional = (data, type, type_val = null) => { 
        props.handleChange(data, type, type_val);
    }

    const extra_field = props.data;
    return (
        <div className="pi-form-accordion pi-additional">
            {list.map((item, i) => {
                let hasItem = extra_field.find(x => x.id == item.id ); 
                let percent_val_type = false;
                let fixed_val_type = false;  
                if ( item.val_type === 'fixed' ) {
                    fixed_val_type = true;
                } else {
                    percent_val_type = true;
                }
                if ( hasItem ) {

                }
                return (
                    <div className="pi-tab" key={i}>
                    <input checked={ hasItem ? true : false } onChange={() => setAdditional(item, 'field')} type="checkbox" id={'additional-field-' + i} name="additional-tax" /> 
                    <label className={( hasItem ? 'pi-active' : '') + ' pi-tab-label'} htmlFor={'additional-field-' + i}> 
                        {item.label}
                    </label>
                    <div className="pi-tab-content">
                        <div className="pi-form-style-one">
                            <div className="pi-radio-content">
                                <div className="pi-radio-group">
                                    <h4>{item.label} type:</h4>
                                    <div className='row'>
                                        <div className='col'>
                                            <div className='pi-field-radio'> 
                                                <input onChange={() => setAdditional(item, 'type', 'percent' )} defaultChecked={percent_val_type} type="radio" name={"val-type-" + i} id={"val-type-percent-" + i} value='percent' />
                                                <label htmlFor={"val-type-percent-" + i}>Percent</label>
                                            </div>
                                        </div>
                                        <div className='col pi-p-0'>
                                            <div className='pi-field-radio'>
                                                <input onChange={() => setAdditional(item, 'type', 'fixed')} defaultChecked={fixed_val_type} type="radio" name={"val-type-" + i} id={"val-type-fixed-" + i} value='fixed' />
                                                <label htmlFor={"val-type-fixed-" + i}>Fixed</label>
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
    );
} 