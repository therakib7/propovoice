import React, { Component } from 'react';
import { toast } from 'react-toastify';

import Style from './style.scss'

import Api from 'api/business';
import Info from './Info';
import Branding from './Branding';

export default class Welcome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabs: [
                {
                    id: 'welcome',
                    text: 'Welcome'
                },
                {
                    id: 'info',
                    text: 'Business Info'
                },
                {
                    id: 'branding',
                    text: 'Branding Resource'
                },
                {
                    id: 'finish',
                    text: 'Finish'
                }
            ],
            currentTab: 'welcome',
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
                this.setState({ business: businessData[0] });
            }
        });
    };

    handleBrandingChange = (data) => {
        let business = { ...this.state.business }
        business.logo = data;
        this.setState({ business })
    }

    handleSubmit = (business, tab = null) => {
        if (tab == 'branding') {
            business = this.state.business;
        }

        if (!business.id) {
            Api.create(business).then(resp => {
                if (resp.data.success) {
                    let businessData = { ...business }
                    businessData.id = resp.data.data;
                    this.setState({ business: businessData });
                } else {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                }
            })
        } else {
            Api.update(business.id, business).then(resp => {
                if (!resp.data.success) {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                }
            })
        }

        if (tab == 'branding') {
            this.setState({ currentTab: 'finish', currentTabIndex: 3 });
        } else {
            this.setState({ currentTab: 'branding', currentTabIndex: 2 });
        }
    }

    handleSkip = (name = null) => {
        if (name == 'info') {
            this.setState({ currentTab: 'branding', currentTabIndex: 2 });
        } else {
            this.setState({ currentTab: 'finish', currentTabIndex: 3 });
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
        const i18n = ndpi.i18n;
        return (
            <div className="pi-main-content">

                <div className="pi-container">
                    <div className="pi-logo-content" style={{ justifyContent: 'center' }}>
                        <img src={ndpi.assetImgUri + 'site-logo.png'} />
                        <strong >Propovoice</strong>
                    </div>

                    <div className="pi-welcome-tabs-content">
                        <ul className="pi-tabs">
                            {tabs.map((tab, index) => (
                                <li className={'pi-tab ' + (index <= currentTabIndex ? 'pi-active' : '')} key={index} onClick={(e) => this.setActiveTab(tab.id, index)}>
                                    {index <= currentTabIndex &&
                                        <span className="pi-done">
                                            <svg
                                                width={10}
                                                height={10}
                                                xmlns="http://www.w3.org/2000/svg"
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

                        <div className="pi-tab-content">
                            {currentTab == 'welcome' &&
                                <div id="pi-welcome">
                                    <p>
                                        Welcome to Propovice. Propovice help you to create professional invoice and estimate for your client. You can send and track easily.
                                    </p>
                                    <div className="pi-buttons pi-text-center">
                                        <button className="pi-btn pi-bg-blue pi-bg-hover-blue" onClick={() => this.setState({ currentTab: 'info', currentTabIndex: 1 })}>
                                        {i18n.create} {i18n.business} {i18n.profile}
                                        </button>
                                        <a href={ndpi.dashboard} className="pi-text-hover-blue">{i18n.skip} and Go Dashboard</a>
                                    </div>
                                </div>}

                            {currentTab == 'info' &&
                                <div id="pi-business">
                                    <Info
                                        data={this.state.business}
                                        handleSubmit={this.handleSubmit}
                                        handleSkip={this.handleSkip}
                                    />
                                </div>}

                            {currentTab == 'branding' &&
                                <div id="pi-brand">
                                    <Branding
                                        data={this.state.business}
                                        changeHandler={this.handleBrandingChange}
                                        handleSubmit={this.handleSubmit}
                                        handleSkip={this.handleSkip}
                                    />
                                </div>}

                            {currentTab == 'finish' &&

                                <div id="pi-finished">
                                    <div className="pi-text-center">
                                        <img src={ndpi.assetImgUri + 'rocket.png'} />
                                        <h1 className="pi-title">Everything Done! What do you want to do first?</h1>
                                        <p className="pi-sub-title">
                                            You can create Estimate, Invoice and Others
                                        </p>
                                    </div>
                                    <div className="row pi-item-main-content pi-mt-m-15">
                                        <div className="col-md-6">
                                            <a href={ndpi.dashboard + '#/lead'}>
                                                <div className="pi-item-content pi-bg-stroke">
                                                    <div className="pi-add-image-content">
                                                        <svg
                                                            width={36}
                                                            height={32}
                                                            viewBox="0 0 36 32"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M18 12.2344C21.3784 12.2344 24.1172 9.49562 24.1172 6.11719C24.1172 2.73876 21.3784 0 18 0C14.6216 0 11.8828 2.73876 11.8828 6.11719C11.8828 9.49562 14.6216 12.2344 18 12.2344Z"
                                                                fill="#4C6FFF"
                                                            />
                                                            <path
                                                                d="M30.375 12.2343C32.5108 12.2343 34.2422 10.5029 34.2422 8.36713C34.2422 6.23134 32.5108 4.49994 30.375 4.49994C28.2392 4.49994 26.5078 6.23134 26.5078 8.36713C26.5078 10.5029 28.2392 12.2343 30.375 12.2343Z"
                                                                fill="#C1CDFF"
                                                            />
                                                            <path
                                                                d="M5.625 12.2343C7.76079 12.2343 9.49219 10.5029 9.49219 8.36713C9.49219 6.23134 7.76079 4.49994 5.625 4.49994C3.48921 4.49994 1.75781 6.23134 1.75781 8.36713C1.75781 10.5029 3.48921 12.2343 5.625 12.2343Z"
                                                                fill="#C1CDFF"
                                                            />
                                                            <path
                                                                d="M9.43523 15.7071C7.91297 14.4599 6.53435 14.625 4.77422 14.625C2.14172 14.625 0 16.7541 0 19.3704V27.0492C0 28.1855 0.927422 29.1094 2.06789 29.1094C6.99159 29.1094 6.39844 29.1985 6.39844 28.897C6.39844 23.4558 5.75395 19.4655 9.43523 15.7071Z"
                                                                fill="#C1CDFF"
                                                            />
                                                            <path
                                                                d="M19.6741 14.6531C16.5998 14.3966 13.9275 14.656 11.6226 16.5585C7.76549 19.6481 8.50777 23.808 8.50777 28.897C8.50777 30.2434 9.60324 31.3593 10.9701 31.3593C25.8118 31.3593 26.4025 31.8381 27.2826 29.8891C27.5713 29.23 27.4921 29.4394 27.4921 23.1342C27.4921 18.1261 23.1558 14.6531 19.6741 14.6531Z"
                                                                fill="#4C6FFF"
                                                            />
                                                            <path
                                                                d="M31.2257 14.6249C29.4559 14.6249 28.0849 14.4615 26.5647 15.707C30.2185 19.4375 29.6015 23.1556 29.6015 28.8969C29.6015 29.2003 29.1091 29.1093 33.8582 29.1093C35.0395 29.1093 35.9999 28.1523 35.9999 26.976V19.3703C35.9999 16.754 33.8582 14.6249 31.2257 14.6249Z"
                                                                fill="#C1CDFF"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div className="pi-add-item-text">
                                                        <h3>{i18n.add} Lead</h3>
                                                        <p>Easily add new client with just a few clicks.</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="col-md-6">
                                            <a href={ndpi.dashboard + '#/client'}>
                                                <div className="pi-item-content pi-bg-stroke">
                                                    <div className="pi-add-image-content">
                                                        <svg
                                                            width={36}
                                                            height={32}
                                                            viewBox="0 0 36 32"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M18 12.2344C21.3784 12.2344 24.1172 9.49562 24.1172 6.11719C24.1172 2.73876 21.3784 0 18 0C14.6216 0 11.8828 2.73876 11.8828 6.11719C11.8828 9.49562 14.6216 12.2344 18 12.2344Z"
                                                                fill="#4C6FFF"
                                                            />
                                                            <path
                                                                d="M30.375 12.2343C32.5108 12.2343 34.2422 10.5029 34.2422 8.36713C34.2422 6.23134 32.5108 4.49994 30.375 4.49994C28.2392 4.49994 26.5078 6.23134 26.5078 8.36713C26.5078 10.5029 28.2392 12.2343 30.375 12.2343Z"
                                                                fill="#C1CDFF"
                                                            />
                                                            <path
                                                                d="M5.625 12.2343C7.76079 12.2343 9.49219 10.5029 9.49219 8.36713C9.49219 6.23134 7.76079 4.49994 5.625 4.49994C3.48921 4.49994 1.75781 6.23134 1.75781 8.36713C1.75781 10.5029 3.48921 12.2343 5.625 12.2343Z"
                                                                fill="#C1CDFF"
                                                            />
                                                            <path
                                                                d="M9.43523 15.7071C7.91297 14.4599 6.53435 14.625 4.77422 14.625C2.14172 14.625 0 16.7541 0 19.3704V27.0492C0 28.1855 0.927422 29.1094 2.06789 29.1094C6.99159 29.1094 6.39844 29.1985 6.39844 28.897C6.39844 23.4558 5.75395 19.4655 9.43523 15.7071Z"
                                                                fill="#C1CDFF"
                                                            />
                                                            <path
                                                                d="M19.6741 14.6531C16.5998 14.3966 13.9275 14.656 11.6226 16.5585C7.76549 19.6481 8.50777 23.808 8.50777 28.897C8.50777 30.2434 9.60324 31.3593 10.9701 31.3593C25.8118 31.3593 26.4025 31.8381 27.2826 29.8891C27.5713 29.23 27.4921 29.4394 27.4921 23.1342C27.4921 18.1261 23.1558 14.6531 19.6741 14.6531Z"
                                                                fill="#4C6FFF"
                                                            />
                                                            <path
                                                                d="M31.2257 14.6249C29.4559 14.6249 28.0849 14.4615 26.5647 15.707C30.2185 19.4375 29.6015 23.1556 29.6015 28.8969C29.6015 29.2003 29.1091 29.1093 33.8582 29.1093C35.0395 29.1093 35.9999 28.1523 35.9999 26.976V19.3703C35.9999 16.754 33.8582 14.6249 31.2257 14.6249Z"
                                                                fill="#C1CDFF"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div className="pi-add-item-text">
                                                        <h3>{i18n.add} Client</h3>
                                                        <p>Easily add new client with just a few clicks.</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="col-md-6">
                                            <a href={ndpi.dashboard + '#/estimate'}>
                                                <div className="pi-item-content pi-bg-stroke">
                                                    <div className="pi-add-image-content">
                                                        <svg
                                                            width={36}
                                                            height={36}
                                                            viewBox="0 0 36 36"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M26.8039 7.03125L20.3906 0.617554V7.03125H26.8039Z"
                                                                fill="#C1CDFF"
                                                            />
                                                            <path
                                                                d="M24.6388 25.6627C24.613 25.6887 24.5864 25.7138 24.5593 25.7382C24.3172 25.9971 24.0325 26.2148 23.719 26.379L18.4985 29.1135C18.047 29.35 17.5395 29.4748 17.0307 29.4748C16.1853 29.4748 15.3906 29.1456 14.793 28.5479C14.5021 28.2571 14.2779 27.9219 14.1223 27.5624H5.97656C5.39409 27.5624 4.92188 27.0902 4.92188 26.5077C4.92188 25.9253 5.39409 25.4531 5.97656 25.4531H13.9838C14.043 25.245 14.1239 25.0403 14.2277 24.8423L16.1175 21.2344H5.97656C5.39409 21.2344 4.92188 20.7622 4.92188 20.1797C4.92188 19.5972 5.39409 19.125 5.97656 19.125H17.2555L21.4743 14.9062H5.97656C5.39409 14.9062 4.92188 14.434 4.92188 13.8516C4.92188 13.2691 5.39409 12.7969 5.97656 12.7969H23.5547C23.564 12.7969 23.573 12.798 23.5822 12.7983L27.2399 9.14062H19.3359C18.7535 9.14062 18.2812 8.66841 18.2812 8.08594V0H3.16406C1.4194 0 0 1.4194 0 3.16406V32.8359C0 34.5806 1.4194 36 3.16406 36H24.2578C26.0025 36 27.4219 34.5806 27.4219 32.8359V22.8797L24.6388 25.6627Z"
                                                                fill="#4C6FFF"
                                                            />
                                                            <path
                                                                d="M35.1776 12.1409C36.2742 11.0443 36.2742 9.2601 35.1776 8.1635C34.6464 7.63229 33.9401 7.33972 33.1889 7.33972C32.4377 7.33972 31.7314 7.63229 31.2002 8.1635L30.2058 9.15786L34.1833 13.1353L35.1776 12.1409Z"
                                                                fill="#4C6FFF"
                                                            />
                                                            <path
                                                                d="M16.0961 25.8214C15.882 26.23 15.9583 26.7303 16.2846 27.0565C16.4873 27.2592 16.7573 27.3654 17.0307 27.3654C17.1972 27.3654 17.365 27.326 17.5197 27.245L22.0532 24.8702L18.4707 21.2878L16.0961 25.8214Z"
                                                                fill="#C1CDFF"
                                                            />
                                                            <path
                                                                d="M19.7612 19.5994L28.7093 10.6514L32.6861 14.6282L23.7381 23.5762L19.7612 19.5994Z"
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
                                            </a>
                                        </div>
                                        <div className="col-md-6">
                                            <a href={ndpi.dashboard + '#/invoice'}>
                                                <div className="pi-item-content pi-bg-stroke">
                                                    <div className="pi-add-image-content">
                                                        <svg
                                                            width={36}
                                                            height={36}
                                                            viewBox="0 0 36 36"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M26.8039 7.03125L20.3906 0.617554V7.03125H26.8039Z"
                                                                fill="#C1CDFF"
                                                            />
                                                            <path
                                                                d="M24.6388 25.6627C24.613 25.6887 24.5864 25.7138 24.5593 25.7382C24.3172 25.9971 24.0325 26.2148 23.719 26.379L18.4985 29.1135C18.047 29.35 17.5395 29.4748 17.0307 29.4748C16.1853 29.4748 15.3906 29.1456 14.793 28.5479C14.5021 28.2571 14.2779 27.9219 14.1223 27.5624H5.97656C5.39409 27.5624 4.92188 27.0902 4.92188 26.5077C4.92188 25.9253 5.39409 25.4531 5.97656 25.4531H13.9838C14.043 25.245 14.1239 25.0403 14.2277 24.8423L16.1175 21.2344H5.97656C5.39409 21.2344 4.92188 20.7622 4.92188 20.1797C4.92188 19.5972 5.39409 19.125 5.97656 19.125H17.2555L21.4743 14.9062H5.97656C5.39409 14.9062 4.92188 14.434 4.92188 13.8516C4.92188 13.2691 5.39409 12.7969 5.97656 12.7969H23.5547C23.564 12.7969 23.573 12.798 23.5822 12.7983L27.2399 9.14062H19.3359C18.7535 9.14062 18.2812 8.66841 18.2812 8.08594V0H3.16406C1.4194 0 0 1.4194 0 3.16406V32.8359C0 34.5806 1.4194 36 3.16406 36H24.2578C26.0025 36 27.4219 34.5806 27.4219 32.8359V22.8797L24.6388 25.6627Z"
                                                                fill="#4C6FFF"
                                                            />
                                                            <path
                                                                d="M35.1776 12.1409C36.2742 11.0443 36.2742 9.2601 35.1776 8.1635C34.6464 7.63229 33.9401 7.33972 33.1889 7.33972C32.4377 7.33972 31.7314 7.63229 31.2002 8.1635L30.2058 9.15786L34.1833 13.1353L35.1776 12.1409Z"
                                                                fill="#4C6FFF"
                                                            />
                                                            <path
                                                                d="M16.0961 25.8214C15.882 26.23 15.9583 26.7303 16.2846 27.0565C16.4873 27.2592 16.7573 27.3654 17.0307 27.3654C17.1972 27.3654 17.365 27.326 17.5197 27.245L22.0532 24.8702L18.4707 21.2878L16.0961 25.8214Z"
                                                                fill="#C1CDFF"
                                                            />
                                                            <path
                                                                d="M19.7612 19.5994L28.7093 10.6514L32.6861 14.6282L23.7381 23.5762L19.7612 19.5994Z"
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
                                            </a>
                                        </div>
                                    </div>
                                    <div className="pi-buttons pi-text-center">
                                        <a href={ndpi.dashboard} className="pi-text-hover-blue pi-color-black">Skip and Explore</a>
                                    </div>
                                </div>

                            }

                        </div>{/* ./piTabsContent */}
                    </div>{/* ./tabs-content */}
                </div>{/* ./piContainer */}
            </div >

        );
    }
} 