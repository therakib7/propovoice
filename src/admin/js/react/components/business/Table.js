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
                    Company Name
                </th>
                <th>
                    Website
                </th>
                <th>
                    Email
                </th>
                <th>
                    Mobile
                </th>
                <th>
                    Address
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
                <td>{row.name}</td>
                <td>{row.web}</td>
                <td>{row.email}</td>
                <td>{row.mobile}</td>
                <td>{row.address}</td>
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
    const { tableData, editEntry, checkedBoxes, deleteEntry } = props;
    return (
        <>
        {!tableData.length && <div className="pi-empty-content pi-text-center">
            <img src="assets/img/invoice-one.png" className="" />
            <h4>You haven’t Create any invoice yet.</h4>
            <button className="pi-btn pi-bg-blue pi-bg-hover-blue">
                Let’s Start Creating
            </button>
        </div>}
        {tableData.length && <div className='pi-table-wrap'>
            <table className='pi-table'>
                <TableHeader checkedBoxes={checkedBoxes} />
                <TableBody tableData={tableData} editEntry={editEntry} checkedBoxes={checkedBoxes} deleteEntry={deleteEntry} /> 
            </table>
        </div>}
        </>
    );
}

export default Table;