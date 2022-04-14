import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Feedback from './feedback';

//payment
import Bank from './payment/Bank';
import Paypal from './payment/Paypal';
import Stripe from './payment/Stripe';

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
                    {props.path == 'invoice' ? 'Invoice' : 'Estimate'} ID
                </th>
                {/* <th>
                    Project
                </th> */}
                {!props.client_id && <th>
                    Client
                </th>}
                <th>
                    Total
                </th>

                {(props.path == 'invoice') &&
                    <>
                        <th>Paid</th>
                        <th>Due</th>
                    </>
                }
                <th>
                    Date
                </th>
                <th>
                    Status
                </th>
                {(props.path == 'invoice') &&
                    <th>
                        Payment Method
                    </th>
                }
                <th>
                    Action
                </th>
            </tr>
        </thead>
    );
}

const TableBody = props => {

    let navigate = useNavigate();
    function handleClick(id) {
        let path = props.path;
        navigate(`/${path}/single/${id}`, { replace: true });
    }

    let rows = props.tableData.map((row, index) => {
        let data = props.checkedBoxes.data;
        const checkedCheckbox = (data.indexOf(row.id) !== -1) ? true : false;

        let status;
        switch (row.status) {
            case 'draft':
                status = <span className='pi-status pi-bg-pink'>Draft</span>
                break;

            case 'sent':
                status = <span className='pi-status pi-bg-gray'>Sent</span>
                break;

            case 'viewed':
                status = <span className='pi-status piBgOrange'>Viewed</span>
                break;

            case 'accept':
                status = <span className='pi-status pi-bg-blue pi-cursor-pointer' onClick={() => props.infoModal(row, 'feedback')}>Accepted</span>
                break;

            case 'decline':
                status = <span className='pi-status pi-bg-red pi-cursor-pointer' onClick={() => props.infoModal(row, 'feedback')}>Declined</span>
                break;

            case 'paid_req':
                status = <span className='pi-status piBgOrange'>Paid Request</span>
                break;

            case 'paid':
                status = <span className='pi-status pi-bg-blue'>Paid</span>
                break;
        }

        let payment_method;
        switch (row.payment_method) {
            case 'bank':
                payment_method = <span className='pi-status pi-cursor-pointer' style={{ backgroundColor: '#4A5568' }} onClick={() => props.infoModal(row, 'bank')}>Bank</span>
                break;

            case 'paypal':
                payment_method = <span className='pi-status pi-cursor-pointer' style={{ backgroundColor: '#009cde' }} onClick={() => props.infoModal(row, 'paypal')}>Paypal</span>
                break;

            case 'stripe':
                payment_method = <span className='pi-status pi-cursor-pointer' style={{ backgroundColor: '#5433FF' }} onClick={() => props.infoModal(row, 'stripe')}>Stripe</span>
                break;
        }

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
                <td>{row.id}</td>
                {/* <td>{row.project.name}</td>*/}
                {!props.client_id && <td>
                    {row.to.first_name + ' ' + row.to.last_name}
                </td>}
                <td>{row.total}</td>
                {(props.path == 'invoice') &&
                    <>
                        <td>{row.paid}</td>
                        <td>{row.due}</td>
                    </>
                }
                <td>{row.date}</td>
                <td>{status}</td>
                {(props.path == 'invoice') && <td>{payment_method}</td>}
                <td className="pi-action">
                    { true && <><span onClick={() => handleClick(row.id)} ><svg
                        width={13}
                        height={13}
                        viewBox="0 0 13 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12.524.476a1.625 1.625 0 00-2.298 0L4.062 6.64v2.297H6.36l6.164-6.163a1.625 1.625 0 000-2.298z"
                            fill="#A0AEC0"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 3.25a1.625 1.625 0 011.625-1.625h3.25a.813.813 0 110 1.625h-3.25v8.125H9.75v-3.25a.813.813 0 011.625 0v3.25A1.625 1.625 0 019.75 13H1.625A1.625 1.625 0 010 11.375V3.25z"
                            fill="#A0AEC0"
                        />
                    </svg></span>
                    <span onClick={() => props.deleteEntry('single', row.id)} ><svg
                        width={15}
                        height={15}
                        viewBox="0 0 9 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8.073 2.387a.39.39 0 01-.345.388l-.045.003h-.33l-.48 4.886a1.073 1.073 0 01-1.069.967H2.927a1.073 1.073 0 01-1.068-.967l-.48-4.886h-.33a.39.39 0 010-.78h1.95a1.366 1.366 0 112.732 0h1.952a.39.39 0 01.39.39zm-2.83 1.269a.293.293 0 00-.29.253l-.002.04V6.68l.003.04a.293.293 0 00.58 0l.002-.04V3.948l-.002-.04a.293.293 0 00-.29-.252zm-1.756 0a.293.293 0 00-.29.253l-.002.04V6.68l.003.04a.293.293 0 00.58 0l.002-.04V3.948l-.003-.04a.293.293 0 00-.29-.252zm.879-2.244a.585.585 0 00-.586.585h1.17a.585.585 0 00-.584-.585z"
                            fill="#718096"
                        />
                    </svg></span></>}

                    {false && <div className="pi-action-content"> 
                        <div className="pi-dropdown">
                            <a className="pi-dropbtn">
                                <svg width={4} height={20}>
                                    <circle cx={2} cy={2} r={2} fill="#A0AEC0" />
                                    <circle cx={2} cy={10} r={2} fill="#A0AEC0" />
                                    <circle cx={2} cy={18} r={2} fill="#A0AEC0" />
                                </svg>
                            </a>
                            <div id="myDropdown" className="pi-dropdown-content pi-show">
                                <a href="#home">
                                    <svg width={13} height={13}>
                                        <path
                                            d="M12.5241 0.47579C12.2193 0.171142 11.8061 0 11.3752 0C10.9443 0 10.531 0.171142 10.2263 0.47579L4.0625 6.63957V8.93738H6.36031L12.5241 2.7736C12.8287 2.46886 12.9999 2.0556 12.9999 1.62469C12.9999 1.19379 12.8287 0.78053 12.5241 0.47579Z"
                                            fill="#A0AEC0"
                                        />
                                        <path
                                            d="M0 3.24978C0 2.81879 0.171209 2.40546 0.475963 2.1007C0.780718 1.79595 1.19405 1.62474 1.62504 1.62474H4.87512C5.09062 1.62474 5.29728 1.71034 5.44966 1.86272C5.60204 2.0151 5.68764 2.22177 5.68764 2.43726C5.68764 2.65275 5.60204 2.85942 5.44966 3.0118C5.29728 3.16417 5.09062 3.24978 4.87512 3.24978H1.62504V11.375H9.75024V8.1249C9.75024 7.90941 9.83585 7.70274 9.98823 7.55036C10.1406 7.39799 10.3473 7.31238 10.5628 7.31238C10.7783 7.31238 10.9849 7.39799 11.1373 7.55036C11.2897 7.70274 11.3753 7.90941 11.3753 8.1249V11.375C11.3753 11.806 11.2041 12.2193 10.8993 12.5241C10.5946 12.8288 10.1812 13 9.75024 13H1.62504C1.19405 13 0.780718 12.8288 0.475963 12.5241C0.171209 12.2193 0 11.806 0 11.375V3.24978Z"
                                            fill="#A0AEC0"
                                        />
                                    </svg>
                                    Home
                                </a>
                                <a href="#about">
                                    <svg width={13} height={13}>
                                        <path
                                            d="M12.5241 0.47579C12.2193 0.171142 11.8061 0 11.3752 0C10.9443 0 10.531 0.171142 10.2263 0.47579L4.0625 6.63957V8.93738H6.36031L12.5241 2.7736C12.8287 2.46886 12.9999 2.0556 12.9999 1.62469C12.9999 1.19379 12.8287 0.78053 12.5241 0.47579Z"
                                            fill="#A0AEC0"
                                        />
                                        <path
                                            d="M0 3.24978C0 2.81879 0.171209 2.40546 0.475963 2.1007C0.780718 1.79595 1.19405 1.62474 1.62504 1.62474H4.87512C5.09062 1.62474 5.29728 1.71034 5.44966 1.86272C5.60204 2.0151 5.68764 2.22177 5.68764 2.43726C5.68764 2.65275 5.60204 2.85942 5.44966 3.0118C5.29728 3.16417 5.09062 3.24978 4.87512 3.24978H1.62504V11.375H9.75024V8.1249C9.75024 7.90941 9.83585 7.70274 9.98823 7.55036C10.1406 7.39799 10.3473 7.31238 10.5628 7.31238C10.7783 7.31238 10.9849 7.39799 11.1373 7.55036C11.2897 7.70274 11.3753 7.90941 11.3753 8.1249V11.375C11.3753 11.806 11.2041 12.2193 10.8993 12.5241C10.5946 12.8288 10.1812 13 9.75024 13H1.62504C1.19405 13 0.780718 12.8288 0.475963 12.5241C0.171209 12.2193 0 11.806 0 11.375V3.24978Z"
                                            fill="#A0AEC0"
                                        />
                                    </svg>
                                    About
                                </a>
                                <a href="#contact">
                                    <svg width={13} height={13}>
                                        <path
                                            d="M12.5241 0.47579C12.2193 0.171142 11.8061 0 11.3752 0C10.9443 0 10.531 0.171142 10.2263 0.47579L4.0625 6.63957V8.93738H6.36031L12.5241 2.7736C12.8287 2.46886 12.9999 2.0556 12.9999 1.62469C12.9999 1.19379 12.8287 0.78053 12.5241 0.47579Z"
                                            fill="#A0AEC0"
                                        />
                                        <path
                                            d="M0 3.24978C0 2.81879 0.171209 2.40546 0.475963 2.1007C0.780718 1.79595 1.19405 1.62474 1.62504 1.62474H4.87512C5.09062 1.62474 5.29728 1.71034 5.44966 1.86272C5.60204 2.0151 5.68764 2.22177 5.68764 2.43726C5.68764 2.65275 5.60204 2.85942 5.44966 3.0118C5.29728 3.16417 5.09062 3.24978 4.87512 3.24978H1.62504V11.375H9.75024V8.1249C9.75024 7.90941 9.83585 7.70274 9.98823 7.55036C10.1406 7.39799 10.3473 7.31238 10.5628 7.31238C10.7783 7.31238 10.9849 7.39799 11.1373 7.55036C11.2897 7.70274 11.3753 7.90941 11.3753 8.1249V11.375C11.3753 11.806 11.2041 12.2193 10.8993 12.5241C10.5946 12.8288 10.1812 13 9.75024 13H1.62504C1.19405 13 0.780718 12.8288 0.475963 12.5241C0.171209 12.2193 0 11.806 0 11.375V3.24978Z"
                                            fill="#A0AEC0"
                                        />
                                    </svg>
                                    Contact
                                </a>
                            </div>
                        </div>
                    </div>}

                </td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}

const Table = (props) => {

    const [infoModal, setInfoModal] = useState(false);
    const [infoData, setInfoData] = useState(null);
    const handleInfoModal = (data) => {
        setInfoData(data);
        setInfoModal(true);
    }

    const { tableData, editEntry, checkedBoxes, deleteEntry, client_id, path } = props;

    return (
        <>
            {tableData.length > 0 && <div className='pi-table-wrap'>

                {infoModal &&
                    <>
                        {(infoData.status == 'accept' || infoData.status == 'decline') && <Feedback
                            data={infoData}
                            show={infoModal}
                            reload={props.reload}
                            close={() => setInfoModal(false)}
                        />}

                        {infoData.payment_method == 'bank' && <Bank
                            data={infoData}
                            show={infoModal}
                            reload={props.reload}
                            close={() => setInfoModal(false)}
                        />}

                        {infoData.payment_method == 'paypal' && <Paypal
                            data={infoData}
                            show={infoModal}
                            reload={props.reload}
                            close={() => setInfoModal(false)}
                        />}

                        {infoData.payment_method == 'stripe' && <Stripe
                            data={infoData}
                            show={infoModal}
                            reload={props.reload}
                            close={() => setInfoModal(false)}
                        />}
                    </>
                }

                <table className='pi-table'>
                    <TableHeader checkedBoxes={checkedBoxes} client_id={client_id} path={path} />
                    <TableBody
                        infoModal={handleInfoModal}
                        tableData={tableData}
                        editEntry={editEntry}
                        checkedBoxes={checkedBoxes}
                        deleteEntry={deleteEntry}
                        client_id={client_id}
                        path={path}
                    />
                </table>
            </div>}
        </>
    );
}

export default Table;
