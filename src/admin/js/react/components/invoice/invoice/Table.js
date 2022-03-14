import React from 'react';
import { useNavigate } from 'react-router-dom'; 

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
                    Invoice ID
                </th>
                <th>
                    Project
                </th>
                { !props.client_id && <th>
                    Client
                </th>}
                <th>
                    Total
                </th>
                <th>
                    Paid
                </th>
                <th>
                    Due
                </th>
                <th>
                    Date
                </th>
                <th>
                    Status
                </th>
                <th>
                    Action
                </th>
            </tr>
        </thead>
    );
}

const TableBody = props => { 
     
    let navigate = useNavigate();
    function handleClick( id ) { 
        navigate(`/invoice/single/${id}`, { replace: true });
    }

    let rows = props.tableData.map((row, index) => {
        let data = props.checkedBoxes.data;
        const checkedCheckbox = ( data.indexOf(row.id) !== -1 ) ? true : false; 

        let status;
        switch(row.status) {
            case 'draft':
                status = <span className='pi-status pi-bg-pink'>Draft</span>
                break;

            case 'sent':
                status = <span className='pi-status pi-bg-gray'>Sent</span>
                break;

            case 'viewed':
                status = <span className='pi-status piBgOrange'>Viewed</span>
                break;
            
            case 'paid':
                status = <span className='pi-status pi-bg-pink'>Paid</span>
                break;

            default:
                status = <span className='pi-status pi-bg-pink'>Draft</span>
        }

        return (
            <tr key={index}>
                <td>
                    <input type="checkbox" 
                        className="selectsingle" 
                        value={row.id}
                        checked={ checkedCheckbox } 
                        onChange={(e) => props.checkedBoxes.handle(e, 'single', row.id)}
                    />  
				</td>
                <td>INV{row.id}</td>
                <td>{row.project.name}</td>
                {!props.client_id &&<td>
                    {row.to.first_name + ' ' + row.to.last_name}
                </td>}
                <td>{row.total}</td>
                <td>{row.paid}</td>
                <td>{row.due}</td>
                <td>{row.date}</td> 
                <td>{status}</td> 
                <td>  
                    <span onClick={() => handleClick(row.id)} ><svg
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
                            </svg></span>
                </td>
            </tr>
        );
    }); 

    return <tbody>{rows}</tbody>;
}

const Table = (props) => {
    const { tableData, editEntry, checkedBoxes, deleteEntry, client_id } = props; 
    return ( 
        <> 
            {tableData.length > 0 && <div className='pi-table-wrap'>
                <table className='pi-table'>
                    <TableHeader checkedBoxes={checkedBoxes} client_id={client_id} />
                    <TableBody tableData={tableData} editEntry={editEntry} checkedBoxes={checkedBoxes} deleteEntry={deleteEntry} client_id={client_id} /> 
                </table>
            </div>}
        </>
    );
}

export default Table;

