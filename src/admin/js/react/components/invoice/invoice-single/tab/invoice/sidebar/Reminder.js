import React, { Component, Suspense, lazy } from 'react' 

const TimeField = lazy(() => import('block/time-picker'));

class Reminder extends Component {

    constructor(props) {
        super(props);
 
    }

    handleChange = e => {
        this.props.handleChange(e);
    }

    onDateChange = e => {
        this.props.handleChange(e);
    }

    render() {
        const reminder = this.props.data;
        console.log(reminder)
        return (
            <li>
                <input type="checkbox" defaultChecked="checked" />
                <i />
                <h3>Reminder</h3>
                <div className="pi-reminder">
                    <div className="pi-form-style-one" style={{ padding: '0 20px' }}>
                        <div className="row">
                            <div className="col">
                                <table style={{borderSpacing: '8px'}}>
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
                                                    <strong>Due date</strong>
                                                </td>
                                                <td>
                                                    <input type='checkbox'
                                                        id="reminder-due_date"
                                                        name='due_date'
                                                        checked={reminder.due_date ? 'checked' : ''}
                                                        onChange={this.handleChange}
                                                    />
                                                    <label htmlFor="reminder-due_date">On due date</label>
                                                </td>
                                            </tr>
                                            
                                            <tr>
                                                <td>
                                                    <strong>Before due date</strong>
                                                </td>
                                                <td>
                                                    <input type='checkbox'
                                                        id="reminder-before-1"
                                                        name='before'
                                                        value={1}
                                                        checked={reminder.before.includes(1) !== -1 ? 'checked' : ''}
                                                        onChange={this.handleChange}
                                                    />
                                                    <label htmlFor="reminder-before-1">Before 1 day</label>
                                                    <br />
                                                    <input type='checkbox'
                                                        id="reminder-before-7"
                                                        name='before'
                                                        value={7}
                                                        checked={reminder.before.includes(7) !== -1 ? 'checked' : ''}
                                                        onChange={this.handleChange}
                                                    />
                                                    <label htmlFor="reminder-before-7">Before 7 days</label>

                                                    <br />
                                                    <input type='checkbox'
                                                        id="reminder-before-15"
                                                        name='before'
                                                        value={15}
                                                        checked={reminder.before.includes(15) !== -1 ? 'checked' : ''}
                                                        onChange={this.handleChange}
                                                    />
                                                    <label htmlFor="reminder-before-15">Before 15 days</label>
                                                </td>
                                            </tr>  

                                            <tr>
                                                <td>
                                                    <strong>After due date</strong>
                                                </td>
                                                <td>
                                                    <input type='checkbox'
                                                        id="reminder-after-1"
                                                        name='after'
                                                        value={1}
                                                        checked={reminder.before.includes(1) !== -1 ? 'checked' : ''}
                                                        onChange={this.handleChange}
                                                    />
                                                    <label htmlFor="reminder-after-1">After 1 day</label>
                                                    <br />
                                                    <input type='checkbox'
                                                        id="reminder-after-7"
                                                        name='after'
                                                        value={7}
                                                        checked={reminder.before.includes(7) !== -1 ? 'checked' : ''}
                                                        onChange={this.handleChange}
                                                    />
                                                    <label htmlFor="reminder-after-7">After 7 days</label>

                                                    <br />
                                                    <input type='checkbox'
                                                        id="reminder-after-15"
                                                        name='after'
                                                        value={15}
                                                        checked={reminder.before.includes(15) !== -1 ? 'checked' : ''}
                                                        onChange={this.handleChange}
                                                    />
                                                    <label htmlFor="reminder-after-15">After 15 days</label>
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
