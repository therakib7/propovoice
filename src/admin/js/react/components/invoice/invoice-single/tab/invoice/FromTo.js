import React, { Component } from 'react'
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types' 

class FromTo extends Component {
    state = {
        loaded: false,
        fromList: [
            { value: 1, label: 'Nurency' } 
        ],
        toList:  [
            { value: 1, label: 'Nurency' } 
        ],
		from: { value: 1, label: 'Nurency' }, 
		to: null, 
	}
 

    handleFromChange = e => {
        // const { name, value } = e.target;
        // this.setState({ note: { ...this.state.note, [name]: value } });
        this.handlePros();
    }

    handleFindClient = (val, callback) => { 
        callback( this.findClient( val )); 
    }

    findClient = ( val ) => {
        return [
            { value: 1, label: 'Nurency', rakib: 'hello' }, 
            { value: 2, label: 'Nurency Creation' } 
        ];
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
                                    options={this.state.fromList}
                                />
                            </label> 
                        </div>
                        <div className="bg-slate-50 p-3 border rounded">
                            <span className='font-bold'>Nurency Digital</span>
                            <p className=''>
                                Email: hello@gmail.com<br />

                                Address: hello@gmail.com<br />

                            </p>
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
                                    defaultOptions={this.state.fromList}
                                    // onInputChange={this.handleInputChange} 
                                    />
                            </label> 
                        </div>
                        <div className="bg-slate-50 p-3 border rounded">
                            Select Receiver
                        </div> 
                    </div>
                </div>
            </>
        )
    }
} 

export default FromTo


