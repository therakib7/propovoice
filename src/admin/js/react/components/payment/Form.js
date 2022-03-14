import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            type: 'bank',
            country: '', 
            bank_name: '',
            bank_branch: '',
            routing_no: '', 
            account_no: '',
            confirm_account_no: '', 
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
                                <h2 className="pi-modal-title pi-text-center">{this.props.modalType == 'new' ? 'New' : 'Edit'} Bank</h2>
                                <span className="pi-close" onClick={() => this.props.close()}>×</span>
                            </div>

                            <div className="pi-content">
                                <form onSubmit={this.handleSubmit} className="pi-form-content pi-form-style-two"> 

                                    <div className="row">
                                        <div className="col-lg">
                                            <label
                                                htmlFor="form-country">
                                                Country
                                            </label>

                                            <input
                                                id="form-country"
                                                type="text"
                                                required
                                                name="country"
                                                value={this.state.form.country}
                                                onChange={this.handleChange}
                                            />
                                        </div> 

                                        <div className="col-lg">
                                            <label
                                                htmlFor="form-bank_name">
                                                Bank Name
                                            </label>

                                            <input
                                                id="form-bank_name"
                                                type="text"
                                                required
                                                name="bank_name"
                                                value={this.state.form.bank_name}
                                                onChange={this.handleChange}
                                            />
                                        </div> 
                                    </div> 

                                    <div className="row">  
                                        <div className="col-lg">
                                            <label
                                                htmlFor="form-bank_branch">
                                                Bank Branch
                                            </label>

                                            <input
                                                id="form-bank_branch"
                                                type="text"
                                                required
                                                name="bank_branch"
                                                value={this.state.form.bank_branch}
                                                onChange={this.handleChange}
                                            />
                                        </div> 

                                        <div className="col-lg">
                                            <label
                                                htmlFor="form-routing_no">
                                                Routing No
                                            </label>

                                            <input
                                                id="form-routing_no"
                                                type="text"
                                                required
                                                name="routing_no"
                                                value={this.state.form.routing_no}
                                                onChange={this.handleChange}
                                            />
                                        </div> 
                                    </div> 

                                    <div className="row">
                                        <div className="col-lg">
                                            <label
                                                htmlFor="form-account_no">
                                                Account No
                                            </label>

                                            <input
                                                id="form-account_no"
                                                type="text"
                                                required
                                                name="account_no"
                                                value={this.state.form.account_no}
                                                onChange={this.handleChange}
                                            />
                                        </div> 

                                        <div className="col-lg">
                                            <label
                                                htmlFor="form-confirm_account_no">
                                                Confirm Account No
                                            </label>

                                            <input
                                                id="form-confirm_account_no"
                                                type="text"
                                                required
                                                name="confirm_account_no"
                                                value={this.state.form.confirm_account_no}
                                                onChange={this.handleChange}
                                            />
                                        </div>  
                                    </div> 

                                    <div className="pi-footer-content pi-text-center">
                                        <button className="pi-btn pi-bg-blue pi-bg-hover-blue">
                                            Save
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
