import React, { Component } from 'react'; 

import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
import Api from 'api/setting';

export default class Reminder extends Component {
    constructor(props) {
        super(props); 

        this.state = {
            form: {
                status: false,
                due_date: false, 
                before: [],
                after: [],
                time: '',
                timezone: '',
            }
        };
    }

    static contextType = AppContext;

    componentDidMount() {
        Api.getAll('tab=invoice_reminder')
            .then(resp => { 
                if (resp.data.success) {
                    this.setState({ form: resp.data.data });
                }
            });
    }

    handleChange = (e, type) => { 
		let reminder = { ...this.state.form } 
		const target = e.target;
		const name = target.name;
		const value = ( name === 'status' || name === 'due_date') ? target.checked : target.value; 
		if ( type ) {
			let arr = reminder[type]; 
			if (target.checked) {
				arr.push(parseInt(value)); 
			} else { 
				arr.splice(arr.indexOf(parseInt(value)), 1);  
			}
		} else { 
			reminder[name] = value;
		}

		this.setState({ form: reminder })  
	}

    handleSubmit = (e) => {
        e.preventDefault();

        let form = this.state.form;
        form.tab = 'invoice_reminder';
        
        Api.create(form)
                .then(resp => {
                    if (resp.data.success) { 
                        toast.success(this.context.CrudMsg.update); 
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
    }  

    render() {
        return (
            <form onSubmit={this.handleSubmit} style={{maxWidth: '600px'}} className="pi-form-style-one">

                <div className="row">
                    <div className="col">
                        <table style={{borderSpacing: '8px'}}>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="reminder-status"><strong>Status</strong></label>
                                    </td>
                                    <td>
                                        <label className='pi-switch'>
                                            <input type='checkbox'
                                                id="reminder-status"
                                                name='status'
                                                checked={this.state.form.status ? 'checked' : ''}
                                                onChange={this.handleChange}
                                            />
                                            <span className='pi-switch-slider round'></span>
                                        </label>
                                    </td>
                                </tr>
 
                                <tr>
                                    <td>
                                        <strong>Due date</strong>
                                    </td>
                                    <td>
                                        <input type='checkbox'
                                            id="reminder-due_date"
                                            name='due_date'
                                            checked={this.state.form.due_date ? 'checked' : ''}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="reminder-due_date">On due date</label>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td valign='top'>
                                        <strong>Before due date</strong>
                                    </td>
                                    <td>
                                        <input type='checkbox'
                                            id="reminder-before-1"
                                            name='before'
                                            value={1}
                                            checked={this.state.form.before.includes(1) ? 'checked' : ''}
                                            onChange={(e) => this.handleChange(e, 'before')}
                                        />
                                        <label htmlFor="reminder-before-1">Before 1 day</label>
                                        <br />
                                        <input type='checkbox'
                                            id="reminder-before-7"
                                            name='before'
                                            value={7}
                                            checked={this.state.form.before.includes(7) ? 'checked' : ''}
                                            onChange={(e) => this.handleChange(e, 'before')}
                                        />
                                        <label htmlFor="reminder-before-7">Before 7 days</label>

                                        <br />
                                        <input type='checkbox'
                                            id="reminder-before-15"
                                            name='before'
                                            value={15}
                                            checked={this.state.form.before.includes(15) ? 'checked' : ''}
                                            onChange={(e) => this.handleChange(e, 'before')}
                                        />
                                        <label htmlFor="reminder-before-15">Before 15 days</label>
                                    </td>
                                </tr>  

                                <tr>
                                    <td valign='top'>
                                        <strong>After due date</strong>
                                    </td>
                                    <td>
                                        <input type='checkbox'
                                            id="reminder-after-1"
                                            name='after'
                                            value={1}
                                            checked={this.state.form.after.includes(1) ? 'checked' : ''}
                                            onChange={(e) => this.handleChange(e, 'after')}
                                        />
                                        <label htmlFor="reminder-after-1">After 1 day</label>
                                        <br />
                                        <input type='checkbox'
                                            id="reminder-after-7"
                                            name='after'
                                            value={7}
                                            checked={this.state.form.after.includes(7) ? 'checked' : ''}
                                            onChange={(e) => this.handleChange(e, 'after')}
                                        />
                                        <label htmlFor="reminder-after-7">After 7 days</label>

                                        <br /> 
                                        <input type='checkbox'
                                            id="reminder-after-15"
                                            name='after'
                                            value={15}
                                            checked={this.state.form.after.includes(15) ? 'checked' : ''}
                                            onChange={(e) => this.handleChange(e, 'after')}
                                        />
                                        <label htmlFor="reminder-after-15">After 15 days</label>
                                    </td>
                                </tr>  
                            </tbody>
                        </table>
                    </div>
                </div> 

                <div className="row" style={{marginTop: '10px'}}>
                    <div className="col">
                        <button className="pi-btn pi-bg-blue pi-bg-hover-blue">
                            Save
                        </button> 
                    </div>
                </div> 
            </form>
        );
    }
} 