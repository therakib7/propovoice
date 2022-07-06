import { useState } from "react";

export default (props) => {

    const [interval_type, SetIntervalType] = useState({
        'week': 'Weekly',
        'month': 'Monthly',
        'quarter': 'Quarterly',
        'half-year': 'Half Yearly',
        'year': 'Yearly',
        'custom': 'Custom'
    });

    const handleChange = e => {
        props.handleChange(e);
    }

    const recurring = props.data;
    return (
        <div className="">
            <div className="pi-form-style-one">
                <div className="row">
                    <div className="col">
                        <label>How often?</label>
                        <div className="pi-field-radio">
                            <input
                                type='radio'
                                id="interval_type_day"
                                name='interval_type'
                                value='day'
                                checked={recurring.interval_type == 'day'}
                                onChange={(e) => handleChange(e)}
                            />
                            <label htmlFor="interval_type_day">Daily</label>
                        </div>
                        <div className="pi-field-radio">
                            <input
                                type='radio'
                                id="interval_type_week"
                                name='interval_type'
                                value='week'
                                checked={recurring.interval_type == 'week'}
                                onChange={(e) => handleChange(e)}
                            />
                            <label htmlFor="interval_type_week">Weekly</label>
                        </div>
                        <div className="pi-field-radio">
                            <input
                                type='radio'
                                id="interval_type_month"
                                name='interval_type'
                                value='month'
                                checked={recurring.interval_type == 'month'}
                                onChange={(e) => handleChange(e)}
                            />
                            <label htmlFor="interval_type_month">Monthly</label>
                        </div>
                        <div className="pi-field-radio pi-field-radio-input">
                            <input
                                type='radio'
                                id="interval_type_custom"
                                name='interval_type'
                                value='custom'
                                checked={recurring.interval_type == 'custom'}
                                onChange={(e) => handleChange(e)}
                            />
                            <label htmlFor="interval_type_custom" className="pi-mr-10">Interval In</label>
                            <input
                                type="number"
                                id="recurring-interval"
                                name="interval"
                                value={recurring.interval}
                                onChange={handleChange}
                            />
                            <select
                                name="interval_in"
                                id="recurring-interval_in"
                                value={recurring.interval_in}
                                onChange={handleChange}
                            >
                                <option value="day">Day</option>
                                <option value="month">Month</option>
                                <option value="year">Year</option>
                            </select>
                        </div>
                    </div>

                    <div className="col">
                        <label>How Many?</label>
                        <div className="pi-field-radio">
                            <input
                                type='radio'
                                id="limit_type_0"
                                name='limit_type'
                                value='0'
                                checked={recurring.limit_type == '0'}
                                onChange={(e) => handleChange(e)}
                            />
                            <label htmlFor="limit_type_0">On going</label>
                        </div>
                        <div className="pi-field-radio pi-field-radio-input">
                            <input
                                type='radio'
                                id="limit_type_1"
                                name='limit_type'
                                value='1'
                                checked={recurring.limit_type == '1'}
                                onChange={(e) => handleChange(e)}
                            />
                            <label htmlFor="limit_type_1" className="pi-mr-10">Limit</label>
                            <input
                                type="number"
                                id="recurring-limit"
                                name="limit"
                                value={recurring.limit}
                                onChange={handleChange}
                            /> <span className="pi-times">Times</span>
                        </div>
                    </div>

                    <div className="col">
                        <label>Select delivery option</label>
                        <div className="pi-field-radio">
                            <input
                                type='radio'
                                id="recurring-delivery-auto"
                                name='delivery'
                                value={1}
                                checked={recurring.delivery == 1 ? 'checked' : ''}
                                onChange={(e) => handleChange(e, 'delivery')}
                            />
                            <label htmlFor="recurring-delivery-auto">Send automatically</label>
                        </div>
                        <div className="pi-field-radio">
                            <input
                                type='radio'
                                id="recurring-delivery-manual"
                                name='delivery'
                                value={0}
                                checked={recurring.delivery == 0 ? 'checked' : ''}
                                onChange={(e) => handleChange(e, 'delivery')}
                            />
                            <label htmlFor="recurring-delivery-manual">Create Draft and send manually</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <label id="recurring-send_me">Send me a copy</label>
                        <div className="pi-field-switch pi-mt-3 pi-ml-10">
                            <label className='pi-switch'>
                                <input type='checkbox'
                                    id="recurring-send_me"
                                    name='send_me'
                                    checked={recurring.send_me ? 'checked' : ''}
                                    onChange={handleChange}
                                />
                                <span className='pi-switch-slider pi-round'></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 