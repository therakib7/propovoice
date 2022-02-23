import React, { Component } from 'react'
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import Helper from '../../helper';

import PropTypes from 'prop-types' 

class FromTo extends Component { 

    constructor(props) {
        super(props); 

        this.state = {
            loaded: false,
            fromList: [],
            toList:  [],
            from: { id: null }, 
            to: { id: null }, 
        };

        this.timeout =  0;
    }

    componentDidMount() {   
		if ( ! this.props.editId  ) {
            Helper.getAllBusiness('default=1')
            .then(resp => {
                let fromData = resp.data.data.result;
                if ( fromData.length ) { 
                    this.setState({ from: fromData[0] }); 
                    this.props.setFrom(fromData[0]);
                }
            }); 
        } else {
            let fromData = this.props.fromData; 
            let toData = this.props.toData;  
            if ( fromData && toData ) { 
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
        if ( val.length < 3 ) return;

        //search when typing stop
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            //search function
            Helper.getAllClient('first_name='+val+'&last_name='+val)
                .then(resp => {
                    let toData = resp.data.data.result;
                    callback( toData ); 
                }); 
        }, 300); 
    } 

    handleClientSelect = (val) => {   
        this.setState({ to: val });
        this.props.setTo(val);
    }

    componentDidUpdate() {  
        if ( ! this.state.loaded && this.props.editId && this.state.to.id != null ) {  
            this.setState({ 
                from: this.props.fromData,
                to: this.props.toData,
                loaded: true
             });
        }
	} 

    render = () => {

        // const { label, text } = this.state.note;
        const { fromList } = this.state;
        const { toList } = this.state;
        const { fromData, toData } = this.props;
        return (
            <> 
                <div className="flex justify-between mb-5">
                    <div className="">
                        <div className="">
                            <label>
                                Sender: 
                                <Select
                                    value={fromData}
                                    onChange={this.handleFromChange}
                                    getOptionValue ={(fromList)=>fromList.id}
                                    getOptionLabel ={(fromList)=>fromList.name}
                                    options={fromList}
                                />
                            </label> 
                        </div>
                        <div className="bg-slate-50 p-3 border rounded">
                            {fromData && 
                                <>
                                    <span className='font-bold'>{fromData.name}</span>
                                    <p className=''>
                                        Email: {fromData.email}<br />
                                        Address: {fromData.address}<br />
                                    </p>
                                </>
                            }
                        </div> 
                    </div>
                    <div className="">
                        
                    </div>
                    <div className="">
                        <div className="">
                            <label>
                                Receiver: 
                                <AsyncSelect
                                    loadOptions={this.handleFindClient}
                                    value={toData}
                                    onChange={this.handleClientSelect}
                                    getOptionValue ={(toList) => toList.id}
                                    getOptionLabel ={(toList) => ( toList.first_name ) ? toList.first_name + ' ' + toList.last_name : ''} 
                                />
                            </label> 
                        </div>
                        <div className="bg-slate-50 p-3 border rounded">
                                {toData ? 
                                <>
                                    <span className='font-bold'>{toData.first_name} {toData.last_name}</span>
                                    <p className=''>
                                        Email: {toData.email}<br />
                                        Address: {toData.address}<br />
                                    </p>
                                </> : 'Search & select'
                            }
                        </div> 
                    </div>
                </div>
            </>
        )
    }
} 

export default FromTo


