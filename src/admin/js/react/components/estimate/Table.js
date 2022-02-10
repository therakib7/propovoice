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
                    Client Name
                </th>
                <th className="text-left py-3 px-4 font-semibold text-sm">
                    Email
                </th>
                <th className="text-left py-3 px-4 font-semibold text-sm">
                    Company Name
                </th>
                <th className="text-left py-3 px-4 font-semibold text-sm">
                    Website
                </th>
                <th className="text-left py-3 px-4 font-semibold text-sm">
                    Mobile
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
        navigate(`/client/${id}`, { replace: true });
    }

    const rows = props.tableData.map((row, index) => {
        let data = props.checkedBoxes.data;
        const checkedCheckbox = ( data.indexOf(row.id) !== -1 ) ? true : false; 
        // console.log(data)
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
                <td className="text-left py-3 px-4">{row.first_name + ' ' + row.last_name}</td>
                <td className="text-left py-3 px-4">{row.email}</td>
                <td className="text-left py-3 px-4">{row.company_name}</td>
                <td className="text-left py-3 px-4">{row.web}</td>
                <td className="text-left py-3 px-4">{row.mobile}</td>
                <td className="text-left py-3 px-4">{row.date}</td> 
                <td className="text-left py-3 px-4">
                    <span onClick={() => handleClick(row.id)} className='bg-gray-700 hover:bg-gray-800 cursor-pointer text-white text-sm py-1 px-2 rounded mr-2 inline-block align-middle'>Overview</span>
                    <span onClick={() => props.editEntry('edit', row)} className='bg-gray-800 hover:bg-gray-900 cursor-pointer text-white text-sm py-1 px-2 rounded mr-2 inline-block align-middle'><i className="dashicons dashicons-edit-page"></i></span>
                    <span onClick={() => props.deleteEntry('single', row.id)} className='bg-red-800 hover:bg-red-900 cursor-pointer text-white text-sm py-1 px-2 rounded inline-block align-middle'><i className="dashicons dashicons-trash"></i></span>
                </td>
            </tr>
        );
    });

    return <tbody className="text-gray-700">{rows}</tbody>;
}

const Table = (props) => {
    const { tableData, editEntry, checkedBoxes, deleteEntry } = props;
    return (
        <div className="shadow overflow-hidden rounded border-b border-gray-200">
            <table className="min-w-full bg-white">
                <TableHeader checkedBoxes={checkedBoxes} />
                <TableBody tableData={tableData} editEntry={editEntry} checkedBoxes={checkedBoxes} deleteEntry={deleteEntry} />
                { ! tableData.length && <tbody className="text-gray-700"><tr>
                    <td className='p-3' colSpan={3}>
                        No data found
                    </td>
                </tr></tbody>}
                
            </table>
        </div>

    );
}

export default Table;