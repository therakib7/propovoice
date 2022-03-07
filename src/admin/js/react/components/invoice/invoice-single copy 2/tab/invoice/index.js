import React, { Component } from 'react'
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import Api from 'api/invoice';

import FromTo from './FromTo';
import Items from './Items'
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
				attach: [],
				sign: null

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

	handleSignChange = (data) => {
		let invoice = { ...this.state.invoice }
		invoice.sign = data;
		this.setState({ invoice })
	}

	handleAttachChange = (data) => {
		let invoice = { ...this.state.invoice }
		invoice.attach.push(data);
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
			<div className='ncpi-components'>
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
										<form action="/action_page.php" className="pi-info-form">
											<div className="row">
												<div className="p-info-lavel">
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
												<div className="p-info-lavel">
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
												<div className="p-info-lavel">
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
										</form>
										{/* ./ pi-info-form */}
									</div>
									{/* ./col */}
								</div>
							</div>
							{/* ./ pi-add-info-content */}
							{/* pi-from-content*/}
							<div className="pi-from-content">
								<div className="row">
									<div className="col-md-6">
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
									<div className="col-md-6">
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
								<table className="info-table">
									<tbody>
										<tr className="">
											<th>name &amp; details </th>
											<th>Unit</th>
											<th>
												Rate <span>USD ($)</span>
											</th>
											<th>Amount</th>
										</tr>
										<tr>
											<td>
												<input
													type="text"
													id="fname"
													name="firstname"
													placeholder={1}
												/>
											</td>
											<td>
												<input
													type="text"
													id="fname"
													name="firstname"
													placeholder={1}
												/>
												<select id="cars" name="carlist" form="carform">
													<option value="volvo">Sender : Nurency Digi...</option>
													<option value="saab">Saab</option>
													<option value="opel">Opel</option>
													<option value="audi">Audi</option>
												</select>
											</td>
											<td>
												<input
													type="text"
													id="fname"
													name="firstname"
													placeholder={1}
												/>
												<select id="cars" name="carlist" form="carform">
													<option value="volvo">Sender : Nurency Digi...</option>
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
										<tr>
											<td>Lois</td>
											<td>Griffin</td>
											<td>$150</td>
											<td>$150</td>
										</tr>
									</tbody>
								</table>
							</div>
							{/* ./ info-table-content */}
						</div>
						{/* ./ pi-info-content */}
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
			</div>
		)
	}
}
export default Invoice; 