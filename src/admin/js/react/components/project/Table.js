import React from 'react';
import { useNavigate } from 'react-router-dom';

const TableHeader = props => {
    return (
        <thead>
            <tr>
                <th>
                <input type="checkbox" 
                        className="selectsingle"  
                        onChange={(e) => props.checkedBoxes.handle(e, 'all')}
                    /> 
                </th>
                <th>
                    Title
                </th>
                <th>
                    Description
                </th>  
                {!props.client_id && <th>
                    Client
                </th>}
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
                <td>{row.title}</td>
                
                <td>{row.desc}</td> 
                {!props.client_id &&<td>
                    {row.client && row.client.first_name + ' ' + row.client.last_name}
                </td>}
                <td>{row.date}</td> 
                <td> 
                    <span onClick={() => props.editEntry('edit', row)} ><i className="dashicons dashicons-edit-page"></i></span>
                    <span onClick={() => props.deleteEntry('single', row.id)} ><i className="dashicons dashicons-trash"></i></span>
                </td>
            </tr>
        );
    }); 

    return <tbody>{rows}</tbody>;
}

const Table = (props) => {
    const { tableData, editEntry, checkedBoxes, deleteEntry, client_id } = props;
    return (
        <div className='pi-table-wrap'>
            <table className='pi-table'>
                <TableHeader checkedBoxes={checkedBoxes} client_id={client_id}/>
                <TableBody tableData={tableData} editEntry={editEntry} checkedBoxes={checkedBoxes} deleteEntry={deleteEntry} client_id={client_id} />                 
            </table>
        </div>

    );
}

export default Table;