import React, { useRef, useCallback, useState } from 'react';
import useClickOutside from 'block/outside-click';
import { Edit } from 'block/icon';

import { toast } from "react-toastify";
import api from 'api';

export default (props) => {

    const dropdownRef = useRef();
    const [dropdown, setDropdown] = useState(false);
    const close = useCallback(() => setDropdown(false), []);
    useClickOutside(dropdownRef, close);

    const { row, project, boardView } = props;
    const { i18n, caps } = ndpv;
    const isClient = caps.includes("ndpv_client_role");
    const isStaff = caps.includes("ndpv_staff");

    let overview = true;
    if (project && isClient && boardView) {
        overview = false;
    }

    const resendPassword = (id, from) => {

        let newForm = {
            id,
            from,
            type: 'resend-password'
        };

        api.add('actions', newForm, 'pro').then(resp => {
            if (resp.data.success) {
                toast.success('Password resent');
            } else {
                resp.data.data.forEach(function (value) {
                    toast.error(value);
                });
            }
        });
    }

    return (
        <div className="pv-action-content">
            <button className={(dropdown ? 'pv-active' : '')} onClick={() => setDropdown(val => !val)} style={{ padding: '0 5px' }} >
                <Edit />
            </button>

            {dropdown && <div className="pv-dropdown-content pv-show" ref={dropdownRef}>
                {overview && props.handleOverview && <a onClick={() => { setDropdown(false); props.handleOverview(row.id) }}>{i18n.ov}</a>}
                {!isClient && props.editEntry && <a onClick={() => { setDropdown(false); props.editEntry('edit', row) }}>{i18n.edit}</a>}
                {!isClient && <a onClick={() => {
                    setDropdown(false);
                    if (row.file && row.url) {
                        const url = new URL(row.url);
                        const urlParams = new URLSearchParams(url.search);
                        const driveId = urlParams.get('id');
                        props.deleteEntry('singleDrive', [row.id, driveId])
                    } else {

                        props.deleteEntry('single', row.id)
                    }
                }}>{i18n.del}</a>}
                {props.resendPassword && props.resendPassword.show && <a onClick={() => { setDropdown(false); resendPassword(row.id, props.resendPassword.from) }}>Resend Password</a>}
            </div>}
        </div>
    );
}
