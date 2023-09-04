import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import api from 'api';
import { Checkbox } from '../../../../html-elements';

const General = () => {
    const [appNotification, setAppNotification] = useState(false);
    const [mailNotification, setMailNotification] = useState(false);
    const [userPreferences, setUserPreferences] = useState({});
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
            getUserPreference("notification_type=app")
            getUserPreference("notification_type=mail")
            isMounted.current = true;
        }
    }, [appNotification, mailNotification])

    console.log("Mail notification", mailNotification)

    const handleAllAppNotificationOnChange = () => {
        const newAppNotification = !appNotification

        changeAllPreferenceState("app", newAppNotification)
        setAppNotification(newAppNotification);
        setTypeChanged("app");
    }

    const handleAllMailNotificationOnChange = () => {
        const newMailNotification = !mailNotification
        changeAllPreferenceState("mail", newMailNotification)
        setMailNotification(newMailNotification);
        setTypeChanged("mail");
    }

    const changeAllPreferenceState = (type, value) => {
        Object.keys(userPreferences)
            .map((slug) => {
                setUserPreferences((prev) => {
                    return { ...prev, [slug]: { ...prev[slug], [type]: value } }
                })
            })
    }


    const getUserPreference = (args) => {
        api.get(`notifications/users/${ndpv.profile.id}/preferences`, args, "pro").then(resp => {
            const preferences = resp.data
            preferences.map((preference) => {
                const { slug, label, notification_type, is_enabled } = preference

                // User preferences object structure
                //
                // userPreferences = {
                //     user_id: 1,
                //     lead_add: {
                //         label: "Lead Add",
                //         mail: 1,
                //         app: 0
                //     }
                // }

                setUserPreferences((prev) => (
                    { ...prev, [slug]: { ...prev[slug], label: label, [notification_type]: parseInt(is_enabled) } }
                ))
            })
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

            <table className="pv-table" style={{ marginTop: "50px" }}>
                <thead>
                    <tr>
                        <th style={{ width: "40%" }}>Action</th>
                        <th style={{ width: "30%" }}>
                            <Checkbox
                                style="switch"
                                label={{ text: "Email", position: "left" }}
                                id="email-footer"
                                name='mail'
                                isChecked={mailNotification ? 'checked' : ''}
                                changeHandler={handleAllMailNotificationOnChange}
                            />
                        </th>
                        <th style={{ width: "30%" }}>
                            <Checkbox
                                style="switch"
                                label={{ text: "In-App", position: "left" }}
                                id="email-footer"
                                name='mail'
                                isChecked={appNotification ? 'checked' : ''}
                                changeHandler={handleAllAppNotificationOnChange}
                            />

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(userPreferences)
                            .map((key, index) => (

                                <tr key={index}>
                                    <td>{userPreferences[key].label}</td>
                                    <td>
                                        <Checkbox
                                            style="switch"
                                            id="email-footer"
                                            name='mail'
                                            isChecked={userPreferences[key]["mail"] ? 'checked' : ''}
                                            changeHandler={() => {}}
                                        />
                                    </td>
                                    <td style={{ color: "#15141A" }}>
                                        <Checkbox
                                            style="switch"
                                            id="email-footer"
                                            name='mail'
                                            isChecked={userPreferences[key]["app"] ? 'checked' : ''}
                                            changeHandler={() => {}}
                                        />
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </>
    );
};

export default General;
