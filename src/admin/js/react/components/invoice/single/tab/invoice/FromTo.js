import React, { Component } from 'react'
import { toast } from 'react-toastify';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import AppContext from 'context/app-context';
import ApiBusiness from 'api/business';
import ApiClient from 'api/client';

//others component
import BusinessForm from 'components/business/Form';
import ClientForm from 'components/client/Form';

import PropTypes from 'prop-types'

class FromTo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            fromList: [],
            toList: [],
            from: { id: null },
            to: { id: null },
            businessModal: false,
            businessModalType: 'new',
            businessData: { id: null },
            clientModal: false,
            clientModalType: 'new',
            clientData: { id: null },
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
        ApiBusiness.getAll().then(resp => {
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

        let args = {
            page: 1,
            per_page: 10
        }
        let params = new URLSearchParams(args).toString();

        ApiClient.getAll(params)
            .then(resp => {
                if (resp.data.success) {
                    let toList = resp.data.data.result;
                    this.setState({ toList });
                }
            });
    }

    handleFromChange = val => {
        this.setState({ from: val });
        this.props.setFrom(val);
    }

    handleFindClient = (val, callback) => {
        if (val.length < 2) return;

        //search when typing stop
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            //search function
            ApiClient.getAll('first_name=' + val + '&last_name=' + val)
                .then(resp => {
                    let toData = resp.data.data.result;
                    callback(toData);
                });
        }, 300);
    }

    handleClientSelect = (val) => {
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
            ApiBusiness.create(business)
                .then(resp => {
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
            ApiBusiness.update(business.id, business)
                .then(resp => {
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

    handleClientSubmit = client => {
        if (this.state.clientModalType == 'new') {
            ApiClient.create(client)
                .then(resp => {
                    if (resp.data.success) {
                        this.setState({ clientModal: false })
                        toast.success(this.context.CrudMsg.create);
                        client.id = resp.data.data;
                        this.props.setTo(client);
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        } else {
            ApiClient.update(client.id, client)
                .then(resp => {
                    if (resp.data.success) {
                        this.setState({ clientModal: false })
                        toast.success(this.context.CrudMsg.update);
                        this.props.setTo(client);
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        }
    }

    render = () => {

        const { fromList, toList } = this.state;
        const { fromData, toData } = this.props;
        return (
            <div className="pi-from-content pi-border-right pi-mt-25">
                <div className="row">
                    <div className="col-md-6">
                        <div className="pi-from-to">
                            <label className="pi-title-small">Sender</label>
                            <div className="pi-from pi-bg-white">
                                <h4 className="pi-title-small">
                                    ABCD Solution Ltd
                                    <span>
                                        <button className="pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-stroke pi-bg-shadow">
                                            Edit
                                        </button>
                                    </span>
                                </h4>
                                <address>
                                    Email: hello@nurency.com
                                    <br />
                                    What'sApp: +8801760706361
                                    <br />
                                    Asia Address:
                                    <br />
                                    377 Airport - Dakshinkhan Rd, Dhaka 1230
                                </address>
                            </div>
                        </div>
                        {/* ./ pi-from-to */}
                    </div>
                    <div className="col-md-6">
                        <div className="pi-from-to pi-to">
                            <div className="row">
                                <div className="col">
                                    <label className="pi-title-small">Receiver</label>
                                </div>
                                <div className="col">
                                    <select name="pi-sandlist">
                                        <option value="volvo">Nurency Digital</option>
                                        <option value="saab">Saab</option>
                                        <option value="opel">Opel</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pi-from pi-bg-white">
                                <h4 className="pi-title-small">
                                    ABCD Solution Ltd
                                    <span>
                                        <button className="pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-stroke pi-bg-shadow">
                                            Edit
                                        </button>
                                    </span>
                                </h4>
                                <address>
                                    Email: hello@nurency.com
                                    <br />
                                    What'sApp: +8801760706361
                                    <br />
                                    Asia Address:
                                    <br />
                                    377 Airport - Dakshinkhan Rd, Dhaka 1230
                                </address>
                            </div>
                        </div>
                        {/* ./ pi-from-to */}
                    </div>
                </div>
            </div>
        )
    }
}

export default FromTo
