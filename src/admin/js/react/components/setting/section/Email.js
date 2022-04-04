import React, { Component } from 'react';

import Logo from './Logo';

export default class General extends Component {
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
            <form onSubmit={this.handleSubmit} style={{maxWidth: '500px'}} className="pi-form-content pi-form-style-two pi-form-style-three">
                <div className="row">
                    <div className="col">
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
                </div>

                <div className="row">
                    <div className="col">
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

                <div className="row" style={{marginTop: '10px'}}>
                    <div className="col">
                        <button className="pi-btn pi-bg-blue pi-bg-hover-blue">
                            Save
                        </button> 
                    </div>
                </div> 
            </form>
        );
    }
} 