import React, { Component } from 'react';

class Reminder extends Component {

    constructor(props) {
        super(props);
    }

    handleChange = e => {
        // this.props.handleChange(e);
    } 

    render() {
        // const reminder = this.props.data;
        return (
            <li>
                <input type="checkbox" defaultChecked="checked" />
                <i />
                <h3>Reminder</h3>
                <div className="pi-reminder">
                    <div className="pi-form-style-one" style={{ padding: '0 20px', marginTop: 0 }}>
                        
                        <div className="row">
                            <div className="col">
                                <div className="pi-checkbox-content">
                                    <input
                                        type="checkbox"
                                        id="reminder-status"
                                        name="reminder-status" 
                                        // defaultValue={reminder.status}
                                        // onChange={this.handleChange}
                                    />
                                    <label htmlFor="reminder-status">Status (On/Off)</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="pi-reminder-time">
                                    <label htmlFor="reminder-after">Reminder after</label> 
                                    <input 
                                    style={{ marginLeft: '10px' }}
                                    type="number" 
                                    id="reminder-after" 
                                    name="after" 
                                    placeholder="1" 
                                    // value={reminder.after}
                                    // onChange={this.handleChange}
                                    />
                                    <select 
                                    name="after_type"
                                    // value={reminder.after}
                                    // onChange={this.handleChange}
                                    >
                                        <option value="day">Day</option> 
                                        <option value="week">Week</option>
                                        <option value="month">Month</option> 
                                    </select>
                                </div>
                            </div>
                        </div>  

                        <div className="row">
                            <div className="col">
                                <div className="pi-reminder-time">
                                    <label htmlFor="reminder-every">Reminder every</label> 
                                    <input 
                                    style={{ marginLeft: '10px' }}
                                    type="number" 
                                    id="reminder-every" 
                                    name="every" 
                                    placeholder="1" 
                                    // value={reminder.every}
                                    // onChange={this.handleChange}
                                    />
                                    <select 
                                    name="every_type"
                                    // value={reminder.every}
                                    // onChange={this.handleChange}
                                    >
                                        <option value="day">Day</option> 
                                        <option value="week">Week</option>
                                        <option value="month">Month</option> 
                                    </select>
                                </div>
                            </div>
                        </div> 

                        <div className="row">
                            <div className="col">
                                <label htmlFor="reminder-end">Reminder end after</label>
                                <input
                                    type="number"
                                    style={{ width: '70px', margin: '0 10px' }}
                                    id="reminder-end"
                                    placeholder={1}
                                    name="end_after"
                                    // value={reminder.end_after}
                                    // onChange={this.handleChange}
                                />Times
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
