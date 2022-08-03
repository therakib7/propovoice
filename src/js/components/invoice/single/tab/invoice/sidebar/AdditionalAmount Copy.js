export default (props) => {  
    const setAdditional = (data, type) => {
        props.handleChange(data, type);
    }

    const extra_field = props.data;
    return (
        <div className="pi-form-accordion pi-additional">
            <div className="pi-tab">
                <input checked={extra_field.hasOwnProperty('tax') ? 'checked' : ''} onChange={() => setAdditional('tax', 'field')} type="checkbox" id="additional-tax" name="additional-tax" />
                <label className={ ( extra_field.hasOwnProperty('tax') ? 'pi-active' : '' ) + ' pi-tab-label'} htmlFor="additional-tax">
                    Tax
                </label>
                <div className="pi-tab-content">
                    <div className="pi-form-style-one">
                        <div className="pi-radio-content">
                            <div className="pi-radio-group">
                                <h4>Tax type:</h4>
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

            <div className="pi-tab">
                <input checked={extra_field.hasOwnProperty('discount') ? 'checked' : ''} onChange={() => setAdditional('discount', 'field')} type="checkbox" id="additional-discount" name="additional-discount" />
                <label className={ ( extra_field.hasOwnProperty('discount') ? 'pi-active' : '' ) + ' pi-tab-label'} htmlFor="additional-discount">
                    Discount
                </label>
                <div className="pi-tab-content">
                    <div className="pi-form-style-one">
                        <div className="pi-radio-content">
                            <div className="pi-radio-group">
                                <h4>Discount type:</h4>
                                <div className='row'>
                                    <div className='col'>
                                        <div className='pi-field-radio'>
                                            <input onChange={() => setAdditional({ field: 'discount', type: 'percent' }, 'type')} defaultChecked={extra_field.hasOwnProperty('discount') && extra_field.discount == 'percent'} type="radio" name="discount" id="discount-percent" />
                                            <label htmlFor="discount-percent">Percentage</label>
                                        </div>
                                    </div>
                                    <div className='col pi-p-0'>
                                        <div className='pi-field-radio'>
                                            <input onChange={() => setAdditional({ field: 'discount', type: 'fixed' }, 'type')} defaultChecked={extra_field.hasOwnProperty('discount') && extra_field.discount == 'fixed'} type="radio" name="discount" id="discount-fixed" />
                                            <label htmlFor="discount-fixed">Fixed</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pi-tab">
                <input checked={extra_field.hasOwnProperty('late_fee') ? 'checked' : ''} onChange={() => setAdditional('late_fee', 'field')} type="checkbox" id="additional-late_fee" name="additional-late_fee" />
                <label className={ ( extra_field.hasOwnProperty('late_fee') ? 'pi-active' : '' ) + ' pi-tab-label'} htmlFor="additional-late_fee">
                    Late Fee
                </label>
                <div className="pi-tab-content">
                    <div className="pi-form-style-one">
                        <div className="pi-radio-content">
                            <div className="pi-radio-group">
                                <h4>Late Fee type:</h4>
                                <div className='row'>
                                    <div className='col'>
                                        <div className='pi-field-radio'>
                                            <input onChange={() => setAdditional({ field: 'late_fee', type: 'percent' }, 'type')} defaultChecked={extra_field.hasOwnProperty('late_fee') && extra_field.late_fee == 'percent'} type="radio" name="late_fee" id="late_fee-percent" />
                                            <label htmlFor="late_fee-percent">Percentage</label>
                                        </div>
                                    </div>
                                    <div className='col pi-p-0'>
                                        <div className='pi-field-radio'>
                                            <input onChange={() => setAdditional({ field: 'late_fee', type: 'fixed' }, 'type')} defaultChecked={(extra_field.hasOwnProperty('late_fee') && extra_field.late_fee == 'fixed') || (!extra_field.hasOwnProperty('late_fee'))} type="radio" name="late_fee" id="late_fee-fixed" />
                                            <label htmlFor="late_fee-fixed">Fixed</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 