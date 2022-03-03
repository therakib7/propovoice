import React, { Component } from 'react'; 
import Template1 from './template/1'; 
import Template2 from './template/2';  

import Style from './scss/all.scss' 

export default class Preview extends Component {
    constructor(props) {
        super(props);   
    }   

    render() {   
        const { id } = this.props.data.invoice.template; 
        return (
            <div className={'ncpi-invoice-preview ncpi-invoice-preview-' + id}>  
                { id == 1 && <Template1 {...this.props} /> }
                { id == 2 && <Template2 {...this.props} /> } 
            </div> 
        );
    }
} 