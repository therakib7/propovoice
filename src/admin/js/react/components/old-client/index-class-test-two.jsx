import React, { useState, useEffect } from 'react';
import Helper from './helper';

 

const TodoForm = ({addTodo}) => {
    // Input tracker
    let input;
  
    return (
      <div>
        <input ref={node => {
          input = node;
        }} />
        <button onClick={() => {
          addTodo(input.value);
          input.value = '';
        }}>
          +
        </button>
      </div>
    );
}; 

const Todo = ({todo, remove}) => {
    // Each Todo
    return (<li onClick={() => remove(todo.id)}>{todo.text}</li>);
}
  
const TodoList = ({todos, remove}) => {
    // Map through the todos
    const todoNode = todos.map((todo) => {
        return (<Todo todo={todo} key={todo.id} remove={remove}/>); 
    });
    return (<ul>{todoNode}</ul>);
}
  
window.id = 0;

class Client extends React.Component {

    constructor(props) {
        // Pass props to parent class
        super(props);

        const initialClientState = {
            id: null,
            title: '',
            client_name: '',
            date: false
        };

        // Set initial state
        this.state = {
            showModal: false, 
            client: initialClientState,
            clients: []
        }
    }

    // Add client handler
    add(val) {
        // Assemble clients
        const client = { text: val, id: window.id++ }
        // Update clients
        this.state.clients.push(client);
        // Update state
        this.setState({ clients: this.state.clients });
    }
    // Handle remove
    remove(id) {
        // Filter all clients except the one to be removed
        const remainder = this.state.clients.filter((client) => {
            if (client.id !== id) return client;
        });
        // Update state with filter
        this.setState({ clients: remainder });
    }

    render() {
        // Render JSX
        return (
            <> 
                <div className='mb-5 font-bold text-2xl'>
                    Client
                </div>

                <button
                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mb-3"
                    onClick={() => setShowModal(true)} >
                    Create New Client
                </button>
                
                {this.state.showModal && (
                    <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl"> 
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"> 

                                <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-xl p-2 font-semibold">New Client</h3>
                                    <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)} >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                        </span>
                                    </button>
                                </div>

                                <div className="relative px-6 py-5 flex-auto">
                                    <form className="w-full max-w-lg">
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label
                                                    className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-title">
                                                    Title
                                                </label>

                                                <input
                                                    className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                    id="grid-title"
                                                    type="text" 
                                                    required
                                                    name="title"
                                                    value={client.title}
                                                    onChange={inputChange}
                                                /> 
                                            </div>

                                            <div className="w-full md:w-1/2 px-3">
                                                <label
                                                    className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-name">
                                                    Client Name
                                                </label> 

                                                <input
                                                    className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-name"
                                                    type="text" 
                                                    name="name"
                                                    value={client.client_name}
                                                    onChange={inputChange}
                                                />
                                            </div>
                                        </div>  

                                        <div className="flex flex-wrap -mx-3 mb-2">
                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label
                                                    className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-price"
                                                >
                                                    Price
                                                </label>
                                            
                                                <input
                                                    className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-price"
                                                    type="text" 
                                                />
                                            </div>
                                            
                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label
                                                    className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-price"
                                                >
                                                    Duration (Days)
                                                </label>
                                                <input
                                                    className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-price"
                                                    type="text" 
                                                />
                                            </div>

                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label
                                                    className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-type"
                                                >
                                                    Type
                                                </label>
                                                <input
                                                    className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                    id="grid-type"
                                                    type="text" 
                                                />
                                            </div>

                                        </div>
                                    </form>
                                </div> 

                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="text-white bg-blue-700 hover:bg-blue-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
                                <th className="w-1/3 text-left py-3 px-4 font-bold text-sm">
                                    Title
                                </th>
                                <th className="w-1/3 text-left py-3 px-4 font-semibold text-sm">
                                    Name
                                </th>
                                <th className="text-left py-3 px-4 font-semibold text-sm">
                                    Status
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
                            { this.state.clients && this.state.clients.map((client, index) => ( 
                                <tr key={index}>
                                    <td className="text-left py-3 pl-4 pr-0"><input type="checkbox" /></td>
                                    <td className="w-1/3 text-left py-3 px-4">{client.title}</td>
                                    <td className="w-1/3 text-left py-3 px-4">{client.name}</td> 
                                    <td className="text-left py-3 px-4">{client.status}</td>
                                    <td className="text-left py-3 px-4">{client.date}</td>
                                    <td className="text-left py-3 px-4">
                                        View | Edit | Delete
                                    </td>
                                </tr> 
                            )) } 
                        </tbody>
                    </table>
                </div> 
            </>
        );
    }
}

export default Client;