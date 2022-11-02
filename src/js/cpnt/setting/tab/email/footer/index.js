import { useState, useEffect } from "react";
import Taxonomy from 'block/field/taxonomy/setting';
import { toast } from 'react-toastify';
import api from 'api';
import pro from 'block/pro-alert';
export default (props) => {
    const [form, setForm] = useState({
        id: null,
        active: true,
        text: ""
    });

    useEffect(() => {
        api.get('settings', 'tab=email_footer').then(resp => {
            if (resp.data.success) {
                setForm(resp.data.data);
            }
        });
    }, []);

    const handleChange = (e) => {
        const target = e.target;
        const { name } = target;
        const value = target.type == 'checkbox' ? target.checked : target.value;
        setForm({ ...form, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        form.tab = 'email_footer';

        api.add('settings', form).then(resp => {
            if (resp.data.success) {
                toast.success(ndpv.i18n.aUpd);
            } else {
                resp.data.data.forEach(function (value, index, array) {
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
                    <label id="form-active">Show Template Footer</label>
                    <div className="pv-field-switch pv-ml-10">
                        <label className='pv-switch'>
                            <input type='checkbox'
                                id="form-active"
                                name='active'
                                checked={form.active ? 'checked' : ''}
                                onChange={handleChange}
                            />
                            <span className='pv-switch-slider pv-round'></span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <label htmlFor="form-text">Text</label>
                    <textarea
                        id="form-text"
                        rows={3}
                        name="text"
                        value={form.text}
                        onChange={handleChange}
                    />
                    {/* <p className='pv-field-desc'><b>{i18n.var}:</b> {'{id}'}, {'{client_name}'}, {'{date}'}, {'{due_date}'}, {'{amount}'}, {'{org_name}'}</p> */}
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <label>Social Links</label>
                    <Taxonomy taxonomy='email_social' title='Social' url icon />
                </div>
                <div className="col"></div>
            </div>

            <div className="row">
                <div className="col">
                    <button className="pv-btn pv-bg-blue pv-bg-hover-blue">
                        {ndpv.i18n.save}
                    </button>
                </div>
            </div>
        </form>
    );
} 