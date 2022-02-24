import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const TableHeader = props => { 
    return (
        <thead className="bg-gray-300 text-gray-800">
            <tr>
                <th className="text-left py-3 pl-4 pr-0 font-bold text-sm" style={{ width: '20px' }}>
                <input type="checkbox" 
                        className="selectsingle" 
                        // value={row.id}
                        // checked={ props.checkedBoxes.data.find((p) => p.id === row.id)} 
                        onChange={(e) => props.checkedBoxes.handle(e, 'all')}
                    /> 
                </th>
                <th className="text-left py-3 px-4 font-bold text-sm">
                    Invoice ID
                </th>
                <th className="text-left py-3 px-4 font-bold text-sm">
                    Project
                </th>
                { !props.client_id && <th className="text-left py-3 px-4 font-semibold text-sm">
                    Client
                </th>}
                <th className="text-left py-3 px-4 font-semibold text-sm">
                    Total
                </th>
                <th className="text-left py-3 px-4 font-semibold text-sm">
                    Paid
                </th>
                <th className="text-left py-3 px-4 font-semibold text-sm">
                    Due
                </th>
                <th className="text-left py-3 px-4 font-semibold text-sm">
                    Date
                </th>
                <th className="text-left py-3 px-4 font-semibold text-sm">
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
                <td className="text-left py-3 pl-4 pr-0">
                    <input type="checkbox" 
                        className="selectsingle" 
                        value={row.id}
                        checked={ checkedCheckbox } 
                        onChange={(e) => props.checkedBoxes.handle(e, 'single', row.id)}
                    />  
				</td>
                <td className="text-left py-3 px-4">INV{row.id}</td>
                <td className="text-left py-3 px-4">{row.project.name}</td>
                {!props.client_id &&<td className="text-left py-3 px-4">
                    {row.to.first_name + ' ' + row.to.last_name}
                </td>}
                <td className="text-left py-3 px-4">{row.total}</td>
                <td className="text-left py-3 px-4">{row.paid}</td>
                <td className="text-left py-3 px-4">{row.due}</td>
                <td className="text-left py-3 px-4">{row.date}</td> 
                <td className="text-left py-3 px-4">  
                    <span onClick={() => handleClick(row.id)} className='bg-gray-800 hover:bg-gray-900 cursor-pointer text-white text-sm py-1 px-2 rounded mr-2 inline-block align-middle'><i className="dashicons dashicons-edit-page"></i></span>
                    <span onClick={() => props.deleteEntry('single', row.id)} className='bg-red-800 hover:bg-red-900 cursor-pointer text-white text-sm py-1 px-2 rounded inline-block align-middle'><i className="dashicons dashicons-trash"></i></span>
                </td>
            </tr>
        );
    });

    if ( ! props.tableData.length ) {
        rows = <tr><td className='p-3' colSpan='3'>No data found</td></tr>
    }

    return <tbody className="text-gray-700">{rows}</tbody>;
}

const Table = (props) => {
    const { tableData, editEntry, checkedBoxes, deleteEntry, client_id } = props;
    return (
        <div className="shadow overflow-hidden rounded border-b border-gray-200">
            <table className="min-w-full bg-white">
                <TableHeader checkedBoxes={checkedBoxes} client_id={client_id} />
                <TableBody tableData={tableData} editEntry={editEntry} checkedBoxes={checkedBoxes} deleteEntry={deleteEntry} client_id={client_id} /> 
            </table>
        </div>

    );
}

export default Table;