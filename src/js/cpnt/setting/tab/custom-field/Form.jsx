import React, { Component } from 'react';
import { toast } from 'react-toastify';
import api from 'api';
import { Add } from 'block/icon';
import Options from "./Options";
import { TextInput } from 'block/form/input';
import { FormWrapper, FormContent } from 'block/form';

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
                    this.props.close()
                    this.props.reload(newForm);
                } else {
                    resp.data.data.forEach(function (value) {
                        toast.error(value);
                    });
                }
            });
        } else {
            api.edit('custom-fields', newForm.id, newForm).then(resp => {
                if (resp.data.success) {
                    toast.success(ndpv.i18n.aUpd);
                    this.props.close()
                    this.props.reload();
                } else {
                    resp.data.data.forEach(function (value) {
                        toast.error(value);
                    });
                }
            });
        }
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

                    <FormWrapper  submitHandler={this.handleSubmit} close={this.props.close}>
                        <FormContent formStyleClass="pv-form-style-one">
                            <div className="row">
                                <TextInput
                                    label={i18n.label}
                                    id="field-label"
                                    type="text"
                                    name="label"
                                    value={label}
                                    wrapperClassName='col-md'
                                    onChange={this.handleChange}
                                    validation={{ required: { value: true } }}
                                />

                                <div className="col-md">
                                    <label htmlFor="field-desc">{i18n.desc}</label>
                                    <input
                                        id="field-desc"
                                        type="text"
                                        name="desc"
                                        value={desc}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="col-md">
                                    <label htmlFor="field-type">{i18n.type}</label>
                                    <select name="type" id="field-type" value={type} onChange={this.handleChange} disabled={this.props.modalType == 'edit'}>
                                        <option value="text">{i18n.text}</option>
                                        <option value="email">{i18n.email}</option>
                                        <option value="number">{i18n.number}</option>
                                        <option value="select">{i18n.select}</option>
                                        <option value="multi-select">{i18n.multiselect}</option>
                                        <option value="date">{i18n.date}</option>
                                    </select>
                                </div>

                                {(type == 'select' || type == 'multi-select' || type == 'radio') &&
                                    <Options
                                        data={options}
                                        type={type}
                                        typeLabel={typeLabel}
                                        label={label}
                                        value={value}
                                        changeHandler={this.handleOptionsChange}
                                        changeValueHandler={this.handleOptionsValueChange}
                                    />
                                }
                            </div>
                        </FormContent>
                    </FormWrapper>
                </div>
            </div >
        );
    }
}
