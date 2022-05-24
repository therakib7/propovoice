import React, { Component } from 'react';
import { toast } from 'react-toastify';

import AppContext from 'context/app-context';
import ReactPaginate from 'react-paginate';

import Preloader from 'block/preloader/table';

import Api from 'api/client';
import Form from './Form';
import Table from './Table';
import Search from './Search';
import Empty from 'block/empty';

export default class Client extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Client',
            empty: false,
            preloader: true,
            formModal: false,
            searchModal: false,
            formModalType: 'new',
            client: { id: null },
            clients: [],
            summary: {
                total: 0,
                paid: 0,
                unpaid: 0,
                draft: 0,
                sent: 0
            },
            checkedBoxes: [],
            offset: 0,
            perPage: 10,
            total: 1,
            totalPage: 1,
            currentPage: 1,
            searchVal: ''
        };
        this.timeout = 0;
    }

    static contextType = AppContext;

    componentDidMount() {
        this.getLists();
    }

    getLists = (searchArgs = null) => {

        let args = {
            page: this.state.currentPage,
            per_page: this.state.perPage
        }

        if (searchArgs) {
            //Filter all falsy values ( "", 0, false, null, undefined )
            searchArgs = Object.entries(searchArgs).reduce((a, [k, v]) => (v ? (a[k] = v, a) : a), {})
            args = { ...args, ...searchArgs }
        }

        let params = new URLSearchParams(args).toString();

        Api.getAll(params)
            .then(resp => {
                let result = resp.data.data.result;
                let total = resp.data.data.total;
                let empty = result.length ? false : true;
                this.setState({ clients: result, preloader: false, empty, total, totalPage: Math.ceil(total / this.state.perPage) }); 
            })
    };

    handleSearch = (e) => {
        const { value } = e.target;

        this.setState({ searchVal: value }, () => {
            // if (this.state.searchVal.length < 3) return;

            //search when typing stop
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.getLists({
                    s: this.state.searchVal
                });
            }, 300);
        });
    }

    showItem = (e) => {
        const { value } = e.target;
        this.setState({ perPage: value }, () => {
            this.getLists();
        });
    }

    handleSubmit = client => {
        if (this.state.formModalType == 'new') {
            Api.create(client)
                .then(resp => {
                    if (resp.data.success) {
                        this.setState({ formModal: false })
                        toast.success(this.context.CrudMsg.create);
                        this.getLists();
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        } else {
            Api.update(client.id, client)
                .then(resp => {
                    if (resp.data.success) {
                        this.setState({ formModal: false })
                        toast.success(this.context.CrudMsg.update);
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

        if (confirm(this.context.CrudMsg.confirm)) {

            if (type == 'single') {
                /* this.setState({
                    clients: this.state.clients.filter((client, i) => {
                        return client.id !== index;
                    })
                }); */ 
            }
            let ids = (type == 'single') ? index : this.state.checkedBoxes.toString();
            Api.remove(ids)
                .then(resp => {
                    if (resp.data.success) {
                        toast.success(this.context.CrudMsg.delete);
                        if (type != 'single') {
                            this.setState({ checkedBoxes: [] });
                        }
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

    closeForm = (type = 'new') => {
        if (type == 'new') {
            this.setState({ formModal: false });
        } else {
            this.setState({ searchModal: false });
        }
    };

    handleCheckbox = (e, type, id = null) => {
        let arr = this.state.checkedBoxes;
        if (type == 'single') {
            if (e.target.checked) {
                arr.push(id);
                this.setState({ checkedBoxes: arr });
            } else {
                arr.splice(arr.indexOf(id), 1);
                this.setState({ checkedBoxes: arr });
            }
        } else {
            //check all
            if (e.target.checked) {
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
        const { title, clients, checkedBoxes, searchVal } = this.state;
        const { total, paid, unpaid, draft, sent } = this.state.summary;
        return (
            <div className="ncpi-components">  
                <nav className='pi-breadcrumb'>
                    <ul>
                        <li>
                            <a href='#' >
                                Home
                            </a>
                        </li>
                        <li>
                            <svg
                                width={5}
                                height={10}
                                viewBox="0 0 5 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg" 
                            >
                            <path
                                d="M.5 1.25L4.25 5 .5 8.75"
                                stroke="#718096"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            </svg>
                        </li>
                        <li className='pi-active'>
                            {title}
                        </li>
                    </ul>
                </nav>

                <h2 className='pi-page-title'>{title}</h2> 

                {clients.length > 0 &&
                    <>{!wage.length && <div className="pi-cards">
                        <div className="row">
                                <div className="col-md-4 col-lg">
                                    <div className="pi-cards-content pi-bg-husky">
                                        <span>Total {title}</span>
                                        <h4 className="pi-color-blue">{total}</h4>
                                    </div>
                                </div>

                                <div className="col-md-4 col-lg">
                                    <div className="pi-cards-content" style={{ backgroundColor: '#f9f6ea' }}>
                                        <span>Paid {title}</span>
                                        <h4 style={{ color: '#c66542' }}>{paid}</h4>
                                    </div>
                                </div>

                                <div className="col-md-4 col-lg">
                                    <div className="pi-cards-content" style={{ backgroundColor: '#d7f4f1' }}>
                                        <span>Unpaid {title}</span>
                                        <h4 style={{ color: '#45ac9d' }}>{unpaid}</h4>
                                    </div>
                                </div>

                                <div className="col-md-4 col-lg">
                                    <div className="pi-cards-content" style={{ backgroundColor: '#f7dfec' }}>
                                        <span>Draft {title}</span>
                                        <h4 style={{ color: '#b66490' }}>{draft}</h4>
                                    </div>
                                </div>

                                <div className="col-md-4 col-lg">
                                    <div className="pi-cards-content" style={{ backgroundColor: '#e6ffe7' }}>
                                        <span>Sent {title}</span>
                                        <h4 style={{ color: '#43ad47' }}>{sent}</h4>
                                    </div>
                                </div>
                            </div>
                    </div>}  
                </>}

                <div className="pi-buttons">
                    <button
                        className="pi-btn pi-bg-blue pi-bg-hover-blue"
                        onClick={() => this.openForm('new')} >
                        Add New {title}
                    </button> 

                    <div className="pi-search-box pi-float-right">
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.77 18.3a7.53 7.53 0 110-15.06 7.53 7.53 0 010 15.06zm0-13.55a6 6 0 100 12 6 6 0 000-12z"
                                fill="#718096"
                            />
                            <path
                                d="M20 20.75a.74.74 0 01-.53-.22l-4.13-4.13a.75.75 0 011.06-1.06l4.13 4.13a.75.75 0 01-.53 1.28z"
                                fill="#718096"
                            />
                        </svg>

                        <input
                            type="text"
                            className="pi-search-input"
                            placeholder="Search..."
                            value={this.state.searchVal}
                            onChange={this.handleSearch}
                        />
                    </div>
                </div>

                {this.state.empty && <Empty title={title} searchVal={searchVal} clickHandler={() => this.openForm('new')} />}

                {/* <button
                    
                    onClick={() => this.setState({ searchModal: true })} >
                    Search
                </button> */}

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

                {clients.length > 0 && <div className='pi-table-showing'>
                    <p>
                        {clients.length} {title} showing from {this.state.total}
                        <select onChange={this.showItem}>
                            <option value="10">Show item 10</option>
                            <option value="20">Show item 20</option>
                            <option value="30">Show item 30</option>
                            <option value="50">Show item 50</option>
                            <option value="100">Show item 100</option>
                        </select>
                    </p>
                </div>}

                {checkedBoxes.length > 0 && <div className='pi-table-showing'>
                    <p>
                        {checkedBoxes.length} {title} selected
                        <button
                            style={{ marginLeft: '10px', backgroundColor: '#edf2f7' }} className="pi-btn"
                            onClick={() => this.deleteEntry('selected')} >
                            Delete
                        </button>
                    </p>
                </div>} 

                {this.state.preloader ? <Preloader /> : <Table tableData={clients} searchVal={searchVal} editEntry={this.openForm} checkedBoxes={{ data: checkedBoxes, handle: this.handleCheckbox }} deleteEntry={this.deleteEntry} />}

                {this.state.totalPage > 1 && <ReactPaginate
                    previousClassName='pi-previous'
                    nextClassName='pi-next'
                    disabledClassName='pi-disabled'
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    breakClassName='break'
                    forcePage={this.state.currentPage - 1}
                    pageCount={this.state.totalPage}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pi-pagination"}
                    activeClassName='pi-active' />
                }

            </div>
        );
    }
} 