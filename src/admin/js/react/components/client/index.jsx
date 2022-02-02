import React, { useState, useEffect } from 'react';
import Helper from './helper';

import { withI18n } from '@wordpress/react-i18n'

const Client = () => {

    const initialClientState = {
        id: null,
        first_name: '',
        last_name: '',
        email: '',
        company_name: '',
        web: '',
        mobile: '',
        zip: '',
        address: '',
        date: false
    };

    const [formModal, setFormModal] = useState(false);
    const [formModalType, setFormModalType] = useState('new');
    const [client, setClient] = useState(initialClientState);
    const [clients, setClients] = useState([]);
    const [currentClient, setCurrentClient] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState('');

    const inputChange = e => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
    };

    useEffect(() => {
        retrieveClients();
    }, []);

    const openForm = ( type = 'new', client = null ) => {
        setFormModal(true);
        if ( type == 'new' ) {
            setFormModalType('new');
            setClient(initialClientState);
        } else {
            setFormModalType('edit');
            setClient(client);
        }
    };

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const retrieveClients = () => {
        Helper.getAll()
        .then(resp => {
            setClients(resp.data.data);
            // console.log(resp.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const saveClient = () => { 
    
        Helper.create( client )
        .then(resp => {
            /* setTutorial({
                id: resp.data.id,
                title: resp.data.title,
                description: resp.data.description,
                published: resp.data.published
            }); */
            setFormModal(false)
            retrieveClients();
            console.log(resp.data);
        })
        .catch(e => {
        console.log(e);
        });
    };

    const refreshList = () => {
        retrieveClients();
        setCurrentClient(null);
        setCurrentIndex(-1);
    };

    const setActiveClient = (client, index) => {
        setCurrentClient(client);
        setCurrentIndex(index);
    };

    const removeAllClients = () => {
        Helper.removeSelected()
        .then(resp => {
            console.log(resp.data);
            refreshList();
        })
        .catch(e => {
            console.log(e);
        });
    };

    const findByArg = () => {
        Helper.findByArg(searchTitle)
        .then(resp => {
            setClients(resp.data);
            console.log(resp.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    return(
        <> 
            <div className='mb-5 font-bold text-2xl'>
                Client
            </div>

            <button
                className="bg-blue-700 hover:bg-blue-800 text-white font-medium text-base py-2 px-4 rounded mb-3"
                onClick={() => openForm('new')} >
                Create New Client
            </button>
            
            {formModal && (
                <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl"> 
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"> 

                            <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                                <h3 className="text-xl p-2 font-semibold">{ formModalType == 'new' ? 'New' : 'Edit' } Client</h3>
                                <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setFormModal(false)} >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                    </span>
                                </button>
                            </div>

                            <div className="relative px-6 py-5 flex-auto">
                                <form className="w-full max-w-lg">

                                    <div className="flex flex-wrap -mx-3 mb-2">
                                        
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label
                                                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="first_name">
                                                First Name
                                            </label>

                                            <input
                                                className="appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                id="first_name"
                                                type="text" 
                                                required
                                                name="first_name"
                                                value={client.first_name}
                                                onChange={inputChange}
                                            /> 
                                        </div>

                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label
                                                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="last_name">
                                                Last Name
                                            </label>

                                            <input
                                                className="appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                id="last_name"
                                                type="text" 
                                                required
                                                name="last_name"
                                                value={client.last_name}
                                                onChange={inputChange}
                                            /> 
                                        </div> 
                                         
                                    </div>  

                                    <div className="flex flex-wrap -mx-3 mb-2"> 

                                        <div className="w-full md:w-1/2 px-3">
                                            <label
                                                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-email">
                                                Email
                                            </label> 

                                            <input
                                                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-email"
                                                type="email" 
                                                name="email"
                                                value={client.email}
                                                onChange={inputChange}
                                            />
                                        </div>

                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label
                                                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-mobile">
                                                Mobile Number
                                            </label>

                                            <input
                                                className="appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                id="grid-mobile"
                                                type="text" 
                                                required
                                                name="mobile"
                                                value={client.mobile}
                                                onChange={inputChange}
                                            /> 
                                        </div>

                                    </div>  

                                    <div className="flex flex-wrap -mx-3 mb-2">
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label
                                                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-company_name">
                                                Company Name
                                            </label>

                                            <input
                                                className="appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                id="grid-company_name"
                                                type="text" 
                                                required
                                                name="company_name"
                                                value={client.company_name}
                                                onChange={inputChange}
                                            /> 
                                        </div>

                                        <div className="w-full md:w-1/2 px-3">
                                            <label
                                                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-web">
                                                Website
                                            </label> 

                                            <input
                                                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-web"
                                                type="url" 
                                                name="web"
                                                value={client.web}
                                                onChange={inputChange}
                                            />
                                        </div>
                                    </div>  

                                    <div className="flex flex-wrap -mx-3 mb-2">
                                        

                                        <div className="w-full md:w-1/2 px-3">
                                            <label
                                                className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor="grid-zip">
                                                Zip Code
                                            </label> 

                                            <input
                                                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-zip"
                                                type="number" 
                                                name="zip"
                                                value={client.zip}
                                                onChange={inputChange}
                                            />
                                        </div>
                                    </div>  
                                    
                                </form>
                            </div> 

                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setFormModal(false)}
                                >
                                    Close
                                </button>

                                <button
                                    className="text-white bg-blue-700 hover:bg-blue-800 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => saveClient()} >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) }

            <div className="shadow overflow-hidden rounded border-b border-gray-200">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="text-left py-3 pl-4 pr-0 font-bold text-sm" style={{width: '20px'}}>
                                <input type="checkbox" />
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

                    <tbody className="text-gray-700">
                        { clients && clients.map((client, index) => ( 
                            <tr key={index}>
                                <td className="text-left py-3 pl-4 pr-0"><input type="checkbox" /></td>
                                <td className="text-left py-3 px-4">{client.first_name+' '+client.last_name}</td>
                                <td className="text-left py-3 px-4">{client.email}</td> 
                                <td className="text-left py-3 px-4">{client.company_name}</td>
                                <td className="text-left py-3 px-4">{client.web}</td>
                                <td className="text-left py-3 px-4">{client.mobile}</td>
                                <td className="text-left py-3 px-4">{client.date}</td>
                                <td className="text-left py-3 px-4">
                                    <span className='bg-green-700 hover:bg-green-800 cursor-pointer text-white text-sm py-1 px-2 rounded mr-2'>View</span>
                                    <span onClick={() => openForm('edit', client)} className='bg-blue-700 hover:bg-blue-800 cursor-pointer text-white text-sm py-1 px-2 rounded mr-2'>Edit</span>
                                    <span className='bg-red-700 hover:bg-red-800 cursor-pointer text-white text-sm py-1 px-2 rounded'>Delete</span> 
                                </td>
                            </tr> 
                        )) } 
                    </tbody>
                </table>
            </div> 
        </>
    )
}

export default Client;