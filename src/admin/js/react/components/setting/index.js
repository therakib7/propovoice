import React, { Component } from 'react'; 
 
import Account from './section/account'; 

export default class Setting extends Component {
    constructor(props) {
        super(props);  
    }   

    render() { 
        return (
            <div className="ncpi-setting-area max-w-3xl m-auto">
                <Account />   
            </div>
        );
    }
} 