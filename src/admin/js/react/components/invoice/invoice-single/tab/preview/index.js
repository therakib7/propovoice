import React, { Component } from 'react'; 
import 'react-toastify/dist/ReactToastify.css';  
import { ToastContainer } from 'react-toastify';
import Template1 from './template/1'; 
import Template2 from './template/2';  

//style
import Style from './scss/all.scss'

import Send from './Send';

export default class Preview extends Component {
    constructor(props) {
        super(props);  

        this.state = { 
            formModal: false, 
        };
    }   

    closeForm = () => {
        this.setState({ formModal: false });
    };
    

    render() {   
        const { id } = this.props.data.invoice.template; 
        return (
            <div className='max-w-3xl m-auto p-5 '> 
                <ToastContainer />
                <div className={'ncpi-invoice-preview ncpi-invoice-preview-' + id}>  
                    { id == 1 && <Template1 {...this.props} /> }
                    { id == 2 && <Template2 {...this.props} /> }
               
                <button
                    className="bg-gray-800 hover:bg-gray-900 text-white font-medium text-base py-2 px-4 rounded mb-3"
                    onClick={() => this.setState({ formModal: true }) } >
                    Send Mail
                </button>

                {this.state.formModal &&
                <Send 
                    show={this.state.formModal} 
                    data={this.props.data}
                    close={this.closeForm}
                />}
                </div> 
            </div>
        );
    }
} 