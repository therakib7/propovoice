import React, { Component } from 'react';
import { NavLink, useParams } from "react-router-dom";

import Api from 'api/deal';

import Overview from './tab/overview';
import Project from 'components/project';
import Estimate from 'components/invoice/list';
import Invoice from 'components/invoice/list';
import Receipt from './tab/receipt';

class ClientSummary extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tabs: [
                {
                    id: 'overview',
                    text: 'Overview'
                },
                {
                    id: 'project',
                    text: 'Project'
                },
                {
                    id: 'estimate',
                    text: 'Estimate'
                },
                {
                    id: 'invoice',
                    text: 'Invoice'
                },
                {
                    id: 'receipt',
                    text: 'Receipt'
                },
            ],
            currentTab: 'overview',
            formModal: false,
            formModalType: 'new',
            msg: {
                create: 'Successfully Added',
                update: 'Successfully Updated',
                delete: 'Successfully Deleted',
                confirm: 'Are you sure to delete it?',
            },
            data: {
                profile: {
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
        const profile = this.state.data.profile; 
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
                        <li className="pi-active">{profile.first_name}</li>
                    </ul>
                </nav>
                <div className="pi-lead-name-content">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="pi-lead-content">
                                <img src={ncpi.assetImgUri + 'logo.png'} alt="logo" className="logo" />
                                <div className="pi-lead-address">
                                    <h3 className="">{profile.first_name}</h3>
                                    <address>
                                        nurencydigital@gmail.com <br />
                                        Organization / Company : Nureency Digital <br />
                                        Budget $14214
                                    </address>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 pi-text-right">
                            <div className="pi-lead-button-content">
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
                                    Move to Project
                                </button>
                                <button className="pi-btn pi-btn-medium pi-bg-stroke pi-bg-shadow">
                                    <img src={ncpi.assetImgUri + 'happy.png'} alt="won" />
                                    Won
                                </button>
                                <button className="pi-btn pi-btn-medium pi-bg-stroke pi-bg-shadow">
                                    <img src={ncpi.assetImgUri + 'sad.png'} alt="sad" />
                                    Lost
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
                            <label htmlFor="">Lead Level:</label>
                            <span className="pi-badge pi-bg-orange">
                                <svg
                                    width={6}
                                    height={6}
                                    viewBox="0 0 6 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx={3} cy={3} r={3} fill="#F68A0B" />
                                </svg>
                                hot
                            </span>
                        </li>
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
                            <label htmlFor="">Sales Stage:</label>
                            <select name="" id="">
                                <option value="">N/A</option>
                                <option value="">N/A</option>
                                <option value="">N/A</option>
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
                                <li data-tab-target="#pi-business" className="pi-active pi-tab">
                                    Activity anad task
                                </li>
                                <li data-tab-target="#pi-payment" className="pi-tab">
                                    Note
                                </li>
                                <li data-tab-target="#pi-genarel" className="pi-tab">
                                    Files
                                </li>
                            </ul>
                            <div className="pi-tab-content">
                                <div id="pi-business" data-tab-content="" className="pi-active">
                                    <div className="pi-tab-buttons-group">
                                        <p>Add activity or task</p>
                                        <button>
                                            <svg
                                                width={20}
                                                height={20}
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M6 5V1V5ZM14 5V1V5ZM5 9H15H5ZM3 19H17C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V5C19 4.46957 18.7893 3.96086 18.4142 3.58579C18.0391 3.21071 17.5304 3 17 3H3C2.46957 3 1.96086 3.21071 1.58579 3.58579C1.21071 3.96086 1 4.46957 1 5V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19Z"
                                                    stroke="#CBD5E0"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                        <button>
                                            <svg
                                                width={16}
                                                height={20}
                                                viewBox="0 0 16 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M5 3H3C2.46957 3 1.96086 3.21071 1.58579 3.58579C1.21071 3.96086 1 4.46957 1 5V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H13C13.5304 19 14.0391 18.7893 14.4142 18.4142C14.7893 18.0391 15 17.5304 15 17V5C15 4.46957 14.7893 3.96086 14.4142 3.58579C14.0391 3.21071 13.5304 3 13 3H11M5 3C5 3.53043 5.21071 4.03914 5.58579 4.41421C5.96086 4.78929 6.46957 5 7 5H9C9.53043 5 10.0391 4.78929 10.4142 4.41421C10.7893 4.03914 11 3.53043 11 3M5 3C5 2.46957 5.21071 1.96086 5.58579 1.58579C5.96086 1.21071 6.46957 1 7 1H9C9.53043 1 10.0391 1.21071 10.4142 1.58579C10.7893 1.96086 11 2.46957 11 3M5 12L7 14L11 10"
                                                    stroke="#CBD5E0"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                        <button>
                                            <svg
                                                width={20}
                                                height={20}
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M10 1.5V7M1 19V15V19ZM1 15V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H9.5L10.5 2H19L16 8L19 14H10.5L9.5 13H3C2.46957 13 1.96086 13.2107 1.58579 13.5858C1.21071 13.9609 1 14.4696 1 15V15Z"
                                                    stroke="#CBD5E0"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                        <button className="pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-bg-shadow">
                                            Save
                                        </button>
                                    </div>
                                    {/* ./ pi-tab-buttons-group */}
                                    <div className="pi-work-button-group">
                                        <h3>My Work</h3>
                                        <button className="pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-shadow">
                                            To do
                                        </button>
                                        <button className="pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-shadow">
                                            In Progress
                                        </button>
                                        <button className="pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-shadow">
                                            Done
                                        </button>
                                    </div>
                                    {/* ./ pi-work-button-group */}
                                    <div className="pi-table-wrap">
                                        <table className="pi-table pi-table-two">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <input type="checkbox" />
                                                    </td>
                                                    <td>
                                                        <div className="pi-envelope">
                                                            <svg
                                                                width={18}
                                                                height={18}
                                                                viewBox="0 0 16 16"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M2 3.5H14V12C14 12.1326 13.9473 12.2598 13.8536 12.3536C13.7598 12.4473 13.6326 12.5 13.5 12.5H2.5C2.36739 12.5 2.24021 12.4473 2.14645 12.3536C2.05268 12.2598 2 12.1326 2 12V3.5Z"
                                                                    stroke="#718096"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                                <path
                                                                    d="M14 3.5L8 9L2 3.5"
                                                                    stroke="#718096"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <div className="pi-envelope-text">
                                                            <h4>Title gose to here</h4>
                                                            <p>
                                                                <svg
                                                                    width={12}
                                                                    height={12}
                                                                    viewBox="0 0 12 12"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M6 10.5C8.48528 10.5 10.5 8.48528 10.5 6C10.5 3.51472 8.48528 1.5 6 1.5C3.51472 1.5 1.5 3.51472 1.5 6C1.5 8.48528 3.51472 10.5 6 10.5Z"
                                                                        stroke="#718096"
                                                                        strokeMiterlimit={10}
                                                                    />
                                                                    <path
                                                                        d="M6 3.375V6H8.625"
                                                                        stroke="#718096"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                </svg>
                                                                May 09, 12:30 PM-01:00 PM
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <svg
                                                            width={12}
                                                            height={12}
                                                            viewBox="0 0 12 12"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M6 7.5C7.65685 7.5 9 6.15685 9 4.5C9 2.84315 7.65685 1.5 6 1.5C4.34315 1.5 3 2.84315 3 4.5C3 6.15685 4.34315 7.5 6 7.5Z"
                                                                stroke="#718096"
                                                                strokeMiterlimit={10}
                                                            />
                                                            <path
                                                                d="M1.45312 10.125C1.91388 9.32678 2.57664 8.66392 3.37479 8.20306C4.17294 7.7422 5.07835 7.49957 6 7.49957C6.92165 7.49957 7.82706 7.7422 8.62521 8.20306C9.42336 8.66392 10.0861 9.32678 10.5469 10.125"
                                                                stroke="#718096"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                        nurencydigital@gmail.com
                                                    </td>
                                                    <td>
                                                        <span className="pi-badge pi-bg-orange"> Over Due </span>
                                                    </td>
                                                    <td>
                                                        <span className="pi-badge pi-bg-orange">
                                                            <svg
                                                                width={6}
                                                                height={6}
                                                                viewBox="0 0 6 6"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <circle cx={3} cy={3} r={3} fill="#F68A0B" />
                                                            </svg>
                                                            Badge
                                                        </span>
                                                    </td>
                                                    <td className="pi-action">
                                                        <div className="pi-action-content">
                                                            <div className="pi-dropdown">
                                                                <button className="pi-active">
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
                                                                </button>
                                                                <div id="myDropdown" className="pi-dropdown-content">
                                                                    <a href="#home">
                                                                        <svg width={13} height={13} viewBox="0 0 13 13">
                                                                            <path
                                                                                d="M8 2.89286C8 3.66009 7.68393 4.3959 7.12132 4.93842C6.55871 5.48093 5.79565 5.78571 5 5.78571C4.20435 5.78571 3.44129 5.48093 2.87868 4.93842C2.31607 4.3959 2 3.66009 2 2.89286C2 2.12562 2.31607 1.38981 2.87868 0.847298C3.44129 0.304782 4.20435 0 5 0C5.79565 0 6.55871 0.304782 7.12132 0.847298C7.68393 1.38981 8 2.12562 8 2.89286V2.89286ZM16 2.89286C16 3.27275 15.9224 3.64893 15.7716 3.99991C15.6209 4.35088 15.3999 4.66979 15.1213 4.93842C14.8427 5.20704 14.512 5.42013 14.1481 5.56551C13.7841 5.71089 13.394 5.78571 13 5.78571C12.606 5.78571 12.2159 5.71089 11.8519 5.56551C11.488 5.42013 11.1573 5.20704 10.8787 4.93842C10.6001 4.66979 10.3791 4.35088 10.2284 3.99991C10.0776 3.64893 10 3.27275 10 2.89286C10 2.12562 10.3161 1.38981 10.8787 0.847298C11.4413 0.304782 12.2044 0 13 0C13.7956 0 14.5587 0.304782 15.1213 0.847298C15.6839 1.38981 16 2.12562 16 2.89286V2.89286ZM11.93 13.5C11.976 13.1847 12 12.8636 12 12.5357C12.0023 11.0207 11.4737 9.54934 10.5 8.36036C11.2601 7.93719 12.1223 7.71441 13 7.71441C13.8776 7.7144 14.7399 7.93717 15.4999 8.36033C16.26 8.78348 16.8912 9.39211 17.3301 10.125C17.7689 10.858 18 11.6894 18 12.5357V13.5H11.93ZM5 7.71429C6.32608 7.71429 7.59785 8.22226 8.53553 9.12645C9.47322 10.0306 10 11.257 10 12.5357V13.5H0V12.5357C0 11.257 0.526784 10.0306 1.46447 9.12645C2.40215 8.22226 3.67392 7.71429 5 7.71429V7.71429Z"
                                                                                fill="#5F5F5F"
                                                                            />
                                                                        </svg>
                                                                        Create Invoice
                                                                    </a>
                                                                    <a href="#about">
                                                                        <svg width={13} height={13} viewBox="0 0 13 13">
                                                                            <path
                                                                                d="M8 2.89286C8 3.66009 7.68393 4.3959 7.12132 4.93842C6.55871 5.48093 5.79565 5.78571 5 5.78571C4.20435 5.78571 3.44129 5.48093 2.87868 4.93842C2.31607 4.3959 2 3.66009 2 2.89286C2 2.12562 2.31607 1.38981 2.87868 0.847298C3.44129 0.304782 4.20435 0 5 0C5.79565 0 6.55871 0.304782 7.12132 0.847298C7.68393 1.38981 8 2.12562 8 2.89286V2.89286ZM16 2.89286C16 3.27275 15.9224 3.64893 15.7716 3.99991C15.6209 4.35088 15.3999 4.66979 15.1213 4.93842C14.8427 5.20704 14.512 5.42013 14.1481 5.56551C13.7841 5.71089 13.394 5.78571 13 5.78571C12.606 5.78571 12.2159 5.71089 11.8519 5.56551C11.488 5.42013 11.1573 5.20704 10.8787 4.93842C10.6001 4.66979 10.3791 4.35088 10.2284 3.99991C10.0776 3.64893 10 3.27275 10 2.89286C10 2.12562 10.3161 1.38981 10.8787 0.847298C11.4413 0.304782 12.2044 0 13 0C13.7956 0 14.5587 0.304782 15.1213 0.847298C15.6839 1.38981 16 2.12562 16 2.89286V2.89286ZM11.93 13.5C11.976 13.1847 12 12.8636 12 12.5357C12.0023 11.0207 11.4737 9.54934 10.5 8.36036C11.2601 7.93719 12.1223 7.71441 13 7.71441C13.8776 7.7144 14.7399 7.93717 15.4999 8.36033C16.26 8.78348 16.8912 9.39211 17.3301 10.125C17.7689 10.858 18 11.6894 18 12.5357V13.5H11.93ZM5 7.71429C6.32608 7.71429 7.59785 8.22226 8.53553 9.12645C9.47322 10.0306 10 11.257 10 12.5357V13.5H0V12.5357C0 11.257 0.526784 10.0306 1.46447 9.12645C2.40215 8.22226 3.67392 7.71429 5 7.71429V7.71429Z"
                                                                                fill="#5F5F5F"
                                                                            />
                                                                        </svg>
                                                                        Create Proposal
                                                                    </a>
                                                                    <a href="#contact">
                                                                        <svg width={13} height={13} viewBox="0 0 13 13">
                                                                            <path
                                                                                d="M8 2.89286C8 3.66009 7.68393 4.3959 7.12132 4.93842C6.55871 5.48093 5.79565 5.78571 5 5.78571C4.20435 5.78571 3.44129 5.48093 2.87868 4.93842C2.31607 4.3959 2 3.66009 2 2.89286C2 2.12562 2.31607 1.38981 2.87868 0.847298C3.44129 0.304782 4.20435 0 5 0C5.79565 0 6.55871 0.304782 7.12132 0.847298C7.68393 1.38981 8 2.12562 8 2.89286V2.89286ZM16 2.89286C16 3.27275 15.9224 3.64893 15.7716 3.99991C15.6209 4.35088 15.3999 4.66979 15.1213 4.93842C14.8427 5.20704 14.512 5.42013 14.1481 5.56551C13.7841 5.71089 13.394 5.78571 13 5.78571C12.606 5.78571 12.2159 5.71089 11.8519 5.56551C11.488 5.42013 11.1573 5.20704 10.8787 4.93842C10.6001 4.66979 10.3791 4.35088 10.2284 3.99991C10.0776 3.64893 10 3.27275 10 2.89286C10 2.12562 10.3161 1.38981 10.8787 0.847298C11.4413 0.304782 12.2044 0 13 0C13.7956 0 14.5587 0.304782 15.1213 0.847298C15.6839 1.38981 16 2.12562 16 2.89286V2.89286ZM11.93 13.5C11.976 13.1847 12 12.8636 12 12.5357C12.0023 11.0207 11.4737 9.54934 10.5 8.36036C11.2601 7.93719 12.1223 7.71441 13 7.71441C13.8776 7.7144 14.7399 7.93717 15.4999 8.36033C16.26 8.78348 16.8912 9.39211 17.3301 10.125C17.7689 10.858 18 11.6894 18 12.5357V13.5H11.93ZM5 7.71429C6.32608 7.71429 7.59785 8.22226 8.53553 9.12645C9.47322 10.0306 10 11.257 10 12.5357V13.5H0V12.5357C0 11.257 0.526784 10.0306 1.46447 9.12645C2.40215 8.22226 3.67392 7.71429 5 7.71429V7.71429Z"
                                                                                fill="#5F5F5F"
                                                                            />
                                                                        </svg>
                                                                        Create Estimate
                                                                    </a>
                                                                    <a href="#contact">
                                                                        <svg width={13} height={13} viewBox="0 0 13 13">
                                                                            <path
                                                                                d="M8 2.89286C8 3.66009 7.68393 4.3959 7.12132 4.93842C6.55871 5.48093 5.79565 5.78571 5 5.78571C4.20435 5.78571 3.44129 5.48093 2.87868 4.93842C2.31607 4.3959 2 3.66009 2 2.89286C2 2.12562 2.31607 1.38981 2.87868 0.847298C3.44129 0.304782 4.20435 0 5 0C5.79565 0 6.55871 0.304782 7.12132 0.847298C7.68393 1.38981 8 2.12562 8 2.89286V2.89286ZM16 2.89286C16 3.27275 15.9224 3.64893 15.7716 3.99991C15.6209 4.35088 15.3999 4.66979 15.1213 4.93842C14.8427 5.20704 14.512 5.42013 14.1481 5.56551C13.7841 5.71089 13.394 5.78571 13 5.78571C12.606 5.78571 12.2159 5.71089 11.8519 5.56551C11.488 5.42013 11.1573 5.20704 10.8787 4.93842C10.6001 4.66979 10.3791 4.35088 10.2284 3.99991C10.0776 3.64893 10 3.27275 10 2.89286C10 2.12562 10.3161 1.38981 10.8787 0.847298C11.4413 0.304782 12.2044 0 13 0C13.7956 0 14.5587 0.304782 15.1213 0.847298C15.6839 1.38981 16 2.12562 16 2.89286V2.89286ZM11.93 13.5C11.976 13.1847 12 12.8636 12 12.5357C12.0023 11.0207 11.4737 9.54934 10.5 8.36036C11.2601 7.93719 12.1223 7.71441 13 7.71441C13.8776 7.7144 14.7399 7.93717 15.4999 8.36033C16.26 8.78348 16.8912 9.39211 17.3301 10.125C17.7689 10.858 18 11.6894 18 12.5357V13.5H11.93ZM5 7.71429C6.32608 7.71429 7.59785 8.22226 8.53553 9.12645C9.47322 10.0306 10 11.257 10 12.5357V13.5H0V12.5357C0 11.257 0.526784 10.0306 1.46447 9.12645C2.40215 8.22226 3.67392 7.71429 5 7.71429V7.71429Z"
                                                                                fill="#5F5F5F"
                                                                            />
                                                                        </svg>
                                                                        Create Project
                                                                    </a>
                                                                    <a href="#contact">
                                                                        <svg width={13} height={13} viewBox="0 0 13 13">
                                                                            <path
                                                                                d="M8 2.89286C8 3.66009 7.68393 4.3959 7.12132 4.93842C6.55871 5.48093 5.79565 5.78571 5 5.78571C4.20435 5.78571 3.44129 5.48093 2.87868 4.93842C2.31607 4.3959 2 3.66009 2 2.89286C2 2.12562 2.31607 1.38981 2.87868 0.847298C3.44129 0.304782 4.20435 0 5 0C5.79565 0 6.55871 0.304782 7.12132 0.847298C7.68393 1.38981 8 2.12562 8 2.89286V2.89286ZM16 2.89286C16 3.27275 15.9224 3.64893 15.7716 3.99991C15.6209 4.35088 15.3999 4.66979 15.1213 4.93842C14.8427 5.20704 14.512 5.42013 14.1481 5.56551C13.7841 5.71089 13.394 5.78571 13 5.78571C12.606 5.78571 12.2159 5.71089 11.8519 5.56551C11.488 5.42013 11.1573 5.20704 10.8787 4.93842C10.6001 4.66979 10.3791 4.35088 10.2284 3.99991C10.0776 3.64893 10 3.27275 10 2.89286C10 2.12562 10.3161 1.38981 10.8787 0.847298C11.4413 0.304782 12.2044 0 13 0C13.7956 0 14.5587 0.304782 15.1213 0.847298C15.6839 1.38981 16 2.12562 16 2.89286V2.89286ZM11.93 13.5C11.976 13.1847 12 12.8636 12 12.5357C12.0023 11.0207 11.4737 9.54934 10.5 8.36036C11.2601 7.93719 12.1223 7.71441 13 7.71441C13.8776 7.7144 14.7399 7.93717 15.4999 8.36033C16.26 8.78348 16.8912 9.39211 17.3301 10.125C17.7689 10.858 18 11.6894 18 12.5357V13.5H11.93ZM5 7.71429C6.32608 7.71429 7.59785 8.22226 8.53553 9.12645C9.47322 10.0306 10 11.257 10 12.5357V13.5H0V12.5357C0 11.257 0.526784 10.0306 1.46447 9.12645C2.40215 8.22226 3.67392 7.71429 5 7.71429V7.71429Z"
                                                                                fill="#5F5F5F"
                                                                            />
                                                                        </svg>
                                                                        Arcihive
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* ./ action */}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* ./pi-table-wrap */}
                                </div>
                                {/* ./ pi-business */}
                                <div id="pi-payment" data-tab-content="">
                                    <p>Note: in this version, you can add only bank info</p>
                                </div>
                                <div id="pi-genarel" data-tab-content="">
                                    <p>Note: in this version, you can add</p>
                                </div>
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
                                01760706361
                                <span>Website:</span>
                                afruzaui.com
                                <span>Address: </span>
                                Dhaka, Bangladesh
                            </address>
                            <div className="pi-desc-content">
                                <h5>Description</h5>
                                <p>
                                    To enable faster turn around times and reduce repetitive document
                                    editing, You can create your own templates and get docs E-Signed
                                </p>
                                <h5>Note:</h5>
                                <p>
                                    To enable faster turn around times and reduce repetitive document
                                    editing, You can create your own templates and get docs E-Signed
                                </p>
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
        <ClientSummary id={id} />
    );
}

export default GetId;