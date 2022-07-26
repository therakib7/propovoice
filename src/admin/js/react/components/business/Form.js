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
        let form = { ...this.state.form } 
        if ( form.logo ) {
            form.logo = form.logo.id;
        }  
        this.props.handleSubmit(form);
        //this.setState({ form: this.initialState });
    }

    handleLogoChange = (data, type = null) => {
        let form = { ...this.state.form }
        form.logo = data;
        this.setState({ form })
    }

    render() {
        const form = this.state.form;

        let title = '';
        if (this.props.modalType == 'new') {
            title = 'New'
        } else if (this.props.modalType == 'edit') {
            title = 'Edit'
        }

        return (
            <div className="pi-overlay pi-show">
                <div className="pi-modal-content">

                    <div className="pi-modal-header pi-gradient">
                        <span className="pi-close" onClick={() => this.props.close()}>
                            <svg
                                width={25}
                                height={25}
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12.5 3.5L3.5 12.5"
                                    stroke="#718096"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12.5 12.5L3.5 3.5"
                                    stroke="#718096"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                        <h2 className="pi-modal-title">{title} Business</h2>
                        <p>Add new business from here</p>
                    </div>

                    <form onSubmit={this.handleSubmit} >
                        <div className="pi-content">
                            <div className="pi-form-style-one">
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
                                            value={form.name}
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                    {/* <div className="col-md">
                                            <label
                                                htmlFor="field-org_name">
                                                Company Name
                                            </label>

                                            <input
                                                id="field-org_name"
                                                type="text" 
                                                name="org_name"
                                                value={form.org_name}
                                                onChange={this.handleChange}
                                            />
                                        </div> */}

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
                                            value={form.web}
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
                                            value={form.email}
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
                                            value={form.mobile}
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
                                            value={form.zip}
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
                                            value={form.address}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label
                                            htmlFor="field-logo">
                                            Logo
                                        </label>
                                        <Upload data={form.logo} changeHandler={this.handleLogoChange} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pi-modal-footer">
                            <div className="row">
                                <div className="col">
                                    <button type='reset' className="pi-btn pi-text-hover-blue">Clear</button>
                                </div>
                                <div className="col">
                                    <button type='submit' className="pi-btn pi-bg-blue pi-bg-hover-blue pi-btn-big pi-float-right pi-color-white">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Form;
