import React, { Component } from 'react';

import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Select from 'react-select';
import ApiTaxonomy from 'api/taxonomy';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            tab_id: this.props.tab_id,
            text: '', 
        };

        this.state = {
            form: this.initialState 
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

            /* if ( JSON.stringify(this.state.form) != JSON.stringify(this.props.data) ) {
                this.setState({ form: this.props.data }); 
            } */
        } else {
            if (this.state.form.id != null) {
                this.setState({ form: this.initialState });
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let form = {...this.state.form} 
        this.props.handleSubmit(form);
        this.setState({ form: this.initialState });
    }

    render() {
        const form = this.state.form; 

        return (
            <>
                {this.props.show && (
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
                                <h2 className="pi-modal-title">{this.props.modalType == 'new' ? 'New' : 'Edit'} Note</h2> 
                                <p>Edit note from here</p>
                            </div>

                            <div className="pi-content">
                                <form onSubmit={this.handleSubmit} className="pi-form-style-one"> 

                                    <div className="row"> 
                                        <div className="col">
                                            <label htmlFor="form-text">
                                                Note
                                            </label>

                                            <textarea
                                                id="form-text"
                                                required
                                                name="text"
                                                value={form.text}
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
                )}
            </>
        );
    }
}

export default Form;
