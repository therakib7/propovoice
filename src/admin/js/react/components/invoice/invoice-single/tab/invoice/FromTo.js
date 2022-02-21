import React, { Component } from 'react'
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import Helper from '../../helper';

import PropTypes from 'prop-types' 

class FromTo extends Component {

    state = {
        loaded: false,
        fromList: [],
        toList:  [],
		from: { id: null }, 
		to: { id: null }, 
	} 

    componentDidMount() {  
		Helper.getAllBusiness('default=1')
            .then(resp => {
                let fromData = resp.data.data.result;
                if ( fromData.length ) {
                    this.setState({ fromList: fromData });  
                    this.setState({ from: fromData[0] }); 
                    this.props.setFrom(fromData[0].id);
                }
            })
	} 

    handleFromChange = val => { 
        this.setState({ from: val }); 
    }

    handleFindClient = (val, callback) => { 
        if ( val.length < 3 ) return;

        Helper.getAllBusiness('default=1')
            .then(resp => {
                let toData = resp.data.data.result;
                callback( toData ); 
            }); 
    } 

    handleClientSelect = (val) => {  
        console.log(val)
        this.setState({ to: val });
    }

    componentDidUpdate() {  
        if ( ! this.state.loaded ) { 
            this.setState({ loaded: true });
        }
	}

    handlePros = () => { 
        // this.props.changeHandler( this.state.note );
    }; 

    render = () => {

        // const { label, text } = this.state.note;
        const { fromList } = this.state;
        const { toList } = this.state;
        return (
            <> 
                <div className="flex justify-between p-5 mb-5">
                    <div className="">
                        <div className="">
                            <label>
                                Sender: 
                                <Select
                                    value={this.state.from}
                                    onChange={this.handleFromChange}
                                    getOptionLabel ={(fromList)=>fromList.name}
                                    getOptionValue ={(fromList)=>fromList.id}
                                    options={fromList}
                                />
                            </label> 
                        </div>
                        <div className="bg-slate-50 p-3 border rounded">
                            {this.state.from && 
                                <>
                                    <span className='font-bold'>{this.state.from.name}</span>
                                    <p className=''>
                                        Email: {this.state.from.email}<br />
                                        Address: {this.state.from.address}<br />
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
                                    // options={this.state.toList}
                                    value={this.state.to}
                                    onChange={this.handleClientSelect}
                                    getOptionLabel ={(toList)=>toList.name}
                                    getOptionValue ={(toList)=>toList.id}
                                    // defaultOptions={this.state.toList}
                                    // onInputChange={this.handleInputChange} 
                                    />
                            </label> 
                        </div>
                        <div className="bg-slate-50 p-3 border rounded">
                                {this.state.to ? 
                                <>
                                    <span className='font-bold'>{this.state.to.name}</span>
                                    <p className=''>
                                        Email: {this.state.to.email}<br />
                                        Address: {this.state.to.address}<br />
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


