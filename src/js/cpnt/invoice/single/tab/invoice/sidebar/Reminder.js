import { useEffect } from "react";

export default (props) => {

    useEffect(() => {
        if (!props.id) {
            const path = props.path;
            props.getAll('settings', 'tab=' + path + '_reminder').then(resp => {
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
    const i18n = ndpv.i18n;
    return (
        <div>
            <div className="pv-form-style-one">
                <div className="row">
                    <div className="col">
                        <label>{i18n.rem}</label>
                        <div className="pv-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-due_date"
                                name='due_date'
                                checked={reminder.due_date ? 'checked' : ''}
                                onChange={handleChange}
                            />
                            <label htmlFor="reminder-due_date">{i18n.on} {i18n.dueDate}</label>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <label>{i18n.rem} {i18n.before}</label>
                        <div className="pv-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-before-1"
                                name='before'
                                value={1}
                                checked={reminder.before.includes(1) ? 'checked' : ''}
                                onChange={(e) => handleChange(e, 'before')}
                            />
                            <label htmlFor="reminder-before-1">1 {i18n.day}</label>
                        </div>
                        <div className="pv-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-before-7"
                                name='before'
                                value={7}
                                checked={reminder.before.includes(7) ? 'checked' : ''}
                                onChange={(e) => handleChange(e, 'before')}
                            />
                            <label htmlFor="reminder-before-7">7 {i18n.days}</label>
                        </div>
                        <div className="pv-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-before-15"
                                name='before'
                                value={15}
                                checked={reminder.before.includes(15) ? 'checked' : ''}
                                onChange={(e) => handleChange(e, 'before')}
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
                                {i18n.add} {i18n.new}
                            </button>
                        </>}
                    </div>
                    <div className="col-12">
                        <label>{i18n.rem} {i18n.after}</label>
                        <div className="pv-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-after-1"
                                name='after'
                                value={1}
                                checked={reminder.after.includes(1) ? 'checked' : ''}
                                onChange={(e) => handleChange(e, 'after')}
                            />
                            <label htmlFor="reminder-after-1">1 {i18n.day}</label>
                        </div>
                        <div className="pv-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-after-7"
                                name='after'
                                value={7}
                                checked={reminder.after.includes(7) ? 'checked' : ''}
                                onChange={(e) => handleChange(e, 'after')}
                            />
                            <label htmlFor="reminder-after-7">7 {i18n.days}</label>
                        </div>
                        <div className="pv-field-checkbox">
                            <input
                                type='checkbox'
                                id="reminder-after-15"
                                name='after'
                                value={15}
                                checked={reminder.after.includes(15) ? 'checked' : ''}
                                onChange={(e) => handleChange(e, 'after')}
                            />
                            <label htmlFor="reminder-after-15">15 {i18n.days}</label>
                        </div>
                        {/* <div className="pv-field-checkbox pv-field-checkbox-input">
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
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
} 