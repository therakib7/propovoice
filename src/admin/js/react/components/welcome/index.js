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
        Api.getAll('default=1')
        .then(resp => {
            let businessData = resp.data.data.result;
            if ( businessData.length ) {  
                this.setState({ business: businessData[0] });  
            }
        }); 
    };

    handleBrandingChange = ( data ) => {  
		let business = {...this.state.business} 
		business.logo = data; 
		this.setState({business})  
	}

    handleSubmit = ( business, tab = null ) => { 
        if ( tab == 'branding' ) {
            business = this.state.business;
        }

        if ( !business.id ) {
            Api.create(business)
                .then(resp => {
                    if ( resp.data.success ) {   
                        let businessData = {...business} 
                        businessData.id = resp.data.data; 
                        this.setState({ business: businessData });
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        } else {
            Api.update(business.id, business)
                .then(resp => {
                    if ( !resp.data.success) { 
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        }

        if ( tab == 'branding' ) {
            this.setState({ currentTab: 'finish', currentTabIndex: 3 });
        } else {
            this.setState({ currentTab: 'branding', currentTabIndex: 2 });
        } 
    }  

    handleSkip = ( name = null ) => { 
        if ( name == 'info' ) {
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
        return (
            <div className="pi-main-content">
                
                <div className="pi-container">
                    <div className="pi-logo-content">
                        <img src={ncpi.assetImgUri+'logo.png'}  />
                        <strong >Propovoice</strong>
                    </div>

                    <div className="pi-welcome-tabs-content">
                        <ul className="pi-tabs">
                            {tabs.map((tab, index) => ( 
                                <li className={'pi-tab ' + (index <= currentTabIndex ? 'pi-active' : '' )} key={index} onClick={(e) => this.setActiveTab(tab.id, index)}>
                                    {index <= currentTabIndex &&
                                        <span className="pi-done">
                                            <svg
                                                width={20}
                                                height={20}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="3.4 5.6 17.6 13.4"
                                                xmlSpace="preserve" 
                                                >
                                                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                                            </svg>
                                        </span>
                                    }
                                    <span></span>
                                    {tab.text} 
                                </li>
                            ))}
                        </ul>

                        <div className="pi-tab-content">
                            { currentTab == 'welcome' &&
                            <div id="pi-welcome">
                                <p>
                                Welcome to Propovice. Propovice help you to create professional invoice and estimate for your client. You can send and track easily. 
                                </p>
                                <div className="pi-buttons pi-text-center">
                                    <button className="pi-btn pi-bg-blue pi-bg-hover-blue" onClick={() => this.setState({ currentTab: 'info', currentTabIndex: 1 })}>
                                    Create Business Profile
                                    </button>
                                    <a href={ncpi.dashboard} className="pi-text-hover-blue">Skip and Go Dashboard</a>
                                </div>
                            </div>}

                            { currentTab == 'info' &&
                            <div id="pi-business">
                                <Info 
                                    data={this.state.business} 
                                    handleSubmit={this.handleSubmit} 
                                    handleSkip={this.handleSkip} 
                                /> 
                            </div>}

                            { currentTab == 'branding' &&
                            <div id="pi-brand">
                                <Branding 
                                    data={this.state.business} 
                                    changeHandler={this.handleBrandingChange}
                                    handleSubmit={this.handleSubmit} 
                                    handleSkip={this.handleSkip} 
                                /> 
                            </div>}

                            { currentTab == 'finish' &&
                            <div id="pi-finished">
                                <div className="pi-text-center">
                                    <img src={ncpi.assetImgUri+'finish.png'} />
                                    <h3 className="upload">It's time to fly!</h3>
                                    <p>
                                    Everything Done! You can add your client, create and send estimate and invoice.   
                                    </p>
                                </div>
                                <div className="pi-buttons pi-text-center"> 
                                    <a href={ncpi.dashboard} className="pi-bg-black pi-bg-hover-blue">Dashboard</a>
                                    <a href={ncpi.dashboard + '#/client'} className="pi-bg-green pi-bg-hover-blue">Add Client</a>
                                    <a href={ncpi.dashboard + '#/invoice'} className="pi-btn pi-bg-blue pi-bg-hover-blue">Create Invoice</a>
                                </div> 
                            </div>}

                        </div>{/* ./piTabsContent */}
                    </div>{/* ./tabs-content */}
                </div>{/* ./piContainer */}
            </div>
 
        );
    }
} 