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

    return (
        <div className="pi-table-action pi-mb-10">
            <div className="row">
                <div className="col">
                    <div className="pi-checkbox-field pi-mt-6">
                        <input type="checkbox" defaultChecked={true} onChange={() => props.uncheckAll()} />
                        <span>{props.length} Items Selected</span>
                    </div>
                </div>

                <div className="col">
                    <div className="pi-small-button-group pi-text-right">
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
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Action;