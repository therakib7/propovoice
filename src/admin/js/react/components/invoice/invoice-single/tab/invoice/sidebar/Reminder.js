import React, { Component } from 'react';

class Reminder extends Component {

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
        const reminder = this.props.data;
        return (
            <li>
                <input type="checkbox" defaultChecked="checked" />
                <i />
                <h3>Reminder</h3>
                <div className="pi-reminder">
                    <div className="pi-form-style-one" style={{ padding: '0 20px' }}>
                        <div className="row">
                            <div className="col">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <label htmlFor="reminder-status">Status</label>
                                            </td>
                                            <td>
                                                <label className='pi-switch'>
                                                    <input type='checkbox'
                                                        id="reminder-status"
                                                        name='status'
                                                        checked={reminder.status ? 'checked' : ''}
                                                        onChange={this.handleChange}
                                                    />
                                                    <span className='pi-switch-slider round'></span>
                                                </label>
                                            </td>
                                        </tr>

                                        {reminder.status && <>
                                            <tr>
                                                <td>
                                                    <label htmlFor="reminder-interval">Reminder after</label>
                                                </td>
                                                <td>
                                                    <div className="pi-reminder-time">
                                                        <input
                                                            type="number"
                                                            id="reminder-interval"
                                                            name="interval"
                                                            value={reminder.interval}
                                                            onChange={this.handleChange}
                                                        />
                                                        <select
                                                            name="interval_type"
                                                            value={reminder.interval_type}
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

                                            {reminder.interval_type != 'day' &&<tr>
                                                <td>
                                                    <label htmlFor="reminder-start_day">
                                                        Reminder&nbsp;
                                                        {reminder.interval_type == 'month' && 'Date'}
                                                        {reminder.interval_type == 'week' && 'Day'}
                                                        {reminder.interval_type == 'year' && 'Month'}
                                                    </label>
                                                </td>
                                                <td>
                                                    <select
                                                        name="start_day"
                                                        value={reminder.start_day}
                                                        onChange={this.handleChange}
                                                    > 
                                                        {reminder.interval_type == 'month' && this.state.day.map((row, index) => ( 
                                                            <option key={index} value={row}>{row}</option>
                                                        ))}

                                                        {reminder.interval_type == 'week' && Object.entries(this.state.week).map(([key, value]) => (
                                                            <option key={key} value={key}>{value}</option>
                                                        ))}   

                                                        {reminder.interval_type == 'year' && Object.entries(this.state.month).map(([key, value]) => (
                                                            <option key={key} value={key}>{value}</option>
                                                        ))} 
                                                    </select>
                                                </td>
                                            </tr>}

                                            <tr>
                                                <td>
                                                    <label htmlFor="reminder-limit">Reminder end after</label>
                                                </td>
                                                <td>
                                                    <div className="pi-reminder-time">
                                                        <input
                                                            type="number"
                                                            style={{ width: '70px' }}
                                                            id="reminder-limit"
                                                            name="limit"
                                                            value={reminder.limit}
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

export default Reminder;
