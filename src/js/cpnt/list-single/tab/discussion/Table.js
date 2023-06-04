import React, { useRef, useCallback, useState } from 'react';
import Action from 'block/action/row';

{/* <div className="pv-note" key={index}>
                <Action
                    row={row}
                    editEntry={props.editEntry}
                    deleteEntry={props.deleteEntry}
                />

                <div className="pv-avater">
                    <img src={ndpv.assetImgUri + 'avatar.png'} alt="avatar" />
                </div>

                <div className="pv-note-text">
                    <h4>{row.by} <span>{row.date}</span></h4>
                    <p>{row.text}</p>
                </div>
            </div> */}

const TableBody = props => {

    let rows = props.tableData.map((row, i) => {
        return (
            <li key={i}>
                {row.date_format && <p><span className="pv-message-data-time">{row.date_format}</span></p>}
                <div className="pv-message-data">
                    <div className="pv-time-content">
                        <span className="pv-time">{row.date_ago}</span>
                        {/* <Action
                            row={row}
                            editEntry={props.editEntry}
                            deleteEntry={props.deleteEntry}
                        /> */}
                    </div>

                    <img src={ndpv.assetImgUri + 'avatar.png'} alt="avatar" />

                    <div className="pv-about">
                        <div className="pv-name">
                            {row.name}
                            <span
                                className="pv-badge pv-ml"
                                style={{ background: ((row.role == 'ndpv_client_role') ? '#39D68A' : '#25A8FF'), marginLeft: 5 }}
                            >
                                {row.role_title}
                            </span>
                        </div>
                        <div className="pv-message">
                            {row.text}
                        </div>
                    </div>
                </div>
            </li>
        );
    });

    return <div className="pv-chat-history"><ul>{rows}</ul></div>;
}

const Table = (props) => {
    const { tableData, editEntry, checkedBoxes, deleteEntry } = props;
    return (
        <>
            {tableData.length > 0 && <TableBody tableData={tableData} editEntry={editEntry} checkedBoxes={checkedBoxes} deleteEntry={deleteEntry} />}
        </>
    );
}

export default Table;