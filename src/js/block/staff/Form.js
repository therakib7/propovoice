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
            tab_id: null,
            user_id: '',
        };

        this.state = {
            list: [],
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

        api.get('staffs', 'tab_id=' + this.props.tab_id, 'pro').then(resp => {
            if (resp.data.success) {
                this.setState({ list: resp.data.data.result });
            }
        });
    }

    componentDidUpdate() {
        this.editData();
    }

    editData = () => {
        if (!this.state.form.tab_id) {
            let initData = {
                tab_id: this.props.tab_id,
                user_id: ''
            }
            this.setState({ form: initData });
        }
    }

    handleSubmit = () => {

        let newForm = { ...this.state.form }

        api.add('staffs', newForm, 'pro').then(resp => {
            if (resp.data.success) {
                toast.success(ndpv.i18n.aAdd);
                this.props.reload();
            } else {
                resp.data.data.forEach(function (value, index, array) {
                    toast.error(value);
                });
            }
        });
        this.props.close()
    }

    render() {
        const form = this.state.form;
        const i18n = ndpv.i18n;
        const list = this.state.list;
        return (
            <div className="pv-overlay pv-show">
                <div className="pv-modal-content pv-modal-style-two pv-modal-small">

                    <div className="pv-modal-header">
                        <span className="pv-close" onClick={() => this.props.close()}>
                            <Add />
                        </span>
                        <h2 className="pv-modal-title">{i18n.new + ' ' + i18n.staff}</h2>
                    </div>

                    <div className="pv-content">
                        <div className="pv-form-style-one">
                            <div className="row">
                                <div className="col-md">
                                    <label htmlFor="field-user_id">
                                        {i18n.select + ' ' + i18n.staff}
                                    </label>

                                    <select name="user_id" value={form.user_id} onChange={this.handleChange}>
                                        <option value=''>{i18n.select}</option>
                                        {list && list.map((v, i) => {
                                            return (
                                                <option key={i} value={v.id}>{v.name} - {v.email}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pv-modal-footer pv-mt-10">
                        <div className="row">
                            <div className="col">
                                {/* <button type='reset' className="pv-btn pv-text-hover-blue">{i18n.clear}</button> */}
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