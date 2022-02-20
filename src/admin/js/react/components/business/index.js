import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import ReactPaginate from 'react-paginate';

import TablePreloader from '../preloader/table';

import Helper from './helper';
import Form from './Form';
import Table from './Table';
import Search from './Search';

export default class Business extends Component {
    constructor(props) {
        super(props);         

        this.state = {
            // clients: []
            preloader: true,
            formModal: false,
            searchModal: false,
            formModalType: 'new',
            msg: {
                create: 'Successfully Added',
                update: 'Successfully Updated',
                delete: 'Successfully Deleted',
                confirm: 'Are you sure to delete it?',
            },
            client: { id: null },
            clients: [],
            checkedBoxes: [],
            offset: 0,
            perPage: 10,
            totalPage: 1,
            currentPage: 1
        }; 
    }   

    componentDidMount() {
        this.getLists();
    }

    getLists = ( searchArgs = null ) => { 
        
        let args = {
            page: this.state.currentPage,
            per_page: this.state.perPage
        }

        if ( searchArgs ) {
            //Filter all falsy values ( "", 0, false, null, undefined )
            searchArgs = Object.entries(searchArgs).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {}) 
            args = { ...args, ...searchArgs}
        } 

        let params = new URLSearchParams(args).toString();

        Helper.getAll(params)
            .then(resp => {
                let result = resp.data.data.result;
                let total = resp.data.data.total;
                this.setState({ clients: result });
                this.setState({ preloader: false });

                this.setState({
                    totalPage: Math.ceil(total / this.state.perPage) 
                })
            })
    }; 

    handleSubmit = client => {
        if (this.state.formModalType == 'new') {
            Helper.create(client)
                .then(resp => {
                    if (resp.data.success) {
                        this.setState({ formModal: false })
                        toast.success(this.state.msg.create);
                        this.getLists();
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        } else {
            Helper.update(client.id, client)
                .then(resp => {
                    if (resp.data.success) {
                        this.setState({ formModal: false })
                        // this.setState({ formModalType: 'new' });
                        toast.success(this.state.msg.update);
                        this.getLists();
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        }
    }

    deleteEntry = (type, index) => {
        
        if ( confirm( this.state.msg.confirm ) ) {
            
            if ( type == 'single' ) {
                this.setState({
                    clients: this.state.clients.filter((client, i) => {
                        return client.id !== index;
                    })
                });
            }             
            let ids = ( type == 'single' ) ? index : this.state.checkedBoxes.toString();
            Helper.remove(ids)
                .then(resp => {
                    if (resp.data.success) {
                        toast.success(this.state.msg.delete); 
                        this.getLists();
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        }
    } 

    openForm = (type = 'new', client = null) => {
        this.setState({ formModal: true });

        if (type == 'new') {
            this.setState({ formModalType: 'new' });
        } else {
            this.setState({ formModalType: 'edit' });
            this.setState({ client: client });
        }
    };

    closeForm = ( type = 'new' ) => {
        if ( type == 'new' ) {
            this.setState({ formModal: false });
        } else {
            this.setState({ searchModal: false });
        }
    };

    handleCheckbox = (e, type, id = null) => {	 
        let arr = this.state.checkedBoxes;
        if ( type == 'single' ) {
            if( e.target.checked ) {
                arr.push(id);   
                this.setState({ checkedBoxes: arr }); 
            } else {			
                arr.splice(arr.indexOf(id), 1);        
                this.setState({ checkedBoxes: arr }); 
            }
        } else {
            //check all
            if( e.target.checked ) { 
                let ids = [];
                this.state.clients.map((row) => { ids.push(row.id) }); 
                this.setState({ checkedBoxes: ids });
            } else { 	           
                this.setState({ checkedBoxes: [] });
            }
        } 
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected + 1;
        const offset = selectedPage * this.state.perPage; 
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getLists()
        });

    };

    render() {
        const checkedBoxes = this.state.checkedBoxes;
        return (
            <div className="ncpi-components">
                <ToastContainer /> 

                <div className='mb-5 font-bold text-2xl'>
                    Business
                </div>

                <button
                    className="bg-gray-800 hover:bg-gray-900 text-white font-medium text-base py-2 px-4 rounded mb-3"
                    onClick={() => this.openForm('new')} >
                    Create New Business
                </button>
                
                { checkedBoxes.length ? <button
                    className="ml-3 bg-red-800 hover:bg-red-900 text-white font-medium text-base py-2 px-4 rounded mb-3"
                    onClick={() => this.deleteEntry('selected')} >
                    Delete selected
                </button> : ''} 

                <button
                    className="float-right bg-gray-700 hover:bg-gray-800 text-white font-medium text-base py-2 px-4 rounded mb-3"
                    onClick={() => this.setState({ searchModal: true }) } >
                    Search
                </button>

                <Form
                    handleSubmit={this.handleSubmit}
                    show={this.state.formModal}
                    modalType={this.state.formModalType}
                    data={this.state.client}
                    close={this.closeForm}
                />

                <Search
                    handleSubmit={this.getLists}
                    show={this.state.searchModal} 
                    close={this.closeForm}
                />

                {this.state.preloader ? <TablePreloader /> : <Table tableData={this.state.clients} editEntry={this.openForm} checkedBoxes={{ data: checkedBoxes, handle: this.handleCheckbox}} deleteEntry={this.deleteEntry} /> }

                { this.state.totalPage > 1 && <ReactPaginate
                    previousLabel={"Prev"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"} 
                    forcePage={this.state.currentPage - 1}
                    pageCount={this.state.totalPage}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"ncpi-pagination text-base mt-5 shadow"} 
                    activeClassName={"active"}/>
                }

            </div>
        );
    }
} 