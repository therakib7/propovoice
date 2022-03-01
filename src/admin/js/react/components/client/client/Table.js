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
                    Client Name
                </th>
                <th>
                    Email
                </th>
                <th>
                    Company Name
                </th>
                <th>
                    Website
                </th>
                <th>
                    Mobile
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
        navigate(`/client/${id}`, { replace: true });
    }

    let rows = props.tableData.map((row, index) => {
        let data = props.checkedBoxes.data;
        const checkedCheckbox = ( data.indexOf(row.id) !== -1 ) ? true : false; 
        // console.log(data)
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
                <td>{row.first_name + ' ' + row.last_name}</td>
                <td>{row.email}</td>
                <td>{row.company_name}</td>
                <td>{row.web}</td>
                <td>{row.mobile}</td>
                <td>{row.date}</td> 
                <td>
                    <span onClick={() => handleClick(row.id)} className='bg-gray-700 hover:bg-gray-800 cursor-pointer text-white text-sm py-1 px-2 rounded mr-2 inline-block align-middle'>Overview</span>
                    <span onClick={() => props.editEntry('edit', row)} ><i className="dashicons dashicons-edit-page"></i></span>
                    <span onClick={() => props.deleteEntry('single', row.id)} ><i className="dashicons dashicons-trash"></i></span>
                </td>
            </tr>
        );
    }); 

    return <tbody>{rows}</tbody>;
}

const Table = (props) => {
    const { tableData, editEntry, checkedBoxes, deleteEntry } = props;
    return (
        <div className='pi-table-wrap'>
            <table className='pi-table'>
                <TableHeader checkedBoxes={checkedBoxes} />
                <TableBody tableData={tableData} editEntry={editEntry} checkedBoxes={checkedBoxes} deleteEntry={deleteEntry} /> 
            </table>
        </div>

    );
}

export default Table;