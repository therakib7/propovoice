import React, { Component } from 'react';

import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
import Api from 'api/setting';

export default class Reminder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                status: false,
                due_date: false,
                before: [],
                after: []
            }
        };
    }

    static contextType = AppContext;

    componentDidMount() {
        Api.getAll('tab=' + this.props.path + '_reminder')
            .then(resp => {
                if (resp.data.success) {
                    this.setState({ form: resp.data.data });
                }
            });
    }

    handleChange = (e, type) => {
        let reminder = { ...this.state.form }
        const target = e.target;
        const name = target.name;
        const value = (name === 'status' || name === 'due_date') ? target.checked : target.value;
        if (type) {
            let arr = reminder[type];
            if (target.checked) {
                arr.push(parseInt(value));
            } else {
                arr.splice(arr.indexOf(parseInt(value)), 1);
            }
        } else {
            reminder[name] = value;
        }

        this.setState({ form: reminder })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let form = this.state.form;
        form.tab = this.props.path + '_reminder';

        Api.create(form)
            .then(resp => {
                if (resp.data.success) {
                    toast.success(this.context.CrudMsg.update);
                } else {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                }
            })
    }

    render() {
        const form = this.state.form;
        return (
            <form onSubmit={this.handleSubmit} className="pi-form-style-one">

                <div className="row">
                    <div className="col">
                        <label>Status</label>
                        <div className="pi-field-switch pi-mt-3 pi-ml-10">
                            <label className='pi-switch'>
                                <input type='checkbox'
                                    id="reminder-status"
                                    name='status'
                                    checked={form.status ? 'checked' : ''}
                                    onChange={this.handleChange}
                                />
                                <span className='pi-switch-slider pi-round'></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label>Reminder</label>
                        <div className="pi-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-due_date"
                                name='due_date'
                                checked={form.due_date ? 'checked' : ''}
                                onChange={this.handleChange}
                            />
                            <label htmlFor="reminder-due_date">On due date</label>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label>Reminder Before</label>
                        <div className="pi-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-before-1"
                                name='before'
                                value={1}
                                checked={form.before.includes(1) ? 'checked' : ''}
                                onChange={(e) => this.handleChange(e, 'before')}
                            />
                            <label htmlFor="reminder-before-1">1 day</label>
                        </div>
                        <div className="pi-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-before-7"
                                name='before'
                                value={7}
                                checked={form.before.includes(7) ? 'checked' : ''}
                                onChange={(e) => this.handleChange(e, 'before')}
                            />
                            <label htmlFor="reminder-before-7">7 days</label>
                        </div>
                        <div className="pi-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-before-15"
                                name='before'
                                value={15}
                                checked={form.before.includes(15) ? 'checked' : ''}
                                onChange={(e) => this.handleChange(e, 'before')}
                            />
                            <label htmlFor="reminder-before-15">15 days</label>
                        </div>
                        <div className="pi-field-checkbox pi-field-checkbox-input pi-mb-10">
                            <input type="checkbox" id="date" name="date" />
                            <input
                                type="number"
                                id="unit-number"
                                name="firstname"
                                placeholder={1}
                            />
                            <select name="number-type">
                                <option value="page">Days</option>
                                <option value="hour">Hour</option>
                                <option value="week">Week</option>
                                <option value="month">Month</option>
                            </select>
                        </div>
                        <div className="pi-field-checkbox pi-field-checkbox-input">
                            <input type="checkbox" id="date" name="date" />
                            <input
                                type="number"
                                id="unit-number"
                                name="firstname"
                                placeholder={1}
                            />
                            <select name="number-type">
                                <option value="page">Days</option>
                                <option value="hour">Hour</option>
                                <option value="week">Week</option>
                                <option value="month">Month</option>
                            </select>
                        </div>
                        <button className="pi-btn" style={{ marginLeft: "-20px", color: "#718096", background: "none" }}>
                            <svg
                                width={12}
                                height={13}
                                viewBox="0 0 12 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1.875 6.5H10.125"
                                    stroke="#718096"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M6 2.375V10.625"
                                    stroke="#718096"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Add Another
                        </button>
                    </div>
                    <div className="col">
                        <label>Reminder After</label>
                        <div className="pi-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-after-1"
                                name='after'
                                value={1}
                                checked={form.after.includes(1) ? 'checked' : ''}
                                onChange={(e) => this.handleChange(e, 'after')}
                            />
                            <label htmlFor="reminder-after-1">1 day</label>
                        </div>
                        <div className="pi-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-after-7"
                                name='after'
                                value={7}
                                checked={form.after.includes(7) ? 'checked' : ''}
                                onChange={(e) => this.handleChange(e, 'after')}
                            />
                            <label htmlFor="reminder-after-7">7 days</label>
                        </div>
                        <div className="pi-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-after-15"
                                name='after'
                                value={15}
                                checked={form.after.includes(15) ? 'checked' : ''}
                                onChange={(e) => this.handleChange(e, 'after')}
                            />
                            <label htmlFor="reminder-after-15">15 days</label>
                        </div>
                        <div className="pi-field-checkbox pi-field-checkbox-input">
                            <input type="checkbox" id="date" name="date" />
                            <input
                                type="number"
                                id="unit-number"
                                name="firstname"
                                placeholder={1}
                            />
                            <select name="number-type">
                                <option value="page">Days</option>
                                <option value="hour">Hour</option>
                                <option value="week">Week</option>
                                <option value="month">Month</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <button className="pi-btn pi-bg-blue pi-bg-hover-blue">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        );
    }
} 