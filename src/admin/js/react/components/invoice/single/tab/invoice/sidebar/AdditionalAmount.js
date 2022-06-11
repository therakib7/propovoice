import React, { Component } from 'react';

import Api from 'api/payment';

class AdditionalAmount extends Component {

    constructor(props) {
        super(props);

        this.state = {
            preloader: true,
        };
    }

    setAdditional = (data, type) => {
        this.props.handleChange(data, type);
    }

    render() {
        const extra_field = this.props.data;
        return (
            <div className="pi-form-accordion pi-additional">
                <div className="pi-tab">
                    <input checked={extra_field.hasOwnProperty('tax') ? 'checked' : ''} onChange={() => this.setAdditional('tax', 'field')} type="checkbox" id="additional-tax" name="additional-tax" />
                    <label className="pi-tab-label" htmlFor="additional-tax">
                        Tax
                    </label>
                    <div className="pi-tab-content">
                        <div className="pi-form-style-two pi-form-style-four">
                            <div className="pi-radio-content">
                                <div className="pi-radio-group">
                                    <h4>Tax type:</h4>
                                    <input onChange={() => this.setAdditional({ field: 'tax', type: 'percent' }, 'type')} defaultChecked={extra_field.hasOwnProperty('tax') && extra_field.tax == 'percent'} type="radio" name="tax" id="tax-percent" />
                                    <label htmlFor="tax-percent">Percentage</label>
                                    <input onChange={() => this.setAdditional({ field: 'tax', type: 'fixed' }, 'type')} defaultChecked={extra_field.hasOwnProperty('tax') && extra_field.tax == 'fixed'} type="radio" name="tax" id="tax-fixed" />
                                    <label htmlFor="tax-fixed">Fixed</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pi-tab">
                    <input checked={extra_field.hasOwnProperty('discount') ? 'checked' : ''} onChange={() => this.setAdditional('discount', 'field')} type="checkbox" id="additional-discount" name="additional-discount" />
                    <label className="pi-tab-label" htmlFor="additional-discount">
                        Discount
                    </label>
                    <div className="pi-tab-content">
                        <div className="pi-form-style-two pi-form-style-four">
                            <div className="pi-radio-content">
                                <div className="pi-radio-group">
                                    <h4>Discount type:</h4>
                                    <input onChange={() => this.setAdditional({ field: 'discount', type: 'percent' }, 'type')} defaultChecked={extra_field.hasOwnProperty('discount') && extra_field.discount == 'percent'} type="radio" name="discount" id="discount-percent" />
                                    <label htmlFor="discount-percent">Percentage</label>
                                    <input onChange={() => this.setAdditional({ field: 'discount', type: 'fixed' }, 'type')} defaultChecked={extra_field.hasOwnProperty('discount') && extra_field.discount == 'fixed'} type="radio" name="discount" id="discount-fixed" />
                                    <label htmlFor="discount-fixed">Fixed</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pi-tab">
                    <input checked={extra_field.hasOwnProperty('late_fee') ? 'checked' : ''} onChange={() => this.setAdditional('late_fee', 'field')} type="checkbox" id="additional-late_fee" name="additional-late_fee" />
                    <label className="pi-tab-label" htmlFor="additional-late_fee">
                        Late Fee
                    </label>
                    <div className="pi-tab-content">
                        <div className="pi-form-style-two pi-form-style-four">
                            <div className="pi-radio-content">
                                <div className="pi-radio-group">
                                    <h4>Late Fee type:</h4>
                                    <input onChange={() => this.setAdditional({ field: 'late_fee', type: 'percent' }, 'type')} defaultChecked={extra_field.hasOwnProperty('late_fee') && extra_field.late_fee == 'percent'} type="radio" name="late_fee" id="late_fee-percent" />
                                    <label htmlFor="late_fee-percent">Percentage</label>
                                    <input onChange={() => this.setAdditional({ field: 'late_fee', type: 'fixed' }, 'type')} defaultChecked={(extra_field.hasOwnProperty('late_fee') && extra_field.late_fee == 'fixed') || (!extra_field.hasOwnProperty('late_fee'))} type="radio" name="late_fee" id="late_fee-fixed" />
                                    <label htmlFor="late_fee-fixed">Fixed</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdditionalAmount;
