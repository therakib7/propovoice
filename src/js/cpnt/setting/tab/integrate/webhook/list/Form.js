import React, { Component } from 'react';
import { Add } from 'block/icon';
import { sprintf } from 'sprintf-js'; 
import api from 'api'; 
import actionList from './actions';  

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
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
        const { name, value } = e.target;

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

        this.props.handleSubmit(form);
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
                        <h2 className="pv-modal-title">{modalType} Webhook</h2>
                        <p>{sprintf(i18n.formDesc, modalType, 'Webhook')}</p>
                    </div>
                    <form onSubmit={this.handleSubmit} >
                        <div className="pv-content">
                            <div className="pv-form-style-one">
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

                                <div className="row">
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
                                </div>

                                <div className='row'>
                                    <div className='col' style={{ marginBottom: 10 }}>
                                        <h4 className='pv-title-medium' style={{ textTransform: 'capitalize' }}>Actions List</h4>
                                    </div>
                                    <div className='col' style={{ marginBottom: 10, textAlign: 'right' }}>
                                        <a>Select All</a> | <a>Deselect All</a>
                                    </div>
                                </div>

                                <div className="pv-intg-list pv-mb-15">
                                    {actionList.map((item, i) => (
                                        <div key={i}
                                            className="pv-intg-item"
                                            style={{
                                                alignItems: 'initial',
                                                padding: '0 15px 10px',
                                                cursor: 'auto'
                                            }}
                                        // onClick={() => this.addCurrentTab(item)}
                                        >   
                                        
                                            <h4 style={{marginBottom: 7}}>
                                                <input
                                                    type='checkbox'
                                                    id="dreminder-after-1"
                                                    name='after'
                                                    value={1}
                                                    style={{marginRight: 8}}
                                                    // checked={reminder.after.includes(1) ? 'checked' : ''}
                                                    // onChange={(e) => handleChange(e, 'after')}
                                                />
                                                {item.label}
                                            </h4>
                                            {Object.entries(item.list).map((t, k) => (
                                            <div key={k} className="pv-field-checkbox">
                                                <input
                                                    type='checkbox'
                                                    id="reminder-after-1"
                                                    name='after'
                                                    value={1}
                                                    // checked={reminder.after.includes(1) ? 'checked' : ''}
                                                    // onChange={(e) => handleChange(e, 'after')}
                                                />
                                                <label htmlFor="reminder-after-1">{t[1]}</label>
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
