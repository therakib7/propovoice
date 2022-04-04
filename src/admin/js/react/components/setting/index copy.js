import React, { Component } from 'react';

import General from './section/General';

export default class Setting extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <h1>Settings</h1>
                <nav className="pi-breadcrumb">
                    <ul>
                        <li>
                            <a href="#" >
                                Home
                            </a>
                        </li>
                        <li>&gt;</li>
                        <li className="pi-active">
                            Settings
                        </li>
                    </ul>
                </nav>
                <div className="pi-settings-tab">
                    <ul className="pi-tabs">
                        <li data-tab-target="#pi-genarel" className="pi-tab pi-active">
                            Genarel Settings
                        </li>
                        <li data-tab-target="#pi-business" className="pi-tab">
                            Email Template
                        </li>                         
                    </ul>
                    
                    <div className="pi-setting-tab-content">
                        <div className="pi-setting-heading-content">
                            <h3>Payment Info</h3>
                            <p>note: in this version, you can add only bank info in your invoice</p>
                        </div>
                        sdfsd
                    </div>
                    {/* ./ pi-tabs */}
                </div>
            </>
        );
    }
} 