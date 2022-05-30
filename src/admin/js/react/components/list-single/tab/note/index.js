import React, { Component } from 'react';
import { toast } from 'react-toastify';

import AppContext from 'context/app-context';
import ReactPaginate from 'react-paginate';

import Preloader from 'block/preloader/table';

import Api from 'api/note';
import Form from './Form';
import Table from './Table';
import Search from './Search';
import Empty from 'block/empty';

export default class Note extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Note',
            empty: false,
            preloader: true,
            formModal: false,
            searchModal: false,
            formModalType: 'new',
            task: { id: null },
            tasks: [],
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
            per_page: this.state.perPage,
            tab_id: this.props.tab_id
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
                this.setState({ tasks: result, preloader: false, empty, total, totalPage: Math.ceil(total / this.state.perPage) });
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

    handleSubmit = task => {
        if (this.state.formModalType == 'new') {
            Api.create(task)
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
            Api.update(task.id, task)
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
                    tasks: this.state.tasks.filter((task, i) => {
                        return task.id !== index;
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

    openForm = (type = 'new', task = null) => {
        if (type == 'new') {
            this.setState({ formModal: true, formModalType: 'new' });
        } else {
            this.setState({ formModal: true, formModalType: 'edit', task: task });
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
                this.state.tasks.map((row) => { ids.push(row.id) });
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
        const { title, tasks, checkedBoxes, searchVal } = this.state;
        return (
            <div className="">  
                <Form
                    handleSubmit={this.handleSubmit}  
                    tab_id={this.props.tab_id}
                />
                 
                <div className="pi-work-button-group">
                    <h3>My Notes</h3> 
                </div>
                {/* ./ pi-work-button-group */}

                {this.state.preloader ? <Preloader /> : <Table tableData={tasks} searchVal={searchVal} editEntry={this.openForm} checkedBoxes={{ data: checkedBoxes, handle: this.handleCheckbox }} deleteEntry={this.deleteEntry} />}

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