import React, { useRef, useCallback, useState } from 'react';
import Action from 'block/action/row';
import ModalImage from "react-modal-image";

const TableBody = props => {
    const { caps } = ndpv;
    const isClient = caps.includes("ndpv_client_role");

    const bgStyle = (role) => {
        let removeStyle = false;

        if (!isClient && role != 'ndpv_client_role') {
            removeStyle = true;
        }

        if (isClient && role == 'ndpv_client_role') {
            removeStyle = true;
        }

        if (removeStyle) {
            return { background: 'transparent', padding: 0 }
        }
        return {};
    };

    let rows = props.tableData.map((row, i) => {
        return (
            <li key={i}>
                {row.date_format && <p><span className="pv-message-data-time">{row.date_format}</span></p>}
                <div className="pv-message-data">
                    <div className="pv-time-content">
                        <span className="pv-time">{row.date_ago}</span>
                        <Action
                            row={row}
                            editEntry={props.editEntry}
                            deleteEntry={props.deleteEntry}
                        />
                    </div>

                    <img src={ndpv.assetImgUri + 'avatar.png'} alt="avatar" />

                    <div className="pv-about">
                        <div className="pv-name">
                            {row.name}
                            <span
                                className="pv-badge pv-ml"
                                // style={{ background: ((row.me) ? '#39D68A' : '#25A8FF'), marginLeft: 5 }}
                                style={{ background: ((row.role == 'ndpv_client_role') ? '#39D68A' : '#25A8FF'), marginLeft: 5 }}
                            >
                                {row.role_title}
                            </span>
                        </div>
                        <div className="pv-message" style={bgStyle(row.role)}>
                            {row.text}
                        </div>

                        <div className="pv-msg-attach">
                            <ul>
                                {row.attachs.map((item, i) => {
                                    return (
                                        <React.Fragment key={i}>
                                            {item.type == 'pdf' && <li className='pv-attach-pdf'><a href={item.url} target="_blank">
                                                <span className='pv-pdf-icon'>
                                                    <svg
                                                        width={12}
                                                        height={14}
                                                        viewBox="0 0 12 14"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M8.023 4.102a.958.958 0 01-.957-.957V0H2.172C1.342 0 .668.675.668 1.504v10.992c0 .83.675 1.504 1.504 1.504h7.656c.83 0 1.504-.675 1.504-1.504V4.102H8.023zM2.91 9.844H4.9a.41.41 0 010 .82H2.91a.41.41 0 010-.82zM2.5 8.066a.41.41 0 01.41-.41h6.016a.41.41 0 010 .82H2.91a.41.41 0 01-.41-.41zM8.926 5.47a.41.41 0 010 .82H2.91a.41.41 0 010-.82h6.016z"
                                                            fill="#718096"
                                                        />
                                                        <path
                                                            d="M7.887 3.144c0 .076.061.137.136.137h3.126a1.499 1.499 0 00-.287-.375L8.225.41A1.508 1.508 0 007.887.17v2.974z"
                                                            fill="#718096"
                                                        />
                                                    </svg>
                                                </span>
                                                <span className='pv-pdf-name'>{item.name}</span>
                                                <span className='pv-download-pdf'>
                                                    <svg
                                                        width={14}
                                                        height={14}
                                                        viewBox="0 0 14 14"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M1 10v1.5A1.5 1.5 0 002.5 13h9a1.5 1.5 0 001.5-1.5V10m-3-3l-3 3m0 0L4 7m3 3V1"
                                                            stroke="#718096"
                                                            strokeWidth={1.2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </span>
                                            </a></li>}

                                            {item.type != 'pdf' && <li>
                                                <div style={{ width: 100, display: 'inline-block' }}>
                                                    <ModalImage
                                                        small={item.url}
                                                        large={item.url}
                                                    />
                                                </div>
                                            </li>}
                                        </React.Fragment>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div >
            </li >
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