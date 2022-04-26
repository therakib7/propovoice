import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

import TablePreloader from 'block/preloader/table';

import Api from 'api/invoice'; 

export default class Template extends Component {
    constructor(props) {
        super(props);

        this.state = {
            preloader: true, 
            templates: [], 
            offset: 0,
            perPage: 10,
            totalPage: 1,
            currentPage: 1
        };
    }

    componentDidMount() {
        //TODO: do not render it multiple time 
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

        Api.getAllTemplate(params)
            .then(resp => {
                let result = resp.data.data.result;
                let total = resp.data.data.total;
                this.setState({ templates: result });
                this.setState({ preloader: false }); 
                this.setState({
                    totalPage: Math.ceil(total / this.state.perPage)
                })

                //select default template
                if ( ! this.props.currentTemplate ) { 
                    this.props.changeHandler(result[0]);
                }
            })
    };

    selectEntry = (data) => {
        this.props.changeHandler(data, true);
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
            <div id="pi-template" className="pi-invoice-tab-content">
                <h2 className='pi-tab-content-title'>Select Template</h2>
                <div className="row pi-gap pi-margin-l-r">
                    
                    {this.state.preloader && <TablePreloader />}

                    {!this.state.preloader &&
                        this.state.templates.map((row, index) => { 
                            return (
                                <div className="col-12 col-md-6 col-lg-3" key={index}>
                                    <div className={(this.props.currentTemplate == row.id) ? 'pi-single-image-content pi-active' : 'pi-single-image-content'}>
                                        <img src={row.src} className="pi-single-image" />
                                        { ( this.props.currentTemplate != row.id ) && <div className="pi-overflow-content">
                                            <a className="pi-btn pi-bg-blue pi-bg-hover-blue" onClick={() => this.selectEntry(row)}>Select</a>
                                            <a 
                                            href={'https://appux.co/ncpi/preview/inv'+row.id+'.html'} 
                                            target="_blank"
                                            className="pi-btn pi-bg-blue pi-bg-hover-blue"
                                            >Full Preview</a>
                                        </div>}
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                {this.state.totalPage > 1 && <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    breakClassName={"break"}
                    forcePage={this.state.currentPage - 1}
                    pageCount={this.state.totalPage}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pi-pagination"}
                    activeClassName={"active"} />
                }
            </div>
        );
    }
} 