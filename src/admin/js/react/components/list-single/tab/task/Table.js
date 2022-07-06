import React, { useRef, useCallback, useState } from 'react';
import Moment from 'react-moment';
import Action from 'block/action/row';
import Taxonomy from 'block/field/taxonomy';

const TableBody = props => {  

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
                        <div className="pi-task-type">
                            {row.type_id.icon && <img src={row.type_id.icon.src} />}
                            {!row.type_id.icon && <svg
                                width={16}
                                height={20}
                                viewBox="0 0 16 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5 3H3C2.46957 3 1.96086 3.21071 1.58579 3.58579C1.21071 3.96086 1 4.46957 1 5V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H13C13.5304 19 14.0391 18.7893 14.4142 18.4142C14.7893 18.0391 15 17.5304 15 17V5C15 4.46957 14.7893 3.96086 14.4142 3.58579C14.0391 3.21071 13.5304 3 13 3H11M5 3C5 3.53043 5.21071 4.03914 5.58579 4.41421C5.96086 4.78929 6.46957 5 7 5H9C9.53043 5 10.0391 4.78929 10.4142 4.41421C10.7893 4.03914 11 3.53043 11 3M5 3C5 2.46957 5.21071 1.96086 5.58579 1.58579C5.96086 1.21071 6.46957 1 7 1H9C9.53043 1 10.0391 1.21071 10.4142 1.58579C10.7893 1.96086 11 2.46957 11 3M5 12L7 14L11 10"
                                    stroke="#CBD5E0"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>}

                        </div>
                        <div className="pi-task-type-text">
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
                                {/* May 09, 12:30 PM-01:00 PM */}
                                <Moment format="YYYY-MM-DD">{row.date}</Moment>
                            </p>
                        </div>
                    </li>
                    <li>
                    </li>
                    <li>
                        <Taxonomy id={row.id} taxonomy='task_status' title='Status' small={true} color={true} /> 
                    </li>
                    <li>
                        <Taxonomy id={row.id} taxonomy='task_priority' title='Priority' small={true} color={true} />  
                    </li>
                    <li> 
                        <Action
                            row={row}
                            editEntry={props.editEntry}
                            deleteEntry={props.deleteEntry}
                        />
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