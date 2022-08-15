import React, { useRef, useCallback, useState } from 'react';
import useClickOutside from 'block/outside-click';

const Action = (props) => {

    const dropdownRef = useRef();
    const [dropdown, setDropdown] = useState(false);
    const close = useCallback(() => setDropdown(false), []);
    useClickOutside(dropdownRef, close);

    const showDropdown = () => {
        if (dropdown) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    };

    const row = props.row;
    const i18n = ndpi.i18n;
    return (
        <div className="pi-action-content">
            <button className={(dropdown ? 'pi-active' : '')} onClick={() => showDropdown()} style={{ padding: '0 5px' }} >
                <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
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

            {dropdown && <div className="pi-dropdown-content pi-show" ref={dropdownRef}>
                {props.handleOverview && <a onClick={() => { setDropdown(false); props.handleOverview(row.id) }}>{i18n.ov}</a>}
                <a onClick={() => { setDropdown(false); props.editEntry('edit', row) }}>{i18n.edit}</a>
                <a onClick={() => { setDropdown(false); props.deleteEntry('single', row.id) }}>{i18n.del}</a>
            </div>}
        </div>
    );
}

export default Action;