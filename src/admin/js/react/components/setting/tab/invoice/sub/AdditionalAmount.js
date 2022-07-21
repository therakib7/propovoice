import React, { Component } from 'react';

import { toast } from 'react-toastify';
import AppContext from 'context/app-context';  
import Taxonomy from 'block/field/taxonomy/setting';

export default class AdditionalAmount extends Component {
    constructor(props) {
        super(props);

        this.state = { 
        };
    }

    static contextType = AppContext;

    componentDidMount() { 
    } 

    handleSubmit = (e) => {
        e.preventDefault();
         
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="pi-form-style-one"> 
                <div className="row">
                    <div className="col">
                        <label>Tax Fields</label>
                        <Taxonomy taxonomy='extra_amount' title='Tax Field' extra_amount_type={'tax'} /> 
                    </div>
                    <div className="col">
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label>Discount Fields</label>
                        <Taxonomy taxonomy='extra_amount' title='Discount Field' extra_amount_type={'discount'} />
                    </div>
                    <div className="col">
                    </div>
                </div>  
            </form>
        );
    }
} 