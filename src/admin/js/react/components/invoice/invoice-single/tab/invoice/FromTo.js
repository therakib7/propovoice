import React, { Component } from 'react'
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

import ApiBusiness from 'api/business';
import ApiClient from 'api/client';

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
        };

        this.timeout = 0;
    }

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
        if (val.length < 3) return;

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

    render = () => {

        const { fromList } = this.state;
        const { fromData, toData } = this.props;
        return (
            <div className="pi-from-content">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="pi-from-to">
                            <label>Sender:</label>
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
                                        </h4>
                                        <address>
                                            Email: {fromData.email}
                                            <br />
                                            What'sApp: +8801760706361
                                            <br />
                                            Asia Address:
                                            <br />
                                            {fromData.address}
                                        </address>
                                    </> : 'Search & select'
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
                                        </h4>
                                        <address>
                                            Email: {toData.email}
                                            <br />
                                            What'sApp: +8801760706361
                                            <br />
                                            Asia Address:
                                            <br />
                                            {toData.address}
                                        </address>
                                    </> : 'Search & select'
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
