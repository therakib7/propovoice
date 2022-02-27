import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Style from './style.scss'

import Api from '../../api/business'; 
import Form from './Form';

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
            // clients: []
            preloader: true,
            formModal: false,
            searchModal: false,
            formModalType: 'new',
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
        this.getData();
        // console.log(ncpi_local.assetImgUri)
    }

    getData = () => {  
        Api.getAll('default=1')
        .then(resp => {
            let businessData = resp.data.data.result;
            if ( businessData.length ) { 
                // console.log(businessData)
                this.setState({ client: businessData[0] });  
            }
        }); 
    };

    handleSubmit = client => { 
        if ( !client.id ) {
            Api.create(client)
                .then(resp => {
                    if (resp.data.success) {
                        this.setState({ formModal: false })
                        // toast.success(this.context.CrudMsg.create);
                        // this.getLists();
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        } else {
            Api.update(client.id, client)
                .then(resp => {
                    if (resp.data.success) {
                        this.setState({ formModal: false })
                        // this.setState({ formModalType: 'new' });
                        // toast.success(this.context.CrudMsg.update);
                        // this.getLists();
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        }

        this.setState({ currentTab: 'branding', currentTabIndex: 2 });
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
                            <div id="welcome" className="active">
                                <p>
                                    A place where you can browse and share content with other Figma
                                    users. Pull text strings, avatars and icons directly into your
                                    designs.
                                </p>
                                <div className="piButtons piTextCenter">
                                    <button className="piBgBlue piBgHoverBlue" onClick={() => this.setState({ currentTab: 'info', currentTabIndex: 1 })}>
                                    Create Business Profile
                                    </button>
                                    <button className="piTextHoverBlue">Skip and Go Dashboard</button>
                                </div>
                            </div>}

                            { currentTab == 'info' &&
                            <div id="business">
                                <Form
                                    handleSubmit={this.handleSubmit} 
                                    handleSkip={this.handleSkip} 
                                    data={this.state.client} 
                                /> 
                            </div>}

                            { currentTab == 'branding' &&
                            <div id="brand">
                                <form action="/action_page.php">
                                    <div className="piTextCenter">
                                    <img src="assets/img/uplode-image.png" />
                                    <h3 className="upload pi-color-blue">Upload Logo</h3>
                                    </div>
                                </form>
                                <div className="piButtons piTextCenter">
                                    <button className="piBgBlue piBgHoverBlue">Continue</button>
                                    <button className="piTextHoverBlue" onClick={() => this.handleSkip('branding')}>Skip</button>
                                </div>
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
                                    <a href={ncpi_local.dashboard + ''} className="piBgBlack piBgHoverBlue">Dashboard</a>
                                    <a href={ncpi_local.dashboard + '#/client'} className="piBgGreen piBgHoverBlue">Add Cleint</a>
                                    <a href={ncpi_local.dashboard + '#/invoice'} className="piBgBlue piBgHoverBlue">Create Invoice</a>
                                </div>
                            </div>}
                        </div> 
                    </div> 
                </div> 
            </div> 
        );
    }
} 