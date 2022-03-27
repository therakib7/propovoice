import React, { Component } from 'react';

class FormPaypal extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            type: 'paypal',
            client_id: '',
            secret_id: '',
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
                                <h2 className="pi-modal-title pi-text-center">{this.props.modalType == 'new' ? 'New' : 'Edit'} Paypal</h2>
                                <span className="pi-close" onClick={() => this.props.close()}>×</span>
                            </div>

                            <div className="pi-content">
                                <form onSubmit={this.handleSubmit} className="pi-form-content pi-form-style-two pi-form-style-three">

                                    <div className="row">
                                        <div className="col-lg">
                                            <label
                                                htmlFor="form-client_id">
                                                Client ID
                                            </label>

                                            <input
                                                id="form-client_id"
                                                type="text"
                                                required
                                                name="client_id"
                                                value={this.state.form.client_id}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg">
                                            <label
                                                htmlFor="form-secret_id">
                                                Secret ID
                                            </label>

                                            <input
                                                id="form-secret_id"
                                                type="text"
                                                required
                                                name="secret_id"
                                                value={this.state.form.secret_id}
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

export default FormPaypal;
