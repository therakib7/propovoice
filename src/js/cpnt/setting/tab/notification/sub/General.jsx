import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import api from 'api';
import { Checkbox } from '../../../../html-elements';

const General = () => {
    const [allIsEnabled, setAllIsEnabled] = useState({
        mail: false,
        app: false
    });
    const [userPreferences, setUserPreferences] = useState({});

    useEffect(() => {
        getUserPreference("notification_type=app")
        getUserPreference("notification_type=mail")
    }, [])


    const handleNotificationChange = (type, action_id = null, action_slug = null) => {
        const data = {
            notification_type: type,
        };

        if (action_id !== null) {
            updateSingleAction(type, action_id, action_slug, data)
            return;
        }
        updateAllActions(type, data)

    }

    const updateSingleAction = (type, action_id, action_slug, data) => {
        const newSingleIsEnabled = !userPreferences[action_slug][type]
        setUserPreferences((prev) => {
            return { ...prev, [action_slug]: { ...prev[action_slug], [type]: newSingleIsEnabled } }
        })
        submitUserPreferences({
            ...data,
            is_enable: newSingleIsEnabled,
            action_id: action_id
        });
    }

    const updateAllActions = (type, data) => {
        const newAllIsEnabled = !allIsEnabled[type]
        changeAllPreferenceState(type, newAllIsEnabled)
        setAllIsEnabled({ ...allIsEnabled, [type]: newAllIsEnabled })
        submitUserPreferences({
            ...data,
            is_enable: newAllIsEnabled,
        });
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
                const { slug, action_id, label, notification_type, is_enabled } = preference

                // User preferences object structure
                //
                // userPreferences = {
                //     lead_add: {
                //         action_id: 1,
                //         label: "Lead Add",
                //         mail: 1,
                //         app: 0
                //     }
                // }

                setUserPreferences((prev) => (
                    { ...prev, [slug]: { ...prev[slug], action_id: action_id, label: label, [notification_type]: parseInt(is_enabled) } }
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
                                isChecked={allIsEnabled["mail"] ? 'checked' : ''}
                                changeHandler={() => handleNotificationChange("mail")}
                            />
                        </th>
                        <th style={{ width: "30%" }}>
                            <Checkbox
                                style="switch"
                                label={{ text: "In-App", position: "left" }}
                                id="email-footer"
                                name='mail'
                                isChecked={allIsEnabled["app"] ? 'checked' : ''}
                                changeHandler={() => handleNotificationChange("app")}
                            />

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(userPreferences)
                            .map((slug, index) => (

                                <tr key={index}>
                                    <td>{userPreferences[slug].label}</td>
                                    <td>
                                        <Checkbox
                                            style="switch"
                                            id="email-footer"
                                            name='mail'
                                            isChecked={userPreferences[slug]["mail"] ? 'checked' : ''}
                                            changeHandler={() => handleNotificationChange("mail", userPreferences[slug].action_id, slug)}
                                        />
                                    </td>
                                    <td style={{ color: "#15141A" }}>
                                        <Checkbox
                                            style="switch"
                                            id="email-footer"
                                            name='mail'
                                            isChecked={userPreferences[slug]["app"] ? 'checked' : ''}
                                            changeHandler={() => handleNotificationChange("app", userPreferences[slug].action_id, slug)}
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
