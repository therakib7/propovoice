import React, { Component } from 'react';
import { toast } from 'react-toastify';

import AppContext from 'context/app-context';
import ReactPaginate from 'react-paginate';

import Preloader from 'block/preloader/table';

import Api from 'api/deal';
import Form from './Form';
import Pipeline from './Pipeline';
// import Table from './Table';
import Search from './Search';
import Empty from 'block/empty';

export default class Deal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Deal',
            empty: false,
            preloader: true,
            formModal: false,
            searchModal: false,
            formModalType: 'new',
            deal: { id: null },
            deals: {},
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
                let column = resp.data.data.column;
                // let total = resp.data.data.total;
                // let empty = result.length ? false : true;
                // this.setState({ deals: result, preloader: false, empty, total, totalPage: Math.ceil(total / this.state.perPage) }); 
                this.setState({ deals: column, preloader: false, empty: false });
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

    handleSubmit = deal => {
        let newDeal = { ...deal }
        if (newDeal.stage_id) {
            newDeal.stage_id = newDeal.stage_id.id;
        }

        if (newDeal.tags.length) {
            let finalArray = newDeal.tags.map(function (obj) {
                return obj.id;
            });
            newDeal.tags = finalArray;
        }

        if (this.state.formModalType == 'new') {
            Api.create(newDeal)
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
            Api.update(newDeal.id, newDeal)
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
                    deals: this.state.deals.filter((deal, i) => {
                        return deal.id !== index;
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

    openForm = (type = 'new', deal = null) => { //deal, stage  
        if ( type == 'new' ) {
            this.setState({ formModal: true, formModalType: 'new' });
        } else {
            this.setState({ formModal: true, formModalType: 'edit', deal: deal }); 
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
                this.state.deals.map((row) => { ids.push(row.id) });
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
        const { title, deals, checkedBoxes, searchVal } = this.state;
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
                            {title} Pipeline
                        </li>
                    </ul>
                </nav>

                <div className="row">
                    <div className="col-lg-6">
                        <h2 className="pi-page-title">Deal Pipeline</h2>
                    </div>
                    <div className="col-lg-6 pi-text-right">
                        <button 
                        className="pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-bg-shadow"
                        onClick={() => this.openForm('new')}
                        >
                            <svg
                                width={14}
                                height={12}
                                viewBox="0 0 12 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2.5 8H13.5"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8 2.5V13.5"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Add {title}
                        </button>
                    </div>
                </div>

                {this.state.empty && <Empty title={title} searchVal={searchVal} clickHandler={() => this.openForm('new')} />} 

                {this.state.formModal && <Form
                    handleSubmit={this.handleSubmit}
                    // show={this.state.formModal}
                    modalType={this.state.formModalType}
                    data={this.state.deal}
                    close={this.closeForm}
                />}

                {this.state.preloader ? <Preloader /> : 
                <Pipeline 
                    new={this.openForm}
                    data={deals}
                />}
            </div>
        );
    }
} 