import React, { useRef, useCallback, useState } from 'react';
import Moment from 'react-moment';

const TableBody = props => {

    const [dropdown, setDropdown] = useState({id: null, type: null});

    const showDropdown = (id, type) => {
        if (dropdown.id == id && dropdown.type == type ) {
            setDropdown({id: null, type: null});
        } else {
            setDropdown({id, type});
        }
    };

    const setTax = (e, post_id, key, value) => {
        e.preventDefault(); 
        let form = { 
            id: post_id, 
        }  
        form[key] = value; 

        props.handleSubmit(form);
    }; 

    const taxonomies = props.taxonomies; 

    return props.tableData.map((row, index) => {
        let data = props.checkedBoxes.data;
        const checkedCheckbox = (data.indexOf(row.id) !== -1) ? true : false;

        const status = row.status_id;
        const priority = row.priority_id;
        return (
            <div className="pi-accordion-table-list" key={index}>
                <div className="pi-checkbox">
                    <input type="checkbox"
                        value={row.id}
                        checked={checkedCheckbox}
                        onChange={(e) => props.checkedBoxes.handle(e, 'single', row.id)}
                    />
                </div>
                <ul>
                    <li className="pi-cursor-pointer" onClick={() => props.editEntry('edit', row)}>
                        <div className="pi-envelope">
                            <svg
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2 3.5H14V12C14 12.1326 13.9473 12.2598 13.8536 12.3536C13.7598 12.4473 13.6326 12.5 13.5 12.5H2.5C2.36739 12.5 2.24021 12.4473 2.14645 12.3536C2.05268 12.2598 2 12.1326 2 12V3.5Z"
                                    stroke="#A0AEC0"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M14 3.5L8 9L2 3.5"
                                    stroke="#A0AEC0"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <div className="pi-envelope-text">
                            <h4>{row.title}</h4>
                            <p>
                                <svg
                                    width={12}
                                    height={12}
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6 10.5C8.48528 10.5 10.5 8.48528 10.5 6C10.5 3.51472 8.48528 1.5 6 1.5C3.51472 1.5 1.5 3.51472 1.5 6C1.5 8.48528 3.51472 10.5 6 10.5Z"
                                        stroke="#718096"
                                        strokeMiterlimit={10}
                                    />
                                    <path
                                        d="M6 3.375V6H8.625"
                                        stroke="#718096"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                May 09, 12:30 PM-01:00 PM
                            </p>
                        </div>
                    </li>
                    <li>
                    </li> 
                    <li>
                        <div className="pi-action-content"> 
                            {(status.color && status.bg_color) && <span className="pi-badge"
                                onClick={() => showDropdown(row.id, 'status')}
                                style={{
                                    backgroundColor: status.bg_color,
                                    color: status.color
                                }}
                            >
                                <svg
                                    width={6}
                                    height={6}
                                    viewBox="0 0 6 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx={3} cy={3} r={3} fill={status.color} />
                                </svg>
                                {status.label}
                            </span>}

                            {(!status.color || !status.bg_color) && <span className="pi-badge">
                                {status.label}
                            </span>}
                            
                            { ( dropdown.id == row.id && dropdown.type == 'status' ) &&<div className="pi-dropdown-content pi-show">
                                {taxonomies.status && taxonomies.status.map((item, itemIndex) => {
                                    return (
                                        <a onClick={(e) => setTax(e, row.id, 'status_id', item.id )} key={itemIndex}>
                                            {item.label}
                                        </a>
                                    )
                                })}
                            </div>}
                        </div>
                    </li>
                    <li>
                        <div className="pi-action-content"> 
                            {(priority.color && priority.bg_color) && <span className="pi-badge"
                                onClick={() => showDropdown(row.id, 'priority')}
                                style={{
                                    backgroundColor: priority.bg_color,
                                    color: priority.color
                                }}
                            >
                                <svg
                                    width={6}
                                    height={6}
                                    viewBox="0 0 6 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx={3} cy={3} r={3} fill={priority.color} />
                                </svg>
                                {priority.label}
                            </span>}

                            {(!priority.color || !priority.bg_color) && <span className="pi-badge">
                                {priority.label}
                            </span>}
                            
                            { ( dropdown.id == row.id && dropdown.type == 'priority' ) &&<div className="pi-dropdown-content pi-show">
                                {taxonomies.priorities && taxonomies.priorities.map((item, itemIndex) => {
                                    return (
                                        <a onClick={(e) => setTax(e, row.id, 'priority_id', item.id )} key={itemIndex}>
                                            {item.label}
                                        </a>
                                    )
                                })}
                            </div>}
                        </div>
                    </li>
                    <li>
                        <div className="pi-action-content">
                            <button className={(row.id == dropdown ? 'pi-active' : '')} onClick={() => showDropdown(row.id, 'action')}>
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
                            { ( dropdown.id == row.id && dropdown.type == 'action' )  && <div className="pi-dropdown-content pi-show"
                            // ref={popover}
                            >
                                <a onClick={() => props.editEntry('edit', row)}>Edit</a>
                                <a onClick={() => props.deleteEntry('single', row.id, 'task')}>Delete</a>
                            </div>}
                        </div>
                    </li>
                </ul>
            </div>
        );
    });
}

const Table = (props) => { 
    return (
        <>
            {props.tableData.length > 0 && <div className='pi-accordion-table-list-area'>
                <TableBody {...props} />
            </div>}
        </>
    );
}

export default Table;