import React, { Component, Suspense, lazy } from 'react'
import { toast } from 'react-toastify';

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
			
			let invoice = {...this.state.invoice}
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
			[{ id: Date.now().toString(), title: '', desc: '', qty: 0, qty_type: 'unit', price: 0, tax: 0, tax_type: 'fixed' }]
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
		const { title, tabs = [], currentTab, currentTabIndex, invoice } = this.state;
		return (
			<>

				<div className="row">
					<div className="col-md-6">
						<h1>Create {title}</h1>
						<nav className='pi-breadcrumb'>
							<ul>
								<li>
									<a href='#' >
										Home
									</a>
								</li>
								<li>&gt;</li>
								<li className='pi-active'>
									{title}
								</li>
							</ul>
						</nav>
					</div>
					<div className="col-md-6">
						<div className="pi-single-btn pi-text-right">

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
									{/* <button
										className="pi-btn pi-border-blue pi-color-blue pi-bg-hover-blue pi-hover-color-white"
										onClick={() => this.props.routeInvoice()} >
										Back to Invoice
									</button> */}

									<button
										className="pi-btn pi-border-blue pi-color-blue pi-bg-hover-blue pi-hover-color-white"
										onClick={() => this.setState({ shareModal: true })} >
										Share
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

					{(currentTab == 'info') && <div id="pi-informations" className="pi-invoice-tab-content">
						<div className="row">
							<div className="col-lg-9">
								<h2 className='pi-tab-content-title'>Add Content</h2>
								<div className="pi-info-content pi-bg-white">
									<div className="pi-add-info-content pi-bg-pearl">
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
													<div className="row">
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

													<div className="row">
														<div className="pi-info-lavel">
															<label htmlFor="date">{title} date:</label>
														</div>
														<div className="pi-info-input-field">
															<DateField date={invoice.date} type='date' onDateChange={this.onDateChange} />
															{false && <span>
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	x="0px"
																	y="0px"
																	viewBox="0 0 1000 1000"
																>
																	<path d="M867.2 131.4h-58.5V53.6c0-24.6-20.2-44.8-44.8-44.8h-2.4c-24.6 0-44.8 20.2-44.8 44.8v77.8h-430V53.6c0-24.6-20.2-44.8-44.8-44.8h-2.4c-24.6 0-44.8 20.2-44.8 44.8v77.8h-61.9C65.3 131.4 10 186.7 10 254.2v614.1c0 67.6 55.3 122.8 122.8 122.8h734.4c67.6 0 122.8-55.3 122.8-122.8V254.2c0-67.5-55.3-122.8-122.8-122.8zM900.4 899H100.8V407.8h799.6V899zm0-584.6H100.8V221h799.6v93.4z" />
																</svg>
															</span>}
														</div>
													</div>

													<div className="row">
														<div className="pi-info-lavel">
															<label htmlFor="due">Due date:</label>
														</div>
														<div className="pi-info-input-field">
															<DateField date={invoice.due_date} type='due_date' onDateChange={this.onDateChange} />
														</div>
													</div>

													<div className="row">
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

									<div className="pi-info-table-content">
										<span className="pi-edit-btn pi-float-right pi-color-blue pi-bg-air-white d-none">
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
											items={invoice.items}
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

									<div className="pi-group-form">
										<Suspense fallback={<div>Loading...</div>}>
											<Section data={invoice.sections} changeHandler={this.handleSectionChange} />
										</Suspense>

										<div className="pi-buttons">
											<div className="row">
												<div className="col-md-6">
													{/* <Attach data={invoice.attach} changeHandler={this.handleAttachChange} /> */}
												</div>
												<div className="col-md-6">
													<Upload label={'Authorized Signature'} btnClass={'pi-a-btn pi-p-40'} imgClass={'pi-text-right pi-signature'} data={invoice.sign} changeHandler={this.handleSignChange} />
												</div>
											</div>
										</div>
									</div>{/* ./ pi-group-form */}
								</div>{/* ./ pi-info-content */}
							</div>{/* ./ col-lg-9 */}

							<div className="col-lg-3">
								<div id="pi-right-sidebar" className="pi-right-sidebar" ref={this.sidebarRef} >
									<h2 className="pi-r-s-title pi-tab-content-title">Preview {title}</h2>

									<div className='pi-inv-sidebar-preview' style={{ transformOrigin: 'top left', marginBottom: 'calc((' + this.state.previewScale + ' - 1) * 1120px)', transform: 'scale(' + this.state.previewScale + ')' }}>
										<InvTemplate key={invoice.style.primary_color} data={this.state} isPreviewLoaded={this.isPreviewLoaded} />
									</div>

									<div className="pi-accordion-wrapper">
										<ul>
											<Suspense fallback={<div>Loading...</div>}>

												<Style
													handleChange={this.onStyleChange}
													data={invoice}
												/>

												{this.props.path == 'invoice' && <Payment
													handleChange={this.onPaymentChange}
													data={invoice}
													handleSave={this.handleSave}
												/>}

												<AdditionalAmount
													handleChange={this.onExtraFieldChange}
													data={invoice.extra_field}
												/>

												{!wage.length &&
													<Reminder
														handleChange={this.onReminderChange}
														handleDefault={this.onReminderDefault}
														id={this.props.id}
														path={this.props.path}
														data={invoice.reminder}
													/>
												}

												{!wage.length && this.props.path == 'invoice' &&
													<Recurring
														handleChange={this.onRecurringChange}
														data={invoice.recurring}
													/>
												}
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
			</>
		)
	}
}
export default Invoice; 