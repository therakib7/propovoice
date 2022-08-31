import React, { useCallback, useRef, useState, useEffect } from "react"; 
import useClickOutside from 'block/outside-click';

export default (props) => {

    const dropdownRef = useRef();
    const [dropdown, setDropdown] = useState(false);
    const close = useCallback(() => setDropdown(false), []);
    useClickOutside(dropdownRef, close);

    useEffect(() => {

    }, []);

    const showDropdown = () => {
        if (dropdown) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    };

    const ImportExport = (e, type) => {
        e.preventDefault();
        setDropdown(false);
        alert('Features, In progressing...');
    };

    const i18n = ndpv.i18n;
    return (
        <div className='pv-list-single-button-content'>
            <button
                className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue pv-bg-shadow pv-color-white"
                onClick={() => props.openForm('new')}
            >
                <svg
                    width={14}
                    height={12}
                    viewBox="0 0 12 15"
                    fill="none"
                    
                >
                    <path
                        d="M2.5 8H13.5"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></path>
                    <path
                        d="M8 2.5V13.5"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></path>
                </svg>
                {i18n.add} {props.title}
            </button>

            {false && <div className="pv-action-content pv-action-btn" ref={dropdownRef}>
                <button
                    className="pv-bg-stroke pv-bg-shadow"
                    onClick={() => showDropdown()}
                >
                    <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        
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

                {dropdown && <div className="pv-dropdown-content pv-show">
                    <a onClick={(e) => ImportExport(e, 'import')}>{i18n.imp}</a>
                    <a onClick={(e) => ImportExport(e, 'exoprt')}>{i18n.imp}</a>
                </div>}
            </div>}
        </div>
    );
} 