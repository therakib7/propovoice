import React, { Component } from 'react'
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import Api from 'api/invoice';

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
		if (this.props.id) {
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
				this.setState({
					invoice: resp.data.data.invoice,
					fromData: resp.data.data.fromData,
					toData: resp.data.data.toData,
					// editId: this.props.id
				});
			})
	};

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

	handleSignatureChange = (data) => {
		let invoice = { ...this.state.invoice }
		invoice.signature = data;
		this.setState({ invoice })
	}

	handleAttachmentsChange = (data) => {
		let invoice = { ...this.state.invoice }
		invoice.attachments.push(data);
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
		if (tab == 'info') {
			tab = 'template';
		} else if (tab == 'preview') {
			tab = 'info';
		}

		this.setState({
			currentTab: tab
		});
	}

	render = () => {
		const { tabs = [], currentTab } = this.state;
		return (
			<>
				<div className="row">
					<div className="col-md-6">
						<h1 className="">Create Invoice</h1>
						<nav className="pi-breadcrumb">
							<ul className="">
								<li>
									<a href="#" className="">
										Home
									</a>
								</li>
								<li>&gt;</li>
								<li className="active">
									<a href="#" className="">
										Invoice
									</a>
								</li>
							</ul>
						</nav>
					</div>
					<div className="col-md-6">
						<div className="pi-single-btn pi-text-right">
							<a className="pi-btn pi-border-blue pi-color-blue pi-bg-hover-blue pi-hover-color-white">
								Back
							</a>
							<a className="pi-btn pi-bg-blue pi-bg-hover-blue">
								Save &amp; Continue
							</a>
						</div>
					</div>
				</div>
				{/* ./row */}
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
										<h3 className="pi-color-blue pi-text-center">Invoice</h3>
										<div className="row">
											<div className="col-12 col-md-6">
												<div className="pi-info-logo">
													<img src="assets/img/pi-logo.png" className="" />
												</div>
												{/* ./ pi-content */}
											</div>
											{/* ./col */}
											<div className="col-12 col-md-6">
												<div className="pi-info-form">
													<div className="row">
														<div className="pi-info-lavel">
															<label htmlFor="fname">Invoice number :</label>
														</div>
														<div className="pi-fnfo-input-field">
															<input
																type="text"
																id="fname"
																name="firstname"
																placeholder={1}
															/>
														</div>
													</div>
													<div className="row">
														<div className="pi-info-lavel">
															<label htmlFor="lname">Invoice date :</label>
														</div>
														<div className="pi-fnfo-input-field">
															<input
																type="text"
																id="lname"
																name="lastname"
																placeholder="12-02-2022"
															/>
														</div>
													</div>
													<div className="row">
														<div className="pi-info-lavel">
															<label htmlFor="lname">Due date :</label>
														</div>
														<div className="pi-fnfo-input-field">
															<input
																type="text"
																id="lname"
																name="lastname"
																placeholder="12-02-2022"
															/>
														</div>
													</div>
												</div>
												{/* ./ pi-info-form */}
											</div>
											{/* ./col */}
										</div>
									</div>
									{/* ./ pi-add-info-content */}
									{/* pi-from-content*/}
									<div className="pi-from-content">
										<div className="row">
											<div className="col-lg-5">
												<select id="cars" name="carlist" form="carform">
													<option value="volvo">Sender : Nurency Digi...</option>
													<option value="saab">Saab</option>
													<option value="opel">Opel</option>
													<option value="audi">Audi</option>
												</select>
												<div className="pi-from pi-bg-air-white">
													<h4 className="from-title">
														Nurency digital agency{" "}
														<span>
															<svg
																width={12}
																height={12}
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
															Edit{" "}
														</span>
													</h4>
													<address>
														Email: hello@nurency.com
														<br />
														What'sApp: +8801760706361
														<br />
														Asia Address:
														<br />
														377 Airport - Dakshinkhan Rd, Dhaka 1230
													</address>
												</div>
											</div>
											<div className="col-lg-2" />
											<div className="col-lg-5">
												<div className="recive-content pi-float-right">
													<h4 className="recive-title">Reciver</h4>
													<div className="pi-to pi-bg-air-white">
														<address>
															Email: hello@nurency.com
															<br />
															What'sApp: +8801760706361
															<br />
															Asia Address:
															<br />
															377 Airport - Dakshinkhan Rd, Dhaka 1230
														</address>
													</div>
												</div>
												{/* ./ recive-content */}
											</div>
										</div>
									</div>
									{/* ./ pi-from-content */}
									<div className="info-table-content">
										<span className="edit-btn pi-float-right pi-color-blue pi-bg-air-white">
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
										<table className="info-table">
											<thead>
												<tr className="">
													<th>name &amp; details </th>
													<th>Unit</th>
													<th>
														Rate <span>USD ($)</span>
													</th>
													<th>Amount</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>
														<input type="text" id="fname" name="firstname" />
														<textarea
															id="details"
															name="details"
															rows={4}
															cols={25}
															defaultValue={
																"\t\t\t\t\t\t\t\t\t\t\t\t\tAt w3schools.com you will learn \n\t\t\t\t\t\t\t\t\t\t\t\t"
															}
														/>
													</td>
													<td>
														<input type="number" id="number" name="firstname" />
														<select id="cars" name="carlist" form="carform">
															<option value="volvo">page</option>
															<option value="saab">Saab</option>
															<option value="opel">Opel</option>
															<option value="audi">Audi</option>
														</select>
													</td>
													<td>
														<input
															type="number"
															id="number"
															name="firstname"
															placeholder={1}
														/>
														<select id="cars" name="carlist" form="carform">
															<option value="volvo">Fixed Price</option>
															<option value="saab">Saab</option>
															<option value="opel">Opel</option>
															<option value="audi">Audi</option>
														</select>
													</td>
													<td>
														$100{" "}
														<span>
															<svg
																width={10}
																height={10}
																viewBox="0 0 9 9"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	d="M8.07284 2.38745C8.07282 2.48303 8.03773 2.57528 7.97422 2.64671C7.9107 2.71814 7.82318 2.76377 7.72825 2.77496L7.68259 2.77769H7.35284L6.87245 7.66354C6.84629 7.92866 6.72246 8.17456 6.52505 8.35344C6.32764 8.53232 6.07075 8.63138 5.80435 8.63135H2.92669C2.66029 8.63138 2.4034 8.53232 2.20599 8.35344C2.00858 8.17456 1.88475 7.92866 1.85859 7.66354L1.3782 2.77769H1.04845C0.944948 2.77769 0.845688 2.73657 0.772503 2.66339C0.699318 2.5902 0.658203 2.49094 0.658203 2.38745C0.658203 2.28395 0.699318 2.18469 0.772503 2.1115C0.845688 2.03832 0.944948 1.9972 1.04845 1.9972H2.99967C2.99967 1.81783 3.035 1.64022 3.10364 1.47451C3.17228 1.3088 3.27288 1.15823 3.39972 1.0314C3.52655 0.904566 3.67712 0.803958 3.84283 0.735317C4.00854 0.666677 4.18615 0.631348 4.36552 0.631348C4.54489 0.631348 4.7225 0.666677 4.88821 0.735317C5.05392 0.803958 5.20449 0.904566 5.33132 1.0314C5.45816 1.15823 5.55876 1.3088 5.6274 1.47451C5.69604 1.64022 5.73137 1.81783 5.73137 1.9972H7.68259C7.78609 1.9972 7.88535 2.03832 7.95854 2.1115C8.03172 2.18469 8.07284 2.28395 8.07284 2.38745ZM5.24357 3.65574C5.17284 3.65574 5.10451 3.68135 5.05121 3.72784C4.9979 3.77433 4.96324 3.83855 4.95362 3.90862L4.95089 3.94842V6.68013L4.95362 6.71993C4.96326 6.78999 4.99793 6.85418 5.05123 6.90065C5.10453 6.94712 5.17286 6.97272 5.24357 6.97272C5.31428 6.97272 5.3826 6.94712 5.43591 6.90065C5.48921 6.85418 5.52388 6.78999 5.53352 6.71993L5.53625 6.68013V3.94842L5.53352 3.90862C5.5239 3.83855 5.48923 3.77433 5.43593 3.72784C5.38263 3.68135 5.3143 3.65574 5.24357 3.65574ZM3.48747 3.65574C3.41674 3.65574 3.34841 3.68135 3.29511 3.72784C3.24181 3.77433 3.20714 3.83855 3.19752 3.90862L3.19479 3.94842V6.68013L3.19752 6.71993C3.20716 6.78999 3.24183 6.85418 3.29513 6.90065C3.34844 6.94712 3.41676 6.97272 3.48747 6.97272C3.55818 6.97272 3.62651 6.94712 3.67981 6.90065C3.73311 6.85418 3.76778 6.78999 3.77742 6.71993L3.78015 6.68013V3.94842L3.77742 3.90862C3.7678 3.83855 3.73314 3.77433 3.67983 3.72784C3.62653 3.68135 3.5582 3.65574 3.48747 3.65574ZM4.36552 1.41184C4.21027 1.41184 4.06138 1.47351 3.9516 1.58329C3.84183 1.69306 3.78015 1.84195 3.78015 1.9972H4.95089C4.95089 1.84195 4.88921 1.69306 4.77944 1.58329C4.66966 1.47351 4.52077 1.41184 4.36552 1.41184Z"
																	fill="#718096"
																/>
															</svg>
														</span>
													</td>
												</tr>
												<tr>
													<td>
														<input type="text" id="fname" name="firstname" />
														<textarea
															id="details"
															name="details"
															rows={4}
															cols={25}
															defaultValue={
																"\t\t\t\t\t\t\t\t\t\t\t\t\tAt w3schools.com you will learn \n\t\t\t\t\t\t\t\t\t\t\t\t"
															}
														/>
													</td>
													<td>
														<input type="number" id="number" name="firstname" />
														<select id="cars" name="carlist" form="carform">
															<option value="volvo">page</option>
															<option value="saab">Saab</option>
															<option value="opel">Opel</option>
															<option value="audi">Audi</option>
														</select>
													</td>
													<td>
														<input
															type="number"
															id="number"
															name="firstname"
															placeholder={1}
														/>
														<select id="cars" name="carlist" form="carform">
															<option value="volvo">Fixed Price</option>
															<option value="saab">Saab</option>
															<option value="opel">Opel</option>
															<option value="audi">Audi</option>
														</select>
													</td>
													<td>
														$100{" "}
														<span>
															<svg
																width={9}
																height={9}
																viewBox="0 0 9 9"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	d="M8.07284 2.38745C8.07282 2.48303 8.03773 2.57528 7.97422 2.64671C7.9107 2.71814 7.82318 2.76377 7.72825 2.77496L7.68259 2.77769H7.35284L6.87245 7.66354C6.84629 7.92866 6.72246 8.17456 6.52505 8.35344C6.32764 8.53232 6.07075 8.63138 5.80435 8.63135H2.92669C2.66029 8.63138 2.4034 8.53232 2.20599 8.35344C2.00858 8.17456 1.88475 7.92866 1.85859 7.66354L1.3782 2.77769H1.04845C0.944948 2.77769 0.845688 2.73657 0.772503 2.66339C0.699318 2.5902 0.658203 2.49094 0.658203 2.38745C0.658203 2.28395 0.699318 2.18469 0.772503 2.1115C0.845688 2.03832 0.944948 1.9972 1.04845 1.9972H2.99967C2.99967 1.81783 3.035 1.64022 3.10364 1.47451C3.17228 1.3088 3.27288 1.15823 3.39972 1.0314C3.52655 0.904566 3.67712 0.803958 3.84283 0.735317C4.00854 0.666677 4.18615 0.631348 4.36552 0.631348C4.54489 0.631348 4.7225 0.666677 4.88821 0.735317C5.05392 0.803958 5.20449 0.904566 5.33132 1.0314C5.45816 1.15823 5.55876 1.3088 5.6274 1.47451C5.69604 1.64022 5.73137 1.81783 5.73137 1.9972H7.68259C7.78609 1.9972 7.88535 2.03832 7.95854 2.1115C8.03172 2.18469 8.07284 2.28395 8.07284 2.38745ZM5.24357 3.65574C5.17284 3.65574 5.10451 3.68135 5.05121 3.72784C4.9979 3.77433 4.96324 3.83855 4.95362 3.90862L4.95089 3.94842V6.68013L4.95362 6.71993C4.96326 6.78999 4.99793 6.85418 5.05123 6.90065C5.10453 6.94712 5.17286 6.97272 5.24357 6.97272C5.31428 6.97272 5.3826 6.94712 5.43591 6.90065C5.48921 6.85418 5.52388 6.78999 5.53352 6.71993L5.53625 6.68013V3.94842L5.53352 3.90862C5.5239 3.83855 5.48923 3.77433 5.43593 3.72784C5.38263 3.68135 5.3143 3.65574 5.24357 3.65574ZM3.48747 3.65574C3.41674 3.65574 3.34841 3.68135 3.29511 3.72784C3.24181 3.77433 3.20714 3.83855 3.19752 3.90862L3.19479 3.94842V6.68013L3.19752 6.71993C3.20716 6.78999 3.24183 6.85418 3.29513 6.90065C3.34844 6.94712 3.41676 6.97272 3.48747 6.97272C3.55818 6.97272 3.62651 6.94712 3.67981 6.90065C3.73311 6.85418 3.76778 6.78999 3.77742 6.71993L3.78015 6.68013V3.94842L3.77742 3.90862C3.7678 3.83855 3.73314 3.77433 3.67983 3.72784C3.62653 3.68135 3.5582 3.65574 3.48747 3.65574ZM4.36552 1.41184C4.21027 1.41184 4.06138 1.47351 3.9516 1.58329C3.84183 1.69306 3.78015 1.84195 3.78015 1.9972H4.95089C4.95089 1.84195 4.88921 1.69306 4.77944 1.58329C4.66966 1.47351 4.52077 1.41184 4.36552 1.41184Z"
																	fill="#718096"
																/>
															</svg>
														</span>
													</td>
												</tr>
											</tbody>
										</table>
										<button className="pi-btn pi-bg-air-white pi-bg-hover-blue pi-hover-color-white">
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
											Add a project
										</button>
										<div className="pi-amounting">
											<table>
												<tbody>
													<tr>
														<td>Subtotal</td>
														<td>57397.7 $</td>
													</tr>
													<tr>
														<td>Tax</td>
														<td>13%</td>
														<td>397.7 $%</td>
													</tr>
													<tr>
														<td>Total</td>
														<td>58797.7 $</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
									{/* ./ info-table-content */}
									<div className="pi-group-form">
										<div className="pi-group-input">
											<label htmlFor="fname">
												Add Note{" "}
												<span>
													<svg
														width={23}
														height={12}
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
												</span>
											</label>
											<input type="text" id="fname" name="firstname" />
										</div>
										<div className="pi-add-term">
											<div className="row">
												<div className="col-md-6">
													<label htmlFor="fname">
														Add Terms{" "}
														<span>
															<svg
																width={23}
																height={12}
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
														</span>
													</label>
												</div>
												<div className="col-md-6">
													<div className="pi-radio-group">
														<span>Term List Serial</span>
														<input type="radio" name="rb" id="rb1" />
														<label htmlFor="rb1">1.Letter</label>
														<input type="radio" name="rb" id="rb2" />
														<label htmlFor="rb2">a.text</label>
														<input type="radio" name="rb" id="rb3" />
														<label htmlFor="rb3">.dot</label>
													</div>
												</div>
											</div>
											<div className="pi-group-item pi-bg-air-white">
												<ul>
													<li>
														<input type="text" id="latter" name="latter" />
													</li>
												</ul>
												<button className="pi-group-btn">
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
													Add New Term
												</button>
											</div>
										</div>
										<button className="pi-group-btn pi-ml-10">
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
											Add New Group
										</button>
										<div className="pi-buttons">
											<div className="row">
												<div className="col-md-6">
													<button className="pi-btn pi-bg-air-white pi-bg-hover-blue pi-hover-color-white">
														<svg
															width={12}
															height={12}
															viewBox="0 0 12 12"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																fillRule="evenodd"
																clipRule="evenodd"
																d="M7.97636 1.90264C8.11473 1.75937 8.28025 1.6451 8.46326 1.56648C8.64626 1.48787 8.84309 1.44649 9.04226 1.44476C9.24143 1.44303 9.43895 1.48098 9.62329 1.5564C9.80764 1.63182 9.97512 1.7432 10.116 1.88404C10.2568 2.02488 10.3682 2.19236 10.4436 2.3767C10.519 2.56105 10.557 2.75857 10.5552 2.95774C10.5535 3.15691 10.5121 3.35374 10.4335 3.53674C10.3549 3.71975 10.2406 3.88527 10.0974 4.02364L7.84736 6.27364C7.56607 6.55484 7.18461 6.71282 6.78686 6.71282C6.38912 6.71282 6.00766 6.55484 5.72636 6.27364C5.58491 6.13702 5.39546 6.06142 5.19881 6.06313C5.00217 6.06484 4.81406 6.14372 4.675 6.28277C4.53594 6.42183 4.45707 6.60994 4.45536 6.80658C4.45365 7.00323 4.52925 7.19268 4.66586 7.33414C5.22845 7.89655 5.99137 8.21249 6.78686 8.21249C7.58236 8.21249 8.34528 7.89655 8.90786 7.33414L11.1579 5.08414C11.7043 4.51833 12.0067 3.76052 11.9999 2.97393C11.9931 2.18734 11.6775 1.4349 11.1213 0.87868C10.5651 0.322456 9.81266 0.00694867 9.02607 0.000113408C8.23948 -0.00672185 7.48167 0.295661 6.91586 0.842135L5.79086 1.96714C5.71923 2.03632 5.6621 2.11908 5.62279 2.21058C5.58348 2.30209 5.56279 2.4005 5.56193 2.50008C5.56106 2.59967 5.58004 2.69843 5.61775 2.7906C5.65546 2.88277 5.71115 2.96651 5.78157 3.03693C5.85199 3.10735 5.93573 3.16304 6.0279 3.20075C6.12007 3.23846 6.21883 3.25744 6.31841 3.25657C6.418 3.25571 6.51641 3.23502 6.60792 3.19571C6.69942 3.15641 6.78218 3.09927 6.85136 3.02764L7.97636 1.90264ZM4.22636 5.65264C4.50766 5.37143 4.88912 5.21346 5.28686 5.21346C5.68461 5.21346 6.06607 5.37143 6.34736 5.65264C6.41655 5.72427 6.49931 5.7814 6.59081 5.82071C6.68231 5.86002 6.78073 5.88071 6.88031 5.88157C6.9799 5.88244 7.07866 5.86346 7.17083 5.82575C7.263 5.78804 7.34674 5.73235 7.41716 5.66193C7.48758 5.59151 7.54327 5.50777 7.58098 5.4156C7.61869 5.32343 7.63767 5.22467 7.6368 5.12508C7.63594 5.0255 7.61525 4.92709 7.57594 4.83558C7.53663 4.74408 7.4795 4.66132 7.40786 4.59214C6.84528 4.02972 6.08236 3.71378 5.28686 3.71378C4.49137 3.71378 3.72845 4.02972 3.16586 4.59214L0.915865 6.84214C0.629334 7.11888 0.400787 7.44991 0.24356 7.81592C0.0863335 8.18193 0.00357472 8.57559 0.00011327 8.97393C-0.00334818 9.37227 0.0725569 9.76731 0.2234 10.136C0.374242 10.5047 0.597002 10.8396 0.87868 11.1213C1.16036 11.403 1.49531 11.6258 1.864 11.7766C2.23269 11.9274 2.62773 12.0033 3.02607 11.9999C3.42441 11.9964 3.81807 11.9137 4.18408 11.7564C4.55009 11.5992 4.88112 11.3707 5.15786 11.0841L6.28286 9.95914C6.3545 9.88995 6.41163 9.80719 6.45094 9.71569C6.49025 9.62419 6.51094 9.52577 6.5118 9.42619C6.51267 9.3266 6.49369 9.22784 6.45598 9.13567C6.41827 9.0435 6.36258 8.95976 6.29216 8.88934C6.22174 8.81892 6.138 8.76323 6.04583 8.72552C5.95366 8.68781 5.8549 8.66883 5.75531 8.6697C5.65573 8.67056 5.55731 8.69125 5.46581 8.73056C5.37431 8.76987 5.29155 8.827 5.22236 8.89864L4.09736 10.0236C3.95899 10.1669 3.79348 10.2812 3.61047 10.3598C3.42747 10.4384 3.23064 10.4798 3.03147 10.4815C2.8323 10.4832 2.63478 10.4453 2.45043 10.3699C2.26609 10.2944 2.09861 10.1831 1.95777 10.0422C1.81693 9.90139 1.70555 9.73391 1.63013 9.54957C1.55471 9.36522 1.51676 9.1677 1.51849 8.96853C1.52022 8.76936 1.5616 8.57254 1.64021 8.38953C1.71883 8.20652 1.8331 8.04101 1.97636 7.90264L4.22636 5.65264Z"
																fill="#18181B"
															/>
														</svg>
														Add Attachments
													</button>
													<p>
														Attachments item can be view only online from not in PDF
													</p>
												</div>
												<div className="col-md-6">
													<button className="pi-a-btn pi-btn pi-bg-air-white pi-bg-hover-blue pi-hover-color-white">
														<svg
															width={14}
															height={14}
															viewBox="0 0 14 14"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																d="M3.66824 10.0907C3.01193 10.0915 2.37842 9.85536 1.88909 9.42768C1.39976 9 1.08901 8.41081 1.01638 7.773C0.943746 7.13518 1.11434 6.49358 1.49547 5.97112C1.87661 5.44866 2.44148 5.08208 3.08188 4.94161C2.89659 4.09662 3.06217 3.21426 3.5422 2.48865C4.02223 1.76304 4.77738 1.25361 5.64153 1.07243C6.50568 0.891248 7.40804 1.05316 8.1501 1.52254C8.89217 1.99193 9.41315 2.73034 9.59844 3.57533H9.66507C10.4913 3.57451 11.2883 3.87392 11.9014 4.41541C12.5146 4.9569 12.9001 5.70185 12.9831 6.50564C13.0662 7.30943 12.8408 8.11472 12.3508 8.76517C11.8608 9.41562 11.1411 9.86483 10.3314 10.0256M8.99875 8.13612L6.99981 6.1815M6.99981 6.1815L5.00087 8.13612M6.99981 6.1815V13"
																stroke="#136ACD"
																strokeWidth="1.5"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
														</svg>
														Authorized Signature
													</button>
												</div>
											</div>
										</div>
									</div>
									{/* ./ pi-group-form */}
								</div>
								{/* ./ pi-info-content */}
							</div>
							{/* ./ col-lg-9 */}
							<div className="col-lg-3">
								<div className="pi-right-sidebar">
									<h2 className="pi-r-s-title">Preview invoice</h2>
									<img
										src="assets/img/invoice-three.png"
										className="pi-invoice-image"
									/>
								</div>
							</div>
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
			</>

		)
	}
}
export default Invoice; 