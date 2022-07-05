import React, { useRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import useClickOutside from 'block/outside-click';

const TableHeader = props => {
    return (
        <thead>
            <tr>
                <th>
                    <input type="checkbox"
                        
                        // value={row.id}
                        // checked={ props.checkedBoxes.data.find((p) => p.id === row.id)} 
                        onChange={(e) => props.checkedBoxes.handle(e, 'all')}
                    />
                </th>
                <th>
                    Client Name
                </th>
                <th>
                    Email
                </th>
                <th>
                    Company Name
                </th>
                <th>
                    Website
                </th>
                <th>
                    Mobile
                </th>
                <th>
                    Date
                </th>
                <th>
                    Action
                </th>
            </tr>
        </thead>
    );
}

const TableBody = props => {

    const [dropdown, setDropdown] = useState(null); 

    const showDropdown = ( id ) => {
        if ( dropdown == id ) {
            setDropdown(null);
        } else {
            setDropdown(id);
        } 
    };

    const navigate = useNavigate(); 
    const handleOverview = (id) => {
		navigate(`/client/single/${id}`, { replace: true });
    };

    let rows = props.tableData.map((row, index) => {

        // const popover = useRef();
        // useClickOutside(, close);

        let data = props.checkedBoxes.data;
        const checkedCheckbox = (data.indexOf(row.id) !== -1) ? true : false; 
        return (
            <tr key={index}>
                <td>
                    <input type="checkbox"
                        
                        value={row.id}
                        checked={checkedCheckbox}
                        onChange={(e) => props.checkedBoxes.handle(e, 'single', row.id)}
                    />
                </td>
                <td>{row.first_name + ' ' + row.last_name}</td>
                <td>{row.email}</td>
                <td>{row.org_name}</td>
                <td>{row.web}</td>
                <td>{row.mobile}</td>
                <td><Moment format="YYYY-MM-DD">{row.date}</Moment></td>  
                <td className="pi-action">
                    <div className="pi-action-content">
                        <button className={(row.id == dropdown ? 'pi-active' : '')} onClick={() => showDropdown(row.id)}>
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
                        {row.id == dropdown && <div className="pi-dropdown-content pi-show"
                            // ref={popover}
                            > 
                                {/* {!wage.length && <a onClick={() => handleOverview(row.id)}>Overview</a>} */}
                                <a onClick={() => props.editEntry('edit', row)}>Edit</a> 
                                <a onClick={() => props.deleteEntry('single', row.id)}>Delete</a>
                            </div>}
                    </div> 
                </td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}

const Table = (props) => {
    const { tableData, editEntry, checkedBoxes, deleteEntry } = props;
    return (
        <>
            {tableData.length > 0 && <div className='pi-table-wrap'>
                <table className='pi-table'>
                    <TableHeader checkedBoxes={checkedBoxes} />
                    <TableBody tableData={tableData} editEntry={editEntry} checkedBoxes={checkedBoxes} deleteEntry={deleteEntry} />
                </table>
            </div>}
        </>
    );
}

export default Table;