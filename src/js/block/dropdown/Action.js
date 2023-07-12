import React, { useRef, useCallback, useState } from 'react';
import useClickOutside from 'block/outside-click';
import { Edit } from 'block/icon';

export default (props) => {

    const actionDropdownRef = useRef();
    const [dropdownAction, setDropdownAction] = useState(false);
    const closeAction = useCallback(() => setDropdownAction(false), []);
    useClickOutside(actionDropdownRef, closeAction);

    const row = props.row;
    const i18n = ndpv.i18n;
    return (
        <div
            className={'pv-action-content pv-action-btn'}
            style={{ border: 0 }}
        >
            <button className={(dropdownAction ? 'dpv-active' : '')} onClick={() => setDropdownAction(val => !val)}>
                <Edit />
            </button>

            {dropdownAction && <div className="pv-dropdown-content pv-show" style={{ top: '35px' }} ref={actionDropdownRef}>
                {props.markAllAsRead && <a style={{
                    padding: '5px 16px',
                    fontWeight: 'normal',
                    fontSize: '14px'
                }} onClick={() => { setDropdownAction(false); props.markAllAsRead(); }}>Mark all as read</a>}
            </div>}
        </div>
    );
} 