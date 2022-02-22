import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

import One from './preview/1'; 
import Two from './preview/1'; 

export default class Save extends Component {
    constructor(props) {
        super(props);         

        this.state = {
            // clients: []
            preloader: true, 
        }; 
    }   

    componentDidMount() { 
        // console.log(this.props.data)
    } 

    render() {  
        return (
            <div className="ncpi-components">
                <ToastContainer /> 

                <div className='max-w-3xl m-auto p-5'>
                    <One {...this.props} /> 
                </div> 
            </div>
        );
    }
} 