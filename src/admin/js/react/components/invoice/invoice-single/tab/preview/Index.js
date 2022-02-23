import React, { Component } from 'react'; 
import 'react-toastify/dist/ReactToastify.css';  

import One from './template/1'; 
import Two from './template/1';  

//style
import Style from './scss/all.scss'

export default class Preview extends Component {
    constructor(props) {
        super(props);  
    }   

    render() {  
        return (
            <div className="ncpi-components"> 

                <div className='max-w-3xl m-auto p-5 ncpi-invoice-preview'> 
                    <One {...this.props} /> 
                </div> 
            </div>
        );
    }
} 