import React, { useRef, useCallback, useState } from 'react';
import Moment from 'react-moment';
import Action from 'block/action/row';

const TableBody = props => {

    let rows = props.tableData.map((row, index) => {
        return (
            <div className="pi-note" key={index}>
                <Action
                    row={row}
                    editEntry={props.editEntry}
                    deleteEntry={props.deleteEntry}
                />

                <div className="pi-avater">
                    <img src={ndpv.assetImgUri + 'avatar.png'} alt="avatar" />
                </div>

                <div className="pi-note-text">
                    <h4>Nabil Ahmed <span>10 min ago</span></h4>
                    <p>{row.text}</p>
                </div>
            </div>
        );
    });

    return <div className="pi-note-content">{rows}</div>;
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