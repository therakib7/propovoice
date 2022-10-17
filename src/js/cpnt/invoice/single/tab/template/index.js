import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

import Preloader from 'block/preloader/template';

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
        this.getLists();
    }

    getLists = (searchArgs = null) => { 

        const old_version = JSON.parse(localStorage.getItem('ndpv_version'));
        const template = JSON.parse(localStorage.getItem('ndpv_templates'));

        //version compire
        let current_version = ndpv.version;
        let compare_version = current_version.localeCompare(old_version);

        if (template && old_version && compare_version !== 1) {

            this.setState({ preloader: false, templates: template });
            if (!this.props.currentTemplate) {
                this.props.changeHandler(template[0]);
            }
            return;
        }

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
                localStorage.setItem('ndpv_version', JSON.stringify(ndpv.version))
                localStorage.setItem('ndpv_templates', JSON.stringify(result))
                this.setState({ preloader: false, templates: result, totalPage: Math.ceil(total / this.state.perPage) });

                //select default template
                if (!this.props.currentTemplate) {
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
        const i18n = ndpv.i18n;
        return (
            <div id="pv-tab-template" className="pv-invoice-tab-content">
                <h2 className='pv-page-title'>{i18n.select} {i18n.tmpl}</h2>
                <div className="row pv-gap pv-margin-l-r">

                    {this.state.preloader && <Preloader />}

                    {!this.state.preloader &&
                        this.state.templates.map((row, index) => {
                            return (
                                <div className="col-12 col-md-6 col-lg-3" key={index}>
                                    <div className='pv-single-image-content'>
                                        <img src={row.src} className={'pv-single-image ' + (this.props.currentTemplate == row.id ? 'pv-active' : '')} />
                                        {(this.props.currentTemplate != row.id) && <div className="pv-overflow-content">
                                            <a className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue" onClick={() => this.selectEntry(row)}>{i18n.select}</a>
                                            <a
                                                href={'https://appux.co/ncpi/preview/inv' + row.id + '.html'}
                                                target="_blank"
                                                className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-hover-stroke pv-bg-shadow"
                                            >{i18n.full} {i18n.prv}</a>
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
                    containerClassName={"pv-pagination"}
                    activeClassName={"active"} />
                }
            </div>
        );
    }
} 