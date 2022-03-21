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
                                                <button
                                                    className="pi-btn pi-bg-air-white pi-bg-hover-blue pi-hover-color-white"
                                                    // onClick={() => this.setState({ media: true })}
                                                    style={{ color: '#000' }}
                                                >
                                                    <svg
                                                        width={12}
                                                        height={12}
                                                        viewBox="0 0 12 12"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M7.976 1.903a1.5 1.5 0 112.121 2.12l-2.25 2.25a1.5 1.5 0 01-2.12 0 .75.75 0 00-1.061 1.061 3 3 0 004.242 0l2.25-2.25A3 3 0 006.916.842L5.79 1.967a.75.75 0 101.06 1.06l1.125-1.124zm-3.75 3.75a1.5 1.5 0 012.121 0 .75.75 0 101.06-1.06 3 3 0 00-4.241 0l-2.25 2.25a3 3 0 104.242 4.241L6.283 9.96a.75.75 0 10-1.06-1.06l-1.126 1.125a1.5 1.5 0 11-2.12-2.121l2.25-2.25z"
                                                            fill="#18181B"
                                                        />
                                                    </svg>
                                                    Attachment
                                                </button>
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
