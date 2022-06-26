import React, { Component, Suspense, lazy } from 'react'
import { toast } from 'react-toastify';
import { NavLink } from "react-router-dom";
import Api from 'api/invoice';

//self component
import FromTo from './FromTo';
import Items from './Items'
import PaymentInfo from './PaymentInfo';
import Total from './Total';
const Section = lazy(() => import('./Section'));

import Template from '../template';
import Preview from '../preview';

// import Attach from './Attach'; 
const DateField = lazy(() => import('block/date-picker'));
import Upload from 'block/field/upload';

//sidebar section
const InvTemplate = lazy(() => import('inv-template'));
const Style = lazy(() => import('./sidebar/Style'));
const Payment = lazy(() => import('./sidebar/Payment'));
const AdditionalAmount = lazy(() => import('./sidebar/AdditionalAmount'));
const Reminder = lazy(() => import('./sidebar/Reminder'));
const Recurring = lazy(() => import('./sidebar/Recurring'));

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
			sidebarActive: '',
			currentTab: '',
			currentTabIndex: null,
			msg: {
				create: 'Successfully Added',
				update: 'Successfully Updated',
				delete: 'Successfully Deleted',
				confirm: 'Are you sure to delete it?',
				saveTxt: 'Save'
			},
			shareModal: false,
			emailModal: false,
			fromData: null,
			toData: null,
			paymentBankData: null,
			invoice: {
				id: null,
				token: '',
				style: {
					primary_color: '#4c6fff',
					body_font: '',
					title_font: '',
				},
				date: new Date(),
				due_date: new Date(),
				currency: 'USD',
				template: null,
				from: null,
				to: null,
				to_type: '', //person, 'org'
				item_label: {
					id: 'ID',
					title: 'Title',
					desc: 'Description',
					qty: 'Quantity',
					price: 'Rate',
					tax: 'Tax',
					amount: 'Amount',
				},
				items: [
					{
						id: 'init', //react-beautiful-dnd unique key
						title: '',
						desc: '',
						qty: 0,
						qty_type: 'unit',
						price: 0,
						tax: 0,
						tax_type: 'fixed',
					},
				],
				tax: 0,
				discount: 0,
				late_fee: 0,
				paid: 0,
				extra_field: {
					tax: 'percent',
					discount: 'fixed'
				},
				payment_methods: {},
				//TODO: move the the field in single, if always not needed
				reminder: {
					status: false,
					due_date: false,
					before: [],
					after: []
				},
				//TODO: move the the field in single, if always not needed
				recurring: {
					status: false,
					interval_type: 'week',
					interval_in: 'month', //1=day, 2=month, 3=year
					interval: 1,
					limit_type: 0,
					limit: 5,
					send_me: false,
					delivery: 1, //1=auto, 0=manual
				},
				sections: null,
				attach: [],
				sign: null
			},
			previewHeight: '',
			previewScale: ''
		};

		this.sidebarRef = React.createRef();
	}

	isPreviewLoaded = () => {
		// let sidebarRef = this.sidebarRef.current; 
		//TODO: ref not working
		let sidebarRef = document.getElementById('pi-right-sidebar')
		if (sidebarRef) {
			let scale = Math.min(
				sidebarRef.clientWidth / 796,
				sidebarRef.clientHeight / 1122
			);

			this.setState({ previewScale: scale });
		}
	};

	componentDidMount() {

		let title = this.props.path == 'invoice' ? 'Invoice' : 'Estimate';

		if (this.props.id) {
			if (this.props.tab == 'preview') {
				this.setState({
					title,
					currentTab: 'preview',
					currentTabIndex: 2
				});
			} else {
				this.setState({
					title,
					currentTab: 'info',
					currentTabIndex: 1
				});
			}

			this.updateEdit();
			this.getData();
		} else {
			//set future due date
			let date = new Date();
			let dueDate = new Date(date);
			dueDate.setDate(dueDate.getDate() + 30);

			let invoice = { ...this.state.invoice }
			invoice.due_date = dueDate;

			this.setState({
				title,
				currentTab: 'template',
				currentTabIndex: 0,
				invoice
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

	changeCurrency = () => {

	};

	bgColor = () => {
		if (this.state.currentTab == 'info' || this.state.currentTab == 'preview') {
			document.body.style.backgroundColor = "#f1f1f7";
		} else {
			document.body.style.backgroundColor = "#fff";
		}
	};

	updateEdit = (data = '') => {
		let msg = { ...this.state.msg }
		msg.saveTxt = 'Update';
		if (data) {
			let invoice = { ...this.state.invoice }
			invoice.id = data.id;
			invoice.token = data.token;
			this.setState({ msg, invoice });
		} else {
			this.setState({ msg });
		}
	};

	getData = () => {

		Api.get(this.props.id)
			.then(resp => {
				let invoice = resp.data.data.invoice;
				invoice.id = parseInt(resp.data.data.id);
				invoice.token = resp.data.data.token;
				invoice.date = new Date(resp.data.data.invoice.date);
				invoice.due_date = new Date(resp.data.data.invoice.due_date);

				let payment_methods = resp.data.data.invoice.payment_methods; //it's because wordpress empty object covnert to array
				if (Array.isArray(payment_methods) && !payment_methods.length) {
					invoice.payment_methods = {}
				}
				this.setState({
					invoice,
					status: resp.data.data.status,
					fromData: resp.data.data.fromData,
					toData: resp.data.data.toData,
					paymentBankData: resp.data.data.paymentBankData,
				});
			})
	};

	onDateChange = (date, type = null) => {
		let invoice = { ...this.state.invoice }

		if (type == 'date') {
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
		invoice.to_type = data.contact_type;
		this.setState({
			toData: data,
			invoice,
		})
	}

	handleTemplateChange = (data, click = false) => {
		let invoice = { ...this.state.invoice }
		invoice.template = data.id;
		if (click) {
			this.setState({
				currentTab: 'info',
				currentTabIndex: 1,
				invoice
			});
		} else {
			this.setState({ invoice });
		}
	}

	handleSectionChange = (data) => {
		let invoice = { ...this.state.invoice }
		invoice.sections = data;
		this.setState({ invoice })
	}

	handleSignChange = (data, type = null) => {
		let invoice = { ...this.state.invoice }
		invoice.sign = data;
		this.setState({ invoice })
	}

	handleAttachChange = (data, type = null) => {
		let invoice = { ...this.state.invoice }
		if (type == 'delete') {
			let index = invoice.attach.findIndex(function (o) {
				return o.id === data;
			})
			if (index !== -1) invoice.attach.splice(index, 1);
		} else {
			invoice.attach.push(data);
		}
		this.setState({ invoice })
	}

	handleTotalChange = (e) => {
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
			[
				{
					id: Date.now().toString(),
					title: '',
					desc: '',
					qty: 0,
					qty_type: 'unit',
					price: 0,
					tax: 0,
					tax_type: 'fixed'
				}
			]
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
			let path = this.props.path == 'invoice' ? 'invoice' : 'estimate';
			let invoice = { ...this.state.invoice }
			invoice.path = path;

			Api.create(invoice)
				.then(resp => {
					if (resp.data.success) {

						this.updateEdit(resp.data.data);
						this.props.routeChange(resp.data.data.id);

						toast.success(this.state.msg.create, {
							position: toast.POSITION.BOTTOM_RIGHT
						});
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
						toast.success(this.state.msg.update, {
							position: toast.POSITION.BOTTOM_RIGHT
						});
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

	calcItemsTotal = () => {
		return this.state.invoice.items.reduce((prev, cur) => (prev + (cur.qty * cur.price)), 0)
	}

	calcTaxTotal = () => {
		let extra_field = this.state.invoice.extra_field;
		if (extra_field.hasOwnProperty('tax') && extra_field.tax == 'percent') {
			return this.calcItemsTotal() * (this.state.invoice.tax / 100)
		} else {
			return this.state.invoice.tax;
		}
	}

	calcDiscountTotal = () => {
		let extra_field = this.state.invoice.extra_field;
		if (extra_field.hasOwnProperty('discount') && extra_field.discount == 'percent') {
			return this.calcItemsTotal() * (this.state.invoice.discount / 100)
		} else {
			return this.state.invoice.discount;
		}
	}

	calcLateFeeTotal = () => {
		let extra_field = this.state.invoice.extra_field;
		if (extra_field.hasOwnProperty('late_fee') && extra_field.late_fee == 'percent') {
			return this.calcItemsTotal() * (this.state.invoice.late_fee / 100)
		} else {
			return parseFloat(this.state.invoice.late_fee);
		}
	}

	calcGrandTotal = () => {
		let total = this.calcItemsTotal();
		let extra_field = this.state.invoice.extra_field;
		if (extra_field.hasOwnProperty('tax')) {
			total += this.calcTaxTotal();
		}
		if (extra_field.hasOwnProperty('discount')) {
			total -= this.calcDiscountTotal();
		}
		if (extra_field.hasOwnProperty('late_fee')) {
			total += this.calcLateFeeTotal();
		}
		return total;
	}

	setActiveTab(e, id, index) {
		e.preventDefault();
		this.setState({
			currentTab: id,
			currentTabIndex: index
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
			currentTab: 'info',
			currentTabIndex: 1,
		});
		window.scrollTo(0, 0);
	}

	continueTab = (param) => {
		let tab = this.state.currentTab;
		let tabIndex = 0;
		if (param == 'template') {
			tab = 'info';
			tabIndex = 1;
		} else if (param == 'info') {
			tab = 'preview';
			tabIndex = 2;
		}

		this.setState({
			currentTab: tab,
			currentTabIndex: tabIndex,
		});
	}

	setSidebarActive(id) {
		if (this.state.sidebarActive == id) {
			this.setState({ sidebarActive: '' });
		} else {
			this.setState({ sidebarActive: id });
		}
	}

	onStyleChange = (data) => {
		let invoice = { ...this.state.invoice }
		invoice.style = data;

		this.setState({ invoice });
	}

	onPaymentChange = (data, type) => {
		let invoice = { ...this.state.invoice }
		if (type == 'method') {
			if (invoice.payment_methods.hasOwnProperty(data)) { // if payment method exist 
				delete invoice.payment_methods[data];

				if (data == 'bank') {
					this.setState({ invoice, paymentBankData: null });
				} else {
					this.setState({ invoice });
				}
			} else {
				invoice.payment_methods[data] = null;
				this.setState({ invoice });
			}
		} else { //type id		

			invoice.payment_methods[data.type] = data.id;
			if (data.type == 'bank') {
				this.setState({ invoice, paymentBankData: data });
			} else {
				this.setState({ invoice });
			}
		}
	}

	onExtraFieldChange = (data, type) => {
		let invoice = { ...this.state.invoice }
		if (type == 'field') {
			if (invoice.extra_field.hasOwnProperty(data)) { // if payment method exist 
				delete invoice.extra_field[data];
				this.setState({ invoice });
			} else {
				if (data == 'tax') {
					invoice.extra_field[data] = 'percent';
				} else {
					invoice.extra_field[data] = 'fixed';
				}
				this.setState({ invoice });
			}
		} else { //type		

			invoice.extra_field[data.field] = data.type;
			this.setState({ invoice });
		}
	}

	onReminderDefault = (data) => {
		let invoice = { ...this.state.invoice }
		invoice.reminder = data;
		this.setState({ invoice })
	}

	onReminderChange = (e, type) => {
		let invoice = { ...this.state.invoice }
		const target = e.target;
		const name = target.name;
		const value = (name === 'status' || name === 'due_date') ? target.checked : target.value;
		if (type) {
			let arr = invoice.reminder[type];
			if (target.checked) {
				arr.push(parseInt(value));
			} else {
				arr.splice(arr.indexOf(parseInt(value)), 1);
			}
		} else {
			invoice.reminder[name] = value;
		}

		this.setState({ invoice })
	}

	onRecurringChange = (e) => {
		let invoice = { ...this.state.invoice }
		const target = e.target;
		const name = target.name;
		const value = target.type == 'checkbox' ? target.checked : target.value;
		invoice.recurring[name] = value;
		this.setState({ invoice })
	}

	render = () => {
		const { title, tabs = [], currentTab, currentTabIndex, sidebarActive, invoice } = this.state;
		return (
			<>
				<div>
					<div className="row">
						<div className="col-md-6">
							<nav className="pi-breadcrumb">
								<ul className="">
									<li>
										<a href="#" className="">
											Home
										</a>
									</li>
									<li>
										<svg
											width={5}
											height={10}
											viewBox="0 0 5 10"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M0.5 1.25L4.25 5L0.5 8.75"
												stroke="#718096"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</li>
									<li>
										<NavLink to='/invoice'>{title}</NavLink>
									</li>
									<li>
										<svg
											width={5}
											height={10}
											viewBox="0 0 5 10"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M0.5 1.25L4.25 5L0.5 8.75"
												stroke="#718096"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</li>
									<li className="pi-active">
										{currentTab == 'template' && 'Select Template'}
										{currentTab == 'info' && 'Add Content'}
										{currentTab == 'preview' && 'Preview & Share'}
									</li>
								</ul>
							</nav>
						</div>
						<div className="col-md-6">
							<div className="pi-invoice-single-btn pi-text-right">

								{(currentTab == 'template') &&
									<button
										className="pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-bg-shadow pi-color-white pi-mt-20"
										onClick={() => this.continueTab('template')}
									>
										Continue
										<svg
											className="pi-mr-0 pi-ml-10 pi-mt-1"
											width={6}
											height={12}
											viewBox="0 0 6 9"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M3.8 4.24267L0.5 0.942667L1.44267 0L5.68533 4.24267L1.44267 8.48533L0.5 7.54267L3.8 4.24267Z"
												fill="white"
											/>
										</svg>
									</button>
								}

								{(currentTab == 'info') &&
									<button
										className="pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-bg-shadow pi-color-white pi-mt-20"
										onClick={this.handleSave}
									>
										{this.state.msg.saveTxt} & Continue
										<svg
											className="pi-mr-0 pi-ml-10 pi-mt-1"
											width={6}
											height={12}
											viewBox="0 0 6 9"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M3.8 4.24267L0.5 0.942667L1.44267 0L5.68533 4.24267L1.44267 8.48533L0.5 7.54267L3.8 4.24267Z"
												fill="white"
											/>
										</svg>
									</button>
								}

								{(currentTab == 'preview') &&
									<>
										{/* <button
										className="pi-btn pi-border-blue pi-color-blue pi-bg-hover-blue pi-hover-color-white"
										onClick={() => this.props.routeInvoice()} >
										Back to Invoice
									</button> */}

										{/* <button
											className="pi-btn pi-border-blue pi-color-blue pi-bg-hover-blue pi-hover-color-white"
											onClick={() => this.setState({ shareModal: true })} >
											Share
										</button> */}
										<button
											className="pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-bg-shadow pi-color-white pi-mt-20"
											onClick={() => this.setState({ emailModal: true })} >
											Send Email
											<svg
												className="pi-mr-0 pi-ml-10 pi-mt-1"
												width={6}
												height={12}
												viewBox="0 0 6 9"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M3.8 4.24267L0.5 0.942667L1.44267 0L5.68533 4.24267L1.44267 8.48533L0.5 7.54267L3.8 4.24267Z"
													fill="white"
												/>
											</svg>
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
									className={"pi-tab-item tablink " + (index <= currentTabIndex ? 'pi-active' : '')}
									onClick={(e) => this.setActiveTab(e, tab.id, index)}
								>
									{<span className="pi-single-tab-done"><svg
										width={12}
										height={12}
										xmlns="http://www.w3.org/2000/svg"
										viewBox="3.4 5.6 17.6 13.4"
										xmlSpace="preserve"
									>
										<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
									</svg></span>}
									<span></span>
									{tab.text}
									{index < 2 && <svg width={95} height={10} className="pi-arrow">
										<path
											d="M89.5 1l4 4m0 0l-4 4m4-4H1"
											stroke={(index < currentTabIndex ? '#4c6fff' : '#E2E8F0')}
											strokeWidth={2}
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>}
								</button>
							))}
						</div>

						{(currentTab == 'template') && <Template
							currentTemplate={invoice.template}
							changeHandler={this.handleTemplateChange}
						/>}

						{(currentTab == 'info') && <div id="pi-tab-info" className="pi-invoice-tab-content">
							<div className="row">
								<div className="col-lg-9">
									<h2 className='pi-page-title'>Add Content</h2>
									<div className="pi-info-content pi-bg-white">
										<div className="pi-add-info-content">
											<h3 className="pi-color-blue pi-text-center">{title}</h3>
											<div className="row">
												<div className="col-12 col-md-6">
													{this.state.fromData && this.state.fromData.logo &&
														<div className="pi-info-logo">
															<img src={this.state.fromData.logo.src} />
														</div>}
												</div>

												<div className="col-12 col-md-6">
													<div className="pi-info-form">
														<div className="pi-info-form-list">
															<div className="pi-info-lavel">
																<label htmlFor="info-number">{title} number:</label>
															</div>
															<div className="pi-info-input-field">
																<input
																	type="text"
																	name="invoice_id"
																	value={this.props.id ? (this.props.path == 'invoice' ? 'Inv' : 'Est') + this.props.id : ''}
																	readOnly
																/>
															</div>
														</div>

														<div className="pi-info-form-list">
															<div className="pi-info-lavel">
																<label htmlFor="date">{title} date:</label>
															</div>
															<div className="pi-info-input-field">
																<DateField date={invoice.date} type='date' onDateChange={this.onDateChange} />
															</div>
														</div>

														<div className="pi-info-form-list">
															<div className="pi-info-lavel">
																<label htmlFor="due">Due date:</label>
															</div>
															<div className="pi-info-input-field">
																<DateField date={invoice.due_date} type='due_date' onDateChange={this.onDateChange} />
															</div>
														</div>

														<div className="pi-info-form-list">
															<div className="pi-info-lavel">
																<label htmlFor="info-currency">Currency:</label>
															</div>
															<div className="pi-info-input-field">
																<input
																	type="text"
																	name="currency"
																	// value={invoice.currency}
																	value='USD'
																	readOnly
																// onChange={() => this.changeCurrency}
																/>
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

										<Items
											items={invoice.items}
											currencyFormatter={this.formatCurrency}
											addHandler={this.handleAddLineItem}
											changeHandler={this.handleLineItemChange}
											focusHandler={this.handleFocusSelect}
											deleteHandler={this.handleRemoveLineItem}
											reorderHandler={this.handleReorderItems}
										/>

										<div className="row">
											<div className="col-lg-6">
												<PaymentInfo data={this.state.paymentBankData} />
											</div>

											<div className="col-lg-6">
												<Total
													currencyFormatter={this.formatCurrency}
													itemsTotal={this.calcItemsTotal}
													extra_field={invoice.extra_field}
													tax={invoice.tax}
													discount={invoice.discount}
													late_fee={invoice.late_fee}
													taxTotal={this.calcTaxTotal}
													discountTotal={this.calcDiscountTotal}
													lateFeeTotal={this.calcLateFeeTotal}
													grandTotal={this.calcGrandTotal}
													changeHandler={this.handleTotalChange}
													focusHandler={this.handleFocusSelect}
												/>
											</div>
										</div>

										<Suspense fallback={<div>Loading...</div>}>
											<Section data={invoice.sections} changeHandler={this.handleSectionChange} />
										</Suspense>

										<div className=" pi-inv-attachment pi-mt-30">
											<div className="row">
												<div className="col-md-6">
													{/* <Attach data={invoice.attach} changeHandler={this.handleAttachChange} /> */}
													{ false && <button
														className="pi-btn pi-mt-10 pi-text-hover-blue"
														style={{
															background: "none",
															marginLeft: "-15px",
															border: "none",
															color: "#2D3748"
														}}
													>
														<svg
															width={15}
															height={16}
															viewBox="0 0 15 16"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																d="M10.5001 4.24894L3.99228 10.8661C3.77683 11.1039 3.66107 11.4154 3.66897 11.7362C3.67687 12.057 3.80782 12.3624 4.03471 12.5893C4.2616 12.8162 4.56705 12.9472 4.88783 12.9551C5.2086 12.963 5.52013 12.8472 5.75791 12.6318L13.5157 4.76457C13.9466 4.28901 14.1781 3.66595 14.1623 3.0244C14.1465 2.38286 13.8846 1.77195 13.4309 1.31817C12.9771 0.864391 12.3662 0.602491 11.7246 0.586696C11.0831 0.5709 10.46 0.802418 9.98447 1.23332L2.22666 9.10051C1.52425 9.80292 1.12964 10.7556 1.12964 11.7489C1.12964 12.7423 1.52425 13.695 2.22666 14.3974C2.92907 15.0998 3.88174 15.4944 4.8751 15.4944C5.86845 15.4944 6.82112 15.0998 7.52353 14.3974L13.9376 7.99894"
																stroke="#2D3748"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
														</svg>
														Add Attachments
													</button>}
												</div>

												<div className="col-md-6 pi-text-right"> 
													<Upload label={'Authorized Signature'} padding={'20px 30px'}  data={invoice.sign} changeHandler={this.handleSignChange} />
												</div>
											</div>
										</div> 
										 

									</div>{/* ./ pi-info-content */}
								</div>{/* ./ col-lg-9 */}

								<div className="col-lg-3">
									<div id="pi-right-sidebar" className="pi-right-sidebar" ref={this.sidebarRef} >
										<h2 className="pi-title-medium">Preview {title}</h2>

										<div className='pi-inv-sidebar-preview' style={{ transformOrigin: 'top left', marginBottom: 'calc((' + this.state.previewScale + ' - 1) * 1120px)', transform: 'scale(' + this.state.previewScale + ')' }}>
											<InvTemplate key={invoice.style.primary_color} data={this.state} isPreviewLoaded={this.isPreviewLoaded} />
										</div>

										<div className="pi-accordion-wrapper pi-mt-25">
											<ul>
												<Suspense fallback={<div>Loading...</div>}>

													{(!sidebarActive || sidebarActive == 'style') && <li>
														<input type="checkbox" defaultChecked="checked" onClick={() => this.setSidebarActive('style')} />
														<i />
														<h3 className='pi-title-small'>Edit Style</h3>
														<Style
															handleChange={this.onStyleChange}
															data={invoice}
														/>
													</li>}

													{(!sidebarActive || sidebarActive == 'payment') && this.props.path == 'invoice' && <li>
														<input type="checkbox" defaultChecked="checked" onClick={() => this.setSidebarActive('payment')} />
														<i />
														<h3 className='pi-title-small'>Accepted Payment</h3>
														<Payment
															handleChange={this.onPaymentChange}
															data={invoice}
														// handleSave={this.handleSave}
														/>
													</li>}

													{(!sidebarActive || sidebarActive == 'extra-field') && <li>
														<input type="checkbox" defaultChecked="checked" onClick={() => this.setSidebarActive('extra-field')} />
														<i />
														<h3 className='pi-title-small'>Additional Amount</h3>
														<AdditionalAmount
															handleChange={this.onExtraFieldChange}
															data={invoice.extra_field}
														/>
													</li>}

													{(!sidebarActive || sidebarActive == 'reminder') && !wage.length && <li>
														<input type="checkbox" defaultChecked="checked" onClick={() => this.setSidebarActive('reminder')} />
														<i />
														<h3 className='pi-title-small'>
															Reminder
															<span className="pi-switch-content">
																<label className="pi-switch pi-switch-big">
																	<input type='checkbox'
																		id="reminder-status"
																		name='status'
																		checked={invoice.reminder.status ? 'checked' : ''}
																		onChange={this.onReminderChange}
																	/>
																	<span className="pi-slider pi-round" />
																</label>
															</span>
														</h3>
														<Reminder
															handleChange={this.onReminderChange}
															handleDefault={this.onReminderDefault}
															id={this.props.id}
															path={this.props.path}
															data={invoice.reminder}
														/>
													</li>}

													{(!sidebarActive || sidebarActive == 'recurring') && !wage.length && this.props.path == 'invoice' && <li>
														<input type="checkbox" defaultChecked="checked" onClick={() => this.setSidebarActive('recurring')} />
														<i />
														<h3 className='pi-title-small'>Recurring
															<span className="pi-switch-content">
																<label className="pi-switch pi-switch-big">
																	<input type='checkbox'
																		id="recurring-status"
																		name='status'
																		checked={invoice.recurring.status ? 'checked' : ''}
																		onChange={this.onRecurringChange}
																	/>
																	<span className="pi-slider pi-round" />
																</label>
															</span>
														</h3>
														<Recurring
															handleChange={this.onRecurringChange}
															data={invoice.recurring}
														/>
													</li>}

												</Suspense>
											</ul>
										</div>

									</div>
								</div>
							</div>
						</div>}

						{(currentTab == 'preview') &&
							<Preview
								data={this.state}
								shareModal={this.state.shareModal}
								showShareModal={() => this.setState({ shareModal: true })}
								closeShareModal={() => this.setState({ shareModal: false })}
								emailModal={this.state.emailModal}
								showEmailModal={() => this.setState({ emailModal: true })}
								closeEmailModal={() => this.setState({ emailModal: false })}
								editTab={this.editTab}
								path={this.props.path}
							/>}
					</div>
				</div>
			</>
		)
	}
}
export default Invoice; 