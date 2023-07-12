import React, { Component } from 'react';
import { toast } from 'react-toastify';
import api from 'api';
import { Add } from 'block/icon';
import Options from "./Options";

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            label: '',
            desc: '',
            type: 'text',
            options: [],
            value: '',
            mod: 'lead'
        };

        this.state = {
            form: this.initialState
        };
    }

    handleChange = e => {
        const target = e.target;
        const { name } = target;
        const value = target.type == 'checkbox' ? target.checked : target.value;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    componentDidMount() {
        //added this multi place, because not working in invoice single
        this.editData();
    }

    componentDidUpdate() {
        this.editData();
    }

    editData = () => {
        //condition added to stop multi rendering
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

        if (ndpv.isDemo) { toast.error(ndpv.demoMsg); return; }
        let newForm = { ...this.state.form }
        newForm.mod = this.props.mod;

        if (this.props.modalType == 'new') {
            api.add('custom-fields', newForm).then(resp => {
                if (resp.data.success) {
                    toast.success(ndpv.i18n.aAdd);
                    newForm.id = resp.data.data;
                    this.props.reload(newForm);
                } else {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                }
            });
        } else {
            api.edit('custom-fields', newForm.id, newForm).then(resp => {
                if (resp.data.success) {
                    toast.success(ndpv.i18n.aUpd);
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

    handleOptionsChange = (data) => {
        let form = { ...this.state.form };
        form.options = data;
        this.setState({ form });
    };

    handleOptionsValueChange = (data) => {
        let form = { ...this.state.form };
        form.value = data;
        this.setState({ form });
    };

    render() {
        const { label, desc, type, options, value } = this.state.form;

        const i18n = ndpv.i18n;

        let typeLabel = '';

        switch (type) {
            case 'select':
                typeLabel = i18n.select
                break;
            case 'multi-select':
                typeLabel = i18n.multiselect
                break;
            case 'radio':
                typeLabel = i18n.radio
                break;

            default:
                break;
        }

        return (
            <div className="pv-overlay pv-show">
                <div className="pv-modal-content pv-modal-style-two pv-modal-small">

                    <div className="pv-modal-header">
                        <span className="pv-close" onClick={() => this.props.close()}>
                            <Add />
                        </span>
                        <h2 className="pv-modal-title">{this.props.modalType == 'new' ? i18n.new : i18n.edit} {this.props.title}</h2>
                    </div>

                    <div className="pv-content">
                        <div className="pv-form-style-one">
                            <div className="row">
                                <div className="col-md">
                                    <label htmlFor="field-label">{i18n.label}</label>
                                    <input
                                        id="field-label"
                                        type="text"
                                        name="label"
                                        value={label}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="col-md">
                                    <label htmlFor="field-label">{i18n.desc}</label>
                                    <input
                                        id="field-desc"
                                        type="text"
                                        name="desc"
                                        value={desc}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="col-md">
                                    <label htmlFor="field-label">{i18n.type}</label>
                                    <select name="type" value={type} onChange={this.handleChange}>
                                        <option value="text">{i18n.text}</option>
                                        <option value="email">{i18n.email}</option>
                                        <option value="number">{i18n.number}</option>
                                        <option value="select">{i18n.select}</option>
                                        <option value="multi-select">{i18n.multiselect}</option>
                                        <option value="date">{i18n.date}</option>
                                    </select>
                                </div>

                                {(type == 'select' || type == 'multi-select' || type == 'radio') &&
                                    <>
                                        <Options
                                            data={options}
                                            type={type}
                                            typeLabel={typeLabel}
                                            label={label}
                                            value={value}
                                            changeHandler={this.handleOptionsChange}
                                            changeValueHandler={this.handleOptionsValueChange}
                                        />
                                    </>
                                }

                            </div>
                        </div>
                    </div>

                    <div className="pv-modal-footer pv-mt-10">
                        <div className="row">
                            <div className="col">
                                <button type='reset' className="pv-btn pv-text-hover-blue" onClick={() => this.props.close()}>{i18n.cancel}</button>
                            </div>
                            <div className="col">
                                <button onClick={this.handleSubmit} className="pv-btn pv-bg-blue pv-bg-hover-blue pv-btn-medium pv-float-right pv-color-white">
                                    {i18n.save}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
