import React, { Component } from 'react';

class Feedback extends Component {
    constructor(props) {
        super(props);

    }

    componentDidUpdate() {
        // this.setState({ note: this.props.data.note });
    }

    render() {
        return (
            <>
                {this.props.show && (
                    <div className="pi-overlay pi-show">
                        <div className="pi-popup-content">
                            <div className="pi-modal-header">
                                <h2 className="pi-modal-title pi-text-center">Feedback</h2>
                                <span className="pi-close" onClick={() => this.props.close()}>×</span>
                            </div>

                            <div className="pi-content">
                                <div className="pi-form-content pi-form-style-two pi-form-style-three">

                                    <div className="pi-textarea-content">
                                        <div className="row">
                                            <div className="col">
                                                <h4
                                                    htmlFor="form-note">
                                                    {this.props.data.status == 'accept' ? 'Additional Note' : 'Reason of decline'}
                                                </h4>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <p>{this.props.data.note}</p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default Feedback;
