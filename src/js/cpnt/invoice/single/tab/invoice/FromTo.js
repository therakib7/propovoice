import React, { Component } from 'react'
import { toast } from 'react-toastify';

import AppContext from 'context/app-context';
import WithApi from 'hoc/Api';

import Contact from 'block/field/contact-select';

//others component
import BusinessForm from 'cpnt/business/Form';
import ContactForm from 'cpnt/contact/Form';

class FromTo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            fromList: [],
            from: { id: null },
            to: { id: null },
            to_type: 'person', //'org'
            businessModal: false,
            businessModalType: 'new',
            businessData: { id: null },
            contactModal: false,
            contactModalType: 'new',
            contactData: { id: null },
        };

        this.timeout = 0;
    }

    static contextType = AppContext;

    componentDidMount() {
        /**
         * for free version default selected without list
         * for pro default delected with list
         * if don't have default selected first one
         */
        let args = {
            page: 1,
            per_page: 1,
            default: true,
        }
        let params = new URLSearchParams(args).toString();

        this.props.getAll('businesses', params).then(resp => {
            let fromData = resp.data.data.result;
            if (fromData.length) {
                let stateValue = {}

                if (!wage.length) {
                    stateValue.fromList = fromData;
                }

                if (!this.props.editId) {
                    let filteredArray = fromData.filter(function (itm) {
                        return itm.default == true;
                    });

                    if (filteredArray.length) {
                        stateValue.from = filteredArray[0];
                        this.props.setFrom(filteredArray[0]);
                    } else {
                        stateValue.from = fromData[0];
                        this.props.setFrom(fromData[0]);
                    }
                }

                this.setState(stateValue);
            }
        });

        if (this.props.editId) {
            let fromData = this.props.fromData;
            let toData = this.props.toData;
            if (fromData && toData) {
                this.setState({
                    from: fromData,
                    to: toData
                });
            }
        }
    }

    handleContactSelect = (val) => {
        this.setState({ to: val });
        this.props.setTo(val);
    }

    componentDidUpdate() {
        if (!this.state.loaded && this.props.editId && this.state.to.id != null) {
            this.setState({
                from: this.props.fromData,
                to: this.props.toData,
                loaded: true
            });
        }
    }

    handleBusinessSubmit = business => { 
        if (this.state.businessModalType == 'new') {
            this.props.create('businesses', business).then(resp => {
                if (resp.data.success) {
                    this.setState({ businessModal: false })
                    toast.success(this.context.CrudMsg.create);
                    business.id = resp.data.data;
                    this.props.setFrom(business);
                } else {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                }
            })
        } else {
            this.props.update('businesses', business.id, business).then(resp => {
                if (resp.data.success) {
                    this.setState({ businessModal: false })
                    toast.success(this.context.CrudMsg.update);
                    this.props.setFrom(business);
                } else {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                }
            })
        }
    }

    handleContactSubmit = contact => {
        this.props.setTo(contact);
    }

    render = () => {
        const { fromData, toData } = this.props;
        const i18n = ndpi.i18n; 
        return (
            <div className="pi-from-content pi-border-right pi-mt-25">

                {this.state.businessModal && <BusinessForm
                    handleSubmit={this.handleBusinessSubmit}
                    modalType={this.state.businessModalType}
                    data={this.state.businessData}
                    close={() => this.setState({ businessModal: false })}
                />}

                {this.state.contactModal && <ContactForm
                    handleSubmit={this.handleContactSubmit}
                    modalType={this.state.contactModalType}
                    data={this.state.contactData}
                    close={() => this.setState({ contactModal: false })}
                />}

                <div className="row">
                    <div className="col-md-6">
                        <div className="pi-from-to">
                            <label className="pi-title-small">{i18n.sender}</label>
                            <div className="pi-from pi-bg-white">
                                {fromData ?
                                    <>
                                        <h4 className="pi-title-small">
                                            {fromData.name}
                                            <span>
                                                <button
                                                    className="pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-stroke pi-bg-shadow"
                                                    onClick={() => this.setState({ businessData: fromData, businessModal: true, businessModalType: 'edit' })}
                                                >
                                                    {i18n.edit}
                                                </button>
                                            </span>
                                        </h4>
                                        <address>
                                            {fromData.address &&
                                                <>{fromData.address}.<br /></>
                                            }

                                            {fromData.email},

                                            {fromData.mobile &&
                                                <><br />{fromData.mobile}</>
                                            }
                                        </address>
                                    </> : <>
                                        {/* Search & select, Or <br /> <br /> */}
                                        <a className="pi-color-blue pi-text-hover-blue" style={{ color: 'blue', padding: '20px', display: 'table', margin: 'auto' }} onClick={() => this.setState({ businessModal: true, businessModalType: 'new' })}>{i18n.create} {i18n.new} {i18n.business}</a>
                                    </>
                                }
                            </div>
                        </div>
                        {/* ./ pi-from-to */}
                    </div>
                    <div className="col-md-6">
                        <div className="pi-from-to pi-to">
                            <div className="pi-from-to-content">
                                <label className="pi-title-small">{i18n.rec}</label>
                                <div className="pi-sendlist pi-action-content">
                                    <Contact data={toData} onChange={this.handleContactSelect} />
                                </div>
                            </div>

                            <div className="pi-from pi-bg-white">
                                {toData ?
                                    <>
                                        <h4 className="pi-title-small">
                                            {(toData.type == 'person') ? toData.first_name : toData.org_name}
                                            <span>
                                                <button
                                                    className="pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-stroke pi-bg-shadow"
                                                    onClick={() => this.setState({ contactData: toData, contactModal: true, contactModalType: 'edit' })}
                                                >
                                                    {i18n.edit}
                                                </button>
                                            </span>
                                        </h4>
                                        <address>
                                            {toData.address &&
                                                <>{toData.address}.<br /></>
                                            }

                                            {toData.email},

                                            {toData.mobile &&
                                                <><br />{toData.mobile}</>
                                            }
                                        </address>
                                    </> : <>
                                        {/* Search & select, Or <br /> <br /> */}
                                        <a className="pi-color-blue pi-text-hover-blue" style={{ color: 'blue', padding: '20px', display: 'table', margin: 'auto' }} onClick={() => this.setState({ contactModal: true, contactModalTYpe: 'new' })}>{i18n.add} {i18n.new}</a>
                                    </>
                                }
                            </div>
                        </div>
                        {/* ./ pi-from-to */}
                    </div>
                </div>
            </div>
        )
    }
}
export default WithApi(FromTo); 