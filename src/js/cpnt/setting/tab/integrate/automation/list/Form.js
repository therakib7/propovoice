import React, { Component } from 'react';
import { Add } from 'block/icon';
import { sprintf } from 'sprintf-js';
import actionList from './actions';

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            active: false,
            name: '',
            url: '',
            method: 'post',
            actions: [],
        };

        this.state = {
            form: this.initialState
        };
    }

    handleChange = (e) => { 
        const target = e.target;
        const name = target.name;
        const value = target.type == 'checkbox' ? target.checked : target.value;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    handleCheckbox = (e, type, slug = '') => { 
        const target = e.target; 
        
        let actions = this.state.form.actions;

        if ( type == 'action' ) { 
            const { value } = e.target; 
			if (target.checked) {
				actions.push(value);
			} else {
				actions.splice(actions.indexOf(value), 1);
			} 
		} else if ( type == 'group' ) {    
            const { value } = e.target; 
            const mod = actionList.find(x => x.slug === value); 
            const mod_list = Object.keys(mod.list);  

			if ( target.checked ) { 
                actions = actions.concat(mod_list);
			} else { 
                actions = actions.filter(x => !mod_list.includes(x));
			} 
		} else if ( type == 'all' ) { 

            actionList.map((item, i) => {
                const mod_list = Object.keys(item.list);
                actions = actions.concat(mod_list);
            })  
             
		} else if ( type == 'none' ) { 
            actions = []
		}

        actions = Array.from(new Set(actions));  
        this.setState({ form: { ...this.state.form, ['actions']: actions } });
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
                let form = this.props.data;
                this.setState({ form });
            }
        } else {
            if (this.state.form.id != null) {
                this.setState({ form: this.initialState });
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let form = { ...this.state.form }
        const type = this.props.type;
        form.type = type;

        this.props.handleSubmit(form, this.props.formModalType, { type });
    }

    render() {

        const form = this.state.form;
        const i18n = ndpv.i18n;

        const modalType = this.props.modalType == 'new' ? i18n.new : i18n.edit;
        return (
            <div className="pv-overlay pv-show">
                <div className="pv-modal-content">

                    <div className="pv-modal-header pv-gradient">
                        <span className="pv-close" onClick={() => this.props.close()}>
                            <Add />
                        </span>
                        <h2 className="pv-modal-title">{modalType} {this.props.title}</h2>
                        <p>{sprintf(i18n.formDesc, modalType, this.props.title)}</p>
                    </div>
                    <form onSubmit={this.handleSubmit} >
                        <div className="pv-content">
                            <div className="pv-form-style-one">

                                <div className="row">
                                    <div className="col">
                                        <label>
                                            {i18n.active} 
                                        </label>
                                        <div className="pv-field-switch pv-ml-10">
                                            <label className='pv-switch'>
                                                <input type='checkbox'
                                                    id="reminder-active"
                                                    name='active'
                                                    checked={form.active ? 'checked' : ''}
                                                    onChange={this.handleChange}
                                                />
                                                <span className='pv-switch-slider pv-round'></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="name">{i18n.name}</label>

                                        <input
                                            id="name"
                                            type="text"
                                            required
                                            name="name"
                                            value={form.name}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="url">Webhook URL</label>
                                        <input
                                            id="url"
                                            type="text"
                                            required
                                            name="url"
                                            value={form.url}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                {false && <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="method">Method</label>
                                        <select
                                            name="method"
                                            value={form.method}
                                            onChange={this.handleChange}
                                        >
                                            <option value='post'>POST</option>
                                            <option value='get'>GET</option>
                                        </select>
                                    </div>
                                </div>}

                                <div className='row'>
                                    <div className='col' style={{ marginBottom: 10 }}>
                                        <h4 className='pv-title-medium' style={{ textTransform: 'capitalize' }}>Actions List</h4>
                                    </div>
                                    <div className='col' style={{ marginBottom: 10, textAlign: 'right' }}>
                                        <a onClick={(e) => this.handleCheckbox(e, 'all')} >Select All</a> | <a onClick={(e) => this.handleCheckbox(e, 'none')}>Deselect All</a>
                                    </div>
                                </div>

                                <div className="pv-intg-list pv-mb-15">
                                    {actionList.map((item, i) => (
                                        <div key={i}
                                            className="pv-intg-item"
                                            style={{
                                                alignItems: 'initial',
                                                padding: '14px 15px 5px',
                                                cursor: 'auto'
                                            }}
                                            // onClick={() => this.addCurrentTab(item)}
                                        >

                                            <div className="pv-field-checkbox">
                                                <input
                                                    type='checkbox'
                                                    id={item.slug+'-mod'}
                                                    name='mod'
                                                    value={item.slug}
                                                    style={{ marginRight: 8 }}
                                                    // checked={reminder.after.includes(1) ? 'checked' : ''} 
                                                    onChange={(e) => this.handleCheckbox(e, 'group')}
                                                />
                                                <label
                                                    htmlFor={item.slug+'-mod'}
                                                    style={{
                                                        fontSize: 16,
                                                        fontWeight: 500,
                                                        color: '#2D3748'
                                                    }}
                                                >{item.label}</label>
                                            </div>

                                            {Object.entries(item.list).map((t, k) => (
                                                <div key={k} className="pv-field-checkbox">
                                                    <input
                                                        type='checkbox'
                                                        id={item.slug+'-'+k}
                                                        name='action'
                                                        value={t[0]}
                                                        checked={form.actions.includes(t[0]) ? 'checked' : ''}
                                                        onChange={(e) => this.handleCheckbox(e, 'action')}
                                                    />
                                                    <label htmlFor={item.slug+'-'+k}>{t[1]}</label>
                                                </div>
                                            ))}
                                            {/* <h4>{item.label}</h4>
                                            <ul>
                                                {Object.entries(item.list).map((t, k) => (
                                                    <li key={k}>
                                                        <input type='checkbox' /> {t[1]}
                                                    </li>
                                                ))}
                                            </ul> */}
                                        </div>
                                    ))}
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
