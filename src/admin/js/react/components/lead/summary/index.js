import React, { Component } from 'react';
import { NavLink, useParams } from "react-router-dom";

import Api from 'api/lead';

import Task from 'components/single-tab/task';
// import Note from './tab/note';
import Project from 'components/project';
import Estimate from 'components/invoice/list';
import Invoice from 'components/invoice/list';
// import Receipt from './tab/receipt';

class LeadSummary extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tabs: [
                {
                    id: 'task',
                    text: 'Activity and Task'
                },
                {
                    id: 'note',
                    text: 'Note'
                },
                {
                    id: 'file',
                    text: 'Files'
                }, 
            ],
            currentTab: 'task',
            formModal: false,
            formModalType: 'new',
            msg: {
                create: 'Successfully Added',
                update: 'Successfully Updated',
                delete: 'Successfully Deleted',
                confirm: 'Are you sure to delete it?',
            },
            data: {
                contact: {
                    first_name: 'Name'
                }
            }
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        Api.get(this.props.id)
            .then(resp => {
                this.setState({ data: resp.data.data });
            })
    };

    closeForm = () => {
        this.setState({ formModal: false });
    };

    setActiveTab(e, id) {
        e.preventDefault();
        this.setState({
            currentTab: id
        });
    }

    render() {
        const { tabs = [], currentTab } = this.state;
        const { id } = this.props;
        const contact = this.state.data.contact;
        const lead = this.state.data;
        return (
            <div className="ncpi-components">
                <nav className="pi-breadcrumb">
                    <ul className="">
                        <li>
                            <a href="#" className="">
                                Home
                            </a>
                        </li>
                        <li>
                            <svg
                                width={5}
                                height={10}
                                viewBox="0 0 5 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0.5 1.25L4.25 5L0.5 8.75"
                                    stroke="#718096"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </li>
                        <li className="pi-active">lead Name</li>
                    </ul>
                </nav>
                <div className="pi-list-single-head">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="pi-list-content">
                                <img src={ncpi.assetImgUri + 'logo.png'} alt="logo" className="logo" />
                                <div className="pi-lead-address">
                                    <h3 className="">{contact.first_name}</h3>
                                    <address>
                                        {contact.email} <br />
                                        Organization/Company: {contact.org_name}<br />
                                        Budget ${lead.budget}
                                    </address>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 pi-text-right">
                            <div className="pi-list-single-button-content">
                                <div className="pi-edit-btn">
                                    <button className="pi-btn pi-btn-small pi-bg-stroke pi-bg-shadow">
                                        Edit
                                    </button>
                                </div>
                                <button className="pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-color-white pi-bg-shadow">
                                    <svg
                                        width={14}
                                        height={12}
                                        viewBox="0 0 12 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M2.5 8H13.5"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M8 2.5V13.5"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    Move to Deal Pipeline
                                </button> 
                                <span className="pi-action-btn pi-bg-stroke pi-bg-shadow">
                                    <svg
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14C6.10457 14 7 13.1046 7 12Z"
                                            fill="#718096"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12Z"
                                            fill="#718096"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14C20.1046 14 21 13.1046 21 12Z"
                                            fill="#718096"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pi-tag-content">
                    <ul> 
                        <li>
                            <label htmlFor="">Tag:</label>
                            <span className="pi-badge pi-bg-pink">Badge</span>
                            <span className="pi-badge pi-bg-pink">Badge</span>
                            <span className="pi-badge pi-bg-pink">Badge</span>
                            <span className="pi-badge pi-bg-pink">Badge</span>
                            <select name="" id="">
                                <option value="">+ Add TAg</option>
                                <option value="">+ Add TAg</option>
                                <option value="">+ Add TAg</option>
                            </select>
                        </li> 
                        <li>
                            <label htmlFor="">Source:</label>
                            <select name="" id="">
                                <option value="">Website</option>
                                <option value="">Website</option>
                                <option value="">Website</option>
                            </select>
                        </li>
                    </ul>
                </div>
                <div className="row pi-mt-30">
                    <div className="col-lg-9">
                        <div className="pi-horizontal-tab">
                            <ul className="pi-tabs"> 
                                {tabs.map((tab, index) => (
                                    <li  className={"pi-tab " + (currentTab == tab.id ? 'pi-active' : '')} key={index} onClick={(e) => this.setActiveTab(e, tab.id)}>
                                        {tab.text}
                                    </li>
                                ))}
                            </ul>
                            <div className="pi-tab-content"> 
                                { currentTab == 'task' && lead.tab_id && <Task tab_id={lead.tab_id} /> }
                            </div>
                        </div>
                        {/* ./ pi-horizontal-tab */}
                    </div>
                    {/* /.col-lg-9 */}
                    <div className="col-lg-3 pi-lead-right-content">
                        <div className="pi-widget pi-info-box">
                            <h3 className="pi-widget-title">Aditional Info</h3>
                            <address>
                                <span>Mobile:</span>
                                {contact.mobile}
                                <span>Website:</span>
                                {contact.web}
                                <span>Address: </span>
                                {contact.address}
                            </address>
                            <div className="pi-desc-content">
                                <h5>Description</h5>
                                <p className="" dangerouslySetInnerHTML={{__html: lead.desc}}></p>
                                <h5>Note:</h5> 
                                <p className="" dangerouslySetInnerHTML={{__html: lead.note}}></p>
                            </div>
                        </div>
                        {/* ./ widget */}
                        <div className="pi-widget pi-timeline-box">
                            <h3 className="pi-widget-title">Aditional Info</h3>
                            <ul>
                                <li>
                                    <h4 className="timeline-title">Nabil Created Project Propovoice</h4>
                                    <span>Aprill 12, 2022</span>
                                    <span>4.10 PM</span>
                                </li>
                                <li>
                                    <h4 className="timeline-title">Nabil Created Project Propovoice</h4>
                                    <span>Aprill 12, 2022</span>
                                    <span>4.10 PM</span>
                                </li>
                                <li>
                                    <h4 className="timeline-title">Nabil Created Project Propovoice</h4>
                                    <span>Aprill 12, 2022</span>
                                    <span>4.10 PM</span>
                                </li>
                                <li>
                                    <h4 className="timeline-title">Nabil Created Project Propovoice</h4>
                                    <span>Aprill 12, 2022</span>
                                    <span>4.10 PM</span>
                                </li>
                            </ul>
                            {/* ./ widget */}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

// I did it because useParams not working in class component
function GetId() {
    const { id } = useParams();
    return (
        <LeadSummary id={id} />
    );
}

export default GetId;