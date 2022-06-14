import React, { Component } from 'react';

import WithApi from 'hoc/Api';

import Select from 'react-select';
import Contact from 'block/field/contact';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            label: '',
            color: '',
            bg_color: '',
        };

        this.state = {
            form: this.initialState,
        };
    }

    handleChange = (e) => {
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
        let form = { ...this.state.form }
        this.props.handleSubmit(form);

        this.setState({ form: this.initialState });
    } 

    render() { 

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
                        <h2 className="pi-modal-title">{this.props.modalType == 'new' ? 'New' : 'Edit'} Tag</h2>
                        <p>Add new tag from here</p>
                    </div>
                    <form onSubmit={this.handleSubmit} >
                        <div className="pi-content">
                            <div className="pi-form-style-one">


                                <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="field-label">
                                            Name
                                        </label>

                                        <input
                                            id="field-label"
                                            type="text"
                                            name="label"
                                            value={this.state.form.label}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="field-color">
                                            Color
                                        </label>

                                        <input
                                            id="field-color"
                                            type="text"
                                            name="color"
                                            value={this.state.form.color}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="field-bg_color">
                                            background Color
                                        </label>

                                        <input
                                            id="field-bg_color"
                                            type="text"
                                            name="bg_color"
                                            value={this.state.form.bg_color}
                                            onChange={this.handleChange}
                                        />
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

export default WithApi(Form);  