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
    handleSubmit = (e) => {
        e.preventDefault();
 
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="pi-form-style-one"> 
                <div className="row">
                    <div className="col">
                        <label>Deal Stage</label>
                        <Taxonomy taxonomy='deal_stage' title='stage' color={true} />
                    </div>
                    <div className="col">
                    </div>
                </div>

                {/* <div className="row">
                    <div className="col">
                        <button className="pi-btn pi-bg-blue pi-bg-hover-blue">
                            Save
                        </button>
                    </div>
                </div> */}

            </form>
        );
    }
} 