import React, { useRef, useCallback, useState } from 'react';
import Moment from 'react-moment';
import Action from 'block/action/row';
import Taxonomy from 'block/field/taxonomy';

const TableBody = props => {

    return props.tableData.map((row, index) => {
        let data = props.checkedBoxes.data;
        const checkedCheckbox = (data.indexOf(row.id) !== -1) ? true : false;

        return (
            <div className={"pv-accordion-table-list " + (props.dashboard ? 'pv-mt-15 pv-mb-15' : '')} key={index}>
                {!props.dashboard && <div className="pv-checkbox">
                    <input type="checkbox"
                        value={row.id}
                        checked={checkedCheckbox}
                        onChange={(e) => props.checkedBoxes.handle(e, 'single', row.id)}
                    />
                </div>}
                <ul style={{ padding: (props.dashboard ? '16px 10px 9px 0px' : '') }}>
                    <li style={{ width: '45%' }} className="pv-cursor-pointer" onClick={() => props.editEntry('edit', row)}>
                        <div className={"pv-task-type " + (props.dashboard ? 'pv-mt-10' : '')}>
                            {row.type_id.icon && <img src={row.type_id.icon.src} />}
                            {!row.type_id.icon && <img src={ndpv.assetImgUri + 'task-type/task.png'} alt="" />}

                        </div>
                        <div className="pv-task-type-text">
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
                                {row.start_date && <Moment format="YYYY-MM-DD">{row.start_date}</Moment>}
                                {row.start_date && row.due_date && ' - '}
                                {row.due_date && <Moment format="YYYY-MM-DD">{row.due_date}</Moment>}
                            </p>
                        </div>
                    </li>
                    <li style={{ width: '20%' }}>
                        <Taxonomy key={row.id} id={row.id} data={row.status_id} list={props.taxonomies.status} taxonomy='task_status' title={ndpv.i18n.status} small color />
                    </li>
                    <li style={{ width: '20%' }}>
                        <Taxonomy key={row.id} id={row.id} data={row.priority_id} list={props.taxonomies.priorities} taxonomy='task_priority' title={ndpv.i18n.prior}  small color />
                    </li>
                    {/* <li style={{ width: '15%' }}>
                        <Taxonomy id={row.id} data={row.priority_id} taxonomy='task_priority' title='Priority' small color />
                    </li> */}
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
            {props.tableData.length > 0 &&
                <div className='pv-table-wrap pv-p-m'>
                    <div className='pv-accordion-table-list-area'>
                        <TableBody {...props} />
                    </div>
                </div>
            }
        </>
    );
}

export default Table;