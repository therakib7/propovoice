import React, { Component } from 'react';
import AsyncSelect from 'react-select/async'; 

import ApiClient from '../.././api/client';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            client_id: null,
            client: null,
            title: '', 
            desc: '', 
            date: false
        };

        this.state = {
            clientList: [],  
            form: this.initialState
        };

        this.timeout =  0;
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    } 

    componentDidUpdate() {
        //condition added to stop multiple rendering
        if (this.props.modalType == 'edit') { 
            if (this.state.form.id != this.props.data.id) {  
                this.setState({ 
                    form: this.props.data 
                });
            }
        } else {
            if (this.state.form.id != null) {
                this.setState({ form: this.initialState });
            }
        }
    }

    handleFindClient = (val, callback) => { 
        if ( val.length < 3 ) return;

        //search when typing stop
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            //search function
            //TODO: pass proper client search args
            ApiClient.getAll('first_name='+val+'&last_name='+val)
                .then(resp => {
                    let clientData = resp.data.data.result;
                    callback( clientData ); 
                }); 
        }, 300); 
    } 

    handleClientSelect = (value) => {    
        let form = {...this.state.form} 
        if ( value ) {
            form.client_id = value.id;    
            form.client = value;
        } else {
            form.client_id = null;    
            form.client = null;
        }
		    
		this.setState({ form }) 
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let form = {...this.state.form} 
        if ( this.props.client_id ) {
            form.client_id = this.props.client_id;
        }
        this.props.handleSubmit(form); 
    } 

    render() {
        return (
            <>
                {this.props.show && ( 
                    <div className="pi-overlay pi-show">
                        <div className="pi-popup-content">
                            <div className="pi-modal-header">
                                <h2 className="pi-modal-title pi-text-center">{this.props.modalType == 'new' ? 'New' : 'Edit'} Project</h2>
                                <span className="pi-close" onClick={() => this.props.close()}>×</span>
                            </div>

                            <div className="pi-content">
                                <form onSubmit={this.handleSubmit} className="pi-form-style-one">
                                    {!this.props.client_id && 
                                    <div className="row">
                                        <div className="col">
                                            <label
                                                htmlFor="form-title">
                                                Client
                                            </label> 
                                            <AsyncSelect
                                                loadOptions={this.handleFindClient}
                                                value={this.state.form.client}
                                                onChange={this.handleClientSelect}
                                                isClearable={true}
                                                getOptionValue ={(toList) => toList.id}
                                                getOptionLabel ={(toList) => ( toList.first_name ) ? toList.first_name + ' ' + toList.last_name : ''} 
                                            />
                                        </div> 
                                    </div>} 

                                    <div className="row">
                                        <div className="col">
                                            <label
                                                htmlFor="form-title">
                                                Title
                                            </label>

                                            <input
                                                id="form-title"
                                                type="text"
                                                required
                                                name="title"
                                                value={this.state.form.title}
                                                onChange={this.handleChange}
                                            />
                                        </div> 
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <label
                                                htmlFor="form-desc">
                                                Description
                                            </label>

                                            <input
                                                id="form-desc"
                                                type="text"
                                                required
                                                name="desc"
                                                value={this.state.form.desc}
                                                onChange={this.handleChange}
                                            />
                                        </div> 
                                    </div>   

                                    <div className="pi-footer-content pi-text-center">
                                        <button className="pi-btn pi-bg-blue pi-bg-hover-blue">
                                        Submit
                                        </button>
                                    </div>
                                </form> 
                            </div>
                        </div> 
                    </div>  
                )}
            </>
        );
    }
}

export default Form;
