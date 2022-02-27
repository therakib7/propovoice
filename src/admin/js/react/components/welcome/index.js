import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Style from './style.scss'

import Api from '../../api/business'; 

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
        // this.getLists();
        // console.log(ncpi_local.assetImgUri)
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

        Api.getAll(params)
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

    handleSubmit = client => {
        if (this.state.formModalType == 'new') {
            Api.create(client)
                .then(resp => {
                    if (resp.data.success) {
                        this.setState({ formModal: false })
                        toast.success(this.context.CrudMsg.create);
                        this.getLists();
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
                        toast.success(this.context.CrudMsg.update);
                        this.getLists();
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
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
                                    <button className="piBgBlue piBgHoverBlue">
                                    Create Business Profile
                                    </button>
                                    <button className="piTextHoverBlue">Skip and Go Dashboard</button>
                                </div>
                            </div>}

                            { currentTab == 'info' &&
                            <div id="business">
                                <div className="piBusinessForm">
                                    <div className="">
                                    <label htmlFor="name">Your Name</label>
                                    <input type="text" id="name" name="name" />
                                    </div>
                                    <div className="">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" />
                                    </div>
                                    <div className="">
                                    <label htmlFor="company">Company Name</label>
                                    <input type="text" id="company" name="company" />
                                    </div>
                                    <div className="">
                                    <label htmlFor="website">Website</label>
                                    <input type="text" id="website" name="email" />
                                    </div>
                                    <div className="">
                                    <label htmlFor="number">Mobile Number</label>
                                    <input type="number" id="number" name="number" />
                                    </div>
                                    <div className="">
                                    <label htmlFor="curency">Base Curency</label>
                                    <input type="text" id="curency" name="curency" />
                                    </div>
                                    <div className="">
                                    <label htmlFor="address" className="">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        placeholder="write your full address here"
                                        className="address-field"
                                    />
                                    </div>
                                </div> 
                                <div className="piButtons piTextCenter">
                                    <button className="piBgBlue piBgHoverBlue">Continue</button>
                                    <button className="piTextHoverBlue">Skip</button>
                                </div>
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
                                    <button className="piTextHoverBlue">Skip</button>
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