import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

import Preloader from 'block/preloader/table';

import Api from 'api/invoice';

import Dropzone from './Dropzone';

export default class Template extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItem: { id: null },
            currentTab: 'upload',
            preloader: true,
            templates: [],
            offset: 0,
            perPage: 10,
            totalPage: 1,
            currentPage: 1
        };
    }

    componentDidMount() {
        // this.getLists();
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

        /* Api.getAllTemplate(params)
            .then(resp => {
                let result = resp.data.data.result;
                let total = resp.data.data.total;
                this.setState({ templates: result });
                this.setState({ preloader: false });
                this.setState({
                    totalPage: Math.ceil(total / this.state.perPage)
                })
            }) */
    };

    selectEntry = (data) => {
        this.setState({
            selectedItem: data
        })
    }

    newMedia = (data) => {
        let templates = this.state.templates
        templates.unshift(data);
        this.setState({
            currentTab: 'gallery',
            templates
        });
    }

    insertMedia = () => {
        let item = this.state.selectedItem;
        if (!item.id) {
            alert('Please select a media');
        }
        this.props.insertHandler(item);
        this.props.close();
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
            <>
                {this.props.show &&
                    <div className="pv-overlay pv-show">
                        <div className="pv-modal-content">
                            <div className="pv-modal-header">
                                <h2 className="pv-modal-title pv-text-center">{i18n.media} {i18n.gal}</h2>
                                <span className="pv-close" onClick={() => this.props.close()}>×</span>
                            </div>

                            <div className="pv-content">
                                <button
                                    className={'pv-btn pv-bg-air-white pv-bg-hover-blue pv-hover-color-white ' + (this.state.currentTab == 'upload' ? 'pv-bg-blue pv-color-white' : '')}
                                    onClick={(e) => { e.preventDefault(); this.setState({ currentTab: 'upload' }) }}
                                >
                                    <svg
                                        width={14}
                                        height={14}
                                        viewBox="0 0 14 14"
                                        fill="none"
                                    >
                                        <path
                                            d="M3.668 10.09a2.7 2.7 0 01-1.779-.662 2.563 2.563 0 01-.394-3.457 2.67 2.67 0 011.587-1.03 3.199 3.199 0 01.46-2.452 3.334 3.334 0 012.1-1.417 3.395 3.395 0 012.508.45 3.26 3.26 0 011.448 2.053h.067c.826 0 1.623.299 2.236.84a3.205 3.205 0 01.45 4.35 3.34 3.34 0 01-2.02 1.26M9 8.137l-2-1.954m0 0L5.002 8.136M7 6.182V13"
                                            stroke="#136ACD"
                                            strokeWidth={1.5}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    {i18n.upload}
                                </button>

                                <button
                                    className={'pv-btn pv-bg-air-white pv-bg-hover-blue pv-hover-color-white ' + (this.state.currentTab == 'gallery' ? 'pv-bg-blue pv-color-white' : '')}
                                    onClick={(e) => { e.preventDefault(); this.setState({ currentTab: 'gallery' }) }}
                                >
                                    <svg
                                        width={12}
                                        height={12}
                                        viewBox="0 0 12 12"
                                        fill="none"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M7.976 1.903a1.5 1.5 0 112.121 2.12l-2.25 2.25a1.5 1.5 0 01-2.12 0 .75.75 0 00-1.061 1.061 3 3 0 004.242 0l2.25-2.25A3 3 0 006.916.842L5.79 1.967a.75.75 0 101.06 1.06l1.125-1.124zm-3.75 3.75a1.5 1.5 0 012.121 0 .75.75 0 101.06-1.06 3 3 0 00-4.241 0l-2.25 2.25a3 3 0 104.242 4.241L6.283 9.96a.75.75 0 10-1.06-1.06l-1.126 1.125a1.5 1.5 0 11-2.12-2.121l2.25-2.25z"
                                            fill="#18181B"
                                        />
                                    </svg>
                                    {i18n.gal}
                                </button>

                                {this.state.currentTab == 'upload' && <div className="pv-media-upload">
                                    <Dropzone newMedia={this.newMedia} />
                                </div>}

                                {this.state.currentTab == 'gallery' &&
                                    <>
                                        <div className="pv-media-gallery">
                                            <div className="row pv-gap pv-margin-l-r">

                                                {this.state.preloader && <Preloader />}

                                                {!this.state.preloader &&
                                                    this.state.templates.map((row, index) => {
                                                        return (
                                                            <div className="col-12 col-md-6 col-lg-3" key={index}>
                                                                <div className={(this.state.selectedItem.id == row.id) ? 'pv-single-image-content pv-active' : 'pv-single-image-content'}>
                                                                    <img src={row.src} className="pv-single-image" />
                                                                    {(this.state.selectedItem.id != row.id) && <div className="pv-overflow-content">
                                                                        <a className="pv-btn pv-bg-blue pv-bg-hover-blue" onClick={() => this.selectEntry(row)}>{i18n.select}</a>
                                                                    </div>}
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
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
                                                containerClassName={"ndpv-pagination text-base mt-5 shadow"}
                                                activeClassName={"active"} />
                                            }
                                        </div>
                                        <div className="pv-footer-content pv-text-center">
                                            <button className="pv-btn pv-bg-blue pv-bg-hover-blue"
                                                onClick={(e) => { e.preventDefault(); this.insertMedia() }}
                                            >
                                                {i18n.ins}
                                            </button>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                }
            </>

        );
    }
} 