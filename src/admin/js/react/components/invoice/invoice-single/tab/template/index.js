import React, { Component } from 'react'; 
import ReactPaginate from 'react-paginate';

import TablePreloader from 'block/preloader/table';
 
import Api from 'api/invoice';
import Table from './Table'; 

export default class Template extends Component {
    constructor(props) {
        super(props);         

        this.state = { 
            preloader: true, 
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

        Api.getAllTemplate(params)
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

    selectEntry = (data) => { 
        this.props.changeHandler(data);
    }   

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
                 

                <div className='mb-5 font-bold text-xl'>
                    Selete Template
                </div>  
 
                {this.state.preloader ? <TablePreloader /> : <Table tableData={this.state.clients} selectEntry={this.selectEntry} /> }

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