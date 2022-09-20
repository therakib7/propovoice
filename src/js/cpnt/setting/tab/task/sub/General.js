import React, { Component } from 'react';

import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
import Taxonomy from 'block/field/taxonomy/setting';

export default class General extends Component {
    constructor(props) {
        super(props);

        this.state = { 
        };
    }

    static contextType = AppContext;

    componentDidMount() {

         
    } 

    render() {
        const i18n = ndpv.i18n;
        return (
            <form onSubmit={this.handleSubmit} className="pv-form-style-one"> 
                <div className="row">
                    <div className="col">
                        <label>{i18n.task} {i18n.status}</label>
                        <Taxonomy taxonomy='task_status' title={i18n.status} color />
                    </div>
                    <div className="col"></div>
                </div> 

                <div className="row">
                    <div className="col">
                        <label>{i18n.task} {i18n.type}</label>
                        <Taxonomy taxonomy='task_type' title={i18n.type} icon />
                    </div>
                    <div className="col"></div>
                </div> 

                <div className="row">
                    <div className="col">
                        <label>{i18n.task} {i18n.prior}</label>
                        <Taxonomy taxonomy='task_priority' title={i18n.prior} color />
                    </div>
                    <div className="col"></div>
                </div> 

            </form>
        );
    }
} 