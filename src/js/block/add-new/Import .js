import React, { Component } from 'react';
import { toast } from 'react-toastify';
import api from 'api';
import WithRouter from 'hoc/Router';
import { Add } from 'block/icon';
import action from './action';
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
            date: false,
            active: false,
            actions: [],
        };

        this.state = {
            form: this.initialState,
        };

    }
    handleCheckbox = (e, type, slug = '') => {
        const target = e.target;
        let actions = this.state.form.actions;

        if (type == 'action') {
            const { value } = e.target;
            if (target.checked) {
                actions.push(value);
            } else {
                actions.splice(actions.indexOf(value), 1);
            }
        } else if (type == 'group') {
            const { value } = e.target;
            const mod = action.find(x => x.slug === value);
            const mod_list = Object.keys(mod.list);

            if (target.checked) {
                actions = actions.concat(mod_list);
            } else {
                actions = actions.filter(x => !mod_list.includes(x));
            }
        } else if (type == 'none') {
            actions = []
        }

        actions = Array.from(new Set(actions));
        this.setState({ form: { ...this.state.form, ['actions']: actions } });
    }

    // componentDidMount() {
    //     api.get('taxonomies', 'taxonomy=deal_stage,tag').then(resp => {
    //         if (resp.data.success) {
    //             if (this.state.form.stage_id) {
    //                 this.setState({
    //                     stages: resp.data.data.deal_stage,
    //                     tags: resp.data.data.tag,
    //                 });
    //             } else {
    //                 let form = { ...this.state.form }
    //                 form.stage_id = resp.data.data.deal_stage[0];
    //                 this.setState({
    //                     form,
    //                     stages: resp.data.data.deal_stage,
    //                     tags: resp.data.data.tag,
    //                 });
    //             }
    //         }
    //     });

    //     //added this multiple place, because not working in invoice single
    //     this.editData();
    // }

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
        }
    }

    render() {
        const i18n = ndpv.i18n;
        const form = this.state.form;
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
                        <h2 className="pv-modal-title">{title} {i18n.imp}</h2>
                        <p>{sprintf(i18n.formDesc, i18n.exp)}</p>
                    </div>
                    <form onSubmit={this.handleSubmit} >
                        <div className="pv-content">
                            <div className="pv-form-style-one">
                                {action.map((item, i) => (
                                    <div key={i}
                                        style={{
                                            alignItems: 'initial',
                                            padding: '14px 15px 5px',
                                            cursor: 'auto'
                                        }}
                                    // onClick={() => this.addCurrentTab(item)}
                                    >
                                        <div className="row">
                                            <div className="col-lg">

                                                <div className="pv-field-checkbox">
                                                    <input
                                                        type='checkbox'
                                                        id={item.slug + '-mod'}
                                                        name='mod'
                                                        value={item.slug}
                                                        style={{ marginRight: 8 }}
                                                        // checked={reminder.after.includes(1) ? 'checked' : ''} 
                                                        onChange={(e) => this.handleCheckbox(e, 'group')}
                                                    />
                                                    <label
                                                        htmlFor={item.slug + '-mod'}
                                                        style={{
                                                            fontSize: 16,
                                                            fontWeight: 500,
                                                            color: '#2D3748'
                                                        }}
                                                    >{item.label}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="pv-grid-tmp">

                                                    {Object.entries(item.list).map((t, k) => (
                                                        <div key={k} className="pv-field-checkbox">
                                                            <input
                                                                type='checkbox'
                                                                id={item.slug + '-' + k}
                                                                name='action'
                                                                value={t[0]}
                                                                checked={form.actions.includes(t[0]) ? 'checked' : ''}
                                                                onChange={(e) => this.handleCheckbox(e, 'action')}
                                                            />
                                                            <label htmlFor={item.slug + '-' + k}>{t[1]}</label>
                                                        </div>
                                                    ))}
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                ))}
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