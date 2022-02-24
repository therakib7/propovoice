import React, { Component } from 'react';
import { NavLink, useParams } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
import Api from '../../../api/client';

import Overview from './tab/overview';
import Project from '../../project';
import Estimate from '../../estimate';
import Invoice from '../../invoice/invoice';
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
                
                <div className='mb-5'></div>      

                { currentTab == 'overview' && <Overview /> }
                { currentTab == 'project' && <Project client_id={id} /> }
                { currentTab == 'estimate' && <Estimate client_id={id} /> }
                { currentTab == 'invoice' && <Invoice client_id={id} /> }
                { currentTab == 'receipt' && <Receipt /> } 

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