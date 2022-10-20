import React, { Component } from 'react';
import { toast } from 'react-toastify';
import api from 'api';
import WithRouter from 'hoc/Router';
import { Add } from 'block/icon';
import { sprintf } from 'sprintf-js';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            title: '',
            first_name: '',
            org_name: '',
            person_id: null,
            org_id: null,
            email: '',
            mobile: '',
            lead_id: '',
            stage_id: '',
            budget: '',
            currency: 'USD',
            probability: 50,
            tags: [],
            desc: '',
            note: '',
            date: false
        };

        this.state = {
            form: this.initialState,
            stages: [],
            tags: [],
        };
    }

    handleChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ form: { ...this.state.form, [name]: value } });
        console.log(value)
    }

    currencyChange = val => {
        this.setState({ form: { ...this.state.form, ['currency']: val } });
    }

    handleStageChange = val => {
        this.setState({ form: { ...this.state.form, ['stage_id']: val } });
    }

    handleTagChange = val => {
        this.setState({ form: { ...this.state.form, ['tags']: val } });
    }

    componentDidMount() {
        api.get('taxonomies', 'taxonomy=deal_stage,tag').then(resp => {
            if (resp.data.success) {
                if (this.state.form.stage_id) {
                    this.setState({
                        stages: resp.data.data.deal_stage,
                        tags: resp.data.data.tag,
                    });
                } else {
                    let form = { ...this.state.form }
                    form.stage_id = resp.data.data.deal_stage[0];
                    this.setState({
                        form,
                        stages: resp.data.data.deal_stage,
                        tags: resp.data.data.tag,
                    });
                }
            }
        });

        //added this multiple place, because not working in invoice single
        this.editData();
    }

    componentDidUpdate() {
        this.editData();
    }

    editData = () => {
        //condition added to stop multiple rendering 
        if (this.props.modalType == 'edit' || this.props.modalType == 'move') {
            if (this.state.form.id != this.props.data.id) {

                let form = { ...this.props.data }
                if (this.props.modalType == 'move') {
                    form.lead_id = form.id;
                    form.probability = 50;
                }

                form.first_name = (form.person) ? form.person.first_name : '';
                if (form.person) {
                    form.person_id = (form.person) ? form.person.id : null;
                    form.email = (form.person) ? form.person.email : '';
                    form.mobile = (form.person) ? form.person.mobile : '';
                    form.web = (form.person) ? form.person.web : '';
                } else {
                    form.email = (form.org) ? form.org.email : '';
                    form.mobile = (form.org) ? form.org.mobile : '';
                    form.web = (form.org) ? form.org.web : '';
                }
                form.org_name = (form.org) ? form.org.name : '';

                if (form.org) {
                    form.org_id = (form.org) ? form.org.id : null;
                }

                this.setState({ form });
            }
        } else {
            if (this.state.form.id != null) {
                this.setState({ form: this.initialState });
            }

            /* else {
                if ( this.props.data && ! this.state.form.stage_id && this.props.data.hasOwnProperty('label') ) { // new deal from stage
                    let form = {...this.initialState}
                    form.stage_id = this.props.data;
                    this.setState({ form });
                }
            }  */
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let form = { ...this.state.form }

        if (form.stage_id) {
            form.stage_id = form.stage_id.id;
        }

        if (form.tags.length) {
            let finalArray = form.tags.map(function (obj) {
                return obj.id;
            });
            form.tags = finalArray;
        }

        if (this.props.reload) {

            if (this.props.modalType == 'move') {

                api.add('deals', form).then(resp => {
                    if (resp.data.success) {
                        toast.success(ndpv.i18n.aDelM);
                        let id = resp.data.data;
                        this.props.close();
                        this.props.navigate(`/deal/single/${id}`);
                        this.props.reload();
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                });

            } else {
                api.edit('deals', form.id, form);
                this.props.close();
                this.props.reload();
            }
        } else {
            let args = null;
            if (!this.props.boardView) {
                args = { table_view: true };
            }
            this.props.handleSubmit(form, null, args);
        }
        this.setState({ form: this.initialState });
    }

    render() {
        const i18n = ndpv.i18n;
        const stageList = this.state.stages;
        const tagList = this.state.tags;
        const form = this.state.form;
        const probabilityPercent = (form.probability / 100) * 100;

        let title = '';
        if (this.props.modalType == 'new') {
            title = i18n.new
        } else if (this.props.modalType == 'edit') {
            title = i18n.edit
        } else if (this.props.modalType == 'move') {
            title = i18n.moveto
        }
        return (
            <div className="pv-overlay pv-show">
                <div className="pv-modal-content">

                    <div className="pv-modal-header pv-gradient">
                        <span className="pv-close" onClick={() => this.props.close()}>
                            <Add />
                        </span>
                        <h2 className="pv-modal-title">{title} {i18n.exp}</h2>
                        <p>{sprintf(i18n.formDesc, i18n.exp)}</p>

                    </div>

                    <form onSubmit={this.handleSubmit} >
                        <div className="pv-content">
                            <div className="pv-form-style-one">
                                <div className="row pv-align">
                                    <div className="col-lg">
                                        <div className="pv-field-checkbox">
                                            <p>Select company fields to export</p>
                                        </div>
                                    </div>
                                    <div className="col-lg">
                                        <div className="pv-field-checkbox">
                                            <input
                                                type="checkbox"
                                                name="selectAll"
                                                id=""
                                                value={10}
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="reminder-due_date">Select All</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg">
                                        <div className="pv-field-checkbox">
                                            <input
                                                type="checkbox"
                                                name="selectAll"
                                                id=""
                                                value={10}
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="reminder-due_date">{i18n.email}</label>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg">
                                        <div className="pv-field-checkbox">
                                            <input
                                                type="checkbox"
                                                name="selectAll"
                                                id=""
                                                value={10}
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="reminder-due_date">Company</label>
                                        </div>
                                    </div>
                                    <div className="col-lg">
                                        <div className="pv-field-checkbox">
                                            <input
                                                type="checkbox"
                                                name="selectAll"
                                                id=""
                                                value={10}
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="reminder-due_date">Phone</label>
                                        </div>
                                    </div>
                                    <div className="col-lg">
                                        <div className="pv-field-checkbox">
                                            <input
                                                type="checkbox"
                                                name="selectAll"
                                                id=""
                                                value={10}
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="reminder-due_date">Mobile</label>
                                        </div>
                                    </div>
                                    <div className="col-lg">
                                        <div className="pv-field-checkbox">
                                            <input
                                                type="checkbox"
                                                name="selectAll"
                                                id=""
                                                value={10}
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="reminder-due_date">Other</label>
                                        </div>
                                    </div>
                                    <div className="col-lg">
                                        <div className="pv-field-checkbox">
                                            <input
                                                type="checkbox"
                                                name="selectAll"
                                                id=""
                                                value={10}
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="reminder-due_date">Website</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg">
                                        <div className="pv-field-checkbox">
                                            <input
                                                type="checkbox"
                                                name="selectAll"
                                                id=""
                                                value={10}
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="reminder-due_date">{i18n.email}</label>
                                        </div>
                                    </div>
                                    <div className="col-lg">
                                        <div className="pv-field-checkbox">
                                            <input
                                                type="checkbox"
                                                name="selectAll"
                                                id=""
                                                value={10}
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="reminder-due_date">Company</label>
                                        </div>
                                    </div>
                                    <div className="col-lg">
                                        <div className="pv-field-checkbox">
                                            <input
                                                type="checkbox"
                                                name="selectAll"
                                                id=""
                                                value={10}
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="reminder-due_date">Phone</label>
                                        </div>
                                    </div>
                                    <div className="col-lg">
                                        <div className="pv-field-checkbox">
                                            <input
                                                type="checkbox"
                                                name="selectAll"
                                                id=""
                                                value={10}
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="reminder-due_date">Mobile</label>
                                        </div>
                                    </div>
                                    <div className="col-lg">
                                        <div className="pv-field-checkbox">
                                            <input
                                                type="checkbox"
                                                name="selectAll"
                                                id=""
                                                value={10}
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="reminder-due_date">Other</label>
                                        </div>
                                    </div>
                                    <div className="col-lg">
                                        <div className="pv-field-checkbox">
                                            <input
                                                type="checkbox"
                                                name="selectAll"
                                                id=""
                                                value={10}
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="reminder-due_date">Website</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg">
                                        <div className="pv-field-checkbox">
                                            <input
                                                type="checkbox"
                                                name="selectAll"
                                                id=""
                                                value={10}
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="reminder-due_date">{i18n.email}</label>
                                        </div>
                                    </div>
                                    <div className="col-lg">
                                        <div className="pv-field-checkbox">
                                            <input
                                                type="checkbox"
                                                name="selectAll"
                                                id=""
                                                value={10}
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="reminder-due_date">Company</label>
                                        </div>
                                    </div>
                                    <div className="col-lg">
                                        <div className="pv-field-checkbox">
                                            <input
                                                type="checkbox"
                                                name="selectAll"
                                                id=""
                                                value={10}
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="reminder-due_date">Phone</label>
                                        </div>
                                    </div>
                                    <div className="col-lg">
                                        <div className="pv-field-checkbox">
                                            <input
                                                type="checkbox"
                                                name="selectAll"
                                                id=""
                                                value={10}
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="reminder-due_date">Mobile</label>
                                        </div>
                                    </div>
                                    <div className="col-lg">
                                        <div className="pv-field-checkbox">
                                            <input
                                                type="checkbox"
                                                name="selectAll"
                                                id=""
                                                value={10}
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="reminder-due_date">Other</label>
                                        </div>
                                    </div>
                                    <div className="col-lg">
                                        <div className="pv-field-checkbox">
                                            <input
                                                type="checkbox"
                                                name="selectAll"
                                                id=""
                                                value={10}
                                                onChange={this.handleChange}
                                            />
                                            <label htmlFor="reminder-due_date">Website</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="pv-modal-footer">
                            <div className="row">
                                <div className="col">
                                    <button type='reset' className="pv-btn pv-text-hover-blue">{i18n.clear}</button>
                                </div>
                                <div className="col">
                                    <button type='submit' className="pv-btn pv-bg-blue pv-bg-hover-blue pv-btn-big pv-float-right pv-color-white">
                                        {i18n.save}
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

export default WithRouter(Form);  