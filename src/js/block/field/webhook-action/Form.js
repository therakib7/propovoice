import React, { Component } from 'react';
import ColorPicker from 'block/color-picker';
import { toast } from 'react-toastify';
import Upload from 'block/field/upload';
import api from 'api';
import { Add } from 'block/icon';

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: '',
            method: '',
            custom: '',
            name: '',
            url: '' 
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

        let newForm = { ...this.state.form } 

        /* if (this.props.modalType == 'new') {
            if (this.props.extra_amount_type) {
                newForm.extra_amount_type = this.props.extra_amount_type;
            }
            api.add('taxonomies', newForm).then(resp => {
                if (resp.data.success) {
                    toast.success(ndpv.i18n.aAdd);
                    this.props.reload();
                } else {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                }
            });
        } else {
            api.edit('taxonomies', newForm.id, newForm).then(resp => {
                if (resp.data.success) {
                    toast.success(ndpv.i18n.aUpd);
                    this.props.reload();
                } else {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                }
            });
        } */
        // setModal(false);
        this.props.close()
    } 

    render() {
        const form = this.state.form;
        const i18n = ndpv.i18n;
        const eat = this.props.extra_amount_type;
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
                                    <label htmlFor="field-id">
                                        {i18n.action}
                                    </label>

                                    <input
                                        id="field-id"
                                        type="text"
                                        name="id"
                                        value={form.id}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md">
                                    <label htmlFor="field-method">
                                        {i18n.method}
                                    </label>

                                    <input
                                        id="field-method"
                                        type="text"
                                        name="method"
                                        value={form.method}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label id="form-show">{i18n.cus}</label>
                                    <div className="pv-field-switch pv-mt-3 pv-ml-10">
                                        <label className='pv-switch'>
                                            <input type='checkbox'
                                                id="form-show"
                                                name='custom'
                                                checked={form.custom ? 'checked' : ''}
                                                onChange={this.handleChange}
                                            />
                                            <span className='pv-switch-slider pv-round'></span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md">
                                    <label htmlFor="field-name">
                                        {i18n.name}
                                    </label>

                                    <input
                                        id="field-name"
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md">
                                    <label htmlFor="field-url">
                                        {i18n.url}
                                    </label>

                                    <input
                                        id="field-url"
                                        type="url"
                                        name="name"
                                        value={form.name}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </div>
                            </div>
 
                        </div>
                    </div>

                    <div className="pv-modal-footer pv-mt-10">
                        <div className="row">
                            <div className="col">
                                <button type='reset' className="pv-btn pv-text-hover-blue">{i18n.clear}</button>
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