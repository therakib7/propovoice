import { useEffect } from "react";

import ApiSetting from 'api/setting';

export default (props) => {

    useEffect(() => {
        if (!props.id) {
            const path = props.path;
            ApiSetting.getAll('tab=' + path + '_reminder').then(resp => {
                if (resp.data.success) {
                    props.handleDefault(resp.data.data);
                }
            });
        }
    }, []);

    const handleChange = (e, type = null) => {
        props.handleChange(e, type);
    }

    const reminder = props.data;
    return (
        <div className="pi-reminder">
            <div className="pi-form-style-one">
                <div className="row">
                    <div className="col">
                        <label>Reminder</label>
                        <div className="pi-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-due_date"
                                name='due_date'
                                checked={reminder.due_date ? 'checked' : ''}
                                onChange={handleChange}
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
                                checked={reminder.before.includes(1) ? 'checked' : ''}
                                onChange={(e) => handleChange(e, 'before')}
                            />
                            <label htmlFor="reminder-before-1">1 day</label>
                        </div>
                        <div className="pi-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-before-7"
                                name='before'
                                value={7}
                                checked={reminder.before.includes(7) ? 'checked' : ''}
                                onChange={(e) => handleChange(e, 'before')}
                            />
                            <label htmlFor="reminder-before-7">7 days</label>
                        </div>
                        <div className="pi-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-before-15"
                                name='before'
                                value={15}
                                checked={reminder.before.includes(15) ? 'checked' : ''}
                                onChange={(e) => handleChange(e, 'before')}
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
                        <button className="pi-btn">
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
                                checked={reminder.after.includes(1) ? 'checked' : ''}
                                onChange={(e) => handleChange(e, 'after')}
                            />
                            <label htmlFor="reminder-after-1">1 day</label>
                        </div>
                        <div className="pi-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-after-7"
                                name='after'
                                value={7}
                                checked={reminder.after.includes(7) ? 'checked' : ''}
                                onChange={(e) => handleChange(e, 'after')}
                            />
                            <label htmlFor="reminder-after-7">7 days</label>
                        </div>
                        <div className="pi-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-after-15"
                                name='after'
                                value={15}
                                checked={reminder.after.includes(15) ? 'checked' : ''}
                                onChange={(e) => handleChange(e, 'after')}
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
            </div>

        </div>
    );
} 