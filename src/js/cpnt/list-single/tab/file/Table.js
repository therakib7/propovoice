import React, { useRef, useCallback, useState } from 'react';
import Moment from 'react-moment';

const TableHeader = props => {
    const i18n = ndpi.i18n;
    return (
        <thead>
            <tr>
                <th>
                    <input type="checkbox"
                        onChange={(e) => props.checkedBoxes.handle(e, 'all')}
                    />
                </th>
                <th>File Name &amp; Description</th>
                <th>
                    <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8 10C10.2091 10 12 8.20914 12 6C12 3.79086 10.2091 2 8 2C5.79086 2 4 3.79086 4 6C4 8.20914 5.79086 10 8 10Z"
                            stroke="#718096"
                            strokeMiterlimit={10}
                        />
                        <path
                            d="M1.9375 13.5001C2.55184 12.4358 3.43552 11.552 4.49972 10.9375C5.56392 10.323 6.77113 9.99951 8 9.99951C9.22887 9.99951 10.4361 10.323 11.5003 10.9375C12.5645 11.552 13.4482 12.4358 14.0625 13.5001"
                            stroke="#718096"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Uploaded by
                </th>
                <th>
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
                    Time
                </th>
                <th>
                    {i18n.action}
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

    let rows = props.tableData.map((row, index) => {
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
                    {row.file && <img src={row.file.src} alt="file" width="40" />}
                    {!row.file && <img src={ndpi.assetImgUri + 'file.png'} alt="file" />}
                    <span><a target='_blank' href={row.url}>{row.title}</a></span>
                </td>
                <td>
                    <div className="pi-avater">
                        <img src={row.upload_by} alt="avatar" />
                    </div>
                </td>
                <td>{row.date}</td>
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
                            {row.type == 'link' && <a onClick={() => props.editEntry('edit', row)}>{i18n.edit}</a>}
                            <a onClick={() => props.deleteEntry('single', row.id)}>{i18n.del}</a>
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
                <table className='pi-table pi-table-three'>
                    <TableHeader checkedBoxes={checkedBoxes} />
                    <TableBody tableData={tableData} editEntry={editEntry} checkedBoxes={checkedBoxes} deleteEntry={deleteEntry} />
                </table>
            </div>}
        </>
    );
}

export default Table;