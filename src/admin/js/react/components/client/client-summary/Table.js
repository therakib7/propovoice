import React from 'react';

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>
                    <input type="checkbox" />
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
    const rows = props.tableData.map((row, index) => {
        return (
            <tr key={index}>
                <td><input type="checkbox" /></td>
                <td>{row.first_name + ' ' + row.last_name}</td>
                <td>{row.email}</td>
                <td>{row.company_name}</td>
                <td>{row.web}</td>
                <td>{row.mobile}</td>
                <td>{row.date}</td>
                {/* <td><button onClick={() => props.deleteEntry(index)}>Delete</button></td> */}
                <td>
                    <span className='bg-gray-700 hover:bg-gray-800 cursor-pointer text-white text-sm py-1 px-2 rounded mr-2'>View</span>
                    <span onClick={() => props.editEntry('edit', row)} className='bg-gray-800 hover:bg-gray-900 cursor-pointer text-white text-sm py-1 px-2 rounded mr-2'>Edit</span>
                    <span onClick={() => props.deleteEntry('single', row.id)} className='bg-red-800 hover:bg-red-900 cursor-pointer text-white text-sm py-1 px-2 rounded'>Delete</span>
                </td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}

const Table = (props) => {
    const { tableData, editEntry, deleteEntry } = props;
    return (
        <div className='pi-table-wrap'>
            <table className='pi-table'>

                <TableHeader />
                <TableBody tableData={tableData} editEntry={editEntry} deleteEntry={deleteEntry} />
            </table>
        </div>

    );
}

export default Table;