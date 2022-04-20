import React, { useRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Feedback from './feedback';
import useClickOutside from 'block/outside-click';

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
    
    const [dropdown, setDropdown] = useState(null);

    const close = useCallback(() => setDropdown(null), []);
	

    const showDropdown = ( id ) => {
        if ( dropdown == id ) {
            setDropdown(null);
        } else {
            setDropdown(id);
        } 
    };

    let navigate = useNavigate();
    function handleClick(id, view = '') {
        let path = props.path;
        navigate(`/${path}/single/${id}${view}`, { replace: true });
    }

    let rows = props.tableData.map((row, index) => {

        const popover = useRef();
        useClickOutside(popover, close);

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
                status = <span className='pi-status pi-bg-orange'>Viewed</span>
                break;

            case 'accept':
                status = <span className='pi-status pi-bg-blue pi-cursor-pointer' onClick={() => props.infoModal(row, 'feedback')}>Accepted</span>
                break;

            case 'decline':
                status = <span className='pi-status pi-bg-red pi-cursor-pointer' onClick={() => props.infoModal(row, 'feedback')}>Declined</span>
                break;

            case 'paid_req':
                status = <span className='pi-status pi-bg-orange'>Paid Request</span>
                break;

            case 'paid':
                status = <span className='pi-status pi-bg-blue'>Paid</span>
                break;
        }

        let payment_method;
        switch (row.payment_method) {
            case 'bank':
                payment_method = <span className='pi-status pi-cursor-pointer' style={{ backgroundColor: '#4A5568' }} onClick={() => props.infoModal(row, 'bank')}>Bank & Others</span>
                break;

            case 'paypal':
                payment_method = <span className='pi-status pi-cursor-pointer' style={{ backgroundColor: '#009cde' }} onClick={() => props.infoModal(row, 'paypal')}>Paypal</span>
                break;

            case 'stripe':
                payment_method = <span className='pi-status pi-cursor-pointer' style={{ backgroundColor: '#5433FF' }} onClick={() => props.infoModal(row, 'stripe')}>Stripe</span>
                break;
        }

        let invoice_id = row.id;
        let invoice_token = row.token; 
        let url = row.path == 'invoice' ? ncpi.invoice_page_url : ncpi.estimate_page_url;

        //replace text with id and token
        let result = url.replace('invoice_id', invoice_id);
        let client_url = result.replace('invoice_token', invoice_token);

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
                <td>{ ( row.path == 'invoice' ? 'Inv' : 'Est' ) + row.id}</td>
                {/*<td>{row.project.name}</td>*/}
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
                    <div className="pi-action-content" >
                        <div className="pi-dropdown">
                            <button className={'pi-dropbtn ' + ( row.id == dropdown ? 'pi-active': '') } onClick={() => showDropdown(row.id) }>
                                <svg width={4} height={20}>
                                    <circle cx={2} cy={2} r={2} fill="#A0AEC0" />
                                    <circle cx={2} cy={10} r={2} fill="#A0AEC0" />
                                    <circle cx={2} cy={18} r={2} fill="#A0AEC0" />
                                </svg>
                            </button>
                            {row.id == dropdown && <div className="pi-dropdown-content pi-show" ref={popover}> 
                                <a onClick={() => handleClick(row.id, '/tab/preview')}>View</a>
                                <a target='_blank' href={client_url}>Client View</a>
                                <a onClick={() => handleClick(row.id)}>Edit</a>
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
