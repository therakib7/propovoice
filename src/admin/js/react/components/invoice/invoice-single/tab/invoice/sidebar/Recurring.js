import React, { Component } from 'react'

class Recurring extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const recurring = this.props.data;
        return (
            <li>
                <input type="checkbox" defaultChecked="checked" />
                <i />
                <h3>Recurring</h3>
                <div className="pi-reminder">
                    <div className="pi-form-style-one" style={{ padding: '0 20px', marginTop: 0 }}>

                        <div className="row">
                            <div className="col">
                                <div className="pi-checkbox-content">
                                    <input
                                        type="checkbox"
                                        id="recurring-status"
                                        name="recurring-status"
                                        defaultValue="recurring-status"
                                    />
                                    <label htmlFor="recurring-status">Status (On/Off)</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="pi-reminder-time">
                                    <label htmlFor="recurring-on">Recuring on every</label>
                                    <input
                                        style={{ marginLeft: '10px' }}
                                        type="number" id="recurring-on" name="recurring-on" placeholder={1} />
                                    <select name="reminder-type">
                                        <option value="day">Day</option>
                                        <option value="week">Week</option>
                                        <option value="month">Month</option>
                                        <option value="year">Year</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="recurring-end">Recurring end after</label>
                                <input
                                    type="number"
                                    style={{ width: '70px', margin: '0 10px' }}
                                    id="recurring-end"
                                    placeholder={5}
                                />Times
                            </div>
                        </div>
                    </div>
                </div>

            </li>
        );
    }
}

export default Recurring;
