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
                className="pi-btn pi-bg-white pi-bg-hover-blue pi-hover-color-white"
                style={{ color: '#000', marginRight: '5px' }}
                onClick={() => props.handleEdit()}
            >
                <svg
                    width={13}
                    height={13}
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10.292 6.5c-.3 0-.542.243-.542.542v4.333a.542.542 0 01-.542.542H1.625a.542.542 0 01-.542-.542V3.792c0-.299.243-.542.542-.542h4.333a.542.542 0 100-1.083H1.625C.729 2.167 0 2.896 0 3.792v7.583C0 12.271.73 13 1.625 13h7.583c.896 0 1.625-.729 1.625-1.625V7.042c0-.3-.242-.542-.541-.542z"
                        fill="#4C6FFF"
                    />
                    <path
                        d="M5.079 6.006a.274.274 0 00-.075.139L4.621 8.06a.272.272 0 00.32.318l1.914-.383a.27.27 0 00.139-.074l4.286-4.285L9.365 1.72 5.079 6.006zM12.603.396a1.355 1.355 0 00-1.914 0l-.75.75 1.915 1.915.75-.75c.255-.255.396-.595.396-.957s-.14-.702-.397-.958z"
                        fill="#4C6FFF"
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

        ApiSetting.getAll('tab=email_'+this.props.path+'_default')
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

            if ( previewRef.clientHeight > 1123 ) { 
                height = ( Math.ceil(previewRef.clientHeight/1123) * 1123 ) + 'px';
            } else {
                height = '1123px';
            }
			this.setState({ previewHeight: height });
		}
	}

    render() {
        // const { id } = this.props.data.invoice.template;
        return (
            <div id="pi-share" className="pi-invoice-tab-content">
                <iframe id="ncpi-invoice-print" style={{ height: 0, width: 0, position: 'absolute' }}></iframe>
                <div className='row justify-content-md-center'>
                    <div className='col-md-8' style={{ margin: '50px 0 30px 0'}}>
                        <div className='' style={{ maxWidth: '794px', margin: '0 auto' }}>
                            <EditDownload componentRef={this.componentRef} path={this.props.path} handleEdit={this.props.editTab} />

                            <ReactToPrint
                                content={() => this.componentRef}
                                trigger={() => <button
                                    className="pi-btn pi-bg-white pi-bg-hover-blue pi-hover-color-white"
                                    style={{ color: '#000', marginRight: '5px' }}
                                // onClick={() => props.handleDownload()}
                                >
                                    <svg
                                        width={16}
                                        height={13}
                                        viewBox="0 0 16 13"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10.037 9.553H8.69v-4.32a.144.144 0 00-.146-.142h-1.09a.144.144 0 00-.146.142v4.32H5.965c-.122 0-.19.137-.115.23l2.036 2.526a.143.143 0 00.115.055.148.148 0 00.114-.055l2.036-2.526c.075-.093.008-.23-.114-.23z"
                                            fill="#4C6FFF"
                                        />
                                        <path
                                            d="M13.346 3.675A5.715 5.715 0 008.004 0 5.714 5.714 0 002.66 3.673 3.56 3.56 0 000 7.11a3.562 3.562 0 003.57 3.556h.716a.143.143 0 00.143-.143V9.458a.143.143 0 00-.143-.142H3.57a2.206 2.206 0 01-.565-4.34l.677-.176.248-.65a4.378 4.378 0 011.573-2.014 4.337 4.337 0 012.5-.787 4.337 4.337 0 013.436 1.673 4.3 4.3 0 01.638 1.127l.246.65.675.177a2.216 2.216 0 011.645 2.135c0 .589-.23 1.143-.648 1.56a2.198 2.198 0 01-1.565.645h-.716a.143.143 0 00-.143.142v1.066c0 .079.065.143.143.143h.716A3.562 3.562 0 0016 7.11a3.559 3.559 0 00-2.654-3.436z"
                                            fill="#4C6FFF"
                                        />
                                    </svg>
                                    Download
                                </button>}
                            />

                            <ReactToPrint
                                content={() => this.componentRef}
                                trigger={() => <button
                                    className="pi-btn pi-bg-white pi-bg-hover-blue pi-hover-color-white"
                                    style={{ color: '#000', marginRight: '5px' }}
                                // onClick={() => props.handlePrint()}
                                >
                                    <svg
                                        width={16}
                                        height={14}
                                        viewBox="0 0 16 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3.429 1.75c0-.464.18-.91.502-1.237A1.697 1.697 0 015.143 0h5.714c.455 0 .89.184 1.212.513.322.328.502.773.502 1.237v.583h1.143c.606 0 1.188.246 1.617.684.428.437.669 1.03.669 1.65v5.25c0 .464-.18.909-.502 1.237a1.697 1.697 0 01-1.212.513h-1.6v.583c0 .464-.18.91-.502 1.237A1.697 1.697 0 0110.97 14H5.143c-.455 0-.89-.184-1.212-.513a1.769 1.769 0 01-.502-1.237v-.583H1.714c-.454 0-.89-.185-1.212-.513A1.769 1.769 0 010 9.917v-5.25c0-.62.24-1.213.67-1.65a2.262 2.262 0 011.616-.684h1.143V1.75zm8 .583V1.75a.59.59 0 00-.168-.412.566.566 0 00-.404-.171H5.143a.566.566 0 00-.404.17.59.59 0 00-.168.413v.583h6.858zm-8 1.167H2.286c-.303 0-.594.123-.808.342a1.18 1.18 0 00-.335.825v5.25c0 .154.06.303.167.412.107.11.253.171.404.171H3.43v-.583c0-.464.18-.91.502-1.238a1.697 1.697 0 011.212-.512h5.828c.455 0 .891.184 1.213.512.321.328.502.774.502 1.238v.583h1.6a.566.566 0 00.404-.17.59.59 0 00.167-.413v-5.25c0-.31-.12-.606-.335-.825a1.131 1.131 0 00-.808-.342H3.43zm1.714 5.833a.566.566 0 00-.404.171.59.59 0 00-.168.413v2.333c0 .155.06.303.168.412.107.11.252.171.404.171h5.828a.566.566 0 00.405-.17.59.59 0 00.167-.413V9.917a.59.59 0 00-.167-.413.566.566 0 00-.405-.17H5.143z"
                                            fill="#4C6FFF"
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
                        <div className='pi-inv-hidden-preview' style={{position: 'absolute', left: 9999}} ref={this.previewRef} >
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
                                        className="pi-btn pi-bg-white pi-bg-hover-blue pi-hover-color-white"
                                        style={{ color: '#000', marginRight: '5px' }}
                                        //onClick={() => props.handleDownload()}
                                    >
                                        <svg
                                            width={16}
                                            height={13}
                                            viewBox="0 0 16 13"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M10.037 9.553H8.69v-4.32a.144.144 0 00-.146-.142h-1.09a.144.144 0 00-.146.142v4.32H5.965c-.122 0-.19.137-.115.23l2.036 2.526a.143.143 0 00.115.055.148.148 0 00.114-.055l2.036-2.526c.075-.093.008-.23-.114-.23z"
                                                fill="#4C6FFF"
                                            />
                                            <path
                                                d="M13.346 3.675A5.715 5.715 0 008.004 0 5.714 5.714 0 002.66 3.673 3.56 3.56 0 000 7.11a3.562 3.562 0 003.57 3.556h.716a.143.143 0 00.143-.143V9.458a.143.143 0 00-.143-.142H3.57a2.206 2.206 0 01-.565-4.34l.677-.176.248-.65a4.378 4.378 0 011.573-2.014 4.337 4.337 0 012.5-.787 4.337 4.337 0 013.436 1.673 4.3 4.3 0 01.638 1.127l.246.65.675.177a2.216 2.216 0 011.645 2.135c0 .589-.23 1.143-.648 1.56a2.198 2.198 0 01-1.565.645h-.716a.143.143 0 00-.143.142v1.066c0 .079.065.143.143.143h.716A3.562 3.562 0 0016 7.11a3.559 3.559 0 00-2.654-3.436z"
                                                fill="#4C6FFF"
                                            />
                                        </svg>
                                        Download
                                    </button>}
                                />

                                <ReactToPrint
                                    content={() => this.componentRef}
                                    trigger={() => <button
                                        className="pi-btn pi-bg-white pi-bg-hover-blue pi-hover-color-white"
                                        style={{ color: '#000', marginRight: '5px' }}
                                    // onClick={() => props.handlePrint()}
                                    >
                                        <svg
                                            width={16}
                                            height={14}
                                            viewBox="0 0 16 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M3.429 1.75c0-.464.18-.91.502-1.237A1.697 1.697 0 015.143 0h5.714c.455 0 .89.184 1.212.513.322.328.502.773.502 1.237v.583h1.143c.606 0 1.188.246 1.617.684.428.437.669 1.03.669 1.65v5.25c0 .464-.18.909-.502 1.237a1.697 1.697 0 01-1.212.513h-1.6v.583c0 .464-.18.91-.502 1.237A1.697 1.697 0 0110.97 14H5.143c-.455 0-.89-.184-1.212-.513a1.769 1.769 0 01-.502-1.237v-.583H1.714c-.454 0-.89-.185-1.212-.513A1.769 1.769 0 010 9.917v-5.25c0-.62.24-1.213.67-1.65a2.262 2.262 0 011.616-.684h1.143V1.75zm8 .583V1.75a.59.59 0 00-.168-.412.566.566 0 00-.404-.171H5.143a.566.566 0 00-.404.17.59.59 0 00-.168.413v.583h6.858zm-8 1.167H2.286c-.303 0-.594.123-.808.342a1.18 1.18 0 00-.335.825v5.25c0 .154.06.303.167.412.107.11.253.171.404.171H3.43v-.583c0-.464.18-.91.502-1.238a1.697 1.697 0 011.212-.512h5.828c.455 0 .891.184 1.213.512.321.328.502.774.502 1.238v.583h1.6a.566.566 0 00.404-.17.59.59 0 00.167-.413v-5.25c0-.31-.12-.606-.335-.825a1.131 1.131 0 00-.808-.342H3.43zm1.714 5.833a.566.566 0 00-.404.171.59.59 0 00-.168.413v2.333c0 .155.06.303.168.412.107.11.252.171.404.171h5.828a.566.566 0 00.405-.17.59.59 0 00.167-.413V9.917a.59.59 0 00-.167-.413.566.566 0 00-.405-.17H5.143z"
                                                fill="#4C6FFF"
                                            />
                                        </svg>
                                        Print
                                    </button>}
                                />
                            </div>

                            <div className='pi-float-right'>
                                <button
                                    className="pi-btn pi-bg-white pi-bg-hover-blue pi-hover-color-white"
                                    style={{ color: '#000', marginRight: '5px' }}
                                    onClick={() => this.props.showShareModal()}
                                >
                                    Share
                                </button>
                                <button
                                    className="pi-btn pi-bg-blue pi-color-white pi-bg-hover-blue pi-hover-color-white" 
                                    onClick={() => this.props.showEmailModal()}
                                >
                                    Send Mail
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