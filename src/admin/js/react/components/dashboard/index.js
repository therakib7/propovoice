import React, { Component } from 'react';
import { toast } from 'react-toastify';

import AppContext from '../../context/app-context';
import ReactPaginate from 'react-paginate';

import TablePreloader from 'block/preloader/table';

import Api from '../../api/business';
import Form from './Form';
import Table from './Table';
import Search from './Search';
import Empty from 'block/empty';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            title: 'Dashboard',
            preloader: true,
            formModal: false,
            searchModal: false,
            formModalType: 'new',
            business: { id: null },
            businesses: [],
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
                this.setState({ businesses: result });
                this.setState({ preloader: false });

                this.setState({
                    totalPage: Math.ceil(total / this.state.perPage)
                })
            })
    };

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
                        // this.setState({ formModalType: 'new' });
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
        this.setState({ formModal: true });

        if (type == 'new') {
            this.setState({ formModalType: 'new' });
        } else {
            this.setState({ formModalType: 'edit' });
            this.setState({ business: business });
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
        const checkedBoxes = this.state.checkedBoxes;
        const businesses = this.state.businesses;
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
                        <li className="active">
                            <a href="#" className="">
                            {title}
                            </a>
                        </li>
                    </ul>
                </nav> 
                 
                <div className="pi-cards">
                    <div className="row">
                        <div className="col col-md-6 col-lg-3">
                            <div className="pi-bg-air-white">
                            <span className="">Total Estimate</span>
                            <h4 className="pi-color-blue">23</h4>
                            </div>
                        </div>
                        <div className="col col-md-6 col-lg-3">
                            <div className="pi-bg-air-white">
                            <span className="">Paid Invoice</span>
                            <h4 className="pi-color-blue">132</h4>
                            </div>
                        </div>
                        <div className="col col-md-6 col-lg-3">
                            <div className="pi-bg-air-white">
                            <span className="">Total Project</span>
                            <h4 className="pi-color-blue">16</h4>
                            </div>
                        </div>
                        <div className="col col-md-6 col-lg-3">
                            <div className="pi-bg-air-white">
                            <span className="">Draft</span>
                            <h4 className="pi-color-blue">21</h4>
                            </div>
                        </div>
                    </div>
                </div>  

                {/* {!businesses.length && <Empty title={title} clickHandler={() => this.openForm('new')} />} */}

                {/* <button
                    className="float-right bg-gray-700 hover:bg-gray-800 text-white font-medium text-base py-2 px-4 rounded mb-3"
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

                {/* {this.state.preloader ? <TablePreloader /> : <Table tableData={businesses} editEntry={this.openForm} checkedBoxes={{ data: checkedBoxes, handle: this.handleCheckbox }} deleteEntry={this.deleteEntry} />} */}

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