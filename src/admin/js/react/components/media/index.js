import React, { Component } from 'react';
import { toast } from 'react-toastify';

import AppContext from '../../context/app-context';
import ReactPaginate from 'react-paginate';

import TablePreloader from 'block/preloader/table';

import Api from '../../api/media';
import Form from './Form';
import Table from './Table';
import Search from './Search';
import Empty from 'block/empty';

export default class Media extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            title: 'Media',
            empty: false,
            preloader: true,
            formModal: false,
            searchModal: false,
            formModalType: 'new',
            media: { id: null },
            medias: [],
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
                this.setState({ medias: result, preloader: false, empty }); 

                this.setState({
                    totalPage: Math.ceil(total / this.state.perPage)
                })
            })
    };

    handleSubmit = media => {
        if (this.state.formModalType == 'new') {
            Api.create(media)
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
            Api.update(media.id, media)
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
                    medias: this.state.medias.filter((media, i) => {
                        return media.id !== index;
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

    openForm = (type = 'new', media = null) => {
        this.setState({ formModal: true });

        if (type == 'new') {
            this.setState({ formModalType: 'new' });
        } else {
            this.setState({ formModalType: 'edit' });
            this.setState({ media: media });
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
                this.state.medias.map((row) => { ids.push(row.id) });
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
        const medias = this.state.medias;
        const title = this.state.title;
        return (
            <div className="pi-overlay dpi-show">
                <div className="pi-popup-content">
                    <div className="pi-modal-header">
                        <h2 className="pi-modal-title">{title}</h2>
                        <span className="pi-close">
                        ×
                        </span>
                    </div> 
                    <div className="pi-content">
                        <div className="row">
                                <div className="col-md">
                                    data
                                </div> 
                                <div className="col-md">
                                    data
                                </div>
                            </div> 
                    </div>
                    <div className="pi-footer-content">  
                        <button
                            className="pi-btn pi-bg-black pi-bg-hover-blue pi-float-right"
                            type="submit">
                            Insert 
                        </button>
                    </div> 
                </div>
            </div>
        );
    }
} 