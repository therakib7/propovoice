import React, { useCallback, useRef, useState, useEffect } from "react";
import useClickOutside from 'block/outside-click';
import { Edit } from 'block/icon';
import Form from "./Form";
// import Empty from 'block/empty';
// import AddNew from 'block/add-new';
import Crud from 'hoc/Crud';



export default Crud((props) => {

    const dropdownRef = useRef();
    const [dropdown, setDropdown] = useState(false);
    const [add, setAdd]=useState(false)
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
        const num = 1;
        setAdd(num)


                // alert('Features, In progressing...');
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
            
            {true && <div className="pv-action-content pv-action-btn" ref={dropdownRef}>
                <button
                    className="pv-bg-stroke pv-bg-shadow"
                    onClick={() => showDropdown()}
                >
                    <Edit />

                </button>
                {add===1 && <Form
				modalType={props.state.formModalType}
				data={props.state.list}
				close={props.closeForm}
                />}
                

                {dropdown && <div className="pv-dropdown-content pv-show">
                    <a onClick={(e) => ImportExport(e, 'import')}>{i18n.imp}</a>
                    <a onClick={(e) => ImportExport(e, 'exoprt')}>{i18n.imp}</a>
                </div>}
            </div>}
        </div>
    );
} )