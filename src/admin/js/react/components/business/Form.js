import React, { Component } from 'react';

import Logo from './Logo';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            name: '', 
            web: '',
            email: '', 
            mobile: '',
            address: '',
            zip: '',
            default: false,
            logo: null,
            date: false
        };

        this.state = {
            form: this.initialState
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    toggleChange = () => {  
        let value = !this.state.form.default;
        this.setState({ form: { ...this.state.form, ['default']: value } });
    }

    componentDidUpdate() {
        //condition added to stop multiple rendering
        if (this.props.modalType == 'edit') {
            
            if (this.state.form.id != this.props.data.id) {
                this.setState({ form: this.props.data });
            }
        } else {
            if (this.state.form.id != null) {
                this.setState({ form: this.initialState });
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleSubmit(this.state.form);
        //this.setState({ form: this.initialState });
    } 

    handleLogoChange = (data, type = null) => { 
		let form = { ...this.state.form }
		form.logo = data;
		this.setState({ form })
	}

    render() {
        return (
            <>
                {this.props.show && ( 
                    <div className="pi-overlay pi-show">
                        <div className="pi-popup-content">
                            <div className="pi-modal-header">
                                <h2 className="pi-modal-title pi-text-center">{this.props.modalType == 'new' ? 'New' : 'Edit'} Business</h2>
                                <span className="pi-close" onClick={() => this.props.close()}>×</span>
                            </div>

                            <div className="pi-content">
                                <form onSubmit={this.handleSubmit} className="pi-form-content pi-form-style-two pi-form-style-three">
                                    <div className="row">
                                        <div className="col-lg">
                                            <label
                                                htmlFor="form-name">
                                                Company Name
                                            </label>

                                            <input
                                                id="form-name"
                                                type="text"
                                                required
                                                name="name"
                                                value={this.state.form.name}
                                                onChange={this.handleChange}
                                            />
                                        </div> 
                                        <div className="col-lg">
                                            <label
                                                htmlFor="form-web">
                                                Website
                                            </label>

                                            <input
                                                id="form-web"
                                                type="url"
                                                name="web"
                                                value={this.state.form.web}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="row"> 
                                        <div className="col-lg">
                                            <label
                                                htmlFor="form-email">
                                                Email
                                            </label>

                                            <input
                                                id="form-email"
                                                type="email"
                                                required
                                                name="email"
                                                value={this.state.form.email}
                                                onChange={this.handleChange}
                                            />
                                        </div>

                                        <div className="col-lg">
                                            <label
                                                htmlFor="form-mobile">
                                                Mobile Number
                                            </label>

                                            <input
                                                id="form-mobile"
                                                type="text"
                                                required
                                                name="mobile"
                                                value={this.state.form.mobile}
                                                onChange={this.handleChange}
                                            />
                                        </div> 
                                    </div> 

                                    <div className="row"> 
                                        <div className="col-lg">
                                            <label
                                                htmlFor="form-address">
                                                Address
                                            </label> 
                                            <input
                                                id="form-address"
                                                type="text"
                                                name="address"
                                                value={this.state.form.address}
                                                onChange={this.handleChange}
                                            />
                                        </div> 
                                        <div className="col-lg">
                                            <label
                                                htmlFor="form-zip">
                                                Zip Code
                                            </label> 
                                            <input
                                                id="form-zip"
                                                type="number"
                                                name="zip"
                                                value={this.state.form.zip}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="row"> 
                                        <div className="col">
                                            <Logo data={this.state.form.logo} changeHandler={this.handleLogoChange} />
                                        </div> 

                                        <div className="col">
                                            <div className="pi-form-checkbox">
                                                <input 
                                                    id="form-default"
                                                    type="checkbox"
                                                    defaultChecked={this.state.form.default}
                                                    onChange={this.toggleChange}
                                                />
                                                <label
                                                    htmlFor="form-default"
                                                    className="pi-m-10"
                                                >
                                                Default?    
                                                </label>  
                                            </div>
                                        </div> 
                                    </div> 

                                    <div className="pi-footer-content pi-text-center">
                                        <button className="pi-btn pi-bg-blue pi-bg-hover-blue">
                                        Submitd
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
