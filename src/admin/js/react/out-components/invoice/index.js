import React, { useEffect, Component } from 'react';  
import {useLocation} from "react-router-dom";
import Style from './style.scss'

import Api from 'api/invoice';  
import Preview from 'inv-template';

export default class Invoice extends Component {
    constructor(props) {
        super(props);

        this.state = {   
			fromData: null,
			toData: null,  
			invoice: { 
				template: {
					id: null,
					img: ''
				},
				from: null,
				to: null,
				items: [ 
				],
				tax: 0.00, 
				paid: 0.00, 
				note: null,
				group: null,
				attach: [],
				sign: null 
			},
		};  
    } 

    componentDidMount() {
        this.getData();  
    }

    getData = () => {   
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id') 
        Api.get(id)
            .then(resp => { 
                this.setState({ 
					invoice: resp.data.data.invoice, 
					fromData: resp.data.data.fromData, 
					toData: resp.data.data.toData,  
				}); 
            }) 
    }; 

    handleSubmit = ( business, tab = null ) => {  

        if ( !business.id ) {
            Api.create(business)
                .then(resp => {
                    if ( resp.data.success ) {   
                        let businessData = {...business} 
                        businessData.id = resp.data.data; 
                        this.setState({ business: businessData });
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        } else {
            Api.update(business.id, business)
                .then(resp => {
                    if ( !resp.data.success) { 
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        } 
    }    

    render() {
        const { tabs = [], currentTab, currentTabIndex } = this.state; 
        return (
            <>
                <div className='rakib-container'>
                    <div className='rakib-left-content'>
                        { this.state.fromData && <Preview data={this.state} />}
                    </div>
                    <div className='rakib-right-content'>
                        Right Sidebar
                    </div>
                </div>
            </>
        );
    }
}  