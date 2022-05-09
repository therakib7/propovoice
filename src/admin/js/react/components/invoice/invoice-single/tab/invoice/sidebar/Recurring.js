import React, { Component } from 'react';

class Recurring extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            day: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
            week: {
                3: 'Monday',
                4: 'Tuesday',
                5: 'Wednesday',
                6: 'Thursday',
                7: 'Friday',
                1: 'Saturday',
                2: 'Sunday',
            },
            month: {
                1: 'January',
                2: 'February',
                3: 'March',
                4: 'April',
                5: 'May',
                6: 'June',
                7: 'July',
                8: 'August',
                9: 'September',
                10: 'October',
                11: 'November',
                12: 'December',
            },
        }
    }

    handleChange = e => {
        this.props.handleChange(e);
    }

    render() {
        const recurring = this.props.data; 
        return (
            <li>
                <input type="checkbox" defaultChecked="checked" />
                <i />
                <h3>Recurring</h3>
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
                                                    <label htmlFor="recurring-interval">Recurring after</label>
                                                </td>
                                                <td>
                                                    <div className="pi-reminder-time">
                                                        <input
                                                            type="number"
                                                            id="recurring-interval"
                                                            name="interval"
                                                            value={recurring.interval}
                                                            onChange={this.handleChange}
                                                        />
                                                        <select
                                                            name="interval_type"
                                                            value={recurring.interval_type}
                                                            onChange={this.handleChange}
                                                        > 
                                                            <option value="day">Day</option>
                                                            <option value="week">Week</option>
                                                            <option value="month">Month</option>
                                                            <option value="year">Year</option>
                                                        </select>
                                                    </div>
                                                </td>
                                            </tr>

                                            {recurring.interval_type != 'day' &&<tr>
                                                <td>
                                                    <label htmlFor="recurring-start_day">
                                                        Recurring&nbsp;
                                                        {recurring.interval_type == 'month' && 'Date'}
                                                        {recurring.interval_type == 'week' && 'Day'}
                                                        {recurring.interval_type == 'year' && 'Month'}
                                                    </label>
                                                </td>
                                                <td>
                                                    <select
                                                        name="start_day"
                                                        value={recurring.start_day}
                                                        onChange={this.handleChange}
                                                    > 
                                                        {recurring.interval_type == 'month' && this.state.day.map((row, index) => ( 
                                                            <option key={index} value={row}>{row}</option>
                                                        ))}

                                                        {recurring.interval_type == 'week' && Object.entries(this.state.week).map(([key, value]) => (
                                                            <option key={key} value={key}>{value}</option>
                                                        ))}   

                                                        {recurring.interval_type == 'year' && Object.entries(this.state.month).map(([key, value]) => (
                                                            <option key={key} value={key}>{value}</option>
                                                        ))} 
                                                    </select>
                                                </td>
                                            </tr>}

                                            <tr>
                                                <td>
                                                    <label htmlFor="recurring-limit">Recurring end after</label>
                                                </td>
                                                <td>
                                                    <div className="pi-reminder-time">
                                                        <input
                                                            type="number"
                                                            style={{ width: '70px' }}
                                                            id="recurring-limit"
                                                            name="limit"
                                                            value={recurring.limit}
                                                            onChange={this.handleChange}
                                                        /> Times
                                                    </div>
                                                </td>
                                            </tr>
                                        </>}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                    {/* ./ pi-form-content */}
                </div>

            </li>
        );
    }
}

export default Recurring;
