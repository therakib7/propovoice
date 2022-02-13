import React, { Component } from 'react'
import { NavLink } from "react-router-dom";  

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import Helper from './helper';
import Items from './Items' 
import Note from './Note' 
import Group from './Group';

class Invoice extends Component {

	locale = 'en-US'
	currency = 'USD'

	constructor(props) {
        super(props);         

        this.state = {
			edit: false,
			edit_id: null,
			invoice: {
				tax: 0.00,
				items: [
					{
						id: 'initial', //react-beautiful-dnd unique key
						name: '',
						description: '',
						quantity: 0,
						price: 0.00,
					},
				],
				note: null,
				group: null
			}
		};  
    }  

	handleNoteChange = ( data ) => {  
		this.setState({ note: data })
	} 

	handleGroupChange = ( data ) => { 
		this.setState({ group: data })
	}
	
	handleInvoiceChange = (e) => {
		const { name, value } = e.target;
		let invoice = {...this.state.invoice} 
		invoice[name] = value; 
		this.setState({invoice})
	}

	handleLineItemChange = (elementIndex) => (e) => {
		let invoice = {...this.state.invoice} 
		let items = this.state.invoice.items.map((item, i) => {
			if (elementIndex !== i) return item
			return { ...item, [e.target.name]: e.target.value }
		})
		invoice.items = items; 
		this.setState({invoice})
	}

	handleAddLineItem = (e) => {
		let invoice = {...this.state.invoice} 
		invoice.items = invoice.items.concat(
			[{ id: Date.now().toString(), name: '', description: '', quantity: 0, price: 0.00 }]
		); 
		this.setState({invoice}) 
	}

	handleRemoveLineItem = (elementIndex) => (e) => {
		let invoice = {...this.state.invoice} 
		invoice.items = invoice.items.filter((item, i) => {
			return elementIndex !== i
		}); 
		this.setState({invoice}) 
	}

	handleReorderItems = (newItems) => { 
		let invoice = {...this.state.invoice} 
		invoice.items = newItems; 
		this.setState({invoice})  
	}

	handleFocusSelect = (e) => {
		e.target.select()
	} 

	handleSave = () => {
		// console.log(this.state). 
		if ( ! this.state.edit ) {
			console.log(this.state.invoice)
            Helper.create(this.state.invoice)
                .then(resp => {
                    if (resp.data.success) { 
						console.log(resp.data.data);
                        toast.success('Invoice success');
                        // this.getLists();
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        } else {
            /* Helper.update(client.id, client)
                .then(resp => {
                    if (resp.data.success) {
                        this.setState({ formModal: false })
                        // this.setState({ formModalType: 'new' });
                        toast.success(this.state.invoice.msg.update);
                        this.getLists();
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                }) */
        }
		 
	}

	componentDidMount() {
		 
	}

	formatCurrency = (amount) => {
		return (new Intl.NumberFormat(this.locale, {
			style: 'currency',
			currency: this.currency,
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		}).format(amount))
	}

	calcTaxAmount = (c) => {
		return c * (this.state.invoice.tax / 100)
	}

	calcItemsTotal = () => {
		return this.state.invoice.items.reduce((prev, cur) => (prev + (cur.quantity * cur.price)), 0)
	}

	calcTaxTotal = () => {
		return this.calcItemsTotal() * (this.state.invoice.tax / 100)
	}

	calcGrandTotal = () => {
		return this.calcItemsTotal() + this.calcTaxTotal()
	}

	render = () => {
		return ( 
			<div className='ncpi-components'>
				<ToastContainer />
				<div className='mb-3 text-sm'>
                    <NavLink
                        to='/invoice'
                        className="">
                        <span className="dashicons dashicons-arrow-left-alt2"></span> Back to Invoice
                    </NavLink>
                </div>

				<div className="grid grid-cols-12 gap-4">
                    <div className='col-span-9'>
						<div className='flex justify-between my-3 mb-10'>
							<div className='mb-5 font-bold text-2xl'>
								Create New Invoice
							</div>

							<div className=''>
								<button
									className="border-gray-800 text-gray-800 border hover:bg-gray-900 border hover:text-white font-medium text-base py-2 px-4 rounded-full mr-3"
									onClick={() => this.openForm('new')} >
									Preview
								</button>

								<button
									className="bg-gray-800 hover:bg-gray-900 text-white font-medium text-base py-2 px-4 rounded-full"
									onClick={this.handleSave} >
									Save
								</button> 
							</div>
						</div>
						
						<div className='max-w-3xl m-auto'>
							<Items
								items={this.state.invoice.items}
								currencyFormatter={this.formatCurrency}
								addHandler={this.handleAddLineItem}
								changeHandler={this.handleLineItemChange}
								focusHandler={this.handleFocusSelect}
								deleteHandler={this.handleRemoveLineItem}
								reorderHandler={this.handleReorderItems}
							/> 
							 
							<div className="py-2 ml-auto mt-5 w-full w-2/6">
								<div className="flex justify-between mb-3">
									<div className="text-gray-800 flex-1">Subtotal</div>
									<div className="text-gray-800 font-medium">
										{this.formatCurrency(this.calcItemsTotal())}
									</div>
								</div>
								<div className="flex justify-between mb-3">
									<div className="text-gray-800 flex-1">
										Tax 
										<input 
											name="tax" 
											type="number" 
											className='w-20 border mx-3 pl-2 rounded'
											step="0.01" 
											value={this.state.invoice.tax} 
											onChange={this.handleInvoiceChange} 
											onFocus={this.handleFocusSelect} />
											%
									</div>
									<div className="text-gray-800 font-medium">
										{this.formatCurrency(this.calcTaxTotal())}
									</div>
								</div>
								<div className="py-2 border-t border-b">
									<div className="flex justify-between">
										<div className="text-xl text-gray-600 flex-1">Total Amount</div>
										<div className="text-xl text-gray-800 font-bold">
											{this.formatCurrency(this.calcGrandTotal())}
										</div>
									</div>
								</div>
							</div>
							
							<div className='mb-16'></div>
							<Note changeHandler={this.handleNoteChange} />

							<div className='mb-16'></div>
							<Group changeHandler={this.handleGroupChange} />

						</div>
                    </div>
                    
                    <div className='col-span-3'> 
						Sidebar content
                    </div>
                </div> 
			</div> 
		)
	} 
}  

export default Invoice;