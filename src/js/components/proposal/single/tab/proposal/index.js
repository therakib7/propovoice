import React, { Component, Suspense, lazy } from 'react'
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Spinner from 'block/preloader/spinner';
import Api from 'api/invoice';

//self component
const Editor = lazy(() => import('./editor'));
import FromTo from './FromTo';
import PaymentInfo from './PaymentInfo';

import Template from '../template';
import Preview from '../preview';

// import Attach from './Attach';
import DateField from 'block/date-picker';
import Upload from 'block/field/upload';

//sidebar section
const InvTemplate = lazy(() => import('inv-template'));
const Style = lazy(() => import('./sidebar/Style'));
import Owner from './sidebar/Owner'
const Payment = lazy(() => import('./sidebar/Payment'));
const AdditionalAmount = lazy(() => import('./sidebar/AdditionalAmount'));

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
					text: 'Add Content '
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
				template: {
					id: null,
					src: ''
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
				payment_methods: {},
				note: null,
				group: null,
				attach: [],
				sign: null
			},
			previewHeight: '',
			previewScale: ''
		};

		this.previewRef = React.createRef();
		this.sidebarRef = React.createRef();
	}

	isPreviewLoaded = () => {
		let previewRef = this.previewRef.current;
		let sidebarRef = this.sidebarRef.current;
		if (previewRef && sidebarRef) {
			let scale = Math.min(
				sidebarRef.clientWidth / previewRef.clientWidth,
				sidebarRef.clientHeight / previewRef.clientHeight
			);

			this.setState({ previewScale: scale });
		}
	};

	componentDidMount() {

		let title = this.props.path == 'invoice' ? 'Invoice' : 'Estimate';

		if (this.props.id) {
			this.setState({
				title,
				currentTab: 'info',
				currentTabIndex: 1
			});
			this.updateEdit();
			this.getData();
		} else {
			this.setState({
				title,
				currentTab: 'template',
				currentTabIndex: 0
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
		if (this.state.currentTab == 'info') {
			document.body.style.backgroundColor = "#f7f8fa";
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
				// console.log(resp.data.data)
				invoice.id = parseInt(resp.data.data.id);
				invoice.token = resp.data.data.token;
				invoice.date = new Date(resp.data.data.invoice.date);
				invoice.due_date = new Date(resp.data.data.invoice.due_date);
				this.setState({
					invoice,
					fromData: resp.data.data.fromData,
					toData: resp.data.data.toData,
					paymentBankData: resp.data.data.paymentBankData,
					// editId: this.props.id
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
		invoice.template = data;
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
			[{ id: Date.now().toString(), name: '', desc: '', qty: 0, qty_type: 'unit', price: 0.00 }]
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
		return this.calcItemsTotal() * (this.state.invoice.tax / 100)
	}

	calcGrandTotal = () => {
		return this.calcItemsTotal() + this.calcTaxTotal();
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

	render = () => {
		const { title, tabs = [], currentTab, currentTabIndex } = this.state;
		return (
			<>

				<div className="row">
					<div className="col-md-6">
						<h1>Create Proposal</h1>
						<nav className='pi-breadcrumb'>
							<ul>
								<li>
									<a href='#' >
										Home
									</a>
								</li>
								<li>&gt;</li>
								<li className='pi-active'>
									Proposal
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

					{(currentTab == 'template') && <Template currentTemplate={this.state.invoice.template} changeHandler={this.handleTemplateChange} />}

					{(currentTab == 'info') && <div id="pi-informations" className="pi-invoice-tab-content">
						<div className="row">
							<div className="col-lg-9">
								<h2 className='pi-tab-content-title'>Add Content</h2>
								<div className="pi-info-content pi-bg-white">
									<div className="pi-add-info-content pi-bg-pearl">
										<h3 className="pi-color-blue pi-text-center">Proposal</h3>
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
															<label htmlFor="info-number">Proposal number:</label>
														</div>
														<div className="pi-info-input-field">
															<input
																type="number"
																name="invoice_id"
																value={this.props.id}
																readOnly
															/>
														</div>
													</div>

													<div className="row">
														<div className="pi-info-lavel">
															<label htmlFor="date">Proposal date:</label>
														</div>
														<div className="pi-info-input-field">
															<DateField date={this.state.invoice.date} type='date' onDateChange={this.onDateChange} />
														</div>
													</div>

													<div className="row">
														<div className="pi-info-lavel">
															<label htmlFor="due">Expired date:</label>
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
								</div>{/* ./ pi-info-content */}

								<Editor />

							</div>{/* ./ col-lg-9 */}

							<div className="col-lg-3">
								<div className="pi-right-sidebar" ref={this.sidebarRef} >
									<h2 className="pi-r-s-title pi-tab-content-title">Setings</h2>
									<div className="pi-accordion-wrapper">
										<ul>
											<Suspense fallback={<Spinner />}>
												<Style handleChange={this.onStyleChange} data={this.state.invoice} />
												{this.props.path == 'invoice' && <Payment handleChange={this.onPaymentChange} data={this.state.invoice} handleSave={this.handleSave} />}
												{/* {!wage.length && <AdditionalAmount handleChange={this.onPaymentChange} data={this.state.invoice} />} */}
												{!wage.length &&
													<>
														<li>
															<input type="checkbox" defaultChecked="checked" />
															<i />
															<h3>Edit or create Client</h3>
															<div>
																<p>Upcoming</p>
															</div>
														</li>
														<li>
															<input type="checkbox" defaultChecked="checked" />
															<i />
															<h3>Additional Amount</h3>
															<div>
																<p>Upcoming</p>
															</div>
														</li>
														<li>
															<input type="checkbox" defaultChecked="checked" />
															<i />
															<h3>Reminder</h3>
															<div>
																<p>Upcoming</p>
															</div>
														</li>
														<li>
															<input type="checkbox" defaultChecked="checked" />
															<i />
															<h3>Recuring</h3>
															<div>
																<p>Upcoming</p>
															</div>
														</li>
														<li>
															<input type="checkbox" defaultChecked="checked" />
															<i />
															<h3>Crarge or Late Fee</h3>
															<div>
																<p>Upcoming</p>
															</div>
														</li>
													</>
												}
												{/* Others sidebar section */}
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