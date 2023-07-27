import React, { Component } from 'react'
import { toast } from 'react-toastify';
import { CountryRegionData } from 'react-country-region-selector';
import AppContext from 'context/app-context';
import api from 'api';
import Contact from 'block/field/contact-select';

//others component
import BusinessForm from 'cpnt/business/Form';
import ContactForm from 'cpnt/contact/Form';

export default class FromTo extends Component {

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

        api.get('businesses', params).then(resp => {
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

        if (this.props.moduleId) {
            api.getS('deals', this.props.moduleId).then(resp => {
                this.props.setTo(resp.data.data.person);
            });
        }


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
            api.add('businesses', business).then(resp => {
                if (resp.data.success) {
                    this.setState({ businessModal: false })
                    toast.success(ndpv.i18n.aAdd);
                    business.id = resp.data.data;
                    this.props.setFrom(business);
                } else {
                    resp.data.data.forEach(function (value) {
                        toast.error(value);
                    });
                }
            })
        } else {
            api.edit('businesses', business.id, business).then(resp => {
                if (resp.data.success) {
                    this.setState({ businessModal: false })
                    toast.success(ndpv.i18n.aUpd);
                    this.props.setFrom(business);
                } else {
                    resp.data.data.forEach(function (value) {
                        toast.error(value);
                    });
                }
            })
        }
    }

    handleContactSubmit = contact => {
        this.props.setTo(contact);
    }

    countryByCode = (country = '') => {
        if (country) {
            let obj = CountryRegionData.find((o, i) => {
                if (o[1] === country) {
                    return true; // stop searching
                }
            });

            if (obj) {
                return obj[0];
            }
        }
    }

    render = () => {
        const { fromData, toData } = this.props;
        const i18n = ndpv.i18n;
        return (
            <div className="pv-from-content pv-border-right pv-mt-25">

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
                        <div className="pv-from-to">
                            <label className="pv-title-small">{i18n.sndr}</label>
                            <div className="pv-from">
                                {fromData ?
                                    <>
                                        <h4 className="pv-title-small">
                                            {fromData.name}
                                            <span>
                                                <button
                                                    className="pv-btn pv-btn-small pv-bg-stroke pv-bg-hover-stroke pv-bg-shadow"
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
                                        <a className="pv-color-blue pv-text-hover-blue" style={{ color: 'blue', padding: '20px', display: 'table', margin: 'auto' }} onClick={() => this.setState({ businessModal: true, businessModalType: 'new' })}>{i18n.create} {i18n.new} {i18n.biz}</a>
                                    </>
                                }
                            </div>
                        </div>
                        {/* ./ pv-from-to */}
                    </div>
                    <div className="col-md-6">
                        <div className="pv-from-to pv-to">
                            <div className="pv-from-to-content">
                                <label className="pv-title-small">{i18n.rec}</label>
                                <div className="pv-sendlist pv-action-content">
                                    <Contact data={toData} onChange={this.handleContactSelect} />
                                </div>
                            </div>

                            <div className="pv-from">
                                {toData ?
                                    <>
                                        <h4 className="pv-title-small">
                                            {(toData.type == 'person') ? toData.first_name : toData.org_name}
                                            {false && <span>
                                                <button
                                                    className="pv-btn pv-btn-small pv-bg-stroke pv-bg-hover-stroke pv-bg-shadow"
                                                    onClick={() => this.setState({ contactData: toData, contactModal: true, contactModalType: 'edit' })}
                                                >
                                                    {i18n.edit}
                                                </button>
                                            </span>}
                                        </h4>
                                        <address>
                                            {toData.address &&
                                                <>{toData.address}.<br /></>
                                            }

                                            {toData.email}
                                            {toData.mobile &&
                                                <>,<br />{toData.mobile}</>
                                            }

                                            {(toData.region || toData.country) &&
                                                <>
                                                    <br />{(toData.region && toData.country) ? toData.region + ', ' : ''} {this.countryByCode(toData.country)}
                                                </>
                                            }
                                        </address>
                                    </> : <>
                                        {/* Search & select, Or <br /> <br /> */}
                                        <a className="pv-color-blue pv-text-hover-blue" style={{ color: 'blue', padding: '20px', display: 'table', margin: 'auto' }} onClick={() => this.setState({ contactModal: true, contactModalTYpe: 'new' })}>{i18n.add} {i18n.new}</a>
                                    </>
                                }
                            </div>
                        </div>
                        {/* ./ pv-from-to */}
                    </div>
                </div>
            </div>
        )
    }
}