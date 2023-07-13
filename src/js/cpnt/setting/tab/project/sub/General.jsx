import React, { Component } from 'react';

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
                        <label>{i18n.project} {i18n.status}</label>
                        <Taxonomy taxonomy='project_status' title={i18n.status} color />
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
