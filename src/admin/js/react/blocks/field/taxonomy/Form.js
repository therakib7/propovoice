import React, { Component } from 'react';
import ColorPicker from 'block/color-picker';
import { toast } from 'react-toastify';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            label: '',
            color: '',
            bg_color: '',
            icon: null,
        };

        this.state = {
            form: this.initialState
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    handleColorChange = (val, key) => {
        this.setState({ form: { ...this.state.form, [key]: val } });
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
            });;
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
            });;
        }
        // setModal(false);
        this.props.close()
    }

    handleLogoChange = (data, type = null) => {
        let form = { ...this.state.form }
        form.icon = data;
        this.setState({ form })
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
                                    <label htmlFor="field-label">
                                        Name
                                    </label>

                                    <input
                                        id="field-label"
                                        type="text"
                                        name="label"
                                        value={form.label}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </div>
                            </div>

                            {this.props.color && <>
                                <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="field-color">
                                            Text Color
                                        </label>
                                        <ColorPicker color={form.color} onChange={(val) => this.handleColorChange(val, 'color')} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="field-bg_color">
                                            Background Color
                                        </label>
                                        <ColorPicker color={form.bg_color} onChange={(val) => this.handleColorChange(val, 'bg_color')} />
                                    </div>
                                </div>
                            </>}

                            {this.props.icon &&
                            <div className="row">
                                <div className="col-md">
                                    <label htmlFor="field-color">
                                        Text Color
                                    </label>
                                    {/* <ColorPicker color={form.color} onChange={(val) => this.handleColorChange(val, 'color')} /> */}
                                    <Upload data={form.icon} changeHandler={this.handleLogoChange} />
                                </div>
                            </div>}
                        </div>
                    </div>

                    <div className="pi-modal-footer pi-mt-10">
                        <div className="row">
                            <div className="col">
                                {/* <button type='reset' className="pi-btn pi-text-hover-blue">Clear</button> */}
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

export default Form;   