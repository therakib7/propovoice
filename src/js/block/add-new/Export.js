import React, { Component } from 'react';
import { toast } from 'react-toastify';
import api from 'api';
import WithRouter from 'hoc/Router';
import { Add } from 'block/icon';
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
        const ExportModal = Object.keys(this.props.ExportModal);

        if (type == 'action') {
            const { value } = e.target;
            if (target.checked) {
                actions.push(value);
            } else {
                actions.splice(actions.indexOf(value));
            }
        } else if (type == 'group') {
            // const { value } = e.target;
            if (target.checked) {
                actions = actions.concat(ExportModal);
            } else {
                actions = actions.filter(x => !ExportModal.includes(x));
            }
        } else if (type == 'none') {
            actions = []
        }
        actions = Array.from(new Set(actions));
        this.setState({ form: { ...this.state.form, ['actions']: actions } });
    }

    render() {
        const ExportModal = Object.keys(this.props.ExportModal);
        const i18n = ndpv.i18n;
        const form = this.state.form;
        let title = '';
        return (
            <div className="pv-overlay pv-show">
                <div className="pv-modal-content">
                    <div className="pv-modal-header pv-gradient">
                        <span className="pv-close" onClick={() => this.props.close()}>
                            <Add />
                        </span>
                        <h2 className="pv-modal-title">{title} {this.props.title} {i18n.exp}</h2>
                        <p>{sprintf(i18n.formDesc, this.props.title, i18n.exp)}</p>
                    </div>
                    <form onSubmit={this.handleSubmit} >
                        <div className="pv-content">
                            <div className="pv-form-style-one">
                                <div className="pv-field-checkbox">
                                    <input
                                        type='checkbox'
                                        id={'Select all'}
                                        name='mod'
                                        value={"Select all"}
                                        // checked={reminder.after.includes(1) ? 'checked' : ''} 
                                        onChange={(e) => this.handleCheckbox(e, 'group')}
                                    />
                                    <label
                                        htmlFor={'Select all'}
                                    >{'Select all'}</label>
                                </div>
                                <div className="pv-import-from-gird">
                                    {ExportModal.map((data, i) => (
                                        <div key={i} className="pv-field-checkbox">
                                            <input
                                                type='checkbox'
                                                id={data}
                                                name='action'
                                                value={data}
                                                checked={form.actions.includes(data) ? 'checked' : ''}
                                                onChange={(e) => this.handleCheckbox(e, 'action')}
                                            />
                                            <label htmlFor={data}>{data}</label>
                                        </div>
                                    ))
                                    }
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