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

    const rows = props.tableData.map((row, index) => {
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
                    <span onClick={() => handleClick(row.id)} className='bg-gray-700 hover:bg-gray-800 cursor-pointer text-white text-sm py-1 px-2 rounded mr-2'>Overview</span>
                    <span onClick={() => props.editEntry('edit', row)} className='bg-gray-800 hover:bg-gray-900 cursor-pointer text-white text-sm py-1 px-2 rounded mr-2'><svg
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
                    <span onClick={() => props.deleteEntry('single', row.id)} className='bg-red-800 hover:bg-red-900 cursor-pointer text-white text-sm py-1 px-2 rounded'>Delete</span>
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
                { ! tableData.length && <tbody><tr>
                    <td className='p-3' colSpan={3}>
                        No data found
                    </td>
                </tr></tbody>}
                
            </table>
        </div>

    );
}

export default Table;