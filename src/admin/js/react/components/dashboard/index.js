import React, { Component } from 'react';
import { toast } from 'react-toastify';
import {
    NavLink
} from "react-router-dom";

import Api from 'api/dashboard';
import Feedback from './Feedback';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            preloader: true,
            feedbackModal: false,
            feedbackModalType: '',
            summary: {
                total_client: 0,
                total_estimate: 0,
                accepted_estimate: 0,
                total_invoice: 0,
                paid_invoice: 0
            },
        };
    }

    componentDidMount() {
        this.getLists();
    }

    getLists = (searchArgs = null) => {

        let args = {
            page: 1,
            per_page: 10
        }

        if (searchArgs) {
            //Filter all falsy values ( "", 0, false, null, undefined )
            searchArgs = Object.entries(searchArgs).reduce((a, [k, v]) => (v ? (a[k] = v, a) : a), {})
            args = { ...args, ...searchArgs }
        }

        let params = new URLSearchParams(args).toString();

        Api.getAll(params)
            .then(resp => {
                this.setState({ summary: resp.data.data.summary });
                this.setState({ preloader: false });
            })
    };

    render() {
        const { total_client, total_estimate, accepted_estimate, total_invoice, paid_invoice } = this.state.summary;
        return (
            <div className="ncpi-components">
                <h1>Dashboard<sup>Alpha</sup></h1>
                <div className="pi-add-item-main-content pi-m-40">
                    <div className="row">
                        <div className="col-md-6 col-lg-4">
                            <div className="pi-add-item-content">
                                <div className="pi-item-content">
                                    <div className="pi-add-image-content">
                                        <svg
                                            width={36}
                                            height={32}
                                            viewBox="0 0 36 32"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M18 12.234A6.117 6.117 0 1018 0a6.117 6.117 0 000 12.234z"
                                                fill="#4C6FFF"
                                            />
                                            <path
                                                d="M30.375 12.234a3.867 3.867 0 100-7.734 3.867 3.867 0 000 7.734zM5.625 12.234a3.867 3.867 0 100-7.734 3.867 3.867 0 000 7.734zM9.435 15.707c-1.522-1.247-2.9-1.082-4.66-1.082C2.141 14.625 0 16.755 0 19.37v7.68c0 1.136.927 2.06 2.068 2.06 4.924 0 4.33.088 4.33-.213 0-5.441-.644-9.431 3.037-13.19z"
                                                fill="#C1CDFF"
                                            />
                                            <path
                                                d="M19.674 14.653c-3.074-.256-5.746.003-8.051 1.905-3.858 3.09-3.115 7.25-3.115 12.339a2.466 2.466 0 002.462 2.462c14.842 0 15.432.48 16.313-1.47.288-.659.21-.45.21-6.755 0-5.008-4.337-8.48-7.819-8.48z"
                                                fill="#4C6FFF"
                                            />
                                            <path
                                                d="M31.226 14.625c-1.77 0-3.141-.164-4.661 1.082 3.653 3.73 3.037 7.449 3.037 13.19 0 .303-.493.212 4.256.212A2.14 2.14 0 0036 26.976V19.37c0-2.616-2.142-4.745-4.774-4.745z"
                                                fill="#C1CDFF"
                                            />
                                        </svg>
                                    </div>
                                    <div className="pi-add-item-text">
                                        <h3>Add Client</h3>
                                        <p>Easily add new client with just a few clicks.</p>
                                    </div>
                                </div>
                                <NavLink
                                    to='client'
                                    className='pi-btn pi-bg-blue pi-bg-hover-blue'>
                                    <svg width={10} height={10}>
                                        <path
                                            d="M5 0a1 1 0 011 1v3h3a1 1 0 010 2H6v3a1 1 0 01-2 0V6H1a1 1 0 010-2h3V1a1 1 0 011-1z"
                                            fill="#2D3748"
                                        />
                                    </svg>
                                    Add Client
                                </NavLink>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="pi-add-item-content">
                                <div className="pi-item-content">
                                    <div className="pi-add-image-content">
                                        <svg
                                            width={36}
                                            height={36}
                                            viewBox="0 0 36 36"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M26.804 7.031L20.39.618V7.03h6.413z" fill="#C1CDFF" />
                                            <path
                                                d="M24.639 25.663a1.95 1.95 0 01-.08.075 3.16 3.16 0 01-.84.641l-5.22 2.734a3.176 3.176 0 01-1.468.362 3.175 3.175 0 01-2.908-1.912H5.976a1.055 1.055 0 010-2.11h8.007a3.2 3.2 0 01.244-.61l1.89-3.609H5.976a1.055 1.055 0 010-2.109h11.279l4.218-4.219H5.977a1.055 1.055 0 110-2.11h17.578l.027.002 3.658-3.657h-7.904a1.055 1.055 0 01-1.055-1.055V0H3.164A3.168 3.168 0 000 3.164v29.672A3.168 3.168 0 003.164 36h21.094a3.168 3.168 0 003.164-3.164V22.88l-2.783 2.783zM35.178 12.14a2.816 2.816 0 000-3.976 2.794 2.794 0 00-1.99-.824c-.75 0-1.457.292-1.988.824l-.994.994 3.977 3.977.995-.994z"
                                                fill="#4C6FFF"
                                            />
                                            <path
                                                d="M16.096 25.821a1.054 1.054 0 001.424 1.424l4.533-2.375-3.582-3.582-2.375 4.533zM19.761 19.6l8.948-8.949 3.977 3.977-8.948 8.948-3.977-3.977z"
                                                fill="#C1CDFF"
                                            />
                                        </svg>
                                    </div>
                                    <div className="pi-add-item-text">
                                        <h3>Create Estimate</h3>
                                        <p>
                                            The easiest way to create a project estimate to send your client
                                        </p>
                                    </div>
                                </div>
                                <NavLink
                                    to='estimate'
                                    className='pi-btn pi-bg-blue pi-bg-hover-blue'>
                                    <svg width={10} height={10}>
                                        <path
                                            d="M5 0a1 1 0 011 1v3h3a1 1 0 010 2H6v3a1 1 0 01-2 0V6H1a1 1 0 010-2h3V1a1 1 0 011-1z"
                                            fill="#2D3748"
                                        />
                                    </svg>
                                    Create Estimate
                                </NavLink>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="pi-add-item-content">
                                <div className="pi-item-content">
                                    <div className="pi-add-image-content">
                                        <svg
                                            width={36}
                                            height={36}
                                            viewBox="0 0 36 36"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M28.828.618V7.03h6.413L28.828.618z"
                                                fill="#4C6FFF"
                                                fillOpacity={0.5}
                                            />
                                            <path
                                                d="M27.773 9.14a1.055 1.055 0 01-1.054-1.054V0H11.602a3.168 3.168 0 00-3.165 3.164v11.79a11.583 11.583 0 019.997 4.17h11.449a1.055 1.055 0 110 2.11H19.825a11.515 11.515 0 011.22 4.22h8.838a1.055 1.055 0 110 2.108h-8.838A11.606 11.606 0 0116.155 36h16.54a3.168 3.168 0 003.164-3.164V9.14h-8.086zm2.11 5.766H14.414a1.055 1.055 0 110-2.11h15.469a1.055 1.055 0 110 2.11z"
                                                fill="#4C6FFF"
                                            />
                                            <path
                                                d="M9.492 17.016C4.258 17.016 0 21.274 0 26.508 0 31.742 4.258 36 9.492 36c5.234 0 9.492-4.258 9.492-9.492 0-5.234-4.258-9.492-9.492-9.492zm-.586 8.437h1.172a2.23 2.23 0 012.227 2.227v1.172a2.23 2.23 0 01-1.758 2.176v.402a1.055 1.055 0 11-2.11 0v-.402a2.23 2.23 0 01-1.757-2.176 1.055 1.055 0 012.11 0c0 .064.052.117.116.117h1.172a.117.117 0 00.117-.117V27.68a.117.117 0 00-.117-.117H8.906a2.23 2.23 0 01-2.226-2.227v-1.172a2.23 2.23 0 011.758-2.176v-.402a1.055 1.055 0 012.109 0v.402a2.23 2.23 0 011.758 2.176 1.055 1.055 0 11-2.11 0 .117.117 0 00-.117-.117H8.906a.117.117 0 00-.117.117v1.172c0 .065.053.117.117.117z"
                                                fill="#4C6FFF"
                                                fillOpacity={0.5}
                                            />
                                        </svg>
                                    </div>
                                    <div className="pi-add-item-text">
                                        <h3>Create Invoice</h3>
                                        <p>
                                            Create invoice with your brand guideline and send to collect
                                            payment
                                        </p>
                                    </div>
                                </div>
                                <NavLink
                                    to='invoice'
                                    className='pi-btn pi-bg-blue pi-bg-hover-blue'>
                                    <svg width={10} height={10}>
                                        <path
                                            d="M5 0a1 1 0 011 1v3h3a1 1 0 010 2H6v3a1 1 0 01-2 0V6H1a1 1 0 010-2h3V1a1 1 0 011-1z"
                                            fill="#2D3748"
                                        />
                                    </svg>
                                    Create Invoice
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pi-cards">
                    <h2>Overview</h2>
                    <div className="row">
                        <div className="col-md-4 col-lg">
                            <div className="pi-cards-content pi-bg-husky">
                                <span >Total Client</span>
                                <h4 className="pi-color-blue">{total_client}</h4>
                            </div>
                        </div>

                        <div className="col-md-4 col-lg">
                            <div className="pi-cards-content" style={{backgroundColor: '#f9f6ea'}}>
                                <span >Total Estiamte</span>
                                <h4 style={{color: '#c66542'}}>{total_estimate}</h4>
                            </div>
                        </div>

                        <div className="col-md-4 col-lg">
                            <div className="pi-cards-content" style={{backgroundColor: '#d7f4f1'}}>
                                <span >Accepted Estiamte</span>
                                <h4 style={{color: '#45ac9d'}}>{accepted_estimate}</h4>
                            </div>
                        </div>

                        <div className="col-md-4 col-lg">
                            <div className="pi-cards-content" style={{backgroundColor: '#f7dfec'}}>
                                <span >Total Invoice</span>
                                <h4 style={{color: '#b66490'}}>{total_invoice}</h4>
                            </div>
                        </div>

                        <div className="col-md-4 col-lg">
                            <div className="pi-cards-content" style={{backgroundColor: '#e6ffe7'}}>
                                <span >Paid Invoice</span>
                                <h4 style={{color: '#43ad47'}}>{paid_invoice}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ./ pi-cards */}
                <div className="pi-featurs-main-content pi-bg-husky">
                    <h2 className="pi-featurs-title">
                        Upcomming Features <span className="pi-bg-blue">Free</span>
                    </h2>
                    <div className="row">
                        <div className="col-md-6 col-lg-3">
                            <div className="pi-featurs-content">
                                <div className="pi-featurs-image">
                                    <svg
                                        width={36}
                                        height={32}
                                        viewBox="0 0 36 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M18 12.234A6.117 6.117 0 1018 0a6.117 6.117 0 000 12.234z"
                                            fill="#4C6FFF"
                                        />
                                        <path
                                            d="M30.375 12.234a3.867 3.867 0 100-7.734 3.867 3.867 0 000 7.734zM5.625 12.234a3.867 3.867 0 100-7.734 3.867 3.867 0 000 7.734zM9.435 15.707c-1.522-1.247-2.9-1.082-4.66-1.082C2.141 14.625 0 16.755 0 19.37v7.68c0 1.136.927 2.06 2.068 2.06 4.924 0 4.33.088 4.33-.213 0-5.441-.644-9.431 3.037-13.19z"
                                            fill="#C1CDFF"
                                        />
                                        <path
                                            d="M19.674 14.653c-3.074-.256-5.746.003-8.051 1.905-3.858 3.09-3.115 7.25-3.115 12.339a2.466 2.466 0 002.462 2.462c14.842 0 15.432.48 16.313-1.47.288-.659.21-.45.21-6.755 0-5.008-4.337-8.48-7.819-8.48z"
                                            fill="#4C6FFF"
                                        />
                                        <path
                                            d="M31.226 14.625c-1.77 0-3.141-.164-4.661 1.082 3.653 3.73 3.037 7.449 3.037 13.19 0 .303-.493.212 4.256.212A2.14 2.14 0 0036 26.976V19.37c0-2.616-2.142-4.745-4.774-4.745z"
                                            fill="#C1CDFF"
                                        />
                                    </svg>
                                </div>
                                <div className="pi-featurs-text">
                                    <h4>Report</h4>
                                    <p>It will allow seeing a real-time overview of sales and activity with graphs and charts.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="pi-featurs-content">
                                <div className="pi-featurs-image">
                                    <svg
                                        width={36}
                                        height={32}
                                        viewBox="0 0 36 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M18 12.234A6.117 6.117 0 1018 0a6.117 6.117 0 000 12.234z"
                                            fill="#4C6FFF"
                                        />
                                        <path
                                            d="M30.375 12.234a3.867 3.867 0 100-7.734 3.867 3.867 0 000 7.734zM5.625 12.234a3.867 3.867 0 100-7.734 3.867 3.867 0 000 7.734zM9.435 15.707c-1.522-1.247-2.9-1.082-4.66-1.082C2.141 14.625 0 16.755 0 19.37v7.68c0 1.136.927 2.06 2.068 2.06 4.924 0 4.33.088 4.33-.213 0-5.441-.644-9.431 3.037-13.19z"
                                            fill="#C1CDFF"
                                        />
                                        <path
                                            d="M19.674 14.653c-3.074-.256-5.746.003-8.051 1.905-3.858 3.09-3.115 7.25-3.115 12.339a2.466 2.466 0 002.462 2.462c14.842 0 15.432.48 16.313-1.47.288-.659.21-.45.21-6.755 0-5.008-4.337-8.48-7.819-8.48z"
                                            fill="#4C6FFF"
                                        />
                                        <path
                                            d="M31.226 14.625c-1.77 0-3.141-.164-4.661 1.082 3.653 3.73 3.037 7.449 3.037 13.19 0 .303-.493.212 4.256.212A2.14 2.14 0 0036 26.976V19.37c0-2.616-2.142-4.745-4.774-4.745z"
                                            fill="#C1CDFF"
                                        />
                                    </svg>
                                </div>
                                <div className="pi-featurs-text">
                                    <h4>Proposal</h4>
                                    <p>Proposal will work for you to send a written document outlining everything. </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="pi-featurs-content">
                                <div className="pi-featurs-image">
                                    <svg
                                        width={36}
                                        height={32}
                                        viewBox="0 0 36 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M18 12.234A6.117 6.117 0 1018 0a6.117 6.117 0 000 12.234z"
                                            fill="#4C6FFF"
                                        />
                                        <path
                                            d="M30.375 12.234a3.867 3.867 0 100-7.734 3.867 3.867 0 000 7.734zM5.625 12.234a3.867 3.867 0 100-7.734 3.867 3.867 0 000 7.734zM9.435 15.707c-1.522-1.247-2.9-1.082-4.66-1.082C2.141 14.625 0 16.755 0 19.37v7.68c0 1.136.927 2.06 2.068 2.06 4.924 0 4.33.088 4.33-.213 0-5.441-.644-9.431 3.037-13.19z"
                                            fill="#C1CDFF"
                                        />
                                        <path
                                            d="M19.674 14.653c-3.074-.256-5.746.003-8.051 1.905-3.858 3.09-3.115 7.25-3.115 12.339a2.466 2.466 0 002.462 2.462c14.842 0 15.432.48 16.313-1.47.288-.659.21-.45.21-6.755 0-5.008-4.337-8.48-7.819-8.48z"
                                            fill="#4C6FFF"
                                        />
                                        <path
                                            d="M31.226 14.625c-1.77 0-3.141-.164-4.661 1.082 3.653 3.73 3.037 7.449 3.037 13.19 0 .303-.493.212 4.256.212A2.14 2.14 0 0036 26.976V19.37c0-2.616-2.142-4.745-4.774-4.745z"
                                            fill="#C1CDFF"
                                        />
                                    </svg>
                                </div>
                                <div className="pi-featurs-text">
                                    <h4>Contract</h4>
                                    <p>It will allow you to create project agreement between you and the client.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="pi-featurs-content">
                                <div className="pi-featurs-image">
                                    <svg
                                        width={36}
                                        height={32}
                                        viewBox="0 0 36 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M18 12.234A6.117 6.117 0 1018 0a6.117 6.117 0 000 12.234z"
                                            fill="#4C6FFF"
                                        />
                                        <path
                                            d="M30.375 12.234a3.867 3.867 0 100-7.734 3.867 3.867 0 000 7.734zM5.625 12.234a3.867 3.867 0 100-7.734 3.867 3.867 0 000 7.734zM9.435 15.707c-1.522-1.247-2.9-1.082-4.66-1.082C2.141 14.625 0 16.755 0 19.37v7.68c0 1.136.927 2.06 2.068 2.06 4.924 0 4.33.088 4.33-.213 0-5.441-.644-9.431 3.037-13.19z"
                                            fill="#C1CDFF"
                                        />
                                        <path
                                            d="M19.674 14.653c-3.074-.256-5.746.003-8.051 1.905-3.858 3.09-3.115 7.25-3.115 12.339a2.466 2.466 0 002.462 2.462c14.842 0 15.432.48 16.313-1.47.288-.659.21-.45.21-6.755 0-5.008-4.337-8.48-7.819-8.48z"
                                            fill="#4C6FFF"
                                        />
                                        <path
                                            d="M31.226 14.625c-1.77 0-3.141-.164-4.661 1.082 3.653 3.73 3.037 7.449 3.037 13.19 0 .303-.493.212 4.256.212A2.14 2.14 0 0036 26.976V19.37c0-2.616-2.142-4.745-4.774-4.745z"
                                            fill="#C1CDFF"
                                        />
                                    </svg>
                                </div>
                                <div className="pi-featurs-text">
                                    <h4>Project</h4>
                                    <p>Create estimate & estimate according to the client's project and manage the project easily.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /. pi-featurs-main-content */}
                <div className="pi-client-feedback">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="pi-feedback-content pi-request pi-bg-blue">
                                <h2>Have any feature request?</h2>
                                <p>Generate actionable insights with built-in reporting system.</p>
                                <button
                                    className="pi-btn pi-bg-white pi-color-blue pi-bg-hover-blue pi-hover-color-white"
                                    onClick={() => this.setState({ feedbackModal: true, feedbackModalType: 'features' })}
                                >
                                    Submit Request
                                </button>

                                <svg
                                    width={190}
                                    height={230}
                                    viewBox="0 0 167 149"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16.749 70C-.523 54.8 11.842 15.833 19.039-.5L-14-28v196h148.509c4.144-2.333 9.945-11.2 0-28-12.43-21-40.235 12-57.244-12.5C60.254 103 37.356 147 36.047 117c-1.308-30 2.29-28-19.3-47z"
                                        fill="#C1CDFF"
                                    />
                                    <path
                                        d="M22.14 50c-20.3-18.302-8.459-62.21 0-81.878L-14-68v236h174.547c4.869-2.81 11.687-13.486 0-33.714-14.61-25.286-47.289 14.449-67.282-15.051-19.992-29.5-46.904 23.479-48.442-12.643C43.285 70.469 47.514 72.877 22.14 50z"
                                        fill="#C1CDFF"
                                        fillOpacity={0.37}
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="pi-feedback-content" style={{backgroundColor: '#f16063'}}>
                                <h2>If you experience any problems?</h2>
                                <p>If you experience any problems or have any feature requests, I would be</p>

                                <button
                                    className="pi-btn pi-bg-white pi-color-red pi-bg-hover-red pi-hover-color-white"
                                    onClick={() => this.setState({ feedbackModal: true, feedbackModalType: 'bug' })}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>

                    {this.state.feedbackModal &&
                        <Feedback
                            show={this.state.feedbackModal}
                            type={this.state.feedbackModalType}
                            close={() => this.setState({ feedbackModal: false })}
                        />}
                </div>
            </div>
        );
    }
} 