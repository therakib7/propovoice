import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import InvTemplate from 'inv-tmpl';

import Share from './Share';
import Send from './Send';
import ProLabel from 'block/pro-alert/label';

import ApiSetting from 'api/setting';

const EditDownload = props => {

    let title = props.path == 'invoice' ? ndpv.i18n.inv : ndpv.i18n.est;
    return (
        <>
            <button
                className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-hover-stroke pv-bg-shadow pv-mr-5"
                // style={{ color: '#000', marginRight: '5px' }}
                onClick={() => props.handleEdit()}
            >
                <svg
                    width={14}
                    height={14}
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12.5 3.505L11.167 4.84V1.667h-6v3.334H1.833v7.333h9.334v-1.838L12.5 9.163v3.843a.662.662 0 01-.662.661H1.162a.666.666 0 01-.662-.671V4.334l4.002-4h7.33a.67.67 0 01.668.661v2.51zm.519 1.367l.942.943-5.185 5.186-.944-.002.001-.941 5.186-5.185v-.001z"
                        fill="#2D3748"
                    />
                </svg>
                {ndpv.i18n.edit} {title}
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
        this.isPrvwLoad();

        ApiSetting.getAll('tab=email_' + this.props.path + '_default')
            .then(resp => {
                if (resp.data.success) {
                    this.setState({ mail: resp.data.data });
                }
            });

    }

    isPrvwLoad = () => {
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
        const i18n = ndpv.i18n;
        const color = this.props.data.invoice.style.primary_color;
        return (
            <div id="pv-tab-share" className="pv-invoice-tab-content">
                <h2 className='pv-page-title'>{i18n.prv} {i18n.nd} {i18n.share}</h2>
                <iframe id="ndpv-invoice-print" style={{ height: 0, width: 0, position: 'absolute' }}></iframe>
                <div className='row justify-content-md-center'>
                    <div className='col-md-8' style={{ margin: '50px 0 30px 0' }}>
                        <div className='' style={{ width: '788px', margin: '0 auto' }}>
                            <div className='pv-float-left'>
                                <EditDownload componentRef={this.componentRef} path={this.props.path} handleEdit={this.props.editTab} />
                                <ReactToPrint
                                    content={() => this.componentRef}
                                    trigger={() => <button
                                        className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-hover-stroke pv-bg-shadow pv-mr-5"
                                    // style={{ color: '#000', marginRight: '5px' }}
                                    // onClick={() => props.handleDownload()}
                                    >
                                        <svg
                                            width={12}
                                            height={14}
                                            viewBox="0 0 12 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6.667 7h2L6 9.668 3.333 7.001h2V4.334h1.334v2.667zM8 1.668H1.333v10.667h9.334v-8H8V1.667zM0 .995C0 .63.298.334.666.334h8L12 3.667v9.329a.666.666 0 01-.662.671H.662A.666.666 0 010 13.006V.996z"
                                                fill="#2D3748"
                                            />
                                        </svg>
                                        {i18n.down}
                                    </button>}
                                />
                                <ReactToPrint
                                    content={() => this.componentRef}
                                    trigger={() => <button
                                        className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-hover-stroke pv-bg-shadow pv-mr-5"
                                    // style={{ color: '#000', marginRight: '5px' }}
                                    // onClick={() => props.handlePrint()}
                                    >
                                        <svg
                                            width={15}
                                            height={14}
                                            viewBox="0 0 15 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M3.5 11.667h-2a.667.667 0 01-.667-.666V4.334a.667.667 0 01.667-.667h2V1.001a.667.667 0 01.667-.667h6.666a.667.667 0 01.667.667v2.666h2a.666.666 0 01.667.667v6.667a.667.667 0 01-.667.666h-2v1.334a.667.667 0 01-.667.666H4.167a.667.667 0 01-.667-.666v-1.334zm0-1.333v-.667a.667.667 0 01.667-.666h6.666a.667.667 0 01.667.666v.667h1.333V5.001H2.167v5.333H3.5zm1.333-8.667v2h5.334v-2H4.833zm0 8.667v2h5.334v-2H4.833zm-2-4.667h2v1.334h-2V5.667z"
                                                fill="#2D3748"
                                            />
                                        </svg>
                                        {i18n.print}
                                    </button>}
                                />
                            </div>
                            <div className='pv-float-right'>
                                <button
                                    className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-hover-stroke pv-bg-shadow pv-mr-5 pv-br-4"
                                    // style={{ color: '#000', marginRight: '5px' }}
                                    onClick={() => this.props.showShareModal()}
                                >
                                    <svg
                                        width={14}
                                        height={12}
                                        viewBox="0 0 14 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6.667 8.333H5.333a6 6 0 00-5.312 3.206 6.667 6.667 0 016.645-7.207V.667l7 5.667-7 5.666V8.333zM5.333 6.999H8v2.206l3.547-2.872L8 3.46v2.205H6.667a5.321 5.321 0 00-4.038 1.849 7.325 7.325 0 012.704-.516z"
                                            fill="#2D3748"
                                        />
                                    </svg>
                                    {i18n.share}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-8'>
                        {/*<div className='pv-inv-preview' ref={(response) => (this.componentRef = response)} >
                            <InvTemplate {...this.props} />
                        </div>*/}
                        <div className='pv-inv-hidden-preview' style={{ position: 'absolute', left: 9999 }} ref={this.previewRef} >
                            {this.props.data.fromData && <InvTemplate {...this.props} isPrvwLoad={this.isPrvwLoad} />}
                        </div>

                        <div className='pv-inv-preview-wrap'>
                            <div className='pv-inv-preview' ref={(response) => (this.componentRef = response)} >
                                {this.props.data.fromData && <InvTemplate {...this.props} height={this.state.previewHeight} />}
                            </div>
                        </div>
                    </div>

                    <div className='col-md-8' style={{ margin: '30px 0' }}>
                        <div className='' style={{ width: '788px', margin: '0 auto' }}>
                            <div className='pv-float-left'>
                                <EditDownload componentRef={this.componentRef} path={this.props.path} handleEdit={this.props.editTab} />
                                <ReactToPrint
                                    content={() => this.componentRef}
                                    trigger={() => <button
                                        className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-hover-stroke pv-bg-shadow pv-mr-5"
                                        style={{ color: '#000', marginRight: '5px' }}
                                    //onClick={() => props.handleDownload()}
                                    >
                                        <svg
                                            width={12}
                                            height={14}
                                            viewBox="0 0 12 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6.667 7h2L6 9.668 3.333 7.001h2V4.334h1.334v2.667zM8 1.668H1.333v10.667h9.334v-8H8V1.667zM0 .995C0 .63.298.334.666.334h8L12 3.667v9.329a.666.666 0 01-.662.671H.662A.666.666 0 010 13.006V.996z"
                                                fill="#2D3748"
                                            />
                                        </svg>
                                        {i18n.down}
                                    </button>}
                                />

                                <ReactToPrint
                                    content={() => this.componentRef}
                                    trigger={() => <button
                                        className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-hover-stroke pv-bg-shadow pv-mr-5"
                                    // style={{ color: '#000', marginRight: '5px' }}
                                    // onClick={() => props.handlePrint()}
                                    >
                                        <svg
                                            width={15}
                                            height={14}
                                            viewBox="0 0 15 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M3.5 11.667h-2a.667.667 0 01-.667-.666V4.334a.667.667 0 01.667-.667h2V1.001a.667.667 0 01.667-.667h6.666a.667.667 0 01.667.667v2.666h2a.666.666 0 01.667.667v6.667a.667.667 0 01-.667.666h-2v1.334a.667.667 0 01-.667.666H4.167a.667.667 0 01-.667-.666v-1.334zm0-1.333v-.667a.667.667 0 01.667-.666h6.666a.667.667 0 01.667.666v.667h1.333V5.001H2.167v5.333H3.5zm1.333-8.667v2h5.334v-2H4.833zm0 8.667v2h5.334v-2H4.833zm-2-4.667h2v1.334h-2V5.667z"
                                                fill="#2D3748"
                                            />
                                        </svg>
                                        {i18n.print}
                                    </button>}
                                />
                            </div>

                            <div className='pv-float-right'>
                                <button
                                    className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-hover-stroke pv-bg-shadow pv-mr-5 pv-br-4"
                                    // style={{ color: '#000', marginRight: '5px' }}
                                    onClick={() => this.props.showShareModal()}
                                >
                                    <svg
                                        width={14}
                                        height={12}
                                        viewBox="0 0 14 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6.667 8.333H5.333a6 6 0 00-5.312 3.206 6.667 6.667 0 016.645-7.207V.667l7 5.667-7 5.666V8.333zM5.333 6.999H8v2.206l3.547-2.872L8 3.46v2.205H6.667a5.321 5.321 0 00-4.038 1.849 7.325 7.325 0 012.704-.516z"
                                            fill="#2D3748"
                                        />
                                    </svg>
                                    {i18n.share}
                                </button>
                                <button
                                    className="pv-btn pv-btn-medium pv-bg-hover-blue pv-bg-blue pv-br-4"
                                    onClick={() => this.props.showEmailModal()} >
                                    {i18n.send} {i18n.email}
                                    <ProLabel blueBtn /> 
                                    {!wage.length && <svg
                                        className="pv-ml-10 pv-mr-0"
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
                                    </svg>}
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