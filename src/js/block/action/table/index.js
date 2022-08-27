import React, { useRef, useCallback, useState } from 'react';
import useClickOutside from 'block/outside-click';

export default (props) => {

    const dropdownRef = useRef();
    const [dropdown, setDropdown] = useState(false);
    const close = useCallback(() => setDropdown(false), []);
    useClickOutside(dropdownRef, close);

    /* const showDropdown = () => {
        if (dropdown) {
            setDropdown(false);
        } else {
            setDropdown(true);
        }
    }; */

    return (
        <div className="pi-table-action pi-mb-10">
            <div className="pi-checkbox-field pi-mt-6">
                <input type="checkbox" defaultChecked onChange={() => props.uncheckAll()} />
                <span>{props.length}  {ndpv.i18n.iselec} </span>
            </div>
            <div className="pi-small-button-group">
                {/*<button className="pi-btn pi-btn-small pi-bg-stroke pi-bg-shadow pi-bg-hover-shadow">
                    Export CVC
                </button>
                <button className="pi-btn pi-btn-small pi-bg-stroke pi-bg-shadow pi-bg-hover-shadow">
                    Active
                </button>
                <button className="pi-btn pi-btn-small pi-bg-stroke pi-bg-shadow pi-bg-hover-shadow">
                    Archive
                </button>*/}
                <button
                    className="pi-btn pi-btn-small pi-bg-stroke pi-bg-shadow pi-bg-hover-shadow"
                    onClick={() => props.deleteEntry('selected')}
                >
                    {ndpv.i18n.del}
                </button>
            </div>
        </div>
    );
} 