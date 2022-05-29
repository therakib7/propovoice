import React, { Component } from 'react';

import Upload from 'block/field/upload';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            name: '',
            org_name: '',
            web: '',
            email: '',
            mobile: '',
            address: '',
            zip: '',
            default: true,
            logo: null,
            date: false
        };

        this.state = {
            form: this.initialState
        };
    }

    handleChange = e => { 
        const target = e.target;
		const name = target.name;
		const value = target.type === 'checkbox' ? target.checked : target.value; 
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
                if (!wage.length) {
                    this.setState({ form: this.props.data });
                } else {
                    let data = this.props.data;
                    data.default = true;
                    this.setState({ form: data });
                }
            }
        } else {
            if (this.state.form.id != null) {
                if (!wage.length) {
                    this.setState({ form: this.initialState });
                } else {
                    let data = this.initialState;
                    data.default = true;
                    this.setState({ form: data });
                }
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
                        <div className="pi-modal-content">
                            <div className="pi-modal-header">
                                <h2 className="pi-modal-title pi-text-center">{this.props.modalType == 'new' ? 'New' : 'Edit'} Business</h2>
                                <span className="pi-close" onClick={() => this.props.close()}>×</span>
                            </div>

                            <div className="pi-content">
                                <form onSubmit={this.handleSubmit} className="pi-form-style-one">
                                    <div className="row">
                                        <div className="col-md">
                                            <label
                                                htmlFor="field-name">
                                                Name
                                            </label>

                                            <input
                                                id="field-name"
                                                type="text" 
                                                name="name"
                                                value={this.state.form.name}
                                                onChange={this.handleChange}
                                            />
                                        </div>

                                        <div className="col-md">
                                            <label
                                                htmlFor="field-org_name">
                                                Company Name
                                            </label>

                                            <input
                                                id="field-org_name"
                                                type="text" 
                                                name="org_name"
                                                value={this.state.form.org_name}
                                                onChange={this.handleChange}
                                            />
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-md">
                                            <label
                                                htmlFor="field-web">
                                                Website
                                            </label>

                                            <input
                                                id="field-web"
                                                type="text"
                                                name="web"
                                                value={this.state.form.web}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="col-md">
                                            <label
                                                htmlFor="field-email">
                                                Email
                                            </label>

                                            <input
                                                id="field-email"
                                                type="email"
                                                required
                                                name="email"
                                                value={this.state.form.email}
                                                onChange={this.handleChange}
                                            />
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-md">
                                            <label
                                                htmlFor="field-mobile">
                                                Mobile Number
                                            </label>

                                            <input
                                                id="field-mobile"
                                                type="text"
                                                required
                                                name="mobile"
                                                value={this.state.form.mobile}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="col-md">
                                            <label
                                                htmlFor="field-zip">
                                                Zip Code
                                            </label>

                                            <input
                                                id="field-zip"
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
                                                htmlFor="field-address">
                                                Address
                                            </label>

                                            <input
                                                id="field-address"
                                                type="text"
                                                name="address"
                                                placeholder='Write you full address here'
                                                value={this.state.form.address}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <Upload data={this.state.form.logo} changeHandler={this.handleLogoChange} />
                                        </div>

                                        <div className="col">
                                            {!wage.length && <> 
                                                <label
                                                    htmlFor="form-default"
                                                    className="pi-m-10"
                                                >
                                                    Default?
                                                </label>

                                                <br />

                                                <label className='pi-switch'>
                                                    <input type='checkbox'
                                                        id="form-default"
                                                        name='default'  
                                                        checked={this.state.form.default ? 'checked' : ''}
                                                        onChange={this.handleChange}
                                                    /> 
                                                    <span className='pi-switch-slider round'></span>
                                                </label>
                                            </>}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <button className="pi-btn pi-bg-blue pi-bg-hover-blue pi-m-auto">
                                                Submit
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
