import React from 'react';
import { useNavigate } from 'react-router-dom';

 

const TableBody = props => { 
     
    let navigate = useNavigate();
    function handleClick( id ) { 
        navigate(`/client/${id}`, { replace: true });
    }

    const rows = props.tableData.map((row, index) => { 
        /* return (
            <tr key={index}>
                 
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
        ); */
        return (
            <div className="lg:w-1/4 sm:w-1/2 p-4" key={index}>
                <div className="flex relative">
                    <img
                        alt="gallery"
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        src={row.img}
                    />
                    <div className="px-8 py-10 relative z-10 w-full border-4 hover:opacity-100 border-gray-200 bg-white text-center opacity-0 hover:opacity-100">
                            <button
                                className="bg-gray-800 hover:bg-gray-900 text-white font-medium text-base py-2 px-4 rounded-full"
                                // onClick={this.handleSave} 
                            >
                                Select
                            </button>
                            <div className='mb-6'></div>
                            <button
                                className="border-gray-800 text-gray-800 border hover:bg-gray-900 border hover:text-white font-medium text-base py-2 px-4 rounded-full mr-3"
                                // onClick={() => this.openForm('new')} 
                            >
                                Full Preview
                            </button>
                    </div>
                </div>
            </div>
        );
    });

    return <div className="flex flex-wrap -m-4">{rows}</div>;
}

const Table = (props) => {
    const { tableData, editEntry, checkedBoxes, deleteEntry } = props;
    return ( 
        <section className="text-gray-600 body-font">
            <div className="container mx-auto"> 
                <TableBody tableData={tableData} editEntry={editEntry} checkedBoxes={checkedBoxes} deleteEntry={deleteEntry} />
            </div>
        </section>  
    );
}

export default Table;