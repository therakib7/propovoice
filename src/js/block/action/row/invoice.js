import React, { useRef, useCallback, useState } from 'react';
import ProLabel from 'block/pro-alert/label';
import useClickOutside from 'block/outside-click';

export default (props) => {

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
    const i18n = ndpv.i18n;
    return (
        <div className="pv-action-content">
            <button className={(dropdown ? 'pv-active' : '')} onClick={() => showDropdown()} style={{ padding: '0 5px' }} >
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

            {dropdown && <div className="pv-dropdown-content pv-show" ref={dropdownRef}> 
                <a onClick={() => { setDropdown(false); props.single(row.id); }}>{i18n.edit}</a>
                <a onClick={() => props.single(row.id, '/tab/preview')}>{i18n.prv}</a>
                <a target='_blank' href={props.client_url}>{i18n.client} {i18n.prv}</a>
                <a onClick={() => { setDropdown(false); props.action('sent', row.id); }}>{i18n.mark} {i18n.as} {i18n.sent}</a>
                {row.path == 'invoice' && <a onClick={() => { setDropdown(false); props.action('paid', row.id); }}>{i18n.mark} {i18n.as} {i18n.paid}</a>}
                {row.path == 'estimate' && <a onClick={() => { setDropdown(false); props.action('accept', row.id); }}>{i18n.mark} {i18n.as} {i18n.accept}</a>}
                {row.path == 'estimate' && <a onClick={() => { setDropdown(false); props.action('decline', row.id); }}>{i18n.mark} {i18n.as} {i18n.dec}</a>}
                <a onClick={() => { setDropdown(false); props.action('copy', row.id); }}>{i18n.dup} <ProLabel /></a>
                {row.path == 'estimate' && <a onClick={() => { setDropdown(false); props.action('copy-to-inv', row.id); }}>{i18n.copy} {i18n.to} {i18n.inv} <ProLabel /></a>}
                <a onClick={() => { setDropdown(false); props.deleteEntry('single', row.id); }}>{i18n.del}</a>
            </div>}
        </div>
    );
} 