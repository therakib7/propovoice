import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import api from 'api';
export default (props) => {
    const [form, setForm] = useState({
        current_password: '',
        new_password: '',
        confirm_password: '',
    });

    useEffect(() => {
    }, []);

    const handleChange = (e) => {
        const target = e.target;
        const { name } = target;
        const value = target.value;
        setForm({ ...form, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        form.tab = 'password_change';

        api.add('settings', form).then(resp => {
            if (resp.data.success) {
                toast.success(ndpv.i18n.aUpd);
            } else {
                resp.data.data.forEach(function (value) {
                    toast.error(value);
                });
            }
        });
    }

    const i18n = ndpv.i18n;
    return (
        <form onSubmit={handleSubmit} className="pv-form-style-one">
            <div className="row">
                <div className="col">
                    <label htmlFor="field-current-password">
                        Current Password
                    </label>

                    <input
                        id="field-current-password"
                        type="password"
                        required
                        name="current_password"
                        value={form.current_password}
                        onChange={handleChange}
                    />
                </div>
                <div className="col"></div>
            </div>

            <div className="row">
                <div className="col">
                    <label htmlFor="field-new-password">
                        New Password
                    </label>

                    <input
                        id="field-new-password"
                        type="password"
                        required
                        name="new_password"
                        value={form.new_password}
                        onChange={handleChange}
                    />
                </div>
                <div className="col"></div>
            </div>

            <div className="row">
                <div className="col">
                    <label htmlFor="field-confirm-password">
                        Confirm Password
                    </label>

                    <input
                        id="field-confirm-password"
                        type="password"
                        required
                        name="confirm_password"
                        value={form.confirm_password}
                        onChange={handleChange}
                    />
                </div>
                <div className="col"></div>
            </div>

            <div className="row">
                <div className="col">
                    <button className="pv-btn pv-bg-blue pv-bg-hover-blue">
                        Change Password
                    </button>
                </div>
            </div>
        </form>
    );
}