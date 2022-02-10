import React, { Component } from 'react';
import { NavLink, useParams } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Helper from './helper';

import Overview from './tab/overview';
import Project from './tab/project';
import Estimate from './tab/estimate';
import Invoice from './tab/invoice';
import Receipt from './tab/receipt';

class ClientSummary extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tabs: [
                {
                    id: 'overview',
                    text: 'Overview',
                    content: Overview
                },
                {
                    id: 'project',
                    text: 'Project',
                    content: Project
                },
                {
                    id: 'estimate',
                    text: 'Estimate',
                    content: Estimate
                },
                {
                    id: 'invoice',
                    text: 'Invoice',
                    content: Invoice
                },
                {
                    id: 'receipt',
                    text: 'Receipt',
                    content: Receipt
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
                user: {
                    first_name: 'Name'
                }
            }
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        Helper.get(this.props.id)
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
        return (
            <div className="ncpi-components">
                <ToastContainer />

                <div className='mb-3 text-sm'>
                    <NavLink
                        to='/client'
                        className="">
                        <span className="dashicons dashicons-arrow-left-alt2"></span> Back to Client
                    </NavLink>
                </div>

                <div className='mb-5 font-bold text-2xl'>
                    {this.state.data.user.first_name}
                </div>

                <div className="border-b border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px">

                        {tabs.map((tab, index) => (
                            <li className="mr-2" key={index}>
                                <a
                                    href="#"
                                    className={"inline-flex py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 " + (currentTab == tab.id ? 'text-gray-700 border-gray-700' : 'border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300')}
                                    onClick={(e) => this.setActiveTab(e, tab.id)}
                                >
                                    {tab.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {tabs.map((tab, index) => (
                    <React.Fragment key={index}>
                        {(currentTab == tab.id) ? React.createElement(tab.content, {}) : null}
                    </React.Fragment>
                ))}

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