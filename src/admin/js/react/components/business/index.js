import React, { Component } from 'react';
import { toast } from 'react-toastify';

import AppContext from 'context/app-context';
import ReactPaginate from 'react-paginate';

import Preloader from 'block/preloader/table';

import Api from 'api/business';
import Form from './Form';
import Table from './Table';
import Search from './Search';
import Empty from 'block/empty';

export default class Business extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Business',
            empty: false,
            preloader: true,
            formModal: false,
            searchModal: false,
            formModalType: 'new',
            business: { id: null },
            businesses: [],
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
                this.setState({ businesses: result, preloader: false, empty, total, totalPage: Math.ceil(total / this.state.perPage) });
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

    handleSubmit = business => {
        if (this.state.formModalType == 'new') {
            Api.create(business)
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
            Api.update(business.id, business)
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
                    businesses: this.state.businesses.filter((business, i) => {
                        return business.id !== index;
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

    openForm = (type = 'new', business = null) => {
        if (type == 'new') {
            this.setState({ formModal: true, formModalType: 'new' });
        } else {
            this.setState({ formModal: true, formModalType: 'edit', business: business });
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
                this.state.businesses.map((row) => { ids.push(row.id) });
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
        const { title, businesses, checkedBoxes, searchVal } = this.state;
        return (
            <div className="ncpi-components">
                <h1>{title}</h1>
                <nav className="pi-breadcrumb">
                    <ul>
                        <li>
                            <a href="#" >
                                Home
                            </a>
                        </li>
                        <li>&gt;</li>
                        <li className="pi-active">
                            {title}
                        </li>
                    </ul>
                </nav> 

                <div className="pi-buttons">
                    <button
                        className="pi-btn pi-bg-blue pi-bg-hover-blue"
                        onClick={() => this.openForm('new')} >
                        Create New {title}
                    </button>

                    {checkedBoxes.length ? <button
                        style={{ marginLeft: '5px' }} className="pi-btn pi-bg-red pi-bg-hover-red"
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
                    data={this.state.business}
                    close={this.closeForm}
                />

                <Search
                    handleSubmit={this.getLists}
                    show={this.state.searchModal}
                    close={this.closeForm}
                />

                {businesses.length > 0 && <div className='pi-table-showing'>
                    <p>
                        {businesses.length} Business showing from {this.state.total}
                        <select onChange={this.showItem}>
                            <option value="10">Show item 10</option>
                            <option value="20">Show item 20</option>
                            <option value="30">Show item 30</option>
                            <option value="50">Show item 50</option>
                            <option value="100">Show item 100</option>
                        </select>
                    </p>
                </div>}
                {this.state.preloader ? <Preloader /> : <Table tableData={businesses} searchVal={searchVal} editEntry={this.openForm} checkedBoxes={{ data: checkedBoxes, handle: this.handleCheckbox }} deleteEntry={this.deleteEntry} />}

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