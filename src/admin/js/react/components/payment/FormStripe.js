import React, { Component } from 'react';

class FormStripe extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            type: 'stripe',
            account_name: '',
            public_key: '',
            secret_key: '',
            default: false,
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
            <div className="pi-overlay pi-show">
                <div className="pi-modal-content">
                    <div className="pi-modal-header">
                        <h2 className="pi-modal-title pi-text-center">{this.props.modalType == 'new' ? 'New' : 'Edit'} Stripe</h2>
                        <span className="pi-close" onClick={() => this.props.close()}>×</span>
                    </div>

                    <div className="pi-content">
                        <form onSubmit={this.handleSubmit} className="pi-form-style-one">
                            
                            <div className="row">
                                <div className="col-lg">
                                    <label
                                        htmlFor="form-account_name">
                                        Account Name
                                    </label>

                                    <input
                                        id="form-account_name"
                                        type="text"
                                        required
                                        name="account_name"
                                        value={this.state.form.account_name}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg">
                                    <label
                                        htmlFor="form-public_key">
                                        Public Key
                                    </label>

                                    <input
                                        id="form-public_key"
                                        type="text"
                                        required
                                        name="public_key"
                                        value={this.state.form.public_key}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg">
                                    <label
                                        htmlFor="form-secret_key">
                                        Secret Key
                                    </label>

                                    <input
                                        id="form-secret_key"
                                        type="text"
                                        required
                                        name="secret_key"
                                        value={this.state.form.secret_key}
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
        );
    }
}

export default FormStripe;
