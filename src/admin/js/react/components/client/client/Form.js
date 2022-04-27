import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null, 
            first_name: '',
            last_name: '',
            company_name: '',
            email: '',
            web: '',
            mobile: '', 
            address: '',
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

    componentDidMount() {
        //added this multiple place, because not working in invoice single
        this.editData();
    }

    componentDidUpdate() {
        this.editData();
    }

    editData = () => {
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
                                <h2 className="pi-modal-title pi-text-center">{this.props.modalType == 'new' ? 'New' : 'Edit'} Client</h2>
                                <span className="pi-close" onClick={() => this.props.close()}>×</span>
                            </div>

                            <div className="pi-content">
                                <form onSubmit={this.handleSubmit} className="pi-form-style-one">
                                    <div className="row"> 
                                        <div className="col-lg">
                                            <label
                                                htmlFor="first_name">
                                                First Name
                                            </label>

                                            <input
                                                id="first_name"
                                                type="text"
                                                name="first_name"
                                                value={this.state.form.first_name}
                                                onChange={this.handleChange}
                                            />
                                        </div> 
                                        <div className="col-lg">
                                            <label
                                                htmlFor="last_name">
                                                Last Name
                                            </label>

                                            <input
                                                id="last_name"
                                                type="text"
                                                name="last_name"
                                                value={this.state.form.last_name}
                                                onChange={this.handleChange}
                                            />
                                        </div> 
                                    </div>

                                    <div className="row">
                                        <div className="col-lg">
                                            <label
                                                htmlFor="form-company_name">
                                                Company Name
                                            </label>

                                            <input
                                                id="form-company_name"
                                                type="text" 
                                                name="company_name"
                                                value={this.state.form.company_name}
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
                                                type="text"
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
                                        <div className="col">
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
                                    </div> 

                                    <div className="row">
                                        <div className="col"> 
                                            <button className="pi-btn pi-bg-blue pi-bg-hover-blue pi-m-auto">
                                                Save
                                            </button> 
                                        </div> 
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
