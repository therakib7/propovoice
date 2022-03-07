import React, { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import Template from '../../../../../inv-template';

import Send from './Send';

export default class Preview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formModal: false,
        };
    }

    closeForm = () => {
        this.setState({ formModal: false });
    };

    render() {
        const { id } = this.props.data.invoice.template;
        return (
            <div id="pi-share" className="city">
                <div className='row'>

                    <div className='col-md-8'>
                        <h2>Share</h2>
                        <Template {...this.props} />
                    </div>

                    <div className='col-md-4'>
                        {/* <button
                            onClick={() => this.setState({ formModal: true })} >
                            Send Mail
                        </button> */}

                        {this.state.formModal &&
                            <Send
                                show={this.state.formModal}
                                data={this.props.data}
                                close={this.closeForm}
                            />}
                    </div>
                </div>

            </div>
        );
    }
} 