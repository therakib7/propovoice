import { useState } from "react";

export default (props) => {

    const handleChange = e => {
        props.handleChange(e);
    }

    const i18n = ndpv.i18n;
    const recurring = props.data;

    return (
        <div className="">
            <div className="pv-form-style-one">
                <div className="row">
                    <div className="col-12">
                        <label>{i18n.howOf}</label>
                        <div className="pv-field-radio">
                            <input
                                type='radio'
                                id="interval_type_day"
                                name='interval_type'
                                value='day'
                                checked={recurring.interval_type == 'day'}
                                onChange={(e) => handleChange(e)}
                            />
                            <label htmlFor="interval_type_day">{i18n.dly}</label>
                        </div>
                        <div className="pv-field-radio">
                            <input
                                type='radio'
                                id="interval_type_week"
                                name='interval_type'
                                value='week'
                                checked={recurring.interval_type == 'week'}
                                onChange={(e) => handleChange(e)}
                            />
                            <label htmlFor="interval_type_week">{i18n.wkly}</label>
                        </div>
                        <div className="pv-field-radio">
                            <input
                                type='radio'
                                id="interval_type_month"
                                name='interval_type'
                                value='month'
                                checked={recurring.interval_type == 'month'}
                                onChange={(e) => handleChange(e)}
                            />
                            <label htmlFor="interval_type_month">{i18n.mth}</label>
                        </div>
                        <div className="pv-field-radio">
                            <input
                                type='radio'
                                id="interval_type_year"
                                name='interval_type'
                                value='year'
                                checked={recurring.interval_type == 'year'}
                                onChange={(e) => handleChange(e)}
                            />
                            <label htmlFor="interval_type_year">{i18n.yrly}</label>
                        </div>
                        <div className="pv-field-radio pv-field-radio-input">
                            <input
                                type='radio'
                                id="interval_type_custom"
                                name='interval_type'
                                value='custom'
                                checked={recurring.interval_type == 'custom'}
                                onChange={(e) => handleChange(e)}
                            />
                            <label htmlFor="interval_type_custom" className="pv-mr-10">{i18n.intvIn}</label>
                            <input
                                type="number"
                                id="recurring-interval"
                                name="interval"
                                value={recurring.interval}
                                style={{ width: '55px' }}
                                onChange={handleChange}
                            />
                            <select
                                name="interval_in"
                                id="recurring-interval_in"
                                value={recurring.interval_in}
                                onChange={handleChange}
                            >
                                <option value="day">{i18n.day}</option>
                                <option value="week">{i18n.week}</option>
                                <option value="month">{i18n.month}</option>
                                <option value="year">{i18n.year}</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-12">
                        <label>{i18n.howM}</label>
                        <div className="pv-field-radio">
                            <input
                                type='radio'
                                id="limit_type_0"
                                name='limit_type'
                                value='0'
                                checked={recurring.limit_type == '0'}
                                onChange={(e) => handleChange(e)}
                            />
                            <label htmlFor="limit_type_0">{i18n.onGo}</label>
                        </div>
                        <div className="pv-field-radio pv-field-radio-input">
                            <input
                                type='radio'
                                id="limit_type_1"
                                name='limit_type'
                                value='1'
                                checked={recurring.limit_type == '1'}
                                onChange={(e) => handleChange(e)}
                            />
                            <label htmlFor="limit_type_1" className="pv-mr-10">{i18n.limit}</label>
                            <input
                                type="number"
                                id="recurring-limit"
                                name="limit"
                                value={recurring.limit}
                                onChange={handleChange}
                                style={{ width: '55px' }}
                            /> <span className="pv-times">{i18n.times}</span>
                        </div>
                    </div>

                    {false && <div className="col-12">
                        <label id="auto-subscription">Auto Subscription</label>
                        <div className="pv-field-switch pv-ml-10">
                            <label className='pv-switch'>
                                <input type='checkbox'
                                    id="auto-subscription"
                                    name='subscription'
                                    checked={recurring.subscription ? 'checked' : ''}
                                    onChange={handleChange}
                                />
                                <span className='pv-switch-slider pv-round'></span>
                            </label>
                        </div>

                        {recurring.subscription && <label style={{ marginBottom: 0 }}>Now only available Paypal/Stripe subscription. You must select this from Payment Method.</label>}
                    </div>}

                    {!recurring.subscription && <div className="col-12">
                        <label>{i18n.select} {i18n.dlvy} {i18n.option}</label>
                        <div className="pv-field-radio">
                            <input
                                type='radio'
                                id="recurring-delivery-auto"
                                name='delivery'
                                value={1}
                                checked={recurring.delivery == 1 ? 'checked' : ''}
                                onChange={(e) => handleChange(e, 'delivery')}
                            />
                            <label htmlFor="recurring-delivery-auto">{i18n.send} {i18n.auto}</label>
                        </div>
                        <div className="pv-field-radio">
                            <input
                                type='radio'
                                id="recurring-delivery-manual"
                                name='delivery'
                                value={0}
                                checked={recurring.delivery == 0 ? 'checked' : ''}
                                onChange={(e) => handleChange(e, 'delivery')}
                            />
                            <label htmlFor="recurring-delivery-manual">{i18n.draftM}</label>
                        </div>
                    </div>}
                </div>

                {!recurring.subscription && <div className="row">
                    <div className="col-12">
                        <label id="recurring-send_me">{i18n.sendCy}</label>
                        <div className="pv-field-switch pv-ml-10">
                            <label className='pv-switch'>
                                <input type='checkbox'
                                    id="recurring-send_me"
                                    name='send_me'
                                    checked={recurring.send_me ? 'checked' : ''}
                                    onChange={handleChange}
                                />
                                <span className='pv-switch-slider pv-round'></span>
                            </label>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
}