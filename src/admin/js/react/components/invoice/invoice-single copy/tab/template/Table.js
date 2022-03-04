import React from 'react'; 

const TableBody = props => { 
      
    function handleClick( data ) { 
        props.selectEntry( data );
    } 

    const rows = props.tableData.map((row, index) => { 
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
                                className="bg-blue-700 hover:bg-blue-800 text-white font-medium text-base py-2 px-4 rounded" 
                                onClick={() => handleClick(row)}
                            >
                                Select
                            </button>
                            <div className='mb-6'></div>
                            <button
                                className="border-gray-800 text-gray-800 border hover:bg-blue-700 border hover:text-white font-medium text-base py-2 px-4 rounded mr-3"
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
    const { tableData, selectEntry } = props;
    return ( 
        <section className="text-gray-600 body-font">
            <div className="container mx-auto"> 
                <TableBody tableData={tableData} selectEntry={selectEntry} />
            </div>
        </section>  
    );
}

export default Table;