import React, { Component } from 'react';

class Recurring extends Component {

    constructor(props) {
        super(props);

        this.state = {
            interval_type: {
                'week': 'Weekly',
                'month': 'Monthly',
                'quarter': 'Quarterly',
                'half-year': 'Half Yearly',
                'year': 'Yearly',
                'custom': 'Custom'
            }
        }
    }

    handleChange = e => {
        this.props.handleChange(e);
    }

    render() {
        const recurring = this.props.data;
        return (
            <div className="pi-reminder">
                <div className="pi-form-style-one" style={{ padding: '0 20px' }}>
                    <div className="row">
                        <div className="col">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label htmlFor="recurring-status">Status</label>
                                        </td>
                                        <td>
                                            <label className='pi-switch'>
                                                <input type='checkbox'
                                                    id="recurring-status"
                                                    name='status'
                                                    checked={recurring.status ? 'checked' : ''}
                                                    onChange={this.handleChange}
                                                />
                                                <span className='pi-switch-slider round'></span>
                                            </label>
                                        </td>
                                    </tr>

                                    {recurring.status && <>
                                        <tr>
                                            <td>
                                                <label htmlFor="recurring-interval_type">
                                                    How Often?
                                                </label>
                                            </td>
                                            <td>
                                                <select
                                                    style={{ width: '100px' }}
                                                    name="interval_type"
                                                    value={recurring.interval_type}
                                                    onChange={this.handleChange}
                                                >
                                                    {Object.entries(this.state.interval_type).map(([key, value]) => (
                                                        <option key={key} value={key}>{value}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>

                                        {recurring.interval_type == 'custom' &&
                                            <>
                                                <tr>
                                                    <td>
                                                        <label htmlFor="recurring-interval_in">Interval in</label>
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            style={{ width: '60px' }}
                                                            id="recurring-interval"
                                                            name="interval"
                                                            value={recurring.interval}
                                                            onChange={this.handleChange}
                                                        />
                                                        <select
                                                            style={{ width: '90px' }}
                                                            name="interval_in"
                                                            id="recurring-interval_in"
                                                            value={recurring.interval_in}
                                                            onChange={this.handleChange}
                                                        >
                                                            <option value="day">Day</option>
                                                            <option value="month">Month</option>
                                                            <option value="year">Year</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            </>
                                        }

                                        <tr>
                                            <td>
                                                <label htmlFor="recurring-limit_type">How many?</label>
                                            </td>
                                            <td>
                                                <select
                                                    style={{ width: '100px' }}
                                                    name="limit_type"
                                                    id="recurring-limit_type"
                                                    value={recurring.limit_type}
                                                    onChange={this.handleChange}
                                                >
                                                    <option value="0">On Going</option>
                                                    <option value="1">Limit</option>
                                                </select>
                                            </td>
                                        </tr>

                                        {recurring.limit_type == '1' && <tr>
                                            <td>
                                                <label htmlFor="recurring-limit">Limit of Invoice</label>
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    style={{ width: '60px' }}
                                                    id="recurring-limit"
                                                    name="limit"
                                                    value={recurring.limit}
                                                    onChange={this.handleChange}
                                                /> Times
                                            </td>
                                        </tr>}

                                        <tr>
                                            <td>
                                                <label htmlFor="recurring-send_me">Send me a copy </label>
                                            </td>
                                            <td>
                                                <label className='pi-switch'>
                                                    <input type='checkbox'
                                                        id="recurring-send_me"
                                                        name='send_me'
                                                        checked={recurring.send_me ? 'checked' : ''}
                                                        onChange={this.handleChange}
                                                    />
                                                    <span className='pi-switch-slider round'></span>
                                                </label>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                Delivery
                                            </td>
                                            <td>
                                                <input
                                                    type='radio'
                                                    id="recurring-delivery-auto"
                                                    name='delivery'
                                                    value={1}
                                                    checked={recurring.delivery == 1 ? 'checked' : ''}
                                                    onChange={(e) => this.handleChange(e, 'delivery')}
                                                />
                                                <label htmlFor="recurring-delivery-auto">Send automatically</label>
                                                <br />

                                                <input
                                                    type='radio'
                                                    id="recurring-delivery-manual"
                                                    name='delivery'
                                                    value={0}
                                                    checked={recurring.delivery == 0 ? 'checked' : ''}
                                                    onChange={(e) => this.handleChange(e, 'delivery')}
                                                />
                                                <label htmlFor="recurring-delivery-manual">Create Draft and send manually</label>

                                            </td>
                                        </tr>
                                    </>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Recurring;
