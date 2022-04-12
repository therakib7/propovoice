import React, { Component } from 'react';

class Info extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            name: '', 
            web: '',
            email: '', 
            mobile: '',
            address: '',
            logo: null,
            zip: '',
            default: true,
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

    componentDidMount() {
        //condition added to stop multiple rendering
        if (this.state.form.id != this.props.data.id) {
            this.setState({ form: this.props.data });
        } 
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleSubmit(this.state.form); 
    } 

    render() {
        return (   
            <form onSubmit={this.handleSubmit}>   

                <div className="pi-form-style-one">
                    <div className="row">
                        <div className="col-md">
                            <label 
                                htmlFor="field-name">
                                Company Name
                            </label>

                            <input 
                                id="field-name"
                                type="text"
                                required
                                name="name"
                                value={this.state.form.name}
                                onChange={this.handleChange}
                            />
                        </div>
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
                    </div>

                    <div className="row">
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
                    </div>

                    <div className="row"> 
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
                        <div className="col-md"> 
                        </div>
                    </div>

                    <div className="row pi-mb-30">
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
                </div> 

                <div className="pi-buttons pi-text-center">
                    <button type="submit" className="pi-btn pi-bg-blue pi-bg-hover-blue">Save & Continue</button> 
                    <a className="pi-text-hover-blue" onClick={() => this.props.handleSkip('info')}>Skip</a>
                </div>
            </form>
        );
    }
}

export default Info;
