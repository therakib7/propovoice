import React, { Component } from 'react'
import { NavLink, useParams, useNavigate } from "react-router-dom"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import Helper from './helper';
import Items from './Items' 
import Note from './Note' 
import Group from './Group';

//sidebar section
import Style from './section/Style'
import Owner from './section/Owner'

class Invoice extends Component {

	locale = 'en-US'
	currency = 'USD'

	constructor(props) {
        super(props);         

        this.state = { 
			tabs: [
                {
                    id: 'template',
                    text: 'Select Template',
                    // content: Overview
                },
                {
                    id: 'info',
                    text: 'Add Information',
                    // content: Project
                },
                {
                    id: 'save',
                    text: 'Save & Share',
                    // content: Estimate
                }, 
            ],
			msg: {
                create: 'Successfully Added',
                update: 'Successfully Updated',
                delete: 'Successfully Deleted',
                confirm: 'Are you sure to delete it?',
				saveTxt: 'Save'
            },
			invoice: { 
				items: [
					{
						id: 'initial', //react-beautiful-dnd unique key
						name: '',
						desc: '',
						qty: 0,
						price: 0.00,
					},
				],
				tax: 0.00, 
				paid: 0.00, 
				note: null,
				group: null,
				from: {
					client_id: 12,
				},
				to: { 
				}
			},
		};  
    }  

	componentDidMount() {  
		if ( this.props.id ) {
			this.updateTxt();
			this.getData();
		} 
	}

	updateTxt = () => {
        let msg = {...this.state.msg} 
		msg.saveTxt = 'Update'; 
		this.setState({msg});  
    };

	getData = () => {
        Helper.get(this.props.id)
            .then(resp => {
                this.setState({ invoice: resp.data.data.invoice }); 
            })
    }; 

	handleNoteChange = ( data ) => {   
		let invoice = {...this.state.invoice} 
		invoice.note = data; 
		this.setState({invoice})  
	} 

	handleGroupChange = ( data ) => {  
		let invoice = {...this.state.invoice} 
		invoice.group = data; 
		this.setState({invoice})  
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
			[{ id: Date.now().toString(), name: '', desc: '', qty: 0, price: 0.00 }]
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
		let formData = {...this.state}; 
		delete formData.msg;

		let editId = this.props.id;
		if ( ! editId ) {
			
			// console.log(this.state)
            Helper.create(formData)
                .then(resp => {
                    if (resp.data.success) {  
						this.props.routeChange(resp.data.data); 
						
						this.updateTxt();

                        toast.success(this.state.msg.create); 
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        } else {
            Helper.update(editId, formData)
                .then(resp => {
                    if (resp.data.success) {
                        toast.success(this.state.msg.update);
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        } 
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
		return this.state.invoice.items.reduce((prev, cur) => (prev + (cur.qty * cur.price)), 0)
	}

	calcTaxTotal = () => {
		return this.calcItemsTotal() * (this.state.invoice.tax / 100)
	}

	calcGrandTotal = () => {
		let total = this.calcItemsTotal() + this.calcTaxTotal();
		/* let invoice = {...this.state.invoice} 
		invoice.total = total; 
		this.setState({invoice}); */
		return total;
	}

	render = () => {
		const { tabs = [], currentTab } = this.state;
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

				<div className="border-b border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px">

                        {tabs.map((tab, index) => (
                            <li className="mr-2" key={index}>
                                <a
                                    href="#"
                                    className={"inline-flex py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 " + (currentTab == tab.id ? 'text-gray-700 border-gray-700' : 'border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300')}
                                    onClick={(e) => this.setActiveTab(e, tab.id)}
                                >
                                    {tab.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

				<div className="grid grid-cols-12 gap-4">
                    <div className='col-span-9'>
						<div className='flex justify-between my-3 mb-10'>
							<div className='mb-5 font-bold text-2xl'>
								{ this.props.id ? 'Edit' : 'Create New'} Invoice
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
									{ this.state.msg.saveTxt }
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
							<Note data={this.state.invoice.note} changeHandler={this.handleNoteChange} />

							<div className='mb-16'></div>
							<Group data={this.state.invoice.group} changeHandler={this.handleGroupChange} />

						</div>
                    </div>
                    
                    <div className='col-span-3 pt-28'> 
						<Style />
						<Owner />
                    </div>
                </div> 
			</div> 
		)
	} 
}  

function InvoiceWrap() {
    const { id } = useParams();

	let navigate = useNavigate();
	const routeChange = id => { 
		navigate(`/invoice/single/${id}`, { replace: true }); 
    };

    return (
        <Invoice id={id} routeChange={routeChange}/>
    );
} 
export default InvoiceWrap; 