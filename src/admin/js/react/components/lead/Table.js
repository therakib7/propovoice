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
                    Contact Name
                </th>
                <th>
                    <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M2 3.5h12V12a.5.5 0 01-.5.5h-11A.5.5 0 012 12V3.5z"
                            stroke="#718096"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M14 3.5L8 9 2 3.5"
                            stroke="#718096"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Email
                </th>
                <th>
                    <svg
                        width={15}
                        height={10}
                        viewBox="0 0 15 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11.15 9.275L14 5 11.15.725A.493.493 0 0010.731.5H1.5A.5.5 0 001 1v8a.5.5 0 00.5.5h9.231a.494.494 0 00.419-.225v0z"
                            stroke="#718096"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Lead Level
                </th>
                <th>
                    <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.669 1.619L2.625 2.625 1.619 7.669a.5.5 0 00.137.45l6.525 6.525a.496.496 0 00.706 0l5.657-5.657a.496.496 0 000-.706L8.119 1.756a.5.5 0 00-.45-.137v0z"
                            stroke="#718096"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path d="M5.25 6a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#718096" />
                    </svg>
                    Tag
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

    const showDropdown = (id) => {
        if (dropdown == id) {
            setDropdown(null);
        } else {
            setDropdown(id);
        }
    };

    const navigate = useNavigate();
    const handleOverview = (id) => {
        navigate(`/lead/single/${id}`, { replace: true });
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
                <td>
                    <div className="pi-avater">
                        <img src={ncpi.assetImgUri + 'avatar.png'} alt="avatar" />
                        <span>{row.contact_id.first_name}</span>
                    </div>
                </td>
                <td>{row.contact_id.email}</td>
                <td>
                    <span className="pi-badge pi-bg-orange">
                        <svg
                            width="6"
                            height="6"
                            viewBox="0 0 6 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="3" cy="3" r="3" fill="#F68A0B" />
                        </svg>
                        {row.level_id && row.level_id.label}
                    </span>
                </td>
                <td>
                    {
                        row.tags && row.tags.map((tag, tagIndex) => {
                            return (
                                <span key={tagIndex} className="pi-badge pi-mr-5">{tag.label}</span>
                            )
                        })
                    }
                </td>
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
                                {!wage.length && <a onClick={() => handleOverview(row.id)}>Overview</a>}
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