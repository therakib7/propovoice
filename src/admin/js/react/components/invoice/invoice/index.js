import React, { Component } from 'react';
import { toast } from 'react-toastify';

import { useNavigate, useLocation } from "react-router-dom";
import AppContext from 'context/app-context';

import ReactPaginate from 'react-paginate';

import TablePreloader from 'block/preloader/table';

import Api from 'api/invoice';
import ApiAction from 'api/action';

import Table from './Table';
import Search from './Search';
import Empty from 'block/empty';

const Invoice = class Invoice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            path: '',
            empty: false,
            preloader: true,
            formModal: false,
            searchModal: false,
            formModalType: 'new',
            invoice: { id: null },
            invoices: [],
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
        let title = this.props.path == '/invoice' ? 'Invoice' : 'Estimate';
        let path = this.props.path == '/invoice' ? 'invoice' : 'estimate';

        this.setState({ title, path }, () => {
            this.getLists();
        });
    }

    getLists = (searchArgs = null) => {

        let args = {
            page: this.state.currentPage,
            per_page: this.state.perPage
        }

        args.path = this.state.path;

        if (this.props.invoice_id) {
            args.invoice_id = this.props.invoice_id;
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
                this.setState({ invoices: result, preloader: false, empty, total, totalPage: Math.ceil(total / this.state.perPage) }); 
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

    deleteEntry = (type, index) => {

        if (confirm(this.context.CrudMsg.confirm)) {

            if (type == 'single') {
                /* this.setState({
                    invoices: this.state.invoices.filter((invoice, i) => {
                        return invoice.id !== index;
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
                this.state.invoices.map((row) => { ids.push(row.id) });
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

    newInvoie = () => {
        this.props.routeChange();
    };

    handleAction = (type, id) => {
        if ( 
            type == 'sent' ||
            type == 'paid' ||
            type == 'accept' ||
            type == 'decline' 
        ) {
            ApiAction.update(id, {type})
                .then(resp => {
                    if (resp.data.success) { 
                        if ( type == 'sent' ) {
                            toast.success(`Successfully mark as Sent`);
                        } else if ( type == 'paid' ) {
                            toast.success(`Successfully mark as Paid`);
                        } else if ( type == 'accept' ) {
                            toast.success(`Successfully mark as Accepted`);
                        } else if ( type == 'decline' ) {
                            toast.success(`Successfully mark as Declined`);
                        }                         
                        this.getLists();
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        } else if (
            type == 'copy' ||
            type == 'copy-to-inv' 
        ) {
            ApiAction.create({id, type})
                .then(resp => {
                    if (resp.data.success) {
                        if ( type == 'copy' ) {
                            toast.success(`Successfully copied`);
                            this.getLists();
                        } else if ( type == 'copy-to-inv' ) {
                            toast.success(`Successfully convert to invoice`);
                        } 
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        } 
    }

    render() { 
        const { title, invoices, checkedBoxes, searchVal } = this.state;
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

                {invoices.length > 0 &&
                <>
                    {!wage.length && <div className="pi-cards">
                        <div className="row">
                            <div className="col col-md-6 col-lg-3">
                                <div className="pi-bg-air-white">
                                    <span >Total {title}</span>
                                    <h4 className="pi-color-blue">23</h4>
                                </div>
                            </div>
                            <div className="col col-md-6 col-lg-3">
                                <div className="pi-bg-air-white">
                                    <span >Paid {title}</span>
                                    <h4 className="pi-color-blue">132</h4>
                                </div>
                            </div>
                            <div className="col col-md-6 col-lg-3">
                                <div className="pi-bg-air-white">
                                    <span >Unpaid {title}</span>
                                    <h4 className="pi-color-blue">16</h4>
                                </div>
                            </div>
                            <div className="col col-md-6 col-lg-3">
                                <div className="pi-bg-air-white">
                                    <span >Draft {title}</span>
                                    <h4 className="pi-color-blue">21</h4>
                                </div>
                            </div>
                        </div>
                    </div>} 
                </>}

                <div className="pi-buttons"> 
                    <button
                        className="pi-btn pi-bg-blue pi-bg-hover-blue"
                        onClick={() => this.newInvoie()} >
                        Create New {title}
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

                {this.state.empty && <Empty title={title} searchVal={searchVal} clickHandler={() => this.newInvoie()} />}

                {/* <button 
                    onClick={() => this.setState({ searchModal: true })} >
                    Search
                </button>  */}

                {/* <Search
                    handleSubmit={this.getLists}
                    show={this.state.searchModal}
                    close={this.closeForm}
                /> */}

                {invoices.length > 0 && <div className='pi-table-showing'>
                    <p>
                        {invoices.length} {title} showing from {this.state.total}
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

                {this.state.preloader ? <TablePreloader /> : <Table reload={this.getLists} tableData={invoices} checkedBoxes={{ data: checkedBoxes, handle: this.handleCheckbox }} deleteEntry={this.deleteEntry} invoice_id={this.props.invoice_id} path={this.state.path} action={this.handleAction} />}

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

function InvoiceWrap() {
    const location = useLocation();
    const path = location.pathname;

    let navigate = useNavigate();
    const routeChange = () => {
        navigate(`${path}/single`, { replace: true });
    };

    return (
        <>
            <Invoice routeChange={routeChange} path={path} key={path} />
        </>
    );
}
export default InvoiceWrap; 