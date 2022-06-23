import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import InvTemplate from 'inv-template';

import Share from './Share';
import Send from './Send';

import ApiSetting from 'api/setting';

const EditDownload = props => {

    let title = props.path == 'invoice' ? 'Invoice' : 'Estimate';

    return (
        <>
            <button
                className="pi-btn pi-btn-medium pi-bg-stroke pi-bg-hover-stroke pi-bg-shadow pi-mr-5"
                // style={{ color: '#000', marginRight: '5px' }}
                onClick={() => props.handleEdit()}
            >
                <svg
                    width={17}
                    height={16}
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M8.5 3.5C3.5 3.5 1.5 8 1.5 8C1.5 8 3.5 12.5 8.5 12.5C13.5 12.5 15.5 8 15.5 8C15.5 8 13.5 3.5 8.5 3.5Z"
                        stroke="#2D3748"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8.5 10.5C9.88071 10.5 11 9.38071 11 8C11 6.61929 9.88071 5.5 8.5 5.5C7.11929 5.5 6 6.61929 6 8C6 9.38071 7.11929 10.5 8.5 10.5Z"
                        stroke="#2D3748"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                Edit {title}
            </button>
        </>
    );
}

export default class Preview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            previewHeight: 'auto',
            mail: {
                subject: '',
                msg: '',
            }
        };

        this.previewRef = React.createRef();
    }

    componentDidMount() {
        this.isPreviewLoaded();

        ApiSetting.getAll('tab=email_' + this.props.path + '_default')
            .then(resp => {
                if (resp.data.success) {
                    this.setState({ mail: resp.data.data });
                }
            });

    }

    isPreviewLoaded = () => {
        let previewRef = this.previewRef.current;
        if (previewRef) {
            let height = 'auto';

            if (previewRef.clientHeight > 1123) {
                height = (Math.ceil(previewRef.clientHeight / 1123) * 1123) + 'px';
            } else {
                height = '1123px';
            }
            this.setState({ previewHeight: height });
        }
    }

    render() {
        // const { id } = this.props.data.invoice.template;
        return (
            <div id="pi-tab-share" className="pi-invoice-tab-content">
                <h2 className='pi-page-title'>Preview &amp; Share</h2>
                <iframe id="ncpi-invoice-print" style={{ height: 0, width: 0, position: 'absolute' }}></iframe>
                <div className='row justify-content-md-center'>
                    <div className='col-md-8' style={{ margin: '50px 0 30px 0' }}>
                        <div className='' style={{ maxWidth: '794px', margin: '0 auto' }}>
                            <EditDownload componentRef={this.componentRef} path={this.props.path} handleEdit={this.props.editTab} />

                            <ReactToPrint
                                content={() => this.componentRef}
                                trigger={() => <button
                                    className="pi-btn pi-btn-medium pi-bg-stroke pi-bg-hover-stroke pi-bg-shadow pi-mr-5"
                                // style={{ color: '#000', marginRight: '5px' }}
                                // onClick={() => props.handleDownload()}
                                >
                                    <svg
                                        width={17}
                                        height={16}
                                        viewBox="0 0 17 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8.5 3.5C3.5 3.5 1.5 8 1.5 8C1.5 8 3.5 12.5 8.5 12.5C13.5 12.5 15.5 8 15.5 8C15.5 8 13.5 3.5 8.5 3.5Z"
                                            stroke="#2D3748"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M8.5 10.5C9.88071 10.5 11 9.38071 11 8C11 6.61929 9.88071 5.5 8.5 5.5C7.11929 5.5 6 6.61929 6 8C6 9.38071 7.11929 10.5 8.5 10.5Z"
                                            stroke="#2D3748"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    Download
                                </button>}
                            />

                            <ReactToPrint
                                content={() => this.componentRef}
                                trigger={() => <button
                                    className="pi-btn pi-btn-medium pi-bg-stroke pi-bg-hover-stroke pi-bg-shadow pi-mr-5"
                                // style={{ color: '#000', marginRight: '5px' }}
                                // onClick={() => props.handlePrint()}
                                >
                                    <svg
                                        width={17}
                                        height={16}
                                        viewBox="0 0 17 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8.5 3.5C3.5 3.5 1.5 8 1.5 8C1.5 8 3.5 12.5 8.5 12.5C13.5 12.5 15.5 8 15.5 8C15.5 8 13.5 3.5 8.5 3.5Z"
                                            stroke="#2D3748"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M8.5 10.5C9.88071 10.5 11 9.38071 11 8C11 6.61929 9.88071 5.5 8.5 5.5C7.11929 5.5 6 6.61929 6 8C6 9.38071 7.11929 10.5 8.5 10.5Z"
                                            stroke="#2D3748"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    Print
                                </button>}
                            />
                        </div>
                    </div>

                    <div className='col-md-8'>
                        {/*<div className='pi-inv-preview' ref={(response) => (this.componentRef = response)} >
                            <InvTemplate {...this.props} />
                        </div>*/}
                        <div className='pi-inv-hidden-preview' style={{ position: 'absolute', left: 9999 }} ref={this.previewRef} >
                            {this.props.data.fromData && <InvTemplate {...this.props} isPreviewLoaded={this.isPreviewLoaded} />}
                        </div>

                        <div className='pi-inv-preview-wrap'>
                            <div className='pi-inv-preview' ref={(response) => (this.componentRef = response)} >
                                {this.props.data.fromData && <InvTemplate {...this.props} height={this.state.previewHeight} />}
                            </div>
                        </div>
                    </div>

                    <div className='col-md-8' style={{ margin: '30px 0' }}>
                        <div className='' style={{ maxWidth: '794px', margin: '0 auto' }}>
                            <div className='pi-float-left'>
                                <EditDownload componentRef={this.componentRef} path={this.props.path} handleEdit={this.props.editTab} />
                                <ReactToPrint
                                    content={() => this.componentRef}
                                    trigger={() => <button
                                        className="pi-btn pi-btn-medium pi-bg-stroke pi-bg-hover-stroke pi-bg-shadow pi-mr-5"
                                        style={{ color: '#000', marginRight: '5px' }}
                                    //onClick={() => props.handleDownload()}
                                    >
                                        <svg
                                            width={17}
                                            height={16}
                                            viewBox="0 0 17 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8.5 3.5C3.5 3.5 1.5 8 1.5 8C1.5 8 3.5 12.5 8.5 12.5C13.5 12.5 15.5 8 15.5 8C15.5 8 13.5 3.5 8.5 3.5Z"
                                                stroke="#2D3748"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M8.5 10.5C9.88071 10.5 11 9.38071 11 8C11 6.61929 9.88071 5.5 8.5 5.5C7.11929 5.5 6 6.61929 6 8C6 9.38071 7.11929 10.5 8.5 10.5Z"
                                                stroke="#2D3748"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        Download
                                    </button>}
                                />

                                <ReactToPrint
                                    content={() => this.componentRef}
                                    trigger={() => <button
                                        className="pi-btn pi-btn-medium pi-bg-stroke pi-bg-hover-stroke pi-bg-shadow pi-mr-5"
                                    // style={{ color: '#000', marginRight: '5px' }}
                                    // onClick={() => props.handlePrint()}
                                    >
                                        <svg
                                            width={17}
                                            height={16}
                                            viewBox="0 0 17 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8.5 3.5C3.5 3.5 1.5 8 1.5 8C1.5 8 3.5 12.5 8.5 12.5C13.5 12.5 15.5 8 15.5 8C15.5 8 13.5 3.5 8.5 3.5Z"
                                                stroke="#2D3748"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M8.5 10.5C9.88071 10.5 11 9.38071 11 8C11 6.61929 9.88071 5.5 8.5 5.5C7.11929 5.5 6 6.61929 6 8C6 9.38071 7.11929 10.5 8.5 10.5Z"
                                                stroke="#2D3748"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        Print
                                    </button>}
                                />
                            </div>

                            <div className='pi-float-right'>
                                <button
                                    className="pi-btn pi-btn-medium pi-bg-stroke pi-bg-hover-stroke pi-bg-shadow pi-mr-5 pi-br-4"
                                    // style={{ color: '#000', marginRight: '5px' }}
                                    onClick={() => this.props.showShareModal()}
                                >
                                    Share
                                </button>
                                <button
                                    className="pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-bg-shadow pi-color-white pi-mt-20"
                                    onClick={() => this.props.showEmailModal()} >
                                    Send Email
                                    <svg
                                        className="pi-mt-3 pi-ml-10 pi-mr-0"
                                        width={6}
                                        height={12}
                                        viewBox="0 0 6 9"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3.8 4.24267L0.5 0.942667L1.44267 0L5.68533 4.24267L1.44267 8.48533L0.5 7.54267L3.8 4.24267Z"
                                            fill="white"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TODO: check this step for every component or pass show props */}
                {this.props.shareModal &&
                    <Share
                        data={this.props.data}
                        path={this.props.path}
                        close={this.props.closeShareModal}
                    />}

                {this.props.emailModal &&
                    <Send
                        data={this.props.data}
                        mail={this.state.mail}
                        path={this.props.path}
                        close={this.props.closeEmailModal}
                    />}
            </div>
        );
    }
} 