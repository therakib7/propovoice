import React, { Component, Suspense, lazy } from 'react'
import { toast } from 'react-toastify';
import { NavLink } from "react-router-dom";
import Api from 'api/invoice';

import pro from 'block/pro-alert';
import ProLabel from 'block/pro-alert/label';

import Spinner from 'block/preloader/spinner';
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
				module_id: null,
				project: {
					id: null,
					title: '',
					desc: ''
				},
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
				paid: 0,
				item_tax: false,
				extra_field: [],
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
			previewScale: '',

		};

		this.sidebarRef = React.createRef();
		this.reminderRef = React.createRef();
		this.recurringRef = React.createRef();
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

		let title = this.props.path == 'invoice' ? ndpi.i18n.inv : ndpi.i18n.est;

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

			//deal, project id
			if (this.props.module_id) {
				invoice.module_id = parseInt(this.props.module_id);
				console.log(invoice);
			}

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
			document.body.style.backgroundColor = "#f7f8fa";
		} else {
			document.body.style.backgroundColor = "#fff";
		}
	};

	updateEdit = (data = '') => {
		let msg = { ...this.state.msg }
		msg.saveTxt = ndpi.i18n.upd;
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
		Api.get(this.props.id).then(resp => {
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
		invoice.to_type = data.type;
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

	itemTaxChange = (e) => {
		let invoice = { ...this.state.invoice }
		const target = e.target;
		const name = target.name;
		const value = target.type == 'checkbox' ? target.checked : target.value;
		invoice[name] = value;
		this.setState({ invoice })
	}

	handleTotalChange = (e, item) => {
		const { value } = e.target;
		let invoice = { ...this.state.invoice }
		let index = invoice.extra_field.findIndex(x => x.id == item.id);
		invoice.extra_field[index].val = value;
		this.setState({ invoice });
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
		return this.state.invoice.items.reduce((prev, cur) => {
			let tax_total = 0;
			if (this.state.item_tax && cur.tax) {
				if (cur.tax_type == 'percent') {
					tax_total += cur.price * (cur.tax / 100);
				} else {
					tax_total += parseFloat(cur.tax);
				}
			}
			return prev + (cur.qty * cur.price) + tax_total;
		}, 0)
	}

	calcGrandTotal = () => {
		let item_total = this.calcItemsTotal();
		let total = item_total;
		let extra_field = this.state.invoice.extra_field;
		extra_field.map((item, i) => {
			if (item.val_type == 'percent') {
				if (item.type == 'tax' || item.type == 'fee') {
					total += item_total * (item.val / 100);
				} else {
					total -= item_total * (item.val / 100);
				}
			} else {
				if (item.type == 'tax' || item.type == 'fee') {
					total += parseFloat(item.val);
				} else {
					total -= parseFloat(item.val);
				}
			}
		});
		return total;
	}

	setActiveTab(e, id, index) {
		e.preventDefault();

		if (id == 'preview') {
			this.handleSave();
		}

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

	onExtraFieldChange = (i, item, type, type_val) => {
		let invoice = { ...this.state.invoice }
		let index = invoice.extra_field.findIndex(x => x.id == item.id);
		if (type == 'field') {
			if (index != -1) { // if payment method exist  
				invoice.extra_field.splice(index, 1);
			} else {
				let data = {
					id: item.id,
					name: item.label,
					type: item.extra_amount_type,
					val: 0,
					val_type: item.val_type
				};
				invoice.extra_field.splice(i, 0, data);
			}
			this.setState({ invoice });

		} else { //type		 
			invoice.extra_field[index].val_type = type_val;
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

		if (wage.length > 0 && name == 'status') {
			pro();
			return;
		}

		if (type) { //before, after
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
		if (name === 'status' && value) {
			this.reminderRef.current.click();
		}
	}

	onRecurringChange = (e) => {
		let invoice = { ...this.state.invoice }
		const target = e.target;
		const name = target.name;
		const value = target.type == 'checkbox' ? target.checked : target.value;

		if (wage.length > 0 && name == 'status') {
			pro();
			return;
		}

		invoice.recurring[name] = value;

		this.setState({ invoice })
		if (name === 'status' && value) {
			this.recurringRef.current.click();
		}
	}

	render = () => {
		const { title, tabs = [], currentTab, currentTabIndex, sidebarActive, invoice } = this.state;
		const i18n = ndpi.i18n;
		return (
			<>
				<div>
					<div className="row">
						<div className="col-sm-6">
							<nav className="pi-breadcrumb">
								<ul className="">
									<li>
										<a href="#" className="">
											{i18n.home}
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
										<NavLink to={'/' + this.props.path}>{title}</NavLink>
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
										{currentTab == 'template' && i18n.select + ' ' + i18n.tmpl}
										{currentTab == 'info' && i18n.add + ' ' + i18n.con}
										{currentTab == 'preview' && i18n.preview + ' ' + i18n.nd + ' ' + i18n.share}
									</li>
								</ul>
							</nav>
						</div>
						<div className="col-sm-6">
							<div className="pi-invoice-single-btn pi-text-right">

								{(currentTab == 'template') &&
									<button
										className="pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-bg-shadow pi-color-white pi-mt-20"
										onClick={() => this.continueTab('template')}
									>
										{i18n.contin}
										<svg
											className="pi-mr-0 pi-ml-10 pi-mt-1"
											width={9}
											height={11}
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
										{this.state.msg.saveTxt} {i18n.nd} {i18n.contin}
										<svg
											className="pi-mr-0 pi-ml-10 pi-mt-1"
											width={9}
											height={11}
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
											{i18n.send} {i18n.email}
											<svg
												className="pi-mr-0 pi-ml-10 pi-mt-1"
												width={9}
												height={11}
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
										height={11}
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
									<h2 className='pi-page-title'>{i18n.add} {i18n.con}</h2>
									<div className="pi-info-content pi-bg-white">
										<div className="pi-add-info-content">
											<h3 className="pi-color-blue pi-text-center">{title}</h3>
											<div className="row">
												<div className="col-12 col-md-6">
													<div className="pi-info-logo">
														{this.state.fromData && this.state.fromData.logo && <img src={this.state.fromData.logo.src} />}
														{false && this.state.fromData && !this.state.fromData.logo && <div className="pi-upload pi-cursor-pointer">
															<svg
																width={18}
																height={18}
																viewBox="0 0 18 18"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	d="M4.55765 13.121C3.68257 13.122 2.83789 12.8072 2.18545 12.2369C1.53301 11.6667 1.11868 10.8811 1.02184 10.0307C0.924994 9.18024 1.15245 8.32477 1.66063 7.62816C2.16881 6.93155 2.92198 6.44278 3.77584 6.25548C3.52879 5.12883 3.74957 3.95235 4.3896 2.98487C5.02964 2.01739 6.03651 1.33814 7.1887 1.09657C8.3409 0.854997 9.54405 1.07088 10.5335 1.69672C11.5229 2.32257 12.2175 3.30712 12.4646 4.43377H12.5534C13.655 4.43269 14.7177 4.83189 15.5353 5.55388C16.3528 6.27587 16.8668 7.26913 16.9775 8.34085C17.0882 9.41258 16.7877 10.4863 16.1344 11.3536C15.481 12.2208 14.5214 12.8198 13.4418 13.0341M11.665 10.5148L8.99975 7.90866M8.99975 7.90866L6.33449 10.5148M8.99975 7.90866V17"
																	stroke="#718096"
																	strokeWidth="1.5"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																/>
															</svg>
															<p>
																Upload <br />
																Logo
															</p>
														</div>}
													</div>
												</div>

												<div className="col-12 col-md-6">
													<div className="pi-info-form pi-form-style-one">
														<div className="pi-info-form-list">
															<div className="pi-info-lavel">
																<label htmlFor="info-number">{title} {i18n.num}:</label>
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
																<label htmlFor="date">{title} {i18n.date}:</label>
															</div>
															<div className="pi-info-input-field">
																<DateField date={invoice.date} type='date' onDateChange={this.onDateChange} />
															</div>
														</div>

														<div className="pi-info-form-list">
															<div className="pi-info-lavel">
																<label htmlFor="due">{i18n.due} {i18n.date}:</label>
															</div>
															<div className="pi-info-input-field">
																<DateField date={invoice.due_date} type='due_date' onDateChange={this.onDateChange} />
															</div>
														</div>

														{false && <div className="pi-info-form-list">
															<div className="pi-info-lavel">
																<label htmlFor="info-currency">{i18n.currency}:</label>
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
														</div>}

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
											item_label={invoice.item_label}
											item_tax={invoice.item_tax}
											currencyFormatter={this.formatCurrency}
											addHandler={this.handleAddLineItem}
											changeHandler={this.handleLineItemChange}
											focusHandler={this.handleFocusSelect}
											deleteHandler={this.handleRemoveLineItem}
											reorderHandler={this.handleReorderItems}
										/>

										<div className="pi-calculation">
											<div className="row">
												<div className="col-sm-4">
													<PaymentInfo data={this.state.paymentBankData} />
												</div>

												<div className="col-sm-8">
													<Total
														currencyFormatter={this.formatCurrency}
														itemsTotal={this.calcItemsTotal}
														item_tax={invoice.item_tax}
														extra_field={invoice.extra_field}
														grandTotal={this.calcGrandTotal}
														changeHandler={this.handleTotalChange}
														focusHandler={this.handleFocusSelect}
													/>
												</div>
											</div>
										</div>
										<Suspense fallback={<Spinner />}>
											<Section data={invoice.sections} changeHandler={this.handleSectionChange} />
										</Suspense>

										<div className=" pi-inv-attachment pi-mt-30">
											<div className="row">
												<div className="col-md-6">
													{/* <Attach data={invoice.attach} changeHandler={this.handleAttachChange} /> */}
													{false && <button
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
														{ndpi.i18n.add} Attachments
													</button>}
												</div>

												<div className="col-md-6 pi-text-right">
													<Upload label={i18n.aSign} padding={'20px 30px'} data={invoice.sign} changeHandler={this.handleSignChange} />
												</div>
											</div>
										</div>


									</div>{/* ./ pi-info-content */}
								</div>{/* ./ col-lg-9 */}

								<div className="col-lg-3">
									<div id="pi-right-sidebar" className="pi-right-sidebar" ref={this.sidebarRef} >
										<h2 className="pi-title-medium">{i18n.preview} {title}</h2>

										<div className='pi-inv-sidebar-preview' style={{ transformOrigin: 'top left', marginBottom: 'calc((' + this.state.previewScale + ' - 1) * 1120px)', transform: 'scale(' + this.state.previewScale + ')' }}>
											<InvTemplate key={invoice.style.primary_color} data={this.state} isPreviewLoaded={this.isPreviewLoaded} />
										</div>

										<div className="pi-accordion-wrapper pi-mt-15">
											<ul>
												<Suspense>
													{(!sidebarActive || sidebarActive == 'style') && <li>
														<input type="checkbox" defaultChecked="checked" onClick={() => this.setSidebarActive('style')} />
														<i />
														<h3 className='pi-title-small'>{i18n.edit} {i18n.style}</h3>
														<Style
															handleChange={this.onStyleChange}
															data={invoice}
														/>
													</li>}

													{(!sidebarActive || sidebarActive == 'payment') && this.props.path == 'invoice' && <li>
														<input type="checkbox" defaultChecked="checked" onClick={() => this.setSidebarActive('payment')} />
														<i />
														<h3 className='pi-title-small'>{i18n.accepted} {i18n.payment}</h3>
														<Payment
															handleChange={this.onPaymentChange}
															data={invoice}
														// handleSave={this.handleSave}
														/>
													</li>}

													{(!sidebarActive || sidebarActive == 'extra-field') && <li>
														<input type="checkbox" defaultChecked="checked" onClick={() => this.setSidebarActive('extra-field')} />
														<i />
														<h3 className='pi-title-small'>{i18n.addi} {i18n.amount}</h3>
														<AdditionalAmount
															{...this.props}
															item_tax={invoice.item_tax}
															itemTaxChange={this.itemTaxChange}
															handleChange={this.onExtraFieldChange}
															data={invoice.extra_field}
														>
															sdf
														</AdditionalAmount>
													</li>}

													{(!sidebarActive || sidebarActive == 'reminder') && <li>
														<input type="checkbox" ref={this.reminderRef} defaultChecked={true} onClick={() => this.setSidebarActive('reminder')} />
														<i />
														<h3 className='pi-title-small' >
															{i18n.rem}
															{wage.length > 0 && <>
																<ProLabel />
															</>}
															<span className="pi-field-switch-content">
																<label className="pi-field-switch pi-field-switch-big">
																	<input type='checkbox'
																		id="reminder-status"
																		name='status'
																		checked={invoice.reminder.status ? 'checked' : ''}
																		onChange={this.onReminderChange}
																	/>
																	<span className="pi-switch-slider pi-round" />
																</label>
															</span>
														</h3>
														<Reminder
															{...this.props}
															handleChange={this.onReminderChange}
															handleDefault={this.onReminderDefault}
															id={this.props.id}
															path={this.props.path}
															data={invoice.reminder}
														/>
													</li>}

													{(!sidebarActive || sidebarActive == 'recurring') && this.props.path == 'invoice' && <li>
														<input type="checkbox" ref={this.recurringRef} defaultChecked="checked" onClick={() => this.setSidebarActive('recurring')} />
														<i />
														<h3 className='pi-title-small'>
															{i18n.recur}
															{wage.length > 0 && <>
																<ProLabel />
															</>}
															<span className="pi-field-switch-content">
																<label className="pi-field-switch pi-field-switch-big">
																	<input type='checkbox'
																		id="recurring-status"
																		name='status'
																		checked={invoice.recurring.status ? 'checked' : ''}
																		onChange={this.onRecurringChange}
																	/>
																	<span className="pi-switch-slider pi-round" />
																</label>
															</span>
														</h3>
														<Recurring
															{...this.props}
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