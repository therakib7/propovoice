import React, { Component } from 'react';

import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
import api from 'api';
import ProLabel from 'block/pro-alert/label';
import pro from 'block/pro-alert';

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
        api.get('settings', 'tab=' + this.props.path + '_reminder')
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

        if (wage.length > 0 && (name == 'status')) {
            pro();
            return;
        }

        this.setState({ form: reminder })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (ndpv.isDemo) { toast.error(ndpv.demoMsg); return; }
        let form = this.state.form;
        form.tab = this.props.path + '_reminder';

        api.add('settings', form).then(resp => {
            if (resp.data.success) {
                toast.success(ndpv.i18n.aUpd);
            } else {
                resp.data.data.forEach(function (value) {
                    toast.error(value);
                });
            }
        })
    }

    render() {
        const form = this.state.form;
        const i18n = ndpv.i18n;
        return (
            <form onSubmit={this.handleSubmit} className="pv-form-style-one">

                <div className="row">
                    <div className="col">
                        <label>
                            {i18n.status}
                            <ProLabel />
                        </label>
                        <div className="pv-field-switch pv-ml-10">
                            <label className='pv-switch'>
                                <input type='checkbox'
                                    id="reminder-status"
                                    name='status'
                                    checked={form.status ? 'checked' : ''}
                                    onChange={this.handleChange}
                                />
                                <span className='pv-switch-slider pv-round'></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label>{i18n.rem}</label>
                        <div className="pv-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-due_date"
                                name='due_date'
                                checked={form.due_date ? 'checked' : ''}
                                onChange={this.handleChange}
                            />
                            <label htmlFor="reminder-due_date">{i18n.on} {i18n.due_date}</label>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label>{i18n.rem} {i18n.before}</label>
                        <div className="pv-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-before-1"
                                name='before'
                                value={1}
                                checked={form.before.includes(1) ? 'checked' : ''}
                                onChange={(e) => this.handleChange(e, 'before')}
                            />
                            <label htmlFor="reminder-before-1">1 {i18n.day}</label>
                        </div>
                        <div className="pv-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-before-7"
                                name='before'
                                value={7}
                                checked={form.before.includes(7) ? 'checked' : ''}
                                onChange={(e) => this.handleChange(e, 'before')}
                            />
                            <label htmlFor="reminder-before-7">7 {i18n.days}</label>
                        </div>
                        <div className="pv-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-before-15"
                                name='before'
                                value={15}
                                checked={form.before.includes(15) ? 'checked' : ''}
                                onChange={(e) => this.handleChange(e, 'before')}
                            />
                            <label htmlFor="reminder-before-15">15 {i18n.days}</label>
                        </div>
                        {false && <>
                            <div className="pv-field-checkbox pv-field-checkbox-input pv-mb-10">
                                <input type="checkbox" id="date" name="date" />
                                <input
                                    type="number"
                                    id="unit-number"
                                    name="firstname"
                                    placeholder={1}
                                />
                                <select name="number-type">
                                    <option value="page">{i18n.days}</option>
                                    <option value="hour">{i18n.hour}</option>
                                    <option value="week">{i18n.week}</option>
                                    <option value="month">{i18n.month}</option>
                                </select>
                            </div>
                            <div className="pv-field-checkbox pv-field-checkbox-input">
                                <input type="checkbox" id="date" name="date" />
                                <input
                                    type="number"
                                    id="unit-number"
                                    name="firstname"
                                    placeholder={1}
                                />
                                <select name="number-type">
                                    <option value="page">{i18n.days}</option>
                                    <option value="hour">{i18n.hour}</option>
                                    <option value="week">{i18n.week}</option>
                                    <option value="month">{i18n.month}</option>
                                </select>
                            </div>
                            <button className="pv-btn" style={{ marginLeft: "-20px", color: "#718096", background: "none" }}>
                                <svg
                                    width={12}
                                    height={13}
                                    viewBox="0 0 12 13"
                                    fill="none"
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
                                {i18n.add_new}
                            </button>
                        </>}
                    </div>
                    <div className="col">
                        <label>{i18n.rem} {i18n.after}</label>
                        <div className="pv-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-after-1"
                                name='after'
                                value={1}
                                checked={form.after.includes(1) ? 'checked' : ''}
                                onChange={(e) => this.handleChange(e, 'after')}
                            />
                            <label htmlFor="reminder-after-1">1 {i18n.day}</label>
                        </div>
                        <div className="pv-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-after-7"
                                name='after'
                                value={7}
                                checked={form.after.includes(7) ? 'checked' : ''}
                                onChange={(e) => this.handleChange(e, 'after')}
                            />
                            <label htmlFor="reminder-after-7">7 {i18n.days}</label>
                        </div>
                        <div className="pv-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-after-15"
                                name='after'
                                value={15}
                                checked={form.after.includes(15) ? 'checked' : ''}
                                onChange={(e) => this.handleChange(e, 'after')}
                            />
                            <label htmlFor="reminder-after-15">15 {i18n.days}</label>
                        </div>
                        {false && <>
                            <div className="pv-field-checkbox pv-field-checkbox-input pv-mb-10">
                                <input type="checkbox" id="date" name="date" />
                                <input
                                    type="number"
                                    id="unit-number"
                                    name="firstname"
                                    placeholder={1}
                                />
                                <select name="number-type">
                                    <option value="page">{i18n.days}</option>
                                    <option value="hour">{i18n.hour}</option>
                                    <option value="week">{i18n.week}</option>
                                    <option value="month">{i18n.month}</option>
                                </select>
                            </div>
                            <div className="pv-field-checkbox pv-field-checkbox-input">
                                <input type="checkbox" id="date" name="date" />
                                <input
                                    type="number"
                                    id="unit-number"
                                    name="firstname"
                                    placeholder={1}
                                />
                                <select name="number-type">
                                    <option value="page">{i18n.days}</option>
                                    <option value="hour">{i18n.hour}</option>
                                    <option value="week">{i18n.week}</option>
                                    <option value="month">{i18n.month}</option>
                                </select>
                            </div>
                            <button className="pv-btn" style={{ marginLeft: "-20px", color: "#718096", background: "none" }}>
                                <svg
                                    width={12}
                                    height={13}
                                    viewBox="0 0 12 13"
                                    fill="none"
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
                                {i18n.add_new}
                            </button>
                        </>}
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <button className="pv-btn pv-bg-blue pv-bg-hover-blue">
                            {i18n.save}
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}
