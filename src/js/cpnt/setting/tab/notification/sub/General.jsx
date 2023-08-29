import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import api from 'api';

const General = (props) => {
    const [appNotification, setAppNotification] = useState(true);
    const [mailNotification, setMailNotification] = useState(true);
    const [typeChanged, setTypeChanged] = useState();
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current) {
            if (typeChanged == "app") {
                const data = {
                    notification_type: "app",
                    is_enable: appNotification
                };
                submitUserPreferences(data);
            };

            if (typeChanged == "mail") {
                const data = {
                    notification_type: "mail",
                    is_enable: mailNotification
                };
                submitUserPreferences(data);
            };

        } else {
            getUserPreference("notification_type=app", setAppNotification)
            getUserPreference("notification_type=mail", setMailNotification)
            isMounted.current = true;
        }
    }, [appNotification, mailNotification])


    const handleAppNotificationOnChange = () => {
        setAppNotification(!appNotification);
        setTypeChanged("app");
    }
    const handleMailNotificationOnChange = () => {
        setMailNotification(!mailNotification);
        setTypeChanged("mail");
    }


    const getUserPreference = (args, callback) => {
        api.get(`notifications/users/${ndpv.profile.id}/preferences`, args, "pro").then(resp => {
            callback(resp.data);
        });
    }

    const submitUserPreferences = (data) => {
        api.add(`notifications/users/${ndpv.profile.id}/preferences`, data, "pro").then(resp => {
            toast.success("Notification Preference updated successfully!!!")
        });
    }

    return (
        <>

            <h4 className="pv-title-medium pv-mt-15 pv-mb-15">Notification customization</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="row">
                    <div className="col">
                        <label id="email-footer">Receive app notification</label>
                        <div className="pv-field-switch pv-ml-10">
                            <label className='pv-switch'>
                                <input type='checkbox'
                                    id="email-footer"
                                    name='app'
                                    checked={appNotification ? 'checked' : ''}
                                    onChange={handleAppNotificationOnChange}
                                />
                                <span className='pv-switch-slider pv-round'></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label id="email-footer">Receive notification mail</label>
                        <div className="pv-field-switch pv-ml-10">
                            <label className='pv-switch'>
                                <input type='checkbox'
                                    id="email-footer"
                                    name='mail'
                                    checked={mailNotification ? 'checked' : ''}
                                    onChange={handleMailNotificationOnChange}
                                />
                                <span className='pv-switch-slider pv-round'></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <table className="pv-table" style={{ marginTop: "50px" }}>
                <thead>
                    <tr>
                        <th>
                            Action
                        </th>
                        <th>
                            Email

                            <div className="pv-field-switch pv-ml-10">
                                <label className='pv-switch'>
                                    <input type='checkbox'
                                        id="email-footer"
                                        name='mail'
                                        checked={mailNotification ? 'checked' : ''}
                                        onChange={handleMailNotificationOnChange}
                                    />
                                    <span className='pv-switch-slider pv-round'></span>
                                </label>
                            </div>
                        </th>
                        <th>
                            In-App

                            <div className="pv-field-switch pv-ml-10">
                                <label className='pv-switch'>
                                    <input type='checkbox'
                                        id="email-footer"
                                        name='mail'
                                        checked={appNotification ? 'checked' : ''}
                                        onChange={handleAppNotificationOnChange}
                                    />
                                    <span className='pv-switch-slider pv-round'></span>
                                </label>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Lead Add</td>
                        <td>
                            <div className="pv-field-switch pv-ml-10">
                                <label className='pv-switch'>
                                    <input type='checkbox'
                                        id="email-footer"
                                        name='mail'
                                        checked={mailNotification ? 'checked' : ''}
                                        onChange={handleMailNotificationOnChange}
                                    />
                                    <span className='pv-switch-slider pv-round'></span>
                                </label>
                            </div>
                        </td>
                        <td>

                            <div className="pv-field-switch pv-ml-10">
                                <label className='pv-switch'>
                                    <input type='checkbox'
                                        id="email-footer"
                                        name='mail'
                                        checked={appNotification ? 'checked' : ''}
                                        onChange={handleAppNotificationOnChange}
                                    />
                                    <span className='pv-switch-slider pv-round'></span>
                                </label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Lead Add</td>
                        <td>
                            <div className="pv-field-switch pv-ml-10">
                                <label className='pv-switch'>
                                    <input type='checkbox'
                                        id="email-footer"
                                        name='mail'
                                        checked={mailNotification ? 'checked' : ''}
                                        onChange={handleMailNotificationOnChange}
                                    />
                                    <span className='pv-switch-slider pv-round'></span>
                                </label>
                            </div>
                        </td>
                        <td>

                            <div className="pv-field-switch pv-ml-10">
                                <label className='pv-switch'>
                                    <input type='checkbox'
                                        id="email-footer"
                                        name='mail'
                                        checked={appNotification ? 'checked' : ''}
                                        onChange={handleAppNotificationOnChange}
                                    />
                                    <span className='pv-switch-slider pv-round'></span>
                                </label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Lead Add</td>
                        <td>
                            <div className="pv-field-switch pv-ml-10">
                                <label className='pv-switch'>
                                    <input type='checkbox'
                                        id="email-footer"
                                        name='mail'
                                        checked={mailNotification ? 'checked' : ''}
                                        onChange={handleMailNotificationOnChange}
                                    />
                                    <span className='pv-switch-slider pv-round'></span>
                                </label>
                            </div>
                        </td>
                        <td>

                            <div className="pv-field-switch pv-ml-10">
                                <label className='pv-switch'>
                                    <input type='checkbox'
                                        id="email-footer"
                                        name='mail'
                                        checked={appNotification ? 'checked' : ''}
                                        onChange={handleAppNotificationOnChange}
                                    />
                                    <span className='pv-switch-slider pv-round'></span>
                                </label>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default General;
