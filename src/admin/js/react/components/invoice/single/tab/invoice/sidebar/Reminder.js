import React, { Component, Suspense, lazy } from 'react'

// const TimeField = lazy(() => import('block/time-picker'));
import ApiSetting from 'api/setting';

class Reminder extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        if (!this.props.id) {
            const path = this.props.path;
            ApiSetting.getAll('tab=' + path + '_reminder').then(resp => {
                if (resp.data.success) {
                    this.props.handleDefault(resp.data.data);
                }
            });
        }
    }

    handleChange = (e, type = null) => {
        this.props.handleChange(e, type);
    }

    render() {
        const reminder = this.props.data;
        return (
            <div className="pi-reminder">
                <div className="pi-form-style-one" style={{ padding: '0 20px' }}>
                    <div className="row">
                        <div className="col">
                            <table style={{ borderSpacing: '8px' }}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label htmlFor="reminder-status"><strong>Status</strong></label>
                                        </td>
                                        <td>
                                            <label className='pi-switch'>
                                                <input
                                                    type='checkbox'
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
                                                <input
                                                    type='checkbox'
                                                    id="reminder-due_date"
                                                    name='due_date'
                                                    checked={reminder.due_date ? 'checked' : ''}
                                                    onChange={this.handleChange}
                                                />
                                                <label htmlFor="reminder-due_date">On due date</label>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td valign='top'>
                                                <strong>Before due date</strong>
                                            </td>
                                            <td>
                                                <input
                                                    type='checkbox'
                                                    id="reminder-before-1"
                                                    name='before'
                                                    value={1}
                                                    checked={reminder.before.includes(1) ? 'checked' : ''}
                                                    onChange={(e) => this.handleChange(e, 'before')}
                                                />
                                                <label htmlFor="reminder-before-1">Before 1 day</label>
                                                <br />
                                                <input
                                                    type='checkbox'
                                                    id="reminder-before-7"
                                                    name='before'
                                                    value={7}
                                                    checked={reminder.before.includes(7) ? 'checked' : ''}
                                                    onChange={(e) => this.handleChange(e, 'before')}
                                                />
                                                <label htmlFor="reminder-before-7">Before 7 days</label>

                                                <br />
                                                <input
                                                    type='checkbox'
                                                    id="reminder-before-15"
                                                    name='before'
                                                    value={15}
                                                    checked={reminder.before.includes(15) ? 'checked' : ''}
                                                    onChange={(e) => this.handleChange(e, 'before')}
                                                />
                                                <label htmlFor="reminder-before-15">Before 15 days</label>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td valign='top'>
                                                <strong>After due date</strong>
                                            </td>
                                            <td>
                                                <input
                                                    type='checkbox'
                                                    id="reminder-after-1"
                                                    name='after'
                                                    value={1}
                                                    checked={reminder.after.includes(1) ? 'checked' : ''}
                                                    onChange={(e) => this.handleChange(e, 'after')}
                                                />
                                                <label htmlFor="reminder-after-1">After 1 day</label>
                                                <br />
                                                <input
                                                    type='checkbox'
                                                    id="reminder-after-7"
                                                    name='after'
                                                    value={7}
                                                    checked={reminder.after.includes(7) ? 'checked' : ''}
                                                    onChange={(e) => this.handleChange(e, 'after')}
                                                />
                                                <label htmlFor="reminder-after-7">After 7 days</label>

                                                <br />
                                                <input
                                                    type='checkbox'
                                                    id="reminder-after-15"
                                                    name='after'
                                                    value={15}
                                                    checked={reminder.after.includes(15) ? 'checked' : ''}
                                                    onChange={(e) => this.handleChange(e, 'after')}
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
            </div>
        );
    }
}

export default Reminder;
