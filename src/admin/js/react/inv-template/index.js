import React, { Component, Suspense, lazy } from 'react';  
const Template1 = lazy(() => import('./template/1')); 
const Template2 = lazy(() => import('./template/2')); 

import Style from './scss/all.scoped.scss' 

export default class Preview extends Component {
    constructor(props) {
        super(props);   
    }   

    render() {   
        const { id } = this.props.data.invoice.template; 
        return (
            <div className={'ncpi-invoice-preview ncpi-invoice-preview-' + id}>   
                <Suspense fallback={<div>Loading...</div>}>
                { id == 1 && <Template1 {...this.props} /> }
                { id == 2 && <Template2 {...this.props} /> } 
                </Suspense>
            </div> 
        );
    }
} 