import React, { Component } from 'react';
import { NavLink, useParams } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Helper from './helper';

class ClientSummary extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            invoiceNew: true, 
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
        if ( this.props.id ) { 
            this.setState({ invoiceNew: false }); 

            Helper.get(this.props.id)
            .then(resp => {
                this.setState({ data: resp.data.data });
            })
        } 
        
    };

    closeForm = () => {
        this.setState({ formModal: false });
    }; 

    render() { 
        return (
            <div className="ncpi-components">
                <ToastContainer />

                <div className='mb-3 text-sm'>
                    <NavLink
                        to='/invoice'
                        className="">
                        <span className="dashicons dashicons-arrow-left-alt2"></span> Back to Invoice
                    </NavLink>
                </div>

                <div className='mb-5 font-bold text-2xl'>
                    New Invoice
                </div>

                <div className="grid grid-cols-12 gap-4">
                    <div className='col-span-9'>
                        Content
                    </div>
                    
                    <div className='col-span-3'>
                        sidebar
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