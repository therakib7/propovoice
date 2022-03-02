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
                <td>  
                    <span onClick={() => handleClick(row.id)} >Edit</span>
                    <span onClick={() => props.deleteEntry('single', row.id)} >Del</span>
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

