import React, { Component } from 'react';

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
        // this.setState({ form: this.initialState });
    } 

    render() {
        return (
            <>
                {this.props.show && ( 
                    <div className="pi-overlay pi-show">
                        <div className="pi-popup-content">
                            <div className="pi-modal-header">
                                <h2 className="pi-modal-title">{this.props.modalType == 'new' ? 'New' : 'Edit'} Business</h2>
                                <span className="pi-close" onClick={() => this.props.close()}>
                                ×
                                </span>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="pi-content">
                                    <div className='pi-business-form'> 
                                        <div className="row">
                                            <div className="col-md">
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
                                            <div className="col-md">
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
                                            <div className="col-md">
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

                                            <div className="col-md">
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
                                            <div className="col-md">
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
                                            <div className="col-md">
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
                                                <label
                                                    htmlFor="form-default">
                                                    Default?   
                                                    <input 
                                                        id="form-default"
                                                        className="ml-3"
                                                        type="checkbox"
                                                        defaultChecked={this.state.form.default}
                                                        onChange={this.toggleChange}
                                                    />
                                                </label> 
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                                <div className="pi-footer-content">  
                                    <button
                                        className="pi-btn pi-bg-black pi-bg-hover-blue pi-float-right"
                                        type="submit">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>  
                )}
            </>
        );
    }
}

export default Form;
