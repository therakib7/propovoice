import React, { Component } from 'react'
import { NavLink, useParams, useNavigate } from "react-router-dom"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';   
import Api from '../../../../../api/invoice';

import FromTo from './FromTo';
import Items from './Items' 
import Total from './Total';
import Note from './Note' 
import Group from './Group'; 
import Signature from './Signature';

import Template from '../template'; 
import Preview from '../preview'; 

//sidebar section
import Style from './section/Style'
import Owner from './section/Owner'
import Attachments from './Attachments';


class Invoice extends Component {

	locale = 'en-US'
	currency = 'USD'

	constructor(props) {
        super(props);         

        this.state = {  
			tabs: [
				{
					id: 'template',
					text: 'Select Template'  
				},
				{
					id: 'info',
					text: 'Add Information' 
				},
				{
					id: 'preview',
					text: 'Save & Share' 
				}, 
			],
			currentTab: '',
			msg: {
                create: 'Successfully Added',
                update: 'Successfully Updated',
                delete: 'Successfully Deleted',
                confirm: 'Are you sure to delete it?',
				saveTxt: 'Save'
            },  
			fromData: null,
			toData: null,  
			invoice: { 
				template: {
					id: null,
					img: ''
				},
				from: null,
				to: null,
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
				attachments: [],
				signature: null
				
			},
		};  
    }  

	componentDidMount() {  
		if ( this.props.id ) {
			this.setState({
				currentTab: 'info', 
			}); 
			this.updateEdit();
			this.getData();
		} else { 
			this.setState({
				currentTab: 'template'
			});
		}
	}  

	updateEdit = () => {
        let msg = {...this.state.msg} 
		msg.saveTxt = 'Update'; 
		this.setState({msg});  

		/*
		memory leak in your application
		let tabs = {...this.state.tabs} 
		tabs[1].text = 'Edit Information'; 
		tabs[2].text = 'Update & Share'; 
		this.setState({tabs});  */ 
    };

	getData = () => {
        Api.get(this.props.id)
            .then(resp => { 
                this.setState({ 
					invoice: resp.data.data.invoice, 
					fromData: resp.data.data.fromData, 
					toData: resp.data.data.toData, 
					// editId: this.props.id
				}); 
            }) 
    };  

	handleSetFrom = ( data ) => {
		let invoice = {...this.state.invoice} 
		invoice.from = data.id;    
		this.setState({
			fromData: data,
			invoice,
		})
	}

	handleSetTo = ( data ) => {
		let invoice = {...this.state.invoice} 
		invoice.to = data.id;    
		this.setState({
			toData: data,
			invoice,
		})
	}

	handleTemplateChange = ( data ) => {
		let invoice = {...this.state.invoice} 
		invoice.template = data;  
		this.setState({invoice})
	}

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

	handleSignatureChange = ( data ) => {  
		let invoice = {...this.state.invoice} 
		invoice.signature = data; 
		this.setState({invoice})  
	} 

	handleAttachmentsChange = ( data ) => {  
		let invoice = {...this.state.invoice} 
		invoice.attachments.push(data);  
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
		let editId = this.props.id;
		if ( ! editId ) { 
            Api.create(this.state.invoice)
                .then(resp => {
                    if (resp.data.success) {  
						this.props.routeChange(resp.data.data); 
						/* this.setState({ 
							editId: resp.data.data
						}); */
						
						this.updateEdit();

                        toast.success(this.state.msg.create); 
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        } else {
            Api.update(editId, this.state.invoice)
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
		return total;
	}

	setActiveTab(e, id) {
        e.preventDefault();
        this.setState({
            currentTab: id
        });
    }
 
	backTab = () => {  
		let tab = this.state.currentTab;
		if ( tab == 'info' ) {
			tab = 'template';
		} else if ( tab == 'preview' ) {
			tab = 'info';
		}

        this.setState({
            currentTab: tab
        });
    } 

	render = () => { 
		const { tabs = [], currentTab } = this.state;
		return ( 
			<div className='ncpi-components'> 
				<ToastContainer />
				<div className="container flex flex-wrap p-5 px-0 flex-col md:flex-row items-center">
					<a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"> 
						<span className="font-bold text-2xl">{this.props.id ? 'Edit' : 'Create'} Invoice</span>
					</a>
					<nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center"> 
						{tabs.map((tab, index) => ( 
                                <a
								key={index}
                                    href="#"
                                    className={"inline-flex py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 " + (currentTab == tab.id ? 'text-blue-800 border-blue-800' : 'border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300')}
                                    onClick={(e) => this.setActiveTab(e, tab.id)}
                                >
                                    {tab.text}
                                </a> 
                        ))}
					</nav>
					<div className="inline-flex items-center mt-4 md:mt-0">
						{(currentTab != 'template') &&
						<button
							className="border-blue-700 text-blue-700 border hover:bg-blue-700 border hover:text-white font-medium text-base py-2 px-4 rounded mr-3"
							onClick={this.backTab} >
							Back
						</button>
						}

						<button
							className="bg-blue-700 hover:bg-blue-800 text-white font-medium text-base py-2 px-4 rounded"
							onClick={this.handleSave} >
							{ this.state.msg.saveTxt } & Continue
						</button> 
					</div>
				</div> 

				{(currentTab == 'template') && <Template changeHandler={this.handleTemplateChange} />}

				{(currentTab == 'info') && <div className="grid grid-cols-12 gap-4">
                    <div className='col-span-9'>
						<div className='mb-5 font-bold text-xl'>
							{ this.props.id ? 'Edit' : 'Add'} Content
						</div>
						
						<div className='max-w-3xl m-auto'>
							<FromTo  
								key={this.state.fromData} 
								setFrom={this.handleSetFrom} 
								setTo={this.handleSetTo}
								fromData={this.state.fromData} 
								toData={this.state.toData} 
								editId={this.props.id}
							/> 

							<Items
								items={this.state.invoice.items}
								currencyFormatter={this.formatCurrency}
								addHandler={this.handleAddLineItem}
								changeHandler={this.handleLineItemChange}
								focusHandler={this.handleFocusSelect}
								deleteHandler={this.handleRemoveLineItem}
								reorderHandler={this.handleReorderItems}
							/>  

							<Total
								currencyFormatter={this.formatCurrency}
								itemsTotal={this.calcItemsTotal}
								tax={this.state.invoice.tax}
								taxTotal={this.calcTaxTotal}
								grandTotal={this.calcGrandTotal} 
								changeHandler={this.handleInvoiceChange}
								focusHandler={this.handleFocusSelect}
							/> 
							
							<div className='mb-16'></div>
							<Note data={this.state.invoice.note} changeHandler={this.handleNoteChange} />

							<div className='mb-16'></div>
							<Group data={this.state.invoice.group} changeHandler={this.handleGroupChange} />
							<div className='mb-16'></div>
							<Attachments data={this.state.invoice.attachments} changeHandler={this.handleAttachmentsChange}/>  
							<Signature data={this.state.invoice.signature} changeHandler={this.handleSignatureChange}/>  

						</div>
                    </div>
                    
                    <div className='col-span-3 pt-28'> 
						<img src={this.state.invoice.template.img} />
						<Style />
						<Owner />
                    </div>
                </div>} 

				{(currentTab == 'preview') && 
				<Preview  
					data={this.state} 
					totalData={
						{
							currencyFormatter: this.formatCurrency,
							itemsTotal: this.calcItemsTotal,
							taxTotal: this.calcTaxTotal,
							grandTotal: this.calcGrandTotal,
						} 
					} 
				/>}

			</div> 
		)
	} 
}   
export default Invoice; 