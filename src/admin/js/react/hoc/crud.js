import React, { Component } from 'react';
import { toast } from 'react-toastify'; 
import AppContext from 'context/app-context'; 
 
import axios from 'axios';
import {apiUrl, token} from 'api/helper'  

const HOC = (Component, mod, modPlural ) => {
    // console.log("data", module);

    return class Crud extends Component {
        constructor(props) {
            super(props);

            this.state = {
                url: apiUrl + modPlural,
                title: mod.charAt(0).toUpperCase() + mod.slice(1), //capitalize
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

            axios.get(`${this.state.url}/?${params}`).then(resp => {
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
                
                axios.post(this.state.url, business, token).then(resp => {
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
                axios.put(`${this.state.url}/${business.id}`, business, token).then(resp => {
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
                axios.delete(`${this.state.url}/${ids}`, token).then(resp => {
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
            return (
              <Component 
                state={this.state}
                openForm={this.openForm}
                closeForm={this.closeForm}
                showItem={this.showItem}
                getLists={this.getLists}
                handleCheckbox={this.handleCheckbox}
                handleSubmit={this.handleSubmit}
                handleSearch={this.handleSearch}
                handlePageClick={this.handlePageClick}
                deleteEntry={this.deleteEntry}
              />
            );
        }
    };
};

export default HOC;