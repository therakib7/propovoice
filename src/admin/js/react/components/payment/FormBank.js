import React, { Component } from 'react';

class FormBank extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            type: 'bank', 
            bank_name: '', 
            bank_details: '',
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
                                <form onSubmit={this.handleSubmit} className="pi-form-style-one">

                                    <div className="row"> 
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
                                        <div className="col"> 
                                            <label htmlFor="form-bank_details">
                                                Bank Details
                                            </label>
                                            <textarea
                                                id="form-bank_details" 
                                                rows={4}
                                                name="bank_details"
                                                value={this.state.form.bank_details}
                                                onChange={this.handleChange}
                                            />  
                                            <p className='pi-field-desc'>You need to mention bank details here, Like: Name, Routing No. etc</p> 
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

export default FormBank;
