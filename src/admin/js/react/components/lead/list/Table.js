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
                        className="selectsingle"
                        // value={row.id}
                        // checked={ props.checkedBoxes.data.find((p) => p.id === row.id)} 
                        onChange={(e) => props.checkedBoxes.handle(e, 'all')}
                    />
                </th>
                <th>
                    Lead Name
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
		navigate(`/lead/${id}`, { replace: true });
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
                        className="selectsingle"
                        value={row.id}
                        checked={checkedCheckbox}
                        onChange={(e) => props.checkedBoxes.handle(e, 'single', row.id)}
                    />
                </td>
                <td>{row.contact.first_name }</td>
                <td>{row.contact.email}</td>
                <td>{row.contact.org_name}</td>
                <td>{row.contact.web}</td>
                <td>{row.contact.mobile}</td>
                <td><Moment format="YYYY-MM-DD">{row.date}</Moment></td> 
                <td className="pi-action"> 
                    <div className="pi-action-content" >
                        <div className="pi-dropdown">
                            <button className={'pi-dropbtn ' + ( row.id == dropdown ? 'pi-active': '') } onClick={() => showDropdown(row.id) }>
                                <svg width={4} height={20}>
                                    <circle cx={2} cy={2} r={2} fill="#A0AEC0" />
                                    <circle cx={2} cy={10} r={2} fill="#A0AEC0" />
                                    <circle cx={2} cy={18} r={2} fill="#A0AEC0" />
                                </svg>
                            </button>
                            {row.id == dropdown && <div className="pi-dropdown-content pi-show" 
                            // ref={popover}
                            >  
                                {!wage.length && <a onClick={() => handleOverview(row.id)}>Overview</a>}
                                <a onClick={() => props.editEntry('edit', row)}>Edit</a> 
                                <a onClick={() => props.deleteEntry('single', row.id)}>Delete</a>
                            </div>}
                        </div>
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