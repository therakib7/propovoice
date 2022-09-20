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
                        <label>{i18n.level}</label>
                        <Taxonomy taxonomy='lead_level' title={i18n.level} color />
                    </div>
                    <div className="col">
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label>{i18n.source}</label>
                        <Taxonomy taxonomy='lead_source' title={i18n.source} color />
                    </div>
                    <div className="col">
                    </div>
                </div>

                {/* <div className="row">
                    <div className="col">
                        <button className="pv-btn pv-bg-blue pv-bg-hover-blue">
                            Save
                        </button>
                    </div>
                </div> */}

            </form>
        );
    }
} 