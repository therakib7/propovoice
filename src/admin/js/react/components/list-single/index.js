import React, { Component, Suspense, lazy } from 'react'
import { NavLink, useParams, useLocation } from "react-router-dom";

import axios from 'axios';
import { apiUrl } from 'api/helper'

import DealForm from './form/Deal';
import ProjectForm from './form/Project';

const Task = lazy(() => import('./tab/task'));
const Note = lazy(() => import('./tab/note'));
const File = lazy(() => import('./tab/file'));

class ListSingle extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tabs: [
                {
                    id: 'task',
                    text: 'Task & Activity'
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
            dealModal: false,
            projectModal: false,
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
        const url = apiUrl + this.props.path + 's';
        axios.get(`${url}/${this.props.id}`).then(resp => {
            this.setState({ data: resp.data.data });
        });
    };

    setActiveTab(e, id) {
        e.preventDefault();
        this.setState({
            currentTab: id
        });
    }

    render() {
        const { tabs = [], currentTab } = this.state;
        const { path } = this.props;
        const contact = this.state.data.contact;
        const data = this.state.data;
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
                        <li>
                            {path == 'lead' && <NavLink to='/lead'>Lead</NavLink>}
                            {path == 'deal' && <NavLink to='/deal'>Deal</NavLink>}
                            {path == 'client' && <NavLink to='/client'>Client</NavLink>}
                            {path == 'project' && <NavLink to='/project'>Project</NavLink>}
                            {path == 'contact' && <NavLink to='/contact'>Contact</NavLink>}
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
                        <li className="pi-active">
                            {path == 'lead' && contact.first_name}
                            {path == 'client' && contact.first_name}
                            {path == 'deal' || path == 'project' && data.title}
                            {path == 'contact' && contact.first_name}
                        </li>
                    </ul>
                </nav>

                {path == 'lead' &&
                    <>
                        <div className="pi-list-single-head">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="pi-list-content">
                                        <img src={ncpi.assetImgUri + 'logo.png'} alt="logo" className="logo" />
                                        <div className="pi-lead-address">
                                            <h3 className="">
                                                {contact.first_name}
                                                <button className="pi-btn pi-edit-btn pi-btn-small pi-bg-stroke pi-bg-shadow">
                                                    Edit
                                                </button>
                                            </h3>
                                            <address>
                                                {contact.email} <br />
                                                Organization/Company: {contact.org_name}<br />
                                                Budget ${data.budget}
                                            </address>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="pi-list-single-button-content">
                                        <div className="pi-select">
                                            <label htmlFor="source">Lead Level:</label>
                                            <select name="source" id="source" className="pi-select-small">
                                                <option value="volvo">Opportunity</option>
                                                <option value="saab">Saab</option>
                                                <option value="opel">Opel</option>
                                                <option value="audi">Audi</option>
                                            </select>
                                        </div>
                                        
                                        <button
                                            className="pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-color-white pi-bg-shadow pi-mt-m-2"
                                            onClick={() => this.setState({ dealModal: true })}
                                        >
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
                                            Add to Deal Pipeline
                                        </button>
                                        <div className="pi-action-content pi-action-btn pi-bg-stroke pi-bg-shadow">
                                            <button>
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
                                            <div className="pi-dropdown-content">
                                                <a href="#home">
                                                    <svg width={13} height={13} viewBox="0 0 13 13">
                                                        <path
                                                            d="M8 2.89286C8 3.66009 7.68393 4.3959 7.12132 4.93842C6.55871 5.48093 5.79565 5.78571 5 5.78571C4.20435 5.78571 3.44129 5.48093 2.87868 4.93842C2.31607 4.3959 2 3.66009 2 2.89286C2 2.12562 2.31607 1.38981 2.87868 0.847298C3.44129 0.304782 4.20435 0 5 0C5.79565 0 6.55871 0.304782 7.12132 0.847298C7.68393 1.38981 8 2.12562 8 2.89286V2.89286ZM16 2.89286C16 3.27275 15.9224 3.64893 15.7716 3.99991C15.6209 4.35088 15.3999 4.66979 15.1213 4.93842C14.8427 5.20704 14.512 5.42013 14.1481 5.56551C13.7841 5.71089 13.394 5.78571 13 5.78571C12.606 5.78571 12.2159 5.71089 11.8519 5.56551C11.488 5.42013 11.1573 5.20704 10.8787 4.93842C10.6001 4.66979 10.3791 4.35088 10.2284 3.99991C10.0776 3.64893 10 3.27275 10 2.89286C10 2.12562 10.3161 1.38981 10.8787 0.847298C11.4413 0.304782 12.2044 0 13 0C13.7956 0 14.5587 0.304782 15.1213 0.847298C15.6839 1.38981 16 2.12562 16 2.89286V2.89286ZM11.93 13.5C11.976 13.1847 12 12.8636 12 12.5357C12.0023 11.0207 11.4737 9.54934 10.5 8.36036C11.2601 7.93719 12.1223 7.71441 13 7.71441C13.8776 7.7144 14.7399 7.93717 15.4999 8.36033C16.26 8.78348 16.8912 9.39211 17.3301 10.125C17.7689 10.858 18 11.6894 18 12.5357V13.5H11.93ZM5 7.71429C6.32608 7.71429 7.59785 8.22226 8.53553 9.12645C9.47322 10.0306 10 11.257 10 12.5357V13.5H0V12.5357C0 11.257 0.526784 10.0306 1.46447 9.12645C2.40215 8.22226 3.67392 7.71429 5 7.71429V7.71429Z"
                                                            fill="#5F5F5F"
                                                        />
                                                    </svg>
                                                    Create Invoice
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pi-tag-content">
                            <ul>
                                <li>
                                    <label htmlFor="">Tag:</label>
                                    {
                                        data.tags && data.tags.map((tag, tagIndex) => {
                                            return (
                                                <span key={tagIndex} className="pi-badge">{tag.label}</span>
                                            )
                                        })
                                    }

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
                    </>
                }

                {path == 'deal' &&
                    <>
                        <div className="pi-list-single-head pi-list-single-head-two">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="pi-list-content">
                                        <h3 className="">
                                            {data.title}
                                            <button className="pi-btn pi-edit-btn pi-btn-small pi-bg-stroke pi-bg-shadow">
                                                Edit
                                            </button>
                                        </h3>
                                        <div className="pi-avatar-content">
                                            <img src={ncpi.assetImgUri + 'avatar.png'} alt="avatar" />
                                            <div className="pi-avatar-text">
                                                <h5>Nabil Ahmed</h5>
                                                <p>Dhaka, Bangladesh</p>
                                            </div>
                                        </div>
                                        <div className="pi-range">
                                            <label htmlFor="">Probability</label>
                                            <input
                                                type="range"
                                                min={0}
                                                max={100}
                                                defaultValue={20}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="pi-list-single-button-content">
                                        <div className="pi-select">
                                            <label htmlFor="source">Deal Stage:</label>
                                            <select name="source" id="source" className="pi-select-small">
                                                <option value="volvo">Opportunity</option>
                                                <option value="saab">Saab</option>
                                                <option value="opel">Opel</option>
                                                <option value="audi">Audi</option>
                                            </select>
                                        </div>
                                        <button
                                            className="pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-color-white pi-bg-shadow pi-mt-m-2"
                                            onClick={() => this.setState({ projectModal: true })}
                                        >
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
                                        <div className="pi-action-content pi-action-btn pi-bg-stroke pi-bg-shadow">
                                            <button>
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
                                            <div className="pi-dropdown-content">
                                                <a href="#home">
                                                    <svg width={13} height={13} viewBox="0 0 13 13">
                                                        <path
                                                            d="M8 2.89286C8 3.66009 7.68393 4.3959 7.12132 4.93842C6.55871 5.48093 5.79565 5.78571 5 5.78571C4.20435 5.78571 3.44129 5.48093 2.87868 4.93842C2.31607 4.3959 2 3.66009 2 2.89286C2 2.12562 2.31607 1.38981 2.87868 0.847298C3.44129 0.304782 4.20435 0 5 0C5.79565 0 6.55871 0.304782 7.12132 0.847298C7.68393 1.38981 8 2.12562 8 2.89286V2.89286ZM16 2.89286C16 3.27275 15.9224 3.64893 15.7716 3.99991C15.6209 4.35088 15.3999 4.66979 15.1213 4.93842C14.8427 5.20704 14.512 5.42013 14.1481 5.56551C13.7841 5.71089 13.394 5.78571 13 5.78571C12.606 5.78571 12.2159 5.71089 11.8519 5.56551C11.488 5.42013 11.1573 5.20704 10.8787 4.93842C10.6001 4.66979 10.3791 4.35088 10.2284 3.99991C10.0776 3.64893 10 3.27275 10 2.89286C10 2.12562 10.3161 1.38981 10.8787 0.847298C11.4413 0.304782 12.2044 0 13 0C13.7956 0 14.5587 0.304782 15.1213 0.847298C15.6839 1.38981 16 2.12562 16 2.89286V2.89286ZM11.93 13.5C11.976 13.1847 12 12.8636 12 12.5357C12.0023 11.0207 11.4737 9.54934 10.5 8.36036C11.2601 7.93719 12.1223 7.71441 13 7.71441C13.8776 7.7144 14.7399 7.93717 15.4999 8.36033C16.26 8.78348 16.8912 9.39211 17.3301 10.125C17.7689 10.858 18 11.6894 18 12.5357V13.5H11.93ZM5 7.71429C6.32608 7.71429 7.59785 8.22226 8.53553 9.12645C9.47322 10.0306 10 11.257 10 12.5357V13.5H0V12.5357C0 11.257 0.526784 10.0306 1.46447 9.12645C2.40215 8.22226 3.67392 7.71429 5 7.71429V7.71429Z"
                                                            fill="#5F5F5F"
                                                        />
                                                    </svg>
                                                    Create Invoice
                                                </a>
                                            </div>
                                            {/* ./ pi-action-content*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pi-tag-content">
                            <ul>
                                <li className="pi-budget">
                                    <label htmlFor="">Budget:</label>
                                    <span>$14214</span>
                                </li>
                                <li>
                                    <label htmlFor="">Tag:</label>
                                    <span className="pi-badge">Badge</span>
                                    <span className="pi-badge">Badge</span>
                                    <span className="pi-badge">Badge</span>
                                    <span className="pi-badge">Badge</span>
                                    <select name="" id="">
                                        <option value="">+ Add Tag</option>
                                        <option value="">+ Add Tag</option>
                                        <option value="">+ Add Tag</option>
                                    </select>
                                </li>
                            </ul>
                        </div>
                    </>
                }

                {path == 'project' &&
                    <>
                        <div className="pi-list-single-head pi-list-single-head-two">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="pi-list-content">
                                        <h3 className="">
                                            {data.title}
                                            <button className="pi-btn pi-edit-btn pi-btn-small pi-bg-stroke pi-bg-shadow">
                                                Edit
                                            </button>
                                        </h3>
                                        <div className="pi-avatar-content">
                                            <img src={ncpi.assetImgUri + 'avatar.png'} alt="avatar" />
                                            <div className="pi-avatar-text">
                                                <h5>Nabil Ahmed</h5>
                                                <p>Dhaka, Bangladesh</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="pi-list-single-button-content">
                                        <div className="pi-select">
                                            <label htmlFor="source">Lead Level:</label>
                                            <select name="source" id="source" className="pi-select-small">
                                                <option value="volvo">Opportunity</option>
                                                <option value="saab">Saab</option>
                                                <option value="opel">Opel</option>
                                                <option value="audi">Audi</option>
                                            </select>
                                        </div>
                                        <button className="pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-color-white pi-bg-shadow pi-mt-m-2">
                                            Mark as completed
                                        </button>
                                        <button className="pi-btn pi-btn-medium pi-bg-stroke pi-bg-shadow pi-invite">
                                            Invite
                                        </button>
                                        <div className="pi-action-content pi-action-btn pi-bg-stroke pi-bg-shadow">
                                            <button>
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
                                            <div className="pi-dropdown-content">
                                                <a href="#home">
                                                    <svg width={13} height={13} viewBox="0 0 13 13">
                                                        <path
                                                            d="M8 2.89286C8 3.66009 7.68393 4.3959 7.12132 4.93842C6.55871 5.48093 5.79565 5.78571 5 5.78571C4.20435 5.78571 3.44129 5.48093 2.87868 4.93842C2.31607 4.3959 2 3.66009 2 2.89286C2 2.12562 2.31607 1.38981 2.87868 0.847298C3.44129 0.304782 4.20435 0 5 0C5.79565 0 6.55871 0.304782 7.12132 0.847298C7.68393 1.38981 8 2.12562 8 2.89286V2.89286ZM16 2.89286C16 3.27275 15.9224 3.64893 15.7716 3.99991C15.6209 4.35088 15.3999 4.66979 15.1213 4.93842C14.8427 5.20704 14.512 5.42013 14.1481 5.56551C13.7841 5.71089 13.394 5.78571 13 5.78571C12.606 5.78571 12.2159 5.71089 11.8519 5.56551C11.488 5.42013 11.1573 5.20704 10.8787 4.93842C10.6001 4.66979 10.3791 4.35088 10.2284 3.99991C10.0776 3.64893 10 3.27275 10 2.89286C10 2.12562 10.3161 1.38981 10.8787 0.847298C11.4413 0.304782 12.2044 0 13 0C13.7956 0 14.5587 0.304782 15.1213 0.847298C15.6839 1.38981 16 2.12562 16 2.89286V2.89286ZM11.93 13.5C11.976 13.1847 12 12.8636 12 12.5357C12.0023 11.0207 11.4737 9.54934 10.5 8.36036C11.2601 7.93719 12.1223 7.71441 13 7.71441C13.8776 7.7144 14.7399 7.93717 15.4999 8.36033C16.26 8.78348 16.8912 9.39211 17.3301 10.125C17.7689 10.858 18 11.6894 18 12.5357V13.5H11.93ZM5 7.71429C6.32608 7.71429 7.59785 8.22226 8.53553 9.12645C9.47322 10.0306 10 11.257 10 12.5357V13.5H0V12.5357C0 11.257 0.526784 10.0306 1.46447 9.12645C2.40215 8.22226 3.67392 7.71429 5 7.71429V7.71429Z"
                                                            fill="#5F5F5F"
                                                        />
                                                    </svg>
                                                    Create Invoice
                                                </a> 
                                            </div> 
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="pi-tag-content">
                            <ul>
                                <li>
                                    <label htmlFor="">Tag:</label>
                                    <span className="pi-badge">Badge</span>
                                    <span className="pi-badge">Badge</span>
                                    <select name="" id="">
                                        <option value="">+ Add Tag</option>
                                        <option value="">+ Add Tag</option>
                                        <option value="">+ Add Tag</option>
                                    </select>
                                </li>
                                <li>
                                    <label htmlFor="">Start Date:</label>
                                    <span className="pi-date">22 April, 2022</span>
                                </li>
                                <li>
                                    <label htmlFor="">Due Date:</label>
                                    <span className="pi-date">2 April, 2022</span>
                                </li>
                                <li />
                            </ul>
                        </div>

                        <div className="pi-cards pi-mt-25">
                            <div className="row">
                                <div className="col-md-6 col-lg">
                                    <div className="pi-cards-content ">
                                        <span className="" style={{ background: "rgba(76, 111, 255, 0.12)" }}>
                                            <svg
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M12 6.75V8.25"
                                                    stroke="#4C6FFF"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M12 15.75V17.25"
                                                    stroke="#4C6FFF"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                                                    stroke="#4C6FFF"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M9.75 15.75H13.125C13.6223 15.75 14.0992 15.5525 14.4508 15.2008C14.8025 14.8492 15 14.3723 15 13.875C15 13.3777 14.8025 12.9008 14.4508 12.5492C14.0992 12.1975 13.6223 12 13.125 12H10.875C10.3777 12 9.90081 11.8025 9.54917 11.4508C9.19754 11.0992 9 10.6223 9 10.125C9 9.62772 9.19754 9.15081 9.54917 8.79917C9.90081 8.44754 10.3777 8.25 10.875 8.25H14.25"
                                                    stroke="#4C6FFF"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                        <p className="">Total Budget</p>
                                        <h4>$ 14214</h4>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg">
                                    <div className="pi-cards-content">
                                        <span className="" style={{ background: "#f1faf1" }}>
                                            <svg
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M3.75 10.7531V5.25C3.75 5.05109 3.82902 4.86032 3.96967 4.71967C4.11032 4.57902 4.30109 4.5 4.5 4.5H19.5C19.6989 4.5 19.8897 4.57902 20.0303 4.71967C20.171 4.86032 20.25 5.05109 20.25 5.25V10.7531C20.25 18.6281 13.5656 21.2344 12.2344 21.675C12.0831 21.731 11.9169 21.731 11.7656 21.675C10.4344 21.2344 3.75 18.6281 3.75 10.7531Z"
                                                    stroke="#78C377"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M16.125 9.75L10.6219 15L7.875 12.375"
                                                    stroke="#78C377"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                        <p className="">Paid Amount</p>
                                        <h4>$ 14214</h4>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg">
                                    <div className="pi-cards-content">
                                        <span className="" style={{ background: "#faf0f5" }}>
                                            <svg
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M3.75 10.7531V5.25C3.75 5.05109 3.82902 4.86032 3.96967 4.71967C4.11032 4.57902 4.30109 4.5 4.5 4.5H19.5C19.6989 4.5 19.8897 4.57902 20.0303 4.71967C20.171 4.86032 20.25 5.05109 20.25 5.25V10.7531C20.25 18.6281 13.5656 21.2344 12.2344 21.675C12.0831 21.731 11.9169 21.731 11.7656 21.675C10.4344 21.2344 3.75 18.6281 3.75 10.7531Z"
                                                    stroke="#C2769F"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M12 9V12.75"
                                                    stroke="#C2769F"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M12 17.25C12.6213 17.25 13.125 16.7463 13.125 16.125C13.125 15.5037 12.6213 15 12 15C11.3787 15 10.875 15.5037 10.875 16.125C10.875 16.7463 11.3787 17.25 12 17.25Z"
                                                    fill="#C2769F"
                                                />
                                            </svg>
                                        </span>
                                        <p className="">Due Amount</p>
                                        <h4>$ 14214</h4>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg">
                                    <div className="pi-cards-content">
                                        <span className="" style={{ background: "#f0faf9" }}>
                                            <svg
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M7.125 9.75H16.875"
                                                    stroke="#76C2B7"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M7.125 12.75H16.875"
                                                    stroke="#76C2B7"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M3 19.5V5.25C3 5.05109 3.07902 4.86032 3.21967 4.71967C3.36032 4.57902 3.55109 4.5 3.75 4.5H20.25C20.4489 4.5 20.6397 4.57902 20.7803 4.71967C20.921 4.86032 21 5.05109 21 5.25V19.5L18 18L15 19.5L12 18L9 19.5L6 18L3 19.5Z"
                                                    stroke="#76C2B7"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                        <p className="">Total Invoice</p>
                                        <h4>23</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }

                {path == 'contact' &&
                    <>
                        <div className="pi-list-single-head">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="pi-list-content">
                                        <img src={ncpi.assetImgUri + 'logo.png'} alt="logo" className="logo" />
                                        <div className="pi-lead-address">
                                            <h3 className="">
                                                {contact.first_name}
                                                <button className="pi-btn pi-edit-btn pi-btn-small pi-bg-stroke pi-bg-shadow">
                                                    Edit
                                                </button>
                                            </h3>
                                            <address>
                                                {contact.email} <br />
                                                Organization/Company: {contact.org_name}<br />
                                            </address>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="pi-list-single-button-content">
                                        <div className="pi-select">
                                            <label htmlFor="source">Lead Level:</label>
                                            <select name="source" id="source" className="pi-select-small">
                                                <option value="volvo">Opportunity</option>
                                                <option value="saab">Saab</option>
                                                <option value="opel">Opel</option>
                                                <option value="audi">Audi</option>
                                            </select>
                                        </div>
                                        <div className="pi-action-content pi-action-btn pi-bg-stroke pi-bg-shadow pi-float-right">
                                            <button>
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
                                            <div className="pi-dropdown-content">
                                                <a href="#home"> 
                                                    Create Invoice
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pi-tag-content">
                            <ul>
                                <li>
                                    <label htmlFor="">Tag:</label>
                                    {
                                        data.tags && data.tags.map((tag, tagIndex) => {
                                            return (
                                                <span key={tagIndex} className="pi-badge">{tag.label}</span>
                                            )
                                        })
                                    }

                                    <select name="" id="">
                                        <option value="">+ Add TAg</option>
                                        <option value="">+ Add TAg</option>
                                        <option value="">+ Add TAg</option>
                                    </select>
                                </li>
                                <li>Project 2</li>
                                <li>Deal 2</li>
                            </ul>
                        </div>
                    </>
                }

                {this.state.dealModal && <DealForm
                    data={data}
                    close={() => this.setState({ dealModal: false })}
                    reload={() => this.getData()}
                />}

                {this.state.projectModal && <ProjectForm
                    data={data}
                    close={() => this.setState({ projectModal: false })}
                    reload={() => this.getData()}
                />}

                <div className="row pi-mt-25">
                    <div className="col-lg-9">
                        <div className="pi-horizontal-tab">
                            <ul className="pi-tabs">
                                {tabs.map((tab, index) => (
                                    <li className={"pi-tab " + (currentTab == tab.id ? 'pi-active' : '')} key={index} onClick={(e) => this.setActiveTab(e, tab.id)}>
                                        {tab.text}
                                    </li>
                                ))}
                            </ul>

                            <div className="pi-tab-content">
                                <Suspense fallback={<div>Loading...</div>}>
                                    {currentTab == 'task' && data.tab_id && <Task tab_id={data.tab_id} />}
                                    {currentTab == 'note' && data.tab_id && <Note tab_id={data.tab_id} />}
                                    {currentTab == 'file' && data.tab_id && <File tab_id={data.tab_id} />}
                                </Suspense>
                            </div>
                        </div>
                    </div>

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
                                <p className="" dangerouslySetInnerHTML={{ __html: data.desc }}></p>
                                <h5>Note:</h5>
                                <p className="" dangerouslySetInnerHTML={{ __html: data.note }}></p>
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

export default function SingleWrap() {

    const { id } = useParams();

    const location = useLocation();
    let path = '';

    let url_path = location.pathname.slice(0, location.pathname.lastIndexOf('/'));
    if (url_path.includes('lead')) {
        path = 'lead';
    } else if (url_path.includes('deal')) {
        path = 'deal';
    } else if (url_path.includes('project')) {
        path = 'project';
    } else if (url_path.includes('client')) {
        path = 'client';
    } else if (url_path.includes('contact')) {
        path = 'contact';
    }

    return (
        <>
            <ListSingle
                id={id}
                path={path}
            />
        </>
    );
} 