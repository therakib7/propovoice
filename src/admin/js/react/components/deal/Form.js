import React, { Component } from 'react';

import Select from 'react-select';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            title: '',
            stage_id: '',
            lead_id: '',
            budget: '',
            provability : '', 
            tags: [],
            note: '', 
            date: false
        };

        this.state = {
            form: this.initialState,
            stages: [
                {
                    id: 1,
                    label: 'Opportunity'
                },
                {
                    id: 2,
                    label: 'Progress'
                },
                {
                    id: 3,
                    label: 'Done'
                }
            ],
            tags: [
                {
                    id: 1,
                    label: 'Tag One'
                },
                {
                    id: 2,
                    label: 'Tag Two'
                },
                {
                    id: 3,
                    label: 'Tag Three'
                }
            ],
        };
    }

    handleChange = e => { 
        const target = e.target;
		const name = target.name;
		const value = target.type === 'checkbox' ? target.checked : target.value; 
        this.setState({ form: { ...this.state.form, [name]: value } });
    } 

    handleStageChange = val => {
        this.setState({ form: { ...this.state.form, ['stage_id']: val } });
    }

    handleTagChange = val => { 
        this.setState({ form: { ...this.state.form, ['tags']: val } });
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
                    // data.default = true;
                    this.setState({ form: data });
                }
            }
        } else {
            if (this.state.form.id != null) {
                if (!wage.length) {
                    this.setState({ form: this.initialState });
                } else {
                    let data = this.initialState;
                    // data.default = true;
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

    render() {
        const stageList = this.state.stages; 
        const tagList = this.state.tags; 
        return (
            <>
                {this.props.show && (
                    <div className="pi-overlay pi-show">
                        <div className="pi-popup-content">
                            <div className="pi-modal-header">
                                <h2 className="pi-modal-title pi-text-center">{this.props.modalType == 'new' ? 'New' : 'Edit'} Deal</h2>
                                <span className="pi-close" onClick={() => this.props.close()}>×</span>
                            </div>

                            <div className="pi-content">
                                <form onSubmit={this.handleSubmit} className="pi-form-style-one">
                                    <div className="row">
                                        <div className="col-md">
                                            <label htmlFor="field-title">
                                                Title
                                            </label>

                                            <input
                                                id="field-title"
                                                type="text" 
                                                name="title"
                                                value={this.state.form.title}
                                                onChange={this.handleChange}
                                            />
                                        </div>  
                                    </div>

                                    <div className="row">
                                        <div className="col-md">
                                            <label
                                                htmlFor="field-stage_id">
                                                Stage
                                            </label>

                                            <Select
                                                value={this.state.form.stage_id}
                                                onChange={this.handleStageChange}
                                                getOptionValue={(stageList) => stageList.id}
                                                getOptionLabel={(stageList) => stageList.label}
                                                options={stageList}
                                            /> 
                                        </div>

                                        <div className="col-md">
                                            <label
                                                htmlFor="field-lead_id">
                                                Contact
                                            </label>

                                            <input
                                                id="field-lead_id"
                                                type="text" 
                                                name="lead_id"
                                                value={this.state.form.lead_id}
                                                onChange={this.handleChange}
                                            />
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-md">
                                            <label
                                                htmlFor="field-budget">
                                                Budget
                                            </label>

                                            <input
                                                id="field-budget"
                                                type="text"
                                                name="budget"
                                                value={this.state.form.budget}
                                                onChange={this.handleChange}
                                            />
                                        </div>

                                        <div className="col-md">
                                            <label
                                                htmlFor="field-provability">
                                                Provability
                                            </label>

                                            <input
                                                id="field-provability"
                                                type="text"
                                                required
                                                name="provability"
                                                value={this.state.form.provability}
                                                onChange={this.handleChange}
                                            />
                                        </div> 
                                    </div> 

                                    <div className="row">
                                        <div className="col-md">
                                            <label htmlFor="field-tags">
                                                Tags
                                            </label>  
                                            <Select 
                                                value={this.state.form.tags}
                                                onChange={this.handleTagChange}
                                                getOptionValue={(tagList) => tagList.id}
                                                getOptionLabel={(tagList) => tagList.label}
                                                options={tagList}
                                                isMulti
                                            /> 
                                        </div>  
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="field-note">
                                                Note
                                            </label> 

                                            <textarea
                                                id="form-note" 
                                                rows={2}
                                                name="note"
                                                value={this.state.form.note}
                                                onChange={this.handleChange}
                                            />  
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
