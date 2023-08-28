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
                        <th>Name</th>
                        <th>
                            <svg
                                className="pv-mt-4"
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="none"
                            >
                                <path
                                    d="M2 3.5h12V12a.5.5 0 01-.5.5h-11A.5.5 0 012 12V3.5z"
                                    stroke="#718096"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M14 3.5L8 9 2 3.5"
                                    stroke="#718096"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Email
                        </th>
                        <th>
                            <svg
                                style={{ top: "1px" }}
                                width={15}
                                height={10}
                                viewBox="0 0 15 10"
                                fill="none"
                            >
                                <path
                                    d="M11.15 9.275L14 5 11.15.725A.493.493 0 0010.731.5H1.5A.5.5 0 001 1v8a.5.5 0 00.5.5h9.231a.494.494 0 00.419-.225v0z"
                                    stroke="#718096"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Role
                        </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className="pv-avater">
                                <img
                                    src="https://www.gravatar.com/avatar/729ae85bf62b9917e93538db2f2688ca?s=40"
                                    alt="avatar"
                                />
                                <span>a</span>
                            </div>
                        </td>
                        <td>dev-email@wpengine.local</td>
                        <td>Administrator</td>
                        <td className="pv-action" />
                    </tr>
                    <tr>
                        <td>
                            <div className="pv-avater">
                                <img
                                    src="https://www.gravatar.com/avatar/def5a49d386a8ff68cf806c0c2d383df?s=40"
                                    alt="avatar"
                                />
                                <span>b</span>
                            </div>
                        </td>
                        <td>b@g.com</td>
                        <td>Staff</td>
                        <td className="pv-action">
                            <div className="pv-action-content">
                                <button className style={{ padding: "0px 5px" }}>
                                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14C6.10457 14 7 13.1046 7 12Z"
                                            fill="#718096"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12Z"
                                            fill="#718096"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14C20.1046 14 21 13.1046 21 12Z"
                                            fill="#718096"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="pv-avater">
                                <img
                                    src="https://www.gravatar.com/avatar/858a4169dc677d8ef31f11982a94847f?s=40"
                                    alt="avatar"
                                />
                                <span>c</span>
                            </div>
                        </td>
                        <td>client2@gmail.com</td>
                        <td>Staff</td>
                        <td className="pv-action">
                            <div className="pv-action-content">
                                <button className style={{ padding: "0px 5px" }}>
                                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14C6.10457 14 7 13.1046 7 12Z"
                                            fill="#718096"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12Z"
                                            fill="#718096"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14C20.1046 14 21 13.1046 21 12Z"
                                            fill="#718096"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="pv-avater">
                                <img
                                    src="https://www.gravatar.com/avatar/e376593b3452d257b1b3bfe26326db0e?s=40"
                                    alt="avatar"
                                />
                                <span>d</span>
                            </div>
                        </td>
                        <td>client3@gmail.com</td>
                        <td>Staff</td>
                        <td className="pv-action">
                            <div className="pv-action-content">
                                <button className style={{ padding: "0px 5px" }}>
                                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14C6.10457 14 7 13.1046 7 12Z"
                                            fill="#718096"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12Z"
                                            fill="#718096"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14C20.1046 14 21 13.1046 21 12Z"
                                            fill="#718096"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>;
        </>
    );
};

export default General;
