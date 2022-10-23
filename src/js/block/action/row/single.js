import React, { useRef, useCallback, useState } from 'react';
import ProLabel from 'block/pro-alert/label';
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
        <div
            className={'pv-action-content pv-action-btn pv-bg-stroke pv-bg-shadow ' + (props.class ? props.class : '')}
            style={props.padding ? { padding: props.padding } : {}}
        >
            <button className={(dropdown ? 'dpv-active' : '')} onClick={() => setDropdown(val => !val)}>
                <Edit />
            </button>

            {dropdown && <div className="pv-dropdown-content pv-show" ref={dropdownRef}>
                <a onClick={() => { setDropdown(false); props.edit(); }}>{i18n.edit}</a>
                <a onClick={() => { setDropdown(false); props.del(props.module, props.id) }}>{i18n.del}</a>
            </div>}
        </div>
    );
} 