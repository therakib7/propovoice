import React, { Component } from 'react';
import { toast } from 'react-toastify';

import AppContext from 'context/app-context';
import ReactPaginate from 'react-paginate';

import TablePreloader from 'block/preloader/table';

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
            checkedBoxes: [],
            offset: 0,
            perPage: 10,
            totalPage: 1,
            currentPage: 1
        };
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
                this.setState({ clients: result, preloader: false, empty, totalPage: Math.ceil(total / this.state.perPage) });
            })
    };

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
                this.setState({
                    clients: this.state.clients.filter((client, i) => {
                        return client.id !== index;
                    })
                });
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
        const checkedBoxes = this.state.checkedBoxes;
        const clients = this.state.clients;
        const title = this.state.title;
        return (
            <div className="ncpi-components">


                <h1 className="">{title}</h1>
                <nav className="pi-breadcrumb">
                    <ul className="">
                        <li>
                            <a href="#" className="">
                                Home
                            </a>
                        </li>
                        <li>&gt;</li>
                        <li className="pi-active">
                            {title}
                        </li>
                    </ul>
                </nav>

                {clients.length > 0 &&
                    <>
                        {!wage.length && <div className="pi-cards">
                            <div className="row">
                                <div className="col col-md-6 col-lg-3">
                                    <div className="pi-bg-air-white">
                                        <span className="">Total {title}</span>
                                        <h4 className="pi-color-blue">23</h4>
                                    </div>
                                </div>
                                <div className="col col-md-6 col-lg-3">
                                    <div className="pi-bg-air-white">
                                        <span className="">Paid {title}</span>
                                        <h4 className="pi-color-blue">132</h4>
                                    </div>
                                </div>
                                <div className="col col-md-6 col-lg-3">
                                    <div className="pi-bg-air-white">
                                        <span className="">Unpaid {title}</span>
                                        <h4 className="pi-color-blue">16</h4>
                                    </div>
                                </div>
                                <div className="col col-md-6 col-lg-3">
                                    <div className="pi-bg-air-white">
                                        <span className="">Draft {title}</span>
                                        <h4 className="pi-color-blue">21</h4>
                                    </div>
                                </div>
                            </div>
                        </div>}

                        <div className="pi-buttons">
                            <button
                                className="pi-btn pi-bg-blue pi-bg-hover-blue"
                                onClick={() => this.openForm('new')} >
                                Create New {title}
                            </button>

                            {checkedBoxes.length ? <button
                                className="pi-btn pi-bg-red pi-bg-hover-red"
                                onClick={() => this.deleteEntry('selected')} >
                                Delete selected
                            </button> : ''}

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
                                <input type="text" className="search-input" placeholder="Search.." />
                            </div>
                        </div>
                    </>}

                {this.state.empty && <Empty title={title} clickHandler={() => this.openForm('new')} />}

                {/* <button
                    className=""
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

                {this.state.preloader ? <TablePreloader /> : <Table tableData={clients} editEntry={this.openForm} checkedBoxes={{ data: checkedBoxes, handle: this.handleCheckbox }} deleteEntry={this.deleteEntry} />}

                {this.state.totalPage > 1 && <ReactPaginate
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
                    activeClassName={"active"} />
                }

            </div>
        );
    }
} 