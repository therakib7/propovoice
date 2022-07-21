import React, { useCallback, useRef, useState, useEffect } from "react";

export default (props) => {
    const [list, setList] = useState([]);
    useEffect(() => {
        props.getAll('taxonomies', 'taxonomy=extra_amount').then(resp => {
            if (resp.data.success) {
                setList(resp.data.data['extra_amount']);
            }
        });
    }, []);

    const setAdditional = (data, type) => {
        props.handleChange(data, type);
    }

    const extra_field = props.data;
    return (
        <div className="pi-form-accordion pi-additional">
            {list.map((item, i) => (
                <div className="pi-tab" key={i}>
                    <input checked={false} onChange={() => setAdditional('tax', 'field')} type="checkbox" id="additional-tax" name="additional-tax" />
                    {/* <input checked={extra_field.hasOwnProperty('tax') ? 'checked' : ''} onChange={() => setAdditional('tax', 'field')} type="checkbox" id="additional-tax" name="additional-tax" /> */}
                    <label className={'' + ' pi-tab-label'} htmlFor="additional-tax">
                    {/* <label className={(extra_field.hasOwnProperty('tax') ? 'pi-active' : '') + ' pi-tab-label'} htmlFor="additional-tax"> */}
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
                                                <input onChange={() => setAdditional({ field: 'tax', type: 'percent' }, 'type')} defaultChecked={extra_field.hasOwnProperty('tax') && extra_field.tax == 'percent'} type="radio" name="tax" id="tax-percent" />
                                                <label htmlFor="tax-percent">Percentage</label>
                                            </div>
                                        </div>
                                        <div className='col pi-p-0'>
                                            <div className='pi-field-radio'>
                                                <input onChange={() => setAdditional({ field: 'tax', type: 'fixed' }, 'type')} defaultChecked={extra_field.hasOwnProperty('tax') && extra_field.tax == 'fixed'} type="radio" name="tax" id="tax-fixed" />
                                                <label htmlFor="tax-fixed">Fixed</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
} 