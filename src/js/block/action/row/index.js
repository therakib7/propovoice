import React, { useRef, useCallback, useState } from 'react';
import useClickOutside from 'block/outside-click';
import { Edit } from 'block/icon';

export default (props) => {

    const dropdownRef = useRef();
    const [dropdown, setDropdown] = useState(false);
    const close = useCallback(() => setDropdown(false), []);
    useClickOutside(dropdownRef, close);

    const row = props.row;


    const i18n = ndpv.i18n;
    return (
        <div className="pv-action-content">
            <button className={(dropdown ? 'pv-active' : '')} onClick={() => setDropdown(val => !val)} style={{ padding: '0 5px' }} >
                <Edit />
            </button>

            {dropdown && <div className="pv-dropdown-content pv-show" ref={dropdownRef}>
                {props.handleOverview && <a onClick={() => { setDropdown(false); props.handleOverview(row.id) }}>{i18n.ov}</a>}
                {props.editEntry && <a onClick={() => { setDropdown(false); props.editEntry('edit', row) }}>{i18n.edit}</a>}
                <a onClick={() => {
                    setDropdown(false);
                    if (row.file && row.url) {
                        const url = new URL(row.url);
                        const urlParams = new URLSearchParams(url.search);
                        const driveId = urlParams.get('id');
                        props.deleteEntry('singleDrive', [row.id, driveId])
                    } else {

                        props.deleteEntry('single', row.id)
                    }
                }}>{i18n.del}</a>
            </div>}
        </div>
    );
}
