import React, { useRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import Feedback from './feedback';
import useClickOutside from 'block/outside-click';

//payment
import Bank from './payment/Bank';
import Paypal from './payment/Paypal';
import Stripe from './payment/Stripe';

const TableHeader = props => {
    const i18n = ndpi.i18n;
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
                    {props.path == 'invoice' ? ndpi.i18n.inv : ndpi.i18n.est} ID
                </th>
                {/* <th>
                    Project
                </th> */}
                {!props.client_id && <th>
                    {i18n.contact}
                </th>}
                <th>
                    {i18n.total}
                </th>

                {/* {(props.path == 'invoice') &&
                    <>
                        <th>Paid</th>
                        <th>Due</th>
                    </>
                }  */}
                <th>
                    {i18n.status}
                </th>
                {(props.path == 'invoice') &&
                    <th>
                        {i18n.payment} {i18n.method}
                    </th>
                }
                <th>
                    {i18n.date}
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
    // const close = useCallback(() => setDropdown(null), []);	

    const showDropdown = (id) => {
        if (dropdown == id) {
            setDropdown(null);
        } else {
            setDropdown(id);
        }
    };

    let navigate = useNavigate();
    function handleClick(id, view = '') {
        let path = props.path;
        navigate(`/${path}/single/${id}${view}`);
    }
    const i18n = ndpi.i18n;

    let rows = props.tableData.map((row, index) => {

        // const popover = useRef();
        // useClickOutside(popover, close);

        let data = props.checkedBoxes.data;
        const checkedCheckbox = (data.indexOf(row.id) !== -1) ? true : false;
        let status;
        switch (row.status) {
            
            case 'draft':
                status = <span className='pi-badge pi-bg-pink'
                // style={{color: '#fff'}}
                >{ndpi.i18n.dft}</span>
                break;

            case 'sent':
                status = <span className='pi-badge pi-bg-gray'
                // style={{color: '#fff'}}
                >{ndpi.i18n.sent}</span>
                break;

            case 'viewed':
                status = <span className='pi-badge pi-bg-orange'
                // style={{color: '#999'}}
                >{ndpi.i18n.viewed}</span>
                break;

            case 'accept':
                status = <span className='pi-badge pi-bg-blue pi-cursor-pointer'
                    style={{ color: '#fff' }}
                    onClick={() => props.infoModal(row, 'feedback')}>{ndpi.i18n.accept}</span>
                break;

            case 'decline':
                status = <span className='pi-badge pi-bg-red pi-cursor-pointer'
                    style={{ color: '#fff' }}
                    onClick={() => props.infoModal(row, 'feedback')}>{ndpi.i18n.dec}</span>
                break;

            case 'paid_req':
                status = <span className='pi-badge pi-bg-orange'
                    style={{ color: '#4a5568' }}
                >{ndpi.i18n.paid} {ndpi.i18n.req}</span>
                break;

            case 'paid':
                status = <span className='pi-badge pi-bg-blue'
                    style={{ color: '#fff' }}
                >{ndpi.i18n.paid}</span>
                break;
        }

        let payment_method;
        switch (row.payment_method) {
            case 'bank':
                payment_method = <span className='pi-badge pi-cursor-pointer' style={{ color: '#fff', backgroundColor: '#4A5568' }} onClick={() => props.infoModal(row, 'bank')}>Bank & Others</span>
                break;

            case 'paypal':
                payment_method = <span className='pi-badge pi-cursor-pointer' style={{ color: '#fff', backgroundColor: '#009cde' }} onClick={() => props.infoModal(row, 'paypal')}>Paypal</span>
                break;

            case 'stripe':
                payment_method = <span className='pi-badge pi-cursor-pointer' style={{ color: '#fff', backgroundColor: '#5433FF' }} onClick={() => props.infoModal(row, 'stripe')}>Stripe</span>
                break;
        }

        let invoice_id = row.id;
        let invoice_token = row.token;
        let url = row.path == 'invoice' ? ndpi.invoice_page_url : ndpi.estimate_page_url;

        //replace text with id and token
        let result = url.replace('invoice_id', invoice_id);
        let client_url = result.replace('invoice_token', invoice_token);

        const i18n = ndpi.i18n;
        return (
            <tr key={index}>
                <td>
                    <input type="checkbox" 
                        value={row.id}
                        checked={checkedCheckbox}
                        onChange={(e) => props.checkedBoxes.handle(e, 'single', row.id)}
                    />
                </td>
                <td onClick={() => { handleClick(row.id); }} className='pi-cursor-pointer'>{(row.path == 'invoice' ? 'Inv' : 'Est') + row.id}</td>
                {/*<td>{row.project.name}</td>*/}
                {!props.client_id && <td onClick={() => { handleClick(row.id); }} className='pi-cursor-pointer'>
                    {(row.to.type == 'person') ? row.to.first_name : row.to.org_name}
                </td>}
                <td onClick={() => { handleClick(row.id); }} className='pi-cursor-pointer'>{row.total}</td>
                {/* {(props.path == 'invoice') &&
                    <>
                        <td>{row.paid}</td>
                        <td>{row.due}</td>
                    </>
                }  */}
                <td>{status}</td>
                {(props.path == 'invoice') && <td>{payment_method}</td>}
                <td onClick={() => { handleClick(row.id); }} className='pi-cursor-pointer'><Moment format="YYYY-MM-DD">{row.date}</Moment></td>
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
                            <a onClick={() => { showDropdown(row.id); handleClick(row.id); }}>{i18n.edit}</a>
                            <a onClick={() => handleClick(row.id, '/tab/preview')}>{i18n.prv}</a>
                            <a target='_blank' href={client_url}>{i18n.client} {i18n.prv}</a>
                            <a onClick={() => { showDropdown(row.id); props.action('sent', row.id); }}>{i18n.mark} {i18n.as} {i18n.sent}</a>
                            {row.path == 'invoice' && <a onClick={() => { showDropdown(row.id); props.action('paid', row.id); }}>{i18n.mark} {i18n.as} {i18n.paid}</a>}
                            {row.path == 'estimate' && <a onClick={() => { showDropdown(row.id); props.action('accept', row.id); }}>{i18n.mark} {i18n.as} {i18n.accept}</a>}
                            {row.path == 'estimate' && <a onClick={() => { showDropdown(row.id); props.action('decline', row.id); }}>{i18n.mark} {i18n.as} {i18n.dec}</a>}
                            <a onClick={() => { showDropdown(row.id); props.action('copy', row.id); }}>{i18n.dup}</a>
                            {row.path == 'estimate' && <a onClick={() => { showDropdown(row.id); props.action('copy-to-inv', row.id); }}>{i18n.copy} {i18n.to} {i18n.inv}</a>}
                            <a onClick={() => { showDropdown(row.id); props.deleteEntry('single', row.id); }}>{i18n.del}</a>
                        </div>}
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

    const { tableData, editEntry, checkedBoxes, deleteEntry, client_id, path, action } = props;

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
                        action={action}
                    />
                </table>
            </div>}
        </>
    );
}

export default Table; 