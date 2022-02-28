import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Style from './style.scss'

import Api from '../../api/business'; 
import Info from './Info';
import Branding from './Branding';

export default class Business extends Component {
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
            <div className="piMainContent">
                <ToastContainer />
                <div className="piContainer">
                    <div className="piLogoContent">
                        <img src={ncpi_local.assetImgUri+'logo.png'} className="" />
                        <strong className="">Propovoice</strong>
                    </div>

                    <div className="piTabsContent">
                        <ul className="piTabs">
                            {tabs.map((tab, index) => ( 
                                <li className={'pi-tab ' + (index <= currentTabIndex ? 'active' : '' )} key={index} onClick={(e) => this.setActiveTab(tab.id, index)}>
                                    <span></span>
                                    {tab.text} 
                                </li>
                            ))}
                        </ul>

                        <div className="piTabContent">
                            { currentTab == 'welcome' &&
                            <div id="piWelcome">
                                <p>
                                    A place where you can browse and share content with other Figma
                                    users. Pull text strings, avatars and icons directly into your
                                    designs.
                                </p>
                                <div className="piButtons piTextCenter">
                                    <button className="piBgBlue piBgHoverBlue" onClick={() => this.setState({ currentTab: 'info', currentTabIndex: 1 })}>
                                    Create Business Profile
                                    </button>
                                    <a href={ncpi_local.dashboard} className="piTextHoverBlue">Skip and Go Dashboard</a>
                                </div>
                            </div>}

                            { currentTab == 'info' &&
                            <div id="piBusiness">
                                <Info 
                                    data={this.state.business} 
                                    handleSubmit={this.handleSubmit} 
                                    handleSkip={this.handleSkip} 
                                /> 
                            </div>}

                            { currentTab == 'branding' &&
                            <div id="piBrand">
                                <Branding 
                                    data={this.state.business} 
                                    changeHandler={this.handleBrandingChange}
                                    handleSubmit={this.handleSubmit} 
                                    handleSkip={this.handleSkip} 
                                /> 
                            </div>}

                            { currentTab == 'finish' &&
                            <div id="piFinished">
                                <div className="piTextCenter">
                                    <img src={ncpi_local.assetImgUri+'finish.png'} />
                                    <h3 className="upload">It's time to fly!</h3>
                                    <p>
                                    Everything Done! You can create Estimate, Invoice, Proposal and
                                    Others 
                                    </p>
                                </div>
                                <div className="piButtons piTextCenter"> 
                                    <a href={ncpi_local.dashboard} className="piBgBlack piBgHoverBlue">Dashboard</a>
                                    <a href={ncpi_local.dashboard + '#/client'} className="piBgGreen piBgHoverBlue">Add Cleint</a>
                                    <a href={ncpi_local.dashboard + '#/invoice'} className="piBgBlue piBgHoverBlue">Create Invoice</a>
                                </div>
                            </div>}

                        </div>{/* ./piTabsContent */}
                    </div>{/* ./tabs-content */}
                </div>{/* ./piContainer */}
            </div>
 
        );
    }
} 