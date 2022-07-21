import React, { Component } from 'react';
import ColorPicker from 'block/color-picker';
import { toast } from 'react-toastify';
import Upload from 'block/field/upload';
import WithApi from 'hoc/Api';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            label: '',
            extra_type: '',
            rate_type: 'fixed'
        };

        this.state = {
            form: this.initialState
        };
    }

    handleChange = e => {
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

    handleSubmit = () => {

        let newForm = { ...this.state.form }
        newForm.taxonomy = this.props.taxonomy;

        if (this.props.modalType == 'new') {
            this.props.create('taxonomies', newForm).then(resp => {
                if (resp.data.success) {
                    toast.success('Successfully added'); //TODO: translation
                    this.props.reload();
                } else {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                }
            });
        } else {
            this.props.update('taxonomies', newForm.id, newForm).then(resp => {
                if (resp.data.success) {
                    toast.success('Successfully updated'); //TODO: translation
                    this.props.reload();
                } else {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                }
            });
        }
        // setModal(false);
        this.props.close()
    }

    render() {
        const form = this.state.form;
        return (
            <div className="pi-overlay pi-show">
                <div className="pi-modal-content pi-modal-style-two pi-modal-small">

                    <div className="pi-modal-header">
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
                        <h2 className="pi-modal-title">{this.props.modalType == 'new' ? 'New' : 'Edit'} {this.props.title}</h2>
                    </div>

                    <div className="pi-content">
                        <div className="pi-form-style-one">
                            <div className="row">
                                <div className="col-md">
                                    <label htmlFor="field-label">Name</label> 
                                    <input
                                        id="field-label"
                                        type="text"
                                        name="label"
                                        value={form.label}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md">
                                    <label htmlFor="field-label">Type</label> 
                                    <select name="extra_type" value={form.extra_type} onChange={(e) => this.handleChange(e)}>
                                        <option value="tax">Tax</option>
                                        <option value="discount">Discount</option> 
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md">
                                    <label htmlFor="field-label">Rate Type</label> 
                                    <select name="rate_type" value={form.rate_type} onChange={(e) => this.handleChange(e)}>
                                        <option value="fixed">Fixed</option>
                                        <option value="percent">Percent</option> 
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="pi-modal-footer pi-mt-10">
                        <div className="row">
                            <div className="col">
                                <button type='reset' className="pi-btn pi-text-hover-blue">Clear</button>
                            </div>
                            <div className="col">
                                <button onClick={this.handleSubmit} className="pi-btn pi-bg-blue pi-bg-hover-blue pi-btn-medium pi-float-right pi-color-white">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default WithApi(Form); 