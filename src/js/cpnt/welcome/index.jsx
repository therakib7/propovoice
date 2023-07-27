import React, { Component } from 'react';
import { toast } from 'react-toastify';

import Style from './style.scss'

import Api from 'api/business';
import Business from './Business';
import Module from './Module';
import Tutorial from './Tutorial';
import Finish from './Finish';

export default class Welcome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabs: [
                /* {
                    id: 'welcome',
                    text: 'Welcome'
                }, */
                {
                    id: 'business',
                    text: 'Business Configuration'
                },
                /* {
                    id: 'module',
                    text: 'Module'
                }, */
                {
                    id: 'tutorial',
                    text: 'Tutorial'
                },
                {
                    id: 'finish',
                    text: 'Finished'
                }
            ],
            loaded: false,
            currentTab: 'business',
            currentTabIndex: null,
            preloader: true,
            business: { id: null }
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        Api.getAll('default=1').then(resp => {
            let businessData = resp.data.data.result;
            if (businessData.length) {
                this.setState({ business: businessData[0], loaded: true });
            }
        });
    };

    handleSubmit = (business) => {
        /* if (tab == 'module') {
            business = this.state.business;
        } */

        if (!business.id) {
            Api.create(business).then(resp => {
                if (resp.data.success) {
                    let businessData = { ...business }
                    businessData.id = resp.data.data;
                    this.setState({ business: businessData });
                } else {
                    resp.data.data.forEach(function (value) {
                        toast.error(value);
                    });
                }
            })
        } else {
            Api.update(business.id, business).then(resp => {
                if (!resp.data.success) {
                    resp.data.data.forEach(function (value) {
                        toast.error(value);
                    });
                }
            })
        }

        this.setState({ currentTab: 'tutorial', currentTabIndex: 1 });
    }

    handleSkip = (name = null) => {
        /* if (name == 'business') {
            this.setState({ currentTab: 'module', currentTabIndex: 2 });
        } else if (name == 'module') {
            this.setState({ currentTab: 'tutorial', currentTabIndex: 3 });
        } else if (name == 'tutorial') {
            this.setState({ currentTab: 'finish', currentTabIndex: 4 });
        } */
        if (name == 'business') {
            this.setState({ currentTab: 'tutorial', currentTabIndex: 1 });
        } else if (name == 'tutorial') {
            this.setState({ currentTab: 'finish', currentTabIndex: 2 });
        }
    }

    setActiveTab(id, index) {
        this.setState({
            currentTab: id,
            currentTabIndex: index
        });
    }

    render() {
        const { tabs = [], currentTab, currentTabIndex } = this.state;
        const i18n = ndpv.i18n;
        return (
            <div className="pv-main-content">

                {/* <div className="pv-logo-content" style={{ justifyContent: 'center' }}>
                    <img src={ndpv.assetImgUri + 'site-logo.png'} />
                    <strong >Propovoice</strong>
                </div> */}

                <div className="pv-welcome-tabs-content">
                    <ul className="pv-tabs">
                        {tabs.map((tab, index) => (
                            <li className={'pv-tab ' + (index <= currentTabIndex ? 'pv-active' : '')} key={index} onClick={(e) => this.setActiveTab(tab.id, index)}>
                                {index <= currentTabIndex &&
                                    <span className="pv-done">
                                        <svg
                                            width={10}
                                            height={10}

                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            viewBox="3.4 5.6 17.6 13.4"
                                            enableBackground="new 3.4 5.6 17.6 13.4"
                                            xmlSpace="preserve"
                                        >
                                            <path d="M9,16.2L4.8,12l-1.4,1.4L9,19L21,7l-1.4-1.4L9,16.2z" />
                                        </svg>
                                    </span>
                                }
                                <span></span>
                                {tab.text}
                            </li>
                        ))}
                    </ul>
                    <div className="pv-container">
                        <div className="pv-tab-content">
                            {currentTab == 'welcome' &&
                                <div id="pv-welcome">
                                    <div className="pv-text-center">
                                        <div className="pv-logo-content" style={{ justifyContent: 'center', marginBottom: 30 }}>
                                            <img src={ndpv.assetImgUri + 'site-logo.png'} />
                                            <strong >Propovoice</strong>
                                        </div>
                                        <h1 className="pv-title" style={{ display: 'block' }}>
                                            Welcome to <span className="pv-color-blue">Propovice</span>
                                        </h1>
                                        <p className="pv-sub-title">
                                            Propovice help you to create professional Invoice and Estimate and so many things for your client and you. <br /> You can send and track easily. And also you can manage Lead, Deal, Project, Contact etc.
                                        </p>
                                    </div>
                                    <div className="pv-button pv-text-right">
                                        <a href={ndpv.dashboard} className="pv-text-hover-blue">{i18n.skip} {i18n.nd} {i18n.go} {i18n.db}</a>
                                        <button className="pv-btn pv-bg-blue pv-bg-hover-blue" onClick={() => this.setState({ currentTab: 'business', currentTabIndex: 1 })}>
                                            {i18n.create} {i18n.biz} {i18n.profile}
                                        </button>
                                    </div>
                                </div>}

                            {currentTab == 'business' &&
                                <Business
                                    key={this.state.loaded}
                                    data={this.state.business}
                                    handleSubmit={this.handleSubmit}
                                    handleSkip={this.handleSkip}
                                />
                            }

                            {currentTab == 'module' &&
                                <Module
                                    data={this.state.business}
                                    // handleSubmit={this.handleSubmit}
                                    handleSkip={this.handleSkip}
                                />
                            }

                            {currentTab == 'tutorial' &&
                                <Tutorial
                                    data={this.state.business}
                                    // handleSubmit={this.handleSubmit}
                                    handleSkip={this.handleSkip}
                                />
                            }

                            {currentTab == 'finish' &&
                                <Finish />
                            }
                        </div>{/* ./piTabsContent */}
                    </div>
                </div>{/* ./tabs-content */}
            </div>
        );
    }
}