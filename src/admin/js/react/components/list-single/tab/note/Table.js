import React, { useRef, useCallback, useState } from 'react';
import Moment from 'react-moment';

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
        return (
            <div className="pi-note" key={index}>
                <div className="pi-action-content">
                    <button className="pi-active">
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
                    <div className="pi-dropdown-content">
                        <a href="#home">
                            <svg width={13} height={13} viewBox="0 0 13 13">
                                <path
                                    d="M8 2.89286C8 3.66009 7.68393 4.3959 7.12132 4.93842C6.55871 5.48093 5.79565 5.78571 5 5.78571C4.20435 5.78571 3.44129 5.48093 2.87868 4.93842C2.31607 4.3959 2 3.66009 2 2.89286C2 2.12562 2.31607 1.38981 2.87868 0.847298C3.44129 0.304782 4.20435 0 5 0C5.79565 0 6.55871 0.304782 7.12132 0.847298C7.68393 1.38981 8 2.12562 8 2.89286V2.89286ZM16 2.89286C16 3.27275 15.9224 3.64893 15.7716 3.99991C15.6209 4.35088 15.3999 4.66979 15.1213 4.93842C14.8427 5.20704 14.512 5.42013 14.1481 5.56551C13.7841 5.71089 13.394 5.78571 13 5.78571C12.606 5.78571 12.2159 5.71089 11.8519 5.56551C11.488 5.42013 11.1573 5.20704 10.8787 4.93842C10.6001 4.66979 10.3791 4.35088 10.2284 3.99991C10.0776 3.64893 10 3.27275 10 2.89286C10 2.12562 10.3161 1.38981 10.8787 0.847298C11.4413 0.304782 12.2044 0 13 0C13.7956 0 14.5587 0.304782 15.1213 0.847298C15.6839 1.38981 16 2.12562 16 2.89286V2.89286ZM11.93 13.5C11.976 13.1847 12 12.8636 12 12.5357C12.0023 11.0207 11.4737 9.54934 10.5 8.36036C11.2601 7.93719 12.1223 7.71441 13 7.71441C13.8776 7.7144 14.7399 7.93717 15.4999 8.36033C16.26 8.78348 16.8912 9.39211 17.3301 10.125C17.7689 10.858 18 11.6894 18 12.5357V13.5H11.93ZM5 7.71429C6.32608 7.71429 7.59785 8.22226 8.53553 9.12645C9.47322 10.0306 10 11.257 10 12.5357V13.5H0V12.5357C0 11.257 0.526784 10.0306 1.46447 9.12645C2.40215 8.22226 3.67392 7.71429 5 7.71429V7.71429Z"
                                    fill="#5F5F5F"
                                />
                            </svg>
                            Create Invoice
                        </a>
                        <a href="#about">
                            <svg width={13} height={13} viewBox="0 0 13 13">
                                <path
                                    d="M8 2.89286C8 3.66009 7.68393 4.3959 7.12132 4.93842C6.55871 5.48093 5.79565 5.78571 5 5.78571C4.20435 5.78571 3.44129 5.48093 2.87868 4.93842C2.31607 4.3959 2 3.66009 2 2.89286C2 2.12562 2.31607 1.38981 2.87868 0.847298C3.44129 0.304782 4.20435 0 5 0C5.79565 0 6.55871 0.304782 7.12132 0.847298C7.68393 1.38981 8 2.12562 8 2.89286V2.89286ZM16 2.89286C16 3.27275 15.9224 3.64893 15.7716 3.99991C15.6209 4.35088 15.3999 4.66979 15.1213 4.93842C14.8427 5.20704 14.512 5.42013 14.1481 5.56551C13.7841 5.71089 13.394 5.78571 13 5.78571C12.606 5.78571 12.2159 5.71089 11.8519 5.56551C11.488 5.42013 11.1573 5.20704 10.8787 4.93842C10.6001 4.66979 10.3791 4.35088 10.2284 3.99991C10.0776 3.64893 10 3.27275 10 2.89286C10 2.12562 10.3161 1.38981 10.8787 0.847298C11.4413 0.304782 12.2044 0 13 0C13.7956 0 14.5587 0.304782 15.1213 0.847298C15.6839 1.38981 16 2.12562 16 2.89286V2.89286ZM11.93 13.5C11.976 13.1847 12 12.8636 12 12.5357C12.0023 11.0207 11.4737 9.54934 10.5 8.36036C11.2601 7.93719 12.1223 7.71441 13 7.71441C13.8776 7.7144 14.7399 7.93717 15.4999 8.36033C16.26 8.78348 16.8912 9.39211 17.3301 10.125C17.7689 10.858 18 11.6894 18 12.5357V13.5H11.93ZM5 7.71429C6.32608 7.71429 7.59785 8.22226 8.53553 9.12645C9.47322 10.0306 10 11.257 10 12.5357V13.5H0V12.5357C0 11.257 0.526784 10.0306 1.46447 9.12645C2.40215 8.22226 3.67392 7.71429 5 7.71429V7.71429Z"
                                    fill="#5F5F5F"
                                />
                            </svg>
                            Create Proposal
                        </a>
                        <a href="#contact">
                            <svg width={13} height={13} viewBox="0 0 13 13">
                                <path
                                    d="M8 2.89286C8 3.66009 7.68393 4.3959 7.12132 4.93842C6.55871 5.48093 5.79565 5.78571 5 5.78571C4.20435 5.78571 3.44129 5.48093 2.87868 4.93842C2.31607 4.3959 2 3.66009 2 2.89286C2 2.12562 2.31607 1.38981 2.87868 0.847298C3.44129 0.304782 4.20435 0 5 0C5.79565 0 6.55871 0.304782 7.12132 0.847298C7.68393 1.38981 8 2.12562 8 2.89286V2.89286ZM16 2.89286C16 3.27275 15.9224 3.64893 15.7716 3.99991C15.6209 4.35088 15.3999 4.66979 15.1213 4.93842C14.8427 5.20704 14.512 5.42013 14.1481 5.56551C13.7841 5.71089 13.394 5.78571 13 5.78571C12.606 5.78571 12.2159 5.71089 11.8519 5.56551C11.488 5.42013 11.1573 5.20704 10.8787 4.93842C10.6001 4.66979 10.3791 4.35088 10.2284 3.99991C10.0776 3.64893 10 3.27275 10 2.89286C10 2.12562 10.3161 1.38981 10.8787 0.847298C11.4413 0.304782 12.2044 0 13 0C13.7956 0 14.5587 0.304782 15.1213 0.847298C15.6839 1.38981 16 2.12562 16 2.89286V2.89286ZM11.93 13.5C11.976 13.1847 12 12.8636 12 12.5357C12.0023 11.0207 11.4737 9.54934 10.5 8.36036C11.2601 7.93719 12.1223 7.71441 13 7.71441C13.8776 7.7144 14.7399 7.93717 15.4999 8.36033C16.26 8.78348 16.8912 9.39211 17.3301 10.125C17.7689 10.858 18 11.6894 18 12.5357V13.5H11.93ZM5 7.71429C6.32608 7.71429 7.59785 8.22226 8.53553 9.12645C9.47322 10.0306 10 11.257 10 12.5357V13.5H0V12.5357C0 11.257 0.526784 10.0306 1.46447 9.12645C2.40215 8.22226 3.67392 7.71429 5 7.71429V7.71429Z"
                                    fill="#5F5F5F"
                                />
                            </svg>
                            Create Estimate
                        </a>
                        <a href="#contact">
                            <svg width={13} height={13} viewBox="0 0 13 13">
                                <path
                                    d="M8 2.89286C8 3.66009 7.68393 4.3959 7.12132 4.93842C6.55871 5.48093 5.79565 5.78571 5 5.78571C4.20435 5.78571 3.44129 5.48093 2.87868 4.93842C2.31607 4.3959 2 3.66009 2 2.89286C2 2.12562 2.31607 1.38981 2.87868 0.847298C3.44129 0.304782 4.20435 0 5 0C5.79565 0 6.55871 0.304782 7.12132 0.847298C7.68393 1.38981 8 2.12562 8 2.89286V2.89286ZM16 2.89286C16 3.27275 15.9224 3.64893 15.7716 3.99991C15.6209 4.35088 15.3999 4.66979 15.1213 4.93842C14.8427 5.20704 14.512 5.42013 14.1481 5.56551C13.7841 5.71089 13.394 5.78571 13 5.78571C12.606 5.78571 12.2159 5.71089 11.8519 5.56551C11.488 5.42013 11.1573 5.20704 10.8787 4.93842C10.6001 4.66979 10.3791 4.35088 10.2284 3.99991C10.0776 3.64893 10 3.27275 10 2.89286C10 2.12562 10.3161 1.38981 10.8787 0.847298C11.4413 0.304782 12.2044 0 13 0C13.7956 0 14.5587 0.304782 15.1213 0.847298C15.6839 1.38981 16 2.12562 16 2.89286V2.89286ZM11.93 13.5C11.976 13.1847 12 12.8636 12 12.5357C12.0023 11.0207 11.4737 9.54934 10.5 8.36036C11.2601 7.93719 12.1223 7.71441 13 7.71441C13.8776 7.7144 14.7399 7.93717 15.4999 8.36033C16.26 8.78348 16.8912 9.39211 17.3301 10.125C17.7689 10.858 18 11.6894 18 12.5357V13.5H11.93ZM5 7.71429C6.32608 7.71429 7.59785 8.22226 8.53553 9.12645C9.47322 10.0306 10 11.257 10 12.5357V13.5H0V12.5357C0 11.257 0.526784 10.0306 1.46447 9.12645C2.40215 8.22226 3.67392 7.71429 5 7.71429V7.71429Z"
                                    fill="#5F5F5F"
                                />
                            </svg>
                            Create Project
                        </a>
                        <a href="#contact">
                            <svg width={13} height={13} viewBox="0 0 13 13">
                                <path
                                    d="M8 2.89286C8 3.66009 7.68393 4.3959 7.12132 4.93842C6.55871 5.48093 5.79565 5.78571 5 5.78571C4.20435 5.78571 3.44129 5.48093 2.87868 4.93842C2.31607 4.3959 2 3.66009 2 2.89286C2 2.12562 2.31607 1.38981 2.87868 0.847298C3.44129 0.304782 4.20435 0 5 0C5.79565 0 6.55871 0.304782 7.12132 0.847298C7.68393 1.38981 8 2.12562 8 2.89286V2.89286ZM16 2.89286C16 3.27275 15.9224 3.64893 15.7716 3.99991C15.6209 4.35088 15.3999 4.66979 15.1213 4.93842C14.8427 5.20704 14.512 5.42013 14.1481 5.56551C13.7841 5.71089 13.394 5.78571 13 5.78571C12.606 5.78571 12.2159 5.71089 11.8519 5.56551C11.488 5.42013 11.1573 5.20704 10.8787 4.93842C10.6001 4.66979 10.3791 4.35088 10.2284 3.99991C10.0776 3.64893 10 3.27275 10 2.89286C10 2.12562 10.3161 1.38981 10.8787 0.847298C11.4413 0.304782 12.2044 0 13 0C13.7956 0 14.5587 0.304782 15.1213 0.847298C15.6839 1.38981 16 2.12562 16 2.89286V2.89286ZM11.93 13.5C11.976 13.1847 12 12.8636 12 12.5357C12.0023 11.0207 11.4737 9.54934 10.5 8.36036C11.2601 7.93719 12.1223 7.71441 13 7.71441C13.8776 7.7144 14.7399 7.93717 15.4999 8.36033C16.26 8.78348 16.8912 9.39211 17.3301 10.125C17.7689 10.858 18 11.6894 18 12.5357V13.5H11.93ZM5 7.71429C6.32608 7.71429 7.59785 8.22226 8.53553 9.12645C9.47322 10.0306 10 11.257 10 12.5357V13.5H0V12.5357C0 11.257 0.526784 10.0306 1.46447 9.12645C2.40215 8.22226 3.67392 7.71429 5 7.71429V7.71429Z"
                                    fill="#5F5F5F"
                                />
                            </svg>
                            Arcihive
                        </a>
                    </div>
                </div> 

                <div className="pi-avater">
                    <img src={ncpi.assetImgUri + 'avatar.png'} alt="avatar" />
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