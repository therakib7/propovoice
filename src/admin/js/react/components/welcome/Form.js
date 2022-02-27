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
                <div className="piBusinessForm">
                    <div className="">
                        <label 
                            htmlFor="grid-name">
                            Company Name
                        </label>

                        <input 
                            id="grid-name"
                            type="text"
                            required
                            name="name"
                            value={this.state.form.name}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="">
                        <label 
                            htmlFor="grid-web">
                            Website
                        </label>

                        <input 
                            id="grid-web"
                            type="url"
                            name="web"
                            value={this.state.form.web}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="">
                        <label 
                            htmlFor="grid-email">
                            Email
                        </label>

                        <input 
                            id="grid-email"
                            type="email"
                            required
                            name="email"
                            value={this.state.form.email}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="">
                        <label 
                            htmlFor="grid-mobile">
                            Mobile Number
                        </label>

                        <input 
                            id="grid-mobile"
                            type="text"
                            required
                            name="mobile"
                            value={this.state.form.mobile}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="">
                        <label 
                            htmlFor="grid-address">
                            Address
                        </label>

                        <input 
                            id="grid-address"
                            type="text"
                            name="address"
                            value={this.state.form.address}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="">
                        <label 
                            htmlFor="grid-zip">
                            Zip Code
                        </label>

                        <input 
                            id="grid-zip"
                            type="number"
                            name="zip"
                            value={this.state.form.zip}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="">
                        <label 
                            htmlFor="grid-address">
                            Address
                        </label>

                        <input 
                            id="grid-address"
                            type="number"
                            name="zip" 
                        />
                    </div>

                </div> 

                <div className="piButtons piTextCenter">
                    <button type="submit" className="piBgBlue piBgHoverBlue">Save & Continue</button>
                    <button className="piTextHoverBlue" onClick={() => this.props.handleSkip('info')}>Skip</button>
                </div>
            </form>  
        );
    }
}

export default Form;
