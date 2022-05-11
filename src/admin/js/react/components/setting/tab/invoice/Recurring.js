import React, { Component } from 'react'; 

import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
import Api from 'api/setting';

export default class Recurring extends Component {
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
        Api.getAll('tab=invoice_recurring')
            .then(resp => { 
                if (resp.data.success) {
                    this.setState({ form: resp.data.data });
                }
            });
    }

    handleChange = (e, type) => { 
		let recurring = { ...this.state.form } 
		const target = e.target;
		const name = target.name;
		const value = ( name === 'status' || name === 'due_date') ? target.checked : target.value; 
		if ( type ) {
			let arr = recurring[type]; 
			if (target.checked) {
				arr.push(parseInt(value)); 
			} else { 
				arr.splice(arr.indexOf(parseInt(value)), 1);  
			}
		} else { 
			recurring[name] = value;
		}

		this.setState({ form: recurring })  
	}

    handleSubmit = (e) => {
        e.preventDefault();

        let form = this.state.form;
        form.tab = 'invoice_recurring';
        
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
                                        <label htmlFor="recurring-status"><strong>Status</strong></label>
                                    </td>
                                    <td>
                                        <label className='pi-switch'>
                                            <input type='checkbox'
                                                id="recurring-status"
                                                name='status'
                                                checked={this.state.form.status ? 'checked' : ''}
                                                onChange={this.handleChange}
                                            />
                                            <span className='pi-switch-slider round'></span>
                                        </label>
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