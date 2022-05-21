import React, { Component } from 'react'
import { toast } from 'react-toastify';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import AppContext from 'context/app-context';
import ApiBusiness from 'api/business';
import ApiClient from 'api/client';

//others component
import BusinessForm from 'components/business/Form';
import ClientForm from 'components/client/list/Form';

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
        if (!this.props.editId) {
            ApiBusiness.getAll('default=1')
                .then(resp => {
                    let fromData = resp.data.data.result;
                    if (fromData.length) {
                        this.setState({ from: fromData[0] });
                        this.props.setFrom(fromData[0]);
                    }
                });
        } else {
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

        const { fromList } = this.state;
        const { fromData, toData } = this.props;
        return (
            <div className="pi-from-content" style={{ padding: '17px 30px 10px' }} >
                {/* TODO: move parent style to css */}

                {this.state.businessModal && <BusinessForm
                    handleSubmit={this.handleBusinessSubmit}
                    show={this.state.businessModal}
                    modalType={this.state.businessModalType}
                    data={this.state.businessData}
                    close={() => this.setState({ businessModal: false })}
                />}

                {this.state.clientModal && <ClientForm
                    handleSubmit={this.handleClientSubmit}
                    show={this.state.clientModal}
                    modalType={this.state.clientModalType}
                    data={this.state.clientData}
                    close={() => this.setState({ clientModal: false })}
                />}
                
                <div className="row">
                    <div className="col-lg-6">
                        <div className="pi-from-to">
                            <label>Business:</label>
                            <Select
                                value={fromData}
                                onChange={this.handleFromChange}
                                getOptionValue={(fromList) => fromList.id}
                                getOptionLabel={(fromList) => fromList.name}
                                options={fromList}
                            />
                            <div className="pi-from pi-bg-air-white">
                                {fromData ?
                                    <>
                                        <h4 className="pi-from-title">
                                            {fromData.name}

                                            <span
                                                onClick={() => this.setState({ businessData: fromData, businessModal: true, businessModalType: 'edit'  })}
                                            >
                                                <svg
                                                width={11}
                                                height={11}
                                                viewBox="0 0 13 13"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg" 
                                                >
                                                <path
                                                    d="M12.524.476a1.625 1.625 0 00-2.298 0L4.062 6.64v2.297H6.36l6.164-6.163a1.625 1.625 0 000-2.298z"
                                                    fill="#A0AEC0"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M0 3.25a1.625 1.625 0 011.625-1.625h3.25a.813.813 0 110 1.625h-3.25v8.125H9.75v-3.25a.813.813 0 011.625 0v3.25A1.625 1.625 0 019.75 13H1.625A1.625 1.625 0 010 11.375V3.25z"
                                                    fill="#A0AEC0"
                                                />
                                                </svg>
                                                Edit
                                            </span>
                                        </h4>
                                        <address>
                                            Email: {fromData.email}
                                            {fromData.mobile &&
                                                <> 
                                                    <br />Mobile: {fromData.mobile}
                                                </>
                                            }

                                            {fromData.address &&
                                                <> 
                                                    <br />Address: {fromData.address}
                                                </>
                                            }
                                        </address>
                                    </> : <>
                                        {/* Search & select, Or <br /> <br /> */}
                                        <a className="pi-text-hover-blue" style={{ color: 'blue', padding: '20px', display: 'table', margin: 'auto' }} onClick={() => this.setState({ businessModal: true, businessModalType: 'new' })}>Create New Business</a>
                                    </>
                                }
                            </div>
                        </div>
                        {/* ./ pi-from-to */}
                    </div>
                    <div className="col-lg-6">
                        <div className="pi-from-to pi-to">
                            <label>Receiver:</label>
                            <AsyncSelect
                                loadOptions={this.handleFindClient}
                                value={toData}
                                onChange={this.handleClientSelect}
                                getOptionValue={(toList) => toList.id}
                                getOptionLabel={(toList) => (toList.first_name) ? toList.first_name + ' ' + toList.last_name : ''}
                            />
                            <div className="pi-from pi-bg-air-white">
                                {toData ?
                                    <>
                                        <h4 className="pi-from-title">
                                            {toData.first_name} {toData.last_name}

                                            <span
                                                onClick={() => this.setState({ clientData: toData, clientModal: true, clientModalType: 'edit'  })}
                                            >
                                                <svg
                                                width={11}
                                                height={11}
                                                viewBox="0 0 13 13"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg" 
                                                >
                                                <path
                                                    d="M12.524.476a1.625 1.625 0 00-2.298 0L4.062 6.64v2.297H6.36l6.164-6.163a1.625 1.625 0 000-2.298z"
                                                    fill="#A0AEC0"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M0 3.25a1.625 1.625 0 011.625-1.625h3.25a.813.813 0 110 1.625h-3.25v8.125H9.75v-3.25a.813.813 0 011.625 0v3.25A1.625 1.625 0 019.75 13H1.625A1.625 1.625 0 010 11.375V3.25z"
                                                    fill="#A0AEC0"
                                                />
                                                </svg>
                                                Edit
                                            </span>
                                        </h4>
                                        <address>
                                            Email: {toData.email}
                                            {toData.mobile &&
                                                <>
                                                    <br />Mobile: {toData.mobile}
                                                </>
                                            }

                                            {toData.address &&
                                                <>
                                                    <br />Address: {toData.address}
                                                </>
                                            }
                                        </address>
                                    </> : <>
                                        {/* Search & select, Or <br /> <br /> */}
                                        <a className="pi-text-hover-blue" style={{ color: 'blue', padding: '20px', display: 'table', margin: 'auto' }} onClick={() => this.setState({ clientModal: true, clientModalTYpe: 'new' })}>Add New Client</a>
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

export default FromTo
