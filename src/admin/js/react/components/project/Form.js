import React, { Component } from 'react';
import AsyncSelect from 'react-select/async'; 

import ApiClient from '../.././api/client';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            client_id: null,
            client: null,
            title: '', 
            desc: '', 
            date: false
        };

        this.state = {
            clientList: [],  
            form: this.initialState
        };

        this.timeout =  0;
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    } 

    componentDidUpdate() {
        //condition added to stop multiple rendering
        if (this.props.modalType == 'edit') { 
            if (this.state.form.id != this.props.data.id) {  
                this.setState({ 
                    form: this.props.data 
                });
            }
        } else {
            if (this.state.form.id != null) {
                this.setState({ form: this.initialState });
            }
        }
    }

    handleFindClient = (val, callback) => { 
        if ( val.length < 3 ) return;

        //search when typing stop
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            //search function
            //TODO: pass proper client search args
            ApiClient.getAll('first_name='+val+'&last_name='+val)
                .then(resp => {
                    let clientData = resp.data.data.result;
                    callback( clientData ); 
                }); 
        }, 300); 
    } 

    handleClientSelect = (value) => {    
        let form = {...this.state.form} 
        if ( value ) {
            form.client_id = value.id;    
            form.client = value;
        } else {
            form.client_id = null;    
            form.client = null;
        }
		    
		this.setState({ form }) 
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let form = {...this.state.form} 
        if ( this.props.client_id ) {
            form.client_id = this.props.client_id;
        }
        this.props.handleSubmit(form); 
    } 

    render() {
        return (
            <>
                {this.props.show && (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                                    <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                                        <h3 className="text-xl p-2 font-semibold">{this.props.modalType == 'new' ? 'New' : 'Edit'} Project</h3>
                                        <button className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => this.props.close()} >
                                            <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>

                                    <form onSubmit={this.handleSubmit}>
                                        <div className="relative px-6 py-5 flex-auto">
                                            <div className="w-full max-w-lg">
                                                {!this.props.client_id && 
                                                <div className="flex flex-wrap -mx-3 mb-5">
                                                    <div className="w-full px-3 mb-6 md:mb-0">
                                                        <label
                                                            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                            htmlFor="grid-title">
                                                            Client
                                                        </label> 
                                                        <AsyncSelect
                                                            loadOptions={this.handleFindClient}
                                                            value={this.state.form.client}
                                                            onChange={this.handleClientSelect}
                                                            isClearable={true}
                                                            getOptionValue ={(toList) => toList.id}
                                                            getOptionLabel ={(toList) => ( toList.first_name ) ? toList.first_name + ' ' + toList.last_name : ''} 
                                                        />
                                                    </div> 
                                                </div>} 

                                                <div className="flex flex-wrap -mx-3 mb-2">
                                                    <div className="w-full px-3 mb-6 md:mb-0">
                                                        <label
                                                            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                            htmlFor="grid-title">
                                                            Title
                                                        </label>

                                                        <input
                                                            className="appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                            id="grid-title"
                                                            type="text"
                                                            required
                                                            name="title"
                                                            value={this.state.form.title}
                                                            onChange={this.handleChange}
                                                        />
                                                    </div> 
                                                </div>

                                                <div className="flex flex-wrap -mx-3 mb-2">
                                                    <div className="w-full px-3 mb-6 md:mb-0">
                                                        <label
                                                            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                            htmlFor="grid-desc">
                                                            Description
                                                        </label>

                                                        <input
                                                            className="appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                            id="grid-desc"
                                                            type="text"
                                                            required
                                                            name="desc"
                                                            value={this.state.form.desc}
                                                            onChange={this.handleChange}
                                                        />
                                                    </div> 
                                                </div> 

                                            </div>
                                        </div>

                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                onClick={() => this.props.close()}
                                            >
                                                Close
                                            </button>

                                            <button
                                                className="text-white bg-gray-800 hover:bg-gray-900 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="submit">
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                )
                }
            </>
        );
    }
}

export default Form;
