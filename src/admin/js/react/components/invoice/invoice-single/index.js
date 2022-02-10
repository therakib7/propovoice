import React, { Component } from 'react'
import { NavLink, useParams } from "react-router-dom";

import styles from './scss/Invoice.module.scss'

import LineItems from './LineItems' 
import Note from './Note' 
import Group from './Group';

export default class Invoice extends Component {

	locale = 'en-US'
	currency = 'USD'

	state = {
		taxRate: 0.00,
		lineItems: [
			{
				id: 'initial', // react-beautiful-dnd unique key
				name: '',
				description: '',
				quantity: 0,
				price: 0.00,
			},
		]
	}

	handleInvoiceChange = (event) => {
		this.setState({ [event.target.name]: event.target.value })
	}

	handleLineItemChange = (elementIndex) => (event) => {
		let lineItems = this.state.lineItems.map((item, i) => {
			if (elementIndex !== i) return item
			return { ...item, [event.target.name]: event.target.value }
		})
		this.setState({ lineItems })
	}

	handleAddLineItem = (event) => {
		this.setState({
			// use optimistic uuid for drag drop; in a production app this could be a database id
			lineItems: this.state.lineItems.concat(
				[{ id: Date.now().toString(), name: '', description: '', quantity: 0, price: 0.00 }]
			)
		})
	}

	handleRemoveLineItem = (elementIndex) => (event) => {
		this.setState({
			lineItems: this.state.lineItems.filter((item, i) => {
				return elementIndex !== i
			})
		})
	}

	handleReorderLineItems = (newLineItems) => {
		this.setState({
			lineItems: newLineItems,
		})
	}

	handleFocusSelect = (event) => {
		event.target.select()
	}

	handlePayButtonClick = () => {
		console.log(this.state)
		// alert('Not implemented')
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
		return c * (this.state.taxRate / 100)
	}

	calcLineItemsTotal = () => {
		return this.state.lineItems.reduce((prev, cur) => (prev + (cur.quantity * cur.price)), 0)
	}

	calcTaxTotal = () => {
		return this.calcLineItemsTotal() * (this.state.taxRate / 100)
	}

	calcGrandTotal = () => {
		return this.calcLineItemsTotal() + this.calcTaxTotal()
	}

	render = () => {
		return ( 
			<div className='ncpi-components'>
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
									onClick={this.handlePayButtonClick} >
									Save
								</button>
							</div>
						</div>
						
						<div className='max-w-3xl m-auto'>
							<LineItems
								items={this.state.lineItems}
								currencyFormatter={this.formatCurrency}
								addHandler={this.handleAddLineItem}
								changeHandler={this.handleLineItemChange}
								focusHandler={this.handleFocusSelect}
								deleteHandler={this.handleRemoveLineItem}
								reorderHandler={this.handleReorderLineItems}
							/>

							<div className={styles.totalContainer}> 
								<div className={styles.valueTable}>
									<div className={styles.row}>
										<div className={styles.label}>Tax Rate (%)</div>
										<div className={styles.value}><input name="taxRate" type="number" step="0.01" value={this.state.taxRate} onChange={this.handleInvoiceChange} onFocus={this.handleFocusSelect} /></div>
									</div>
								</div> 

								<div className={styles.valueTable}>
									<div className={styles.row}>
										<div className={styles.label}>Subtotal</div>
										<div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcLineItemsTotal())}</div>
									</div>
									<div className={styles.row}>
										<div className={styles.label}>Tax ({this.state.taxRate}%)</div>
										<div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcTaxTotal())}</div>
									</div>
									<div className={styles.row}>
										<div className={styles.label}>Total Due</div>
										<div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcGrandTotal())}</div>
									</div>
								</div> 
							</div>
							
							<div className='mb-16'></div>
							<Note />

							<div className='mb-16'></div>
							<Group />

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
