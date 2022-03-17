import React, { Component } from 'react'
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import Api from 'api/invoice';

import FromTo from './FromTo';
import Items from './Items'
import Payment from './Payment';
import Total from './Total';
import Note from './Note'
import Group from './Group';
import Sign from './Sign';

import Template from '../template';
import Preview from '../preview';

//sidebar section
import Style from './section/Style'
import Owner from './section/Owner'
import Attach from './Attach';
import DateField from 'block/date-picker';

class Invoice extends Component {

	locale = 'en-US'
	currency = 'USD'

	constructor(props) {
		super(props);

		this.state = {
			title: '',
			tabs: [
				{
					id: 'template',
					text: 'Select Template'
				},
				{
					id: 'info',
					text: 'Add Content'
				},
				{
					id: 'preview',
					text: 'Preview & Share'
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
			emailModal: false,
			fromData: null,
			toData: null,
			paymentData: null,
			invoice: {
				id: null,
				date: new Date(), 
				due_date: new Date(),
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
						qty_type: 'page',
						price: 0.00,
					},
				],
				tax: 0.00,
				paid: 0.00,
				payment_id: null,
				note: null,
				group: null,
				attach: [],
				sign: null 
			},
		};
	}

	componentDidMount() { 
		let title = this.props.path == 'invoice' ? 'Invoice' : 'Estimate';

		if (this.props.id) {
			this.setState({
				title,
				currentTab: 'info'
			});
			this.updateEdit();
			this.getData();
		} else {
			this.setState({
				title,
				currentTab: 'template'
			});
		}

		this.bgColor();
	}

	componentDidUpdate() {
		this.bgColor();
	}

	componentWillUnmount() {
		document.body.style.backgroundColor = "#fff";
	}

	bgColor = () => {
		if ( this.state.currentTab == 'info') { 
			document.body.style.backgroundColor = "#f1f1f7";
		} else {
			document.body.style.backgroundColor = "#fff";
		}
	};

	updateEdit = () => {
		let msg = { ...this.state.msg }
		msg.saveTxt = 'Update';
		this.setState({ msg });

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
				
				let invoice = resp.data.data.invoice;
				invoice.id = parseInt(resp.data.data.id); 
				invoice.date = new Date(resp.data.data.invoice.date); 
				invoice.due_date = new Date(resp.data.data.invoice.due_date); 
				this.setState({
					invoice,
					fromData: resp.data.data.fromData,
					toData: resp.data.data.toData,
					// editId: this.props.id
				});
			})
	};

	onDateChange = (date, type = null) => {
		let invoice = { ...this.state.invoice }
		
		if ( type == 'date' ) {
			invoice.date = date;
		} else {
			invoice.due_date = date;
		}
		this.setState({ invoice });
	}

	handleSetFrom = (data) => {
		let invoice = { ...this.state.invoice }
		invoice.from = data.id;
		this.setState({
			fromData: data,
			invoice,
		})
	}

	handleSetTo = (data) => {
		let invoice = { ...this.state.invoice }
		invoice.to = data.id;
		this.setState({
			toData: data,
			invoice,
		})
	}

	handleTemplateChange = (data) => {
		let invoice = { ...this.state.invoice }
		invoice.template = data;
		this.setState({ invoice })
	}

	handleNoteChange = (data) => {
		let invoice = { ...this.state.invoice }
		invoice.note = data;
		this.setState({ invoice })
	}

	handleGroupChange = (data) => {
		let invoice = { ...this.state.invoice }
		invoice.group = data;
		this.setState({ invoice })
	}

	handleSignChange = (data, type = null) => {
		let invoice = { ...this.state.invoice }
		invoice.sign = data;
		this.setState({ invoice })
	}

	handleAttachChange = (data, type = null) => {
		let invoice = { ...this.state.invoice }
		if ( type == 'delete' ) { 
			let index = invoice.attach.findIndex(function(o){
				return o.id === data;
			})
			if (index !== -1) invoice.attach.splice(index, 1);  
		} else {
			invoice.attach.push(data);
		}  
		this.setState({ invoice })
	}

	handleInvoiceChange = (e) => {
		const { name, value } = e.target;
		let invoice = { ...this.state.invoice }
		invoice[name] = value;
		this.setState({ invoice })
	}

	handleLineItemChange = (elementIndex) => (e) => {
		let invoice = { ...this.state.invoice }
		let items = this.state.invoice.items.map((item, i) => {
			if (elementIndex !== i) return item
			return { ...item, [e.target.name]: e.target.value }
		})
		invoice.items = items;
		this.setState({ invoice })
	}

	handleAddLineItem = (e) => {
		let invoice = { ...this.state.invoice }
		invoice.items = invoice.items.concat(
			[{ id: Date.now().toString(), name: '', desc: '', qty: 0, price: 0.00 }]
		);
		this.setState({ invoice })
	}

	handleRemoveLineItem = (elementIndex) => (e) => {
		let invoice = { ...this.state.invoice }
		invoice.items = invoice.items.filter((item, i) => {
			return elementIndex !== i
		});
		this.setState({ invoice })
	}

	handleReorderItems = (newItems) => {
		let invoice = { ...this.state.invoice }
		invoice.items = newItems;
		this.setState({ invoice })
	}

	handleFocusSelect = (e) => {
		e.target.select()
	}

	handleSave = () => {
		let editId = this.props.id;
		if (!editId) {
			let path = this.props.path == '/invoice' ? 'invoice' : 'estimate'; 
			let invoice = { ...this.state.invoice }
			invoice.path = path; 

			Api.create(invoice)
				.then(resp => {
					if (resp.data.success) {
						this.props.routeChange(resp.data.data);

						this.updateEdit();

						toast.success(this.state.msg.create);
						this.continueTab('info');
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
						this.continueTab('info');
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
		return this.calcItemsTotal() + this.calcTaxTotal(); 
	}

	setActiveTab(e, id) {
		e.preventDefault();
		this.setState({
			currentTab: id
		});
	}

	backTab = () => {
		let tab = this.state.currentTab;
		if (tab == 'info') {
			tab = 'template';
		} else if (tab == 'preview') {
			tab = 'info';
		}

		this.setState({
			currentTab: tab
		});
	}

	editTab = () => {
		this.setState({
			currentTab: 'info'
		});
		window.scrollTo(0, 0);
	}

	continueTab = (param) => {
		let tab = this.state.currentTab;
		if (param == 'template') {
			tab = 'info';
		} else if (param == 'info') {
			tab = 'preview';
		}

		this.setState({
			currentTab: tab
		});
	} 

	render = () => {
		const { tabs = [], currentTab, title } = this.state;
		return (
			<>
				<div className="row">
					<div className="col-md-6">
						<h1 className="">Create {title}</h1>
						<nav className="pi-breadcrumb">
							<ul className="">
								<li>
									<a href="#" className="">
										Home
									</a>
								</li>
								<li>&gt;</li>
								<li className="active">
									{title}
								</li>
							</ul>
						</nav>
					</div>
					<div className="col-md-6">
						<div className="pi-single-btn pi-text-right">
							{(currentTab != 'template') &&
								<button
									className="pi-btn pi-border-blue pi-color-blue pi-bg-hover-blue pi-hover-color-white"
									onClick={this.backTab} >
									Back
								</button>
							}

							{(currentTab == 'template') && <button
								className="pi-btn pi-bg-blue pi-bg-hover-blue"
								onClick={() => this.continueTab('template')} >
								Continue
							</button>}

							{(currentTab == 'info') && <button
								className="pi-btn pi-bg-blue pi-bg-hover-blue"
								onClick={this.handleSave} >
								{this.state.msg.saveTxt} & Continue
							</button>}

							{(currentTab == 'preview') && 
							<>
								<button
								className="pi-btn pi-border-blue pi-color-blue pi-bg-hover-blue pi-hover-color-white"
								onClick={() => this.props.routeInvoice()} >
								Back to Invoice
								</button>
								<button
									className="pi-btn pi-bg-blue pi-bg-hover-blue"
									onClick={() => this.setState({ emailModal: true })} >
									Send Email
								</button>
							</>
							}
						</div>
					</div>
				</div>{/* ./row */}

				<div className="pi-single-tab-content">
					<div className="pi-single-tabs pi-text-center">
						{tabs.map((tab, index) => (
							<button
								key={index}
								className={"pi-tab-item tablink " + (currentTab == tab.id ? 'pi-active' : '')}
								onClick={(e) => this.setActiveTab(e, tab.id)}
							>
								<span />
								{tab.text}
								{index < 2 && <svg
									width={95}
									height={10}
									viewBox="0 0 95 10"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M89.5 1L93.5 5M93.5 5L89.5 9M93.5 5H1"
										stroke="#E2E8F0"
										strokeWidth={2}
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>}
							</button>
						))}
					</div>

					{(currentTab == 'template') && <Template currentTemplate={this.state.invoice.template} changeHandler={this.handleTemplateChange} />}

					{(currentTab == 'info') && <div id="pi-informations" className="city">
						<div className="row">
							<div className="col-lg-9">
								<h2>Add Content</h2>

								<div className="pi-info-content pi-bg-white">
									<div className="pi-add-info-content pi-bg-pearl">
										<h3 className="pi-color-blue pi-text-center">{title}</h3>
										<div className="row">
											<div className="col-12 col-md-6">
												<div className="pi-info-logo">
													<img src={ncpi_local.assetImgUri + 'from-logo.png'} className="" />
												</div> 
											</div>
											<div className="col-12 col-md-6">
												<div className="pi-info-form">
													<div className="row">
														<div className="pi-info-lavel">
															<label htmlFor="info-number">{title} number :</label>
														</div>
														<div className="pi-info-input-field">
															<input
																type="number" 
																name="invoice_id" 
																value={23423}
																readOnly
															/>
														</div>
													</div>
													<div className="row">
														<div className="pi-info-lavel">
															<label htmlFor="date">{title} date:</label>
														</div>
														<div className="pi-info-input-field">
															<DateField date={this.state.invoice.date} type='date' onDateChange={this.onDateChange} />
														</div>
													</div>
													<div className="row">
														<div className="pi-info-lavel">
															<label htmlFor="due">Due date:</label>
														</div>
														<div className="pi-info-input-field">
															<DateField date={this.state.invoice.due_date} type='due_date' onDateChange={this.onDateChange} />
														</div>
													</div>
												</div>
												{/* ./ pi-info-form */}
											</div>
										</div>
									</div>{/* ./ pi-add-info-content */}

									<FromTo 
										setFrom={this.handleSetFrom}
										setTo={this.handleSetTo}
										fromData={this.state.fromData}
										toData={this.state.toData}
										editId={this.props.id}
									/>

									<div className="pi-info-table-content">
										<span className="pi-edit-btn pi-float-right pi-color-blue pi-bg-air-white">
											<svg
												width={10}
												height={10}
												viewBox="0 0 13 13"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M12.5241 0.47579C12.2193 0.171142 11.8061 0 11.3752 0C10.9443 0 10.531 0.171142 10.2263 0.47579L4.0625 6.63957V8.93738H6.36031L12.5241 2.7736C12.8287 2.46886 12.9999 2.0556 12.9999 1.62469C12.9999 1.19379 12.8287 0.78053 12.5241 0.47579Z"
													fill="#A0AEC0"
												/>
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M0 3.24978C0 2.81879 0.171209 2.40546 0.475963 2.1007C0.780718 1.79595 1.19405 1.62474 1.62504 1.62474H4.87512C5.09062 1.62474 5.29728 1.71034 5.44966 1.86272C5.60204 2.0151 5.68764 2.22177 5.68764 2.43726C5.68764 2.65275 5.60204 2.85942 5.44966 3.0118C5.29728 3.16417 5.09062 3.24978 4.87512 3.24978H1.62504V11.375H9.75024V8.1249C9.75024 7.90941 9.83585 7.70274 9.98823 7.55036C10.1406 7.39799 10.3473 7.31238 10.5628 7.31238C10.7783 7.31238 10.9849 7.39799 11.1373 7.55036C11.2897 7.70274 11.3753 7.90941 11.3753 8.1249V11.375C11.3753 11.806 11.2041 12.2193 10.8993 12.5241C10.5946 12.8288 10.1812 13 9.75024 13H1.62504C1.19405 13 0.780718 12.8288 0.475963 12.5241C0.171209 12.2193 0 11.806 0 11.375V3.24978Z"
													fill="#A0AEC0"
												/>
											</svg>
											Edit column
										</span>

										<Items
											items={this.state.invoice.items}
											currencyFormatter={this.formatCurrency}
											addHandler={this.handleAddLineItem}
											changeHandler={this.handleLineItemChange}
											focusHandler={this.handleFocusSelect}
											deleteHandler={this.handleRemoveLineItem}
											reorderHandler={this.handleReorderItems}
										/> 
										 
									</div>{/* ./ info-table-content */}  

									<div className="row">
										<div className="col-lg-6">
											<Payment 
												setFrom={this.handleSetFrom}
												setTo={this.handleSetTo}
												fromData={this.state.fromData}
												toData={this.state.toData}
												editId={this.props.id}
											/>
										</div> 

										<div className="col-lg-6">
											<Total
												currencyFormatter={this.formatCurrency}
												itemsTotal={this.calcItemsTotal}
												tax={this.state.invoice.tax}
												taxTotal={this.calcTaxTotal}
												grandTotal={this.calcGrandTotal} 
												changeHandler={this.handleInvoiceChange}
												focusHandler={this.handleFocusSelect}
											/> 
										</div> 
									</div> 

									<div className="pi-group-form">
										<Note data={this.state.invoice.note} changeHandler={this.handleNoteChange} />
										<Group data={this.state.invoice.group} changeHandler={this.handleGroupChange} />

										<div className="pi-buttons">
											<div className="row">
												<div className="col-md-6">
													<Attach data={this.state.invoice.attach} changeHandler={this.handleAttachChange} />
												</div>
												<div className="col-md-6">
													<Sign data={this.state.invoice.sign} changeHandler={this.handleSignChange} />
												</div>
											</div>
										</div>
									</div>{/* ./ pi-group-form */}
								</div>{/* ./ pi-info-content */}
							</div>{/* ./ col-lg-9 */}

							<div className="col-lg-3">
								<div className="pi-right-sidebar">
									<h2 className="pi-r-s-title">Preview {title}</h2>
									<img src={this.state.invoice.template.img} className="pi-invoice-image" />
									{/* <Style />
									<Owner /> */}
									<div className="pi-accordion-wrapper">
										<ul>
											<li className="pi-edit-style">
											<input type="checkbox" defaultChecked="" />
											<i />
											<h3>Edit Style</h3>
											<div className="pi-edit-content">
												<h4>Edit clolor</h4>
												<a href="">
												<span className="pi-bg-red" />
												</a>
												<a href="">
												<span className="pi-bg-pink" />
												</a>
												<a href="">
												<span className="pi-bg-blue" />
												</a>
												<a href="">
												<span className="pi-bg-green" />
												</a>
												<div className="pi-edit-text">
												<h4>Edit Text</h4>
												<div className="pi-edit-content">
													<label htmlFor="">Title Text</label>
													<select name="edit-text">
													<option value="volvo">Inter</option>
													<option value="saab">Saab</option>
													<option value="opel">Opel</option>
													<option value="audi">Audi</option>
													</select>
												</div>
												<div className="pi-edit-content">
													<label htmlFor="">Body Text</label>
													<select name="edit-text">
													<option value="volvo">Inter</option>
													<option value="saab">Saab</option>
													<option value="opel">Opel</option>
													<option value="audi">Audi</option>
													</select>
												</div>
												</div>
												<div className="pi-edit-buttons">
												<button className="pi-btn pi-color-blue pi-bg-hover-blue pi-hover-color-white">
													Save
												</button>
												<button className="pi-btn pi-color-blue pi-bg-hover-blue pi-hover-color-white">
													Clear
												</button>
												</div>
											</div>
											</li>
											<li>
											<input type="checkbox" defaultChecked="" />
											<i />
											<h3>Payment</h3>
											<div className="pi-payment-accrodion">
												<div className="tab">
												<input type="radio" id="rd1" name="rd" />
												<label className="tab-label" htmlFor="rd1">
													Online payment
												</label>
												<div className="tab-content">
													<input
													type="checkbox"
													id="vehicle1"
													name="vehicle1"
													defaultValue="Bike"
													/>
													<label htmlFor="vehicle1"> Paypal</label>
													<br />
													<input
													type="checkbox"
													id="vehicle1"
													name="vehicle1"
													defaultValue="Bike"
													/>
													<label htmlFor="vehicle1"> Cradit Card</label>
													<br />
													<input
													type="checkbox"
													id="vehicle1"
													name="vehicle1"
													defaultValue="Bike"
													/>
													<label htmlFor="vehicle1"> Bkash</label>
													<br />
													<button className="pi-payment-btn pi-bg-hover-blue pi-hover-color-white">
													<span>
														<svg
														width={10}
														height={10}
														viewBox="0 0 10 10"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
														>
														<path
															fillRule="evenodd"
															clipRule="evenodd"
															d="M5 0C5.26522 0 5.51957 0.105357 5.70711 0.292893C5.89464 0.48043 6 0.734784 6 1V4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289C9.89464 4.48043 10 4.73478 10 5C10 5.26522 9.89464 5.51957 9.70711 5.70711C9.51957 5.89464 9.26522 6 9 6H6V9C6 9.26522 5.89464 9.51957 5.70711 9.70711C5.51957 9.89464 5.26522 10 5 10C4.73478 10 4.48043 9.89464 4.29289 9.70711C4.10536 9.51957 4 9.26522 4 9V6H1C0.734784 6 0.48043 5.89464 0.292893 5.70711C0.105357 5.51957 0 5.26522 0 5C0 4.73478 0.105357 4.48043 0.292893 4.29289C0.48043 4.10536 0.734784 4 1 4H4V1C4 0.734784 4.10536 0.48043 4.29289 0.292893C4.48043 0.105357 4.73478 0 5 0Z"
															fill="#2D3748"
														/>
														</svg>
													</span>
													Add a new payment
													</button>
												</div>
												</div>
												<div className="tab">
												<input type="radio" id="rd2" name="rd" />
												<label className="tab-label" htmlFor="rd2">
													Bank Payment
												</label>
												<div className="tab-content">
													<div className="pi-payment-bank-content">
													<div className="pi-bank-image">
														<span>
														<svg
															width={20}
															height={20}
															viewBox="0 0 28 29"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
															d="M12.3479 0.555556C13.3232 -0.185185 14.6789 -0.185185 15.6542 0.555556L27.2321 9.33565C28.7067 10.4537 27.9157 12.787 26.0631 12.7963H1.93665C0.0863324 12.787 -0.706994 10.4537 0.769993 9.33565L12.3479 0.555556ZM13.9999 8.74537C14.464 8.74537 14.9091 8.56246 15.2373 8.23688C15.5655 7.91129 15.7499 7.4697 15.7499 7.00926C15.7499 6.54881 15.5655 6.10723 15.2373 5.78164C14.9091 5.45606 14.464 5.27315 13.9999 5.27315C13.5357 5.27315 13.0906 5.45606 12.7624 5.78164C12.4343 6.10723 12.2499 6.54881 12.2499 7.00926C12.2499 7.4697 12.4343 7.91129 12.7624 8.23688C13.0906 8.56246 13.5357 8.74537 13.9999 8.74537ZM3.49997 15.1111V22.0556H6.99994V15.1111H3.49997ZM9.33325 15.1111V22.0556H12.8332V15.1111H9.33325ZM15.1665 15.1111V22.0556H18.6665V15.1111H15.1665ZM20.9998 15.1111V22.0556H24.4998V15.1111H20.9998ZM0 27.2639C0 25.6667 1.30665 24.3704 2.91664 24.3704H25.0831C26.6931 24.3704 27.9997 25.6667 27.9997 27.2639V27.8426C27.9997 28.1496 27.8768 28.4439 27.658 28.661C27.4392 28.8781 27.1425 29 26.8331 29H1.16666C0.85724 29 0.560496 28.8781 0.341706 28.661C0.122915 28.4439 0 28.1496 0 27.8426V27.2639Z"
															fill="#4A5568"
															/>
														</svg>
														</span>
													</div>
													<div className="bank-text-content">
														<span>
														<svg
															width={20}
															height={20}
															id="Layer_1"
															xmlns="http://www.w3.org/2000/svg"
															xmlnsXlink="http://www.w3.org/1999/xlink"
															viewBox="3.4 5.6 17.6 13.4"
															enableBackground="new 3.4 5.6 17.6 13.4"
															xmlSpace="preserve"
														>
															<path d="M9,16.2L4.8,12l-1.4,1.4L9,19L21,7l-1.4-1.4L9,16.2z" />
														</svg>
														</span>
														<h4 className="pi-bank-title">Islami Bank Bangladesh...</h4>
														<p className="pi-bank-subtitle">Ac No. 2165365436546543365</p>
													</div>
													</div>
													<div className="pi-payment-bank-content">
													<div className="pi-bank-image">
														<span>
														<svg
															width={20}
															height={20}
															viewBox="0 0 28 29"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
															d="M12.3479 0.555556C13.3232 -0.185185 14.6789 -0.185185 15.6542 0.555556L27.2321 9.33565C28.7067 10.4537 27.9157 12.787 26.0631 12.7963H1.93665C0.0863324 12.787 -0.706994 10.4537 0.769993 9.33565L12.3479 0.555556ZM13.9999 8.74537C14.464 8.74537 14.9091 8.56246 15.2373 8.23688C15.5655 7.91129 15.7499 7.4697 15.7499 7.00926C15.7499 6.54881 15.5655 6.10723 15.2373 5.78164C14.9091 5.45606 14.464 5.27315 13.9999 5.27315C13.5357 5.27315 13.0906 5.45606 12.7624 5.78164C12.4343 6.10723 12.2499 6.54881 12.2499 7.00926C12.2499 7.4697 12.4343 7.91129 12.7624 8.23688C13.0906 8.56246 13.5357 8.74537 13.9999 8.74537ZM3.49997 15.1111V22.0556H6.99994V15.1111H3.49997ZM9.33325 15.1111V22.0556H12.8332V15.1111H9.33325ZM15.1665 15.1111V22.0556H18.6665V15.1111H15.1665ZM20.9998 15.1111V22.0556H24.4998V15.1111H20.9998ZM0 27.2639C0 25.6667 1.30665 24.3704 2.91664 24.3704H25.0831C26.6931 24.3704 27.9997 25.6667 27.9997 27.2639V27.8426C27.9997 28.1496 27.8768 28.4439 27.658 28.661C27.4392 28.8781 27.1425 29 26.8331 29H1.16666C0.85724 29 0.560496 28.8781 0.341706 28.661C0.122915 28.4439 0 28.1496 0 27.8426V27.2639Z"
															fill="#4A5568"
															/>
														</svg>
														</span>
													</div>
													<div className="bank-text-content">
														<span>
														<svg
															width={20}
															height={20}
															id="Layer_1"
															xmlns="http://www.w3.org/2000/svg"
															xmlnsXlink="http://www.w3.org/1999/xlink"
															viewBox="3.4 5.6 17.6 13.4"
															enableBackground="new 3.4 5.6 17.6 13.4"
															xmlSpace="preserve"
														>
															<path d="M9,16.2L4.8,12l-1.4,1.4L9,19L21,7l-1.4-1.4L9,16.2z" />
														</svg>
														</span>
														<h4 className="pi-bank-title">Islami Bank Bangladesh...</h4>
														<p className="pi-bank-subtitle">Ac No. 2165365436546543365</p>
													</div>
													</div>
													<button className="pi-payment-btn pi-bg-hover-blue pi-hover-color-white">
													<span>
														<svg
														width={10}
														height={10}
														viewBox="0 0 10 10"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
														>
														<path
															fillRule="evenodd"
															clipRule="evenodd"
															d="M5 0C5.26522 0 5.51957 0.105357 5.70711 0.292893C5.89464 0.48043 6 0.734784 6 1V4H9C9.26522 4 9.51957 4.10536 9.70711 4.29289C9.89464 4.48043 10 4.73478 10 5C10 5.26522 9.89464 5.51957 9.70711 5.70711C9.51957 5.89464 9.26522 6 9 6H6V9C6 9.26522 5.89464 9.51957 5.70711 9.70711C5.51957 9.89464 5.26522 10 5 10C4.73478 10 4.48043 9.89464 4.29289 9.70711C4.10536 9.51957 4 9.26522 4 9V6H1C0.734784 6 0.48043 5.89464 0.292893 5.70711C0.105357 5.51957 0 5.26522 0 5C0 4.73478 0.105357 4.48043 0.292893 4.29289C0.48043 4.10536 0.734784 4 1 4H4V1C4 0.734784 4.10536 0.48043 4.29289 0.292893C4.48043 0.105357 4.73478 0 5 0Z"
															fill="#2D3748"
														/>
														</svg>
													</span>
													Add a new bank
													</button>
												</div>
												</div>
												<div className="tab">
												<input type="radio" id="rd3" name="rd" />
												<label className="tab-label pi-arrow-none" htmlFor="rd3">
													None
												</label>
												</div>
												<div className="pi-payment-buttons">
												<button className="pi-btn pi-color-blue pi-bg-hover-blue pi-hover-color-white">
													Save
												</button>
												<button className="pi-btn pi-color-blue pi-bg-hover-blue pi-hover-color-white">
													Clear
												</button>
												</div>
											</div>
											</li>
											<li>
												<input type="checkbox" defaultChecked="" />
												<i />
												<h3>Edit or create Client</h3>
												<div>
													<p>
													content
													</p>
												</div>
											</li>
											<li>
												<input type="checkbox" defaultChecked="" />
												<i />
												<h3>Additional Amount</h3>
												<div>
													<p>
													content
													</p>
												</div>
											</li>
											<li>
												<input type="checkbox" defaultChecked="" />
												<i />
												<h3>Reminder</h3>
												<div>
													<p>
													content
													</p>
												</div>
											</li>
											<li>
												<input type="checkbox" defaultChecked="" />
												<i />
												<h3>Recuring</h3>
												<div>
													<p>
													content
													</p>
												</div>
											</li>
											<li>
												<input type="checkbox" defaultChecked="" />
												<i />
												<h3>Payment</h3>
												<div>
													<p>
													content
													</p>
												</div>
											</li>
											<li>
												<input type="checkbox" defaultChecked="" />
												<i />
												<h3>Crarge or Late Fee</h3>
												<div>
													<p>
													content
													</p>
												</div>
											</li>
										</ul>
									</div>

								</div>
							</div>
						</div>
					</div>}

					{(currentTab == 'preview') &&
						<Preview
							data={this.state}
							emailModal={this.state.emailModal}
							showEmailModal={() => this.setState({ emailModal: true })}
							closeEmailModal={() => this.setState({ emailModal: false })} 
							editTab={this.editTab}
							path={this.props.path}
						/>}
				</div>
			</>

		)
	}
}
export default Invoice; 