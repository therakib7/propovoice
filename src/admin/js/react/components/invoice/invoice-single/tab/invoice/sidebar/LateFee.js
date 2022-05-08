import React, { Component } from 'react';

class LateFee extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const late_fee = this.props.data;
        return (
            <li>
                <input type="checkbox" defaultChecked="checked" />
                <i />
                <h3>Late Fee</h3>
                <div className="pi-charge">
                    <div className="pi-form-style-one">

                        <div className="pi-checkbox-content">
                            <input
                                type="checkbox"
                                id="late-fee-status"
                                name="late-fee-status"
                                defaultValue="late-fee-status"
                            />
                            <label htmlFor="late-fee-status">Status (On/Off)</label>
                        </div>

                        <div className="pi-checkbox-content">
                            <input
                                type="checkbox"
                                id="late-fee"
                                name="late-fee"
                                defaultValue="late-fee"
                            />
                            <label htmlFor="late-fee">Automatically add late fees to this invoice if goes unpaid for</label>
                        </div>

                        <div className="pi-reminder-time">
                            <input type="number" id="unit-number" name="firstname" placeholder={1} />
                            <select name="number-type">
                                <option value="day">Days</option>
                                <option value="week">Week</option>
                                <option value="month">Month</option>
                                <option value="year">Year</option>
                            </select>
                        </div>

                        <div className="pi-radio-content">
                            <div className="pi-radio-group">
                                <h4>Late fee type:</h4>

                                <input type="radio" name="late-fee" value="fixed" id="late-fee-fixed" />
                                <label htmlFor="late-fee-fixed">Fixed</label>

                                <input style={{ marginLeft: '10px' }} type="radio" name="late-fee" value="percent" id="late-fee-percent" />
                                <label htmlFor="late-fee-percent">Percentage</label>
                            </div>
                            <input type="number" id="number" name="number" placeholder="100" />$ of Invoice balance
                        </div>
                    </div>
                </div>

            </li>
        );
    }
}

export default LateFee;
