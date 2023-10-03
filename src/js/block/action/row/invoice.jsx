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

    let canEdit = true;
    switch (row.status) {
        case 'accept':
        case 'decline':
        case 'paid':
            canEdit = false;
            break;
    }

    const { i18n, caps } = ndpv;

    let recurring = row.invoice.recurring;
    const isClient = caps.includes("ndpv_client_role");
    return (
        <div className="pv-action-content">
            <button className={(dropdown ? 'pv-active' : '')} onClick={() => setDropdown(val => !val)} style={{ padding: '0 5px' }} >
                <Edit />
            </button>

            {dropdown && <div className="pv-dropdown-content pv-show" ref={dropdownRef}>
                {!isClient && canEdit && <a onClick={() => { setDropdown(false); props.single(row); }}>{i18n.edit}</a>}
                {!isClient && <a onClick={() => props.single(row, '/tab/preview')}>{i18n.prv}</a>}
                <a target='_blank' href={props.client_url}>{isClient ? i18n.prv : i18n.client + ' ' + i18n.prv}</a>
                {false && row.path == 'invoice' && (recurring.status && recurring.hasOwnProperty('subscription') && recurring.subscription) && <a onClick={() => props.single(row, '/subscription')}>{i18n.substion + ' ' + i18n.hst}</a>}
                {!isClient && (row.status != 'paid' && row.status != 'accept') && <a onClick={() => { setDropdown(false); props.action('sent', row.id); }}>{i18n.mark} {i18n.sent}</a>}
                {!isClient && row.path == 'invoice' && row.status != 'paid' && <a onClick={() => { setDropdown(false); props.action('paid', row.id); }}>{i18n.mark} {i18n.paid}</a>}
                {!isClient && row.path == 'estimate' && <a onClick={() => { setDropdown(false); props.action('accept', row.id); }}>{i18n.mark} {i18n.acptd}</a>}
                {!isClient && row.path == 'estimate' && <a onClick={() => { setDropdown(false); props.action('decline', row.id); }}>{i18n.mark} {i18n.dec}</a>}
                {!isClient && <a onClick={() => { setDropdown(false); props.action('copy', row.id); }}>{i18n.dup} <ProLabel /></a>}
                {!isClient && row.path == 'estimate' && <a onClick={() => { setDropdown(false); props.action('copy-to-inv', row.id); }}>{i18n.copy} {i18n.to} {i18n.inv} <ProLabel /></a>}
                {!isClient && <a onClick={() => { setDropdown(false); props.deleteEntry('single', row.id); }}>{i18n.del}</a>}
            </div>}
        </div>
    );
}