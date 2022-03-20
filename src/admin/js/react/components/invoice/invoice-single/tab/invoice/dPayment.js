import React, { Component } from 'react' 
import AsyncSelect from 'react-select/async';

import ApiBusiness from 'api/business';
import ApiClient from 'api/payment';

import PropTypes from 'prop-types'

class Payment extends Component {

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
            ApiClient.getAll('bank_name=' + val)
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
                <div className="pi-from-to">
                    <label>Bank Info</label>
                    <AsyncSelect
                        loadOptions={this.handleFindClient}
                        value={toData}
                        onChange={this.handleClientSelect}
                        getOptionValue={(toList) => toList.id}
                        getOptionLabel={(toList) => (toList.bank_name) ? toList.bank_name : ''}
                    />
                    <div className="pi-from pi-bg-air-white">
                        {toData ?
                            <>
                                <h4 className="pi-from-title">
                                    {toData.bank_name}
                                </h4>
                                <address>
                                    {/* Email: {toData.email}  */}
                                </address>
                            </> : 'Search & select'
                        }
                    </div>
                </div>
            </div> 
        )
    }
}

export default Payment
