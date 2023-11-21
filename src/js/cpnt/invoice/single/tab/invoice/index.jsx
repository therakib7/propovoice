import React, { Component, Suspense, lazy } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import ApiInv from "api/invoice";
import api from "api";

import ProLabel from "block/pro-alert/label";
import pro from "block/pro-alert";

import Spinner from "block/preloader/spinner";
//self component
import FromTo from "./FromTo";
import Items from "./Items";
import PaymentInfo from "./PaymentInfo";
import Total from "./Total";
const Section = lazy(() => import("./Section"));

import Template from "../template";
import Preview from "../preview";

// import Attach from './Attach';
const DateField = lazy(() => import("block/date-picker"));
// import Upload from "block/field/upload";
import Signature from "cpnt/media/Signature";

//sidebar section
const InvTemplate = lazy(() => import("inv-tmpl"));
const Style = lazy(() => import("./sidebar/Style"));
const Payment = lazy(() => import("./sidebar/Payment"));
const Currency = lazy(() => import("./sidebar/Currency"));
const ExtraAmount = lazy(() => import("./sidebar/ExtraAmount"));
const Reminder = lazy(() => import("./sidebar/Reminder"));
const Recurring = lazy(() => import("./sidebar/Recurring"));


class Invoice extends Component {
	constructor(props) {
		super(props);
		const i18n = ndpv.i18n;
		this.state = {
			preload: true,
			submitPreloader: false,
			title: "",
			tabs: [
				{
					id: "template",
					text: i18n.select + " " + i18n.tmpl,
				},
				{
					id: "info",
					text: i18n.add + " " + i18n.con,
				},
				{
					id: "preview",
					text: i18n.prv + " " + i18n.nd + " " + i18n.share,
				},
			],
			sidebarActive: "",
			currentTab: "",
			currentTabIndex: null,
			msg: {
				saveTxt: ndpv.i18n.save,
			},
			shareModal: false,
			emailModal: false,
			fromData: null,
			toData: null,
			paymentBankData: null,
			prefix: "",
			invoice: {
				id: null,
				num: "",
				token: "",
				style: {
					primary_color: "#4c6fff",
					body_font: "",
					title_font: "",
				},
				date: new Date(),
				due_date: new Date(),
				currency: "USD",
				lang: "en",
				template: null,
				from: null,
				to: null,
				to_type: "", //person, 'org'
				module_id: null,
				project: {
					id: null,
					title: "",
					desc: "",
				},
				top_sections: null,
				item_label: {
					id: i18n.id,
					desc: i18n.desc,
					qty: i18n.qty,
					price: i18n.rate,
					tax: i18n.tax,
					amount: i18n.amt
				},
				items: [
					{
						id: "init", //react-beautiful-dnd unique key
						title: "",
						desc: "",
						qty: 1,
						qty_type: "",
						price: 0,
						tax: 0,
						tax_type: "fixed",
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
					after: [],
				},
				//TODO: move the the field in single, if always not needed
				recurring: {
					status: false,
					interval_type: "week",
					interval_in: "month", //1=day, 2=month, 3=year
					interval: 1,
					limit_type: 0,
					limit: 5,
					subscription: false,
					send_me: false,
					delivery: 1, //1=auto, 0=manual
				},
				sections: null,
				attach: [],
				sign: null,
			},
			wc: false,
			previewHeight: "",
			previewScale: ""
		};

		this.setSidebarActive = this.setSidebarActive.bind(this);

		this.sidebarRef = React.createRef();
		this.reminderRef = React.createRef();
		this.recurringRef = React.createRef();
	}

	isPrvwLoad = () => {
		// let sidebarRef = this.sidebarRef.current;
		//TODO: ref not working
		let sidebarRef = document.getElementById("pv-right-sidebar");
		if (sidebarRef) {
			setTimeout(() => {
				let scale = Math.min(
					sidebarRef.clientWidth / 796,
					sidebarRef.clientHeight / 1122
				);
				if (this.state.previewScale != scale) {
					this.setState({ previewScale: scale });
				}
			}, 700);
		}
	};

	componentDidMount() {
		let title = this.props.path == "invoice" ? ndpv.i18n.inv : ndpv.i18n.est;

		let path = this.props.path == "invoice" ? "invoice" : "estimate";

		if (this.props.id) {
			if (this.props.tab == "preview") {
				this.setState({
					title,
					currentTab: "preview",
					currentTabIndex: 2,
				});
			} else {
				this.setState({
					title,
					currentTab: "info",
					currentTabIndex: 1,
				});
			}

			this.updateEdit();
			this.getData(this.props.id, true); //edit
		} else {
			//set future due date
			this.getData(0 + "?path=" + path, false); //new
			let date = new Date();
			let dueDate = new Date(date);
			dueDate.setDate(dueDate.getDate() + 30);

			let invoice = { ...this.state.invoice };
			invoice.due_date = dueDate;
			invoice.path = path;

			//deal, project id
			if (this.props.module_id) {
				invoice.module_id = parseInt(this.props.module_id);
			}

			this.setState({
				title,
				currentTab: "template",
				currentTabIndex: 0,
				invoice,
			});
		}

		this.bgColor();
	}

	componentDidUpdate() {
		this.isPrvwLoad();
		this.bgColor();
	}

	componentWillUnmount() {
		document.body.style.backgroundColor = "#fff";
	}

	bgColor = () => {
		if (this.state.currentTab == "info" || this.state.currentTab == "preview") {
			document.body.style.backgroundColor = "#f7f8fa";
		} else {
			document.body.style.backgroundColor = "#fff";
		}
	};

	updateEdit = (data = "") => {
		let msg = { ...this.state.msg };
		msg.saveTxt = ndpv.i18n.upd;
		if (data) {
			let invoice = { ...this.state.invoice };
			invoice.id = data.id;
			invoice.token = data.token;
			if (data.auto_id) {
				invoice.num = data.auto_id;
			}
			this.setState({ msg, invoice });
		} else {
			this.setState({ msg });
		}
	};

	getData = (id, edit) => {
		api.getS("invoices", id).then((resp) => {
			let data = resp.data.data;
			if (edit) {
				//edit
				let invoice = data.invoice;
				invoice.id = parseInt(data.id);
				invoice.token = data.token;
				invoice.date = new Date(data.invoice.date);
				invoice.due_date = new Date(data.invoice.due_date);
				invoice.status = data.status;

				let payment_methods = data.invoice.payment_methods; //it's because wordpress empty object covnert to array
				if (Array.isArray(payment_methods) && !payment_methods.length) {
					invoice.payment_methods = {};
				}

				invoice.num = data.invoice.num
					? data.invoice.num
					: data.prefix + data.id;
				this.setState({
					preload: false,
					invoice,
					status: data.status,
					fromData: data.fromData,
					toData: data.toData,
					paymentBankData: data.paymentBankData,
					wc: data.wc,
				});
			} else {
				//new
				this.setState({
					preload: false,
					prefix: data.prefix,
					wc: data.wc,
				});
			}
		});
	};

	onNumChange = (e) => {
		if (wage.length > 0) {
			pro();
			return;
		}

		let invoice = { ...this.state.invoice };
		invoice.num = e.target.value;
		this.setState({ invoice });
	};

	onDateChange = (date, type = null) => {
		let invoice = { ...this.state.invoice };

		if (type == "date") {
			invoice.date = date;
		} else {
			invoice.due_date = date;
		}
		this.setState({ invoice });
	};

	currencyChange = (val, type) => {
		let invoice = { ...this.state.invoice };

		if (type == "lang") {
			invoice.lang = val;
		} else {
			invoice.currency = val;
		}
		this.setState({ invoice });
	};

	onCurrencyDefault = (data) => {
		let invoice = { ...this.state.invoice };
		invoice.currency = data.currency;
		invoice.lang = data.lang;
		this.setState({ invoice });
	};

	handleSetFrom = (data) => {
		let invoice = { ...this.state.invoice };
		invoice.from = data.id;
		this.setState({
			fromData: data,
			invoice,
		});
	};

	handleSetTo = (data) => {
		let invoice = { ...this.state.invoice };
		invoice.to = data.id;
		invoice.to_type = data.type;
		this.setState({
			toData: data,
			invoice,
		});
	};

	handleTemplateChange = (data, click = false) => {
		let invoice = { ...this.state.invoice };
		invoice.template = data.id;
		if (click) {
			this.setState({
				currentTab: "info",
				currentTabIndex: 1,
				invoice,
			});
		} else {
			this.setState({ invoice });
		}
	};

	handleSectionChange = (data, top = false) => {
		let invoice = { ...this.state.invoice };
		if (top) {
			invoice.top_sections = data;
		} else {
			invoice.sections = data;
		}
		this.setState({ invoice });
	};

	handleSignChange = (data, type = null) => {
		let invoice = { ...this.state.invoice };
		invoice.sign = data;
		this.setState({ invoice });
	};

	handleAttachChange = (data, type = null) => {
		let invoice = { ...this.state.invoice };
		if (type == "delete") {
			let index = invoice.attach.findIndex(function (o) {
				return o.id === data;
			});
			if (index !== -1) invoice.attach.splice(index, 1);
		} else {
			invoice.attach.push(data);
		}
		this.setState({ invoice });
	};

	itemTaxChange = (e) => {
		let invoice = { ...this.state.invoice };
		const target = e.target;
		const name = target.name;
		const value = target.type == "checkbox" ? target.checked : target.value;
		invoice[name] = value;
		this.setState({ invoice });
	};

	handleTotalChange = (e, item) => {
		const { value } = e.target;
		let invoice = { ...this.state.invoice };
		let index = invoice.extra_field.findIndex((x) => x.id == item.id);
		invoice.extra_field[index].val = value;
		this.setState({ invoice });
	};

	handleLineItemChange = (elementIndex) => (e) => {
		let invoice = { ...this.state.invoice };
		let items = this.state.invoice.items.map((item, i) => {
			if (elementIndex !== i) return item;
			return { ...item, [e.target.name]: e.target.value };
		});
		invoice.items = items;
		this.setState({ invoice });
	};

	// handle data changes for single item
	handleItemsValue = (elementIndex, data) => {
		let invoice = { ...this.state.invoice };
		let items = this.state.invoice.items.map((item, i) => {
			if (elementIndex !== i) return item;
			return { ...item, ...data };
		});
		invoice.items = items;
		this.setState({ invoice });
	}

	handleAddLineItem = (e) => {
		let invoice = { ...this.state.invoice };
		invoice.items = invoice.items.concat([
			{
				id: Date.now().toString(),
				title: "",
				desc: "",
				qty: 0,
				qty_type: "",
				price: 0,
				tax: 0,
				tax_type: "fixed",
			},
		]);
		this.setState({ invoice });
	};

	handleRemoveLineItem = (elementIndex) => (e) => {
		let invoice = { ...this.state.invoice };
		invoice.items = invoice.items.filter((item, i) => {
			return elementIndex !== i;
		});
		this.setState({ invoice });
	};

	handleReorderItems = (newItems) => {
		let invoice = { ...this.state.invoice };
		invoice.items = newItems;
		this.setState({ invoice });
	};

	handleFocusSelect = (e) => {
		e.target.select();
	};

	handleSave = () => {
		let editId = this.props.id;
		this.setState({ submitPreloader: true });
		if (!editId) {
			let invoice = { ...this.state.invoice };

			ApiInv.create(invoice).then((resp) => {
				this.setState({ submitPreloader: false });
				if (resp.data.success) {
					this.updateEdit(resp.data.data);
					this.props.routeChange(resp.data.data.id);

					toast.success(ndpv.i18n.aAdd, {
						position: toast.POSITION.BOTTOM_RIGHT,
					});
					this.continueTab("info");
				} else {
					resp.data.data.forEach(function (value) {
						toast.error(value);
					});
				}
			});
		} else {
			ApiInv.update(editId, this.state.invoice).then((resp) => {
				this.setState({ submitPreloader: false });
				if (resp.data.success) {
					toast.success(ndpv.i18n.aUpd, {
						position: toast.POSITION.BOTTOM_RIGHT,
					});
					this.continueTab("info");
				} else {
					resp.data.data.forEach(function (value) {
						toast.error(value);
					});
				}
			});
		}
	};

	handleRemoveSign = () => {
		const invoice = { ...this.state.invoice }
		invoice.sign = null
		this.setState({ invoice })
	}

	formatCurrency = (amount) => {
		const { currency, lang } = this.state.invoice;
		return new Intl.NumberFormat(lang, {
			style: "currency",
			currency: currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
		}).format(amount);
	};

	setActiveTab(e, id, index) {
		e.preventDefault();

		if (id != "preview") {
			let edit = true;
			switch (this.state.status) {
				case "accept":
				case "decline":
				case "paid":
					if (this.props.path == "invoice") {
						toast.error("Paid Invoice is not editable");
					} else if (this.props.path == "estimate") {
						toast.error("Accepted or Declined Estimate is not editable");
					}
					edit = false;
					break;
			}

			if (!edit) {
				return;
			}
		}

		if (id == "preview") {
			if (!this.state.invoice.to) {
				toast.error(ndpv.i18n.receiver_missing); return;
			}
			this.handleSave();
		}

		const state = {
			currentTab: id,
			currentTabIndex: index,
		};

		if (id == "info") {
			state.sidebarActive = "";
		}

		this.setState(state);
	}

	backTab = () => {
		let tab = this.state.currentTab;
		if (tab == "info") {
			tab = "template";
		} else if (tab == "preview") {
			tab = "info";
		}

		this.setState({
			currentTab: tab,
		});
	};

	editTab = () => {
		this.setState({
			currentTab: "info",
			currentTabIndex: 1,
		});
		window.scrollTo(0, 0);
	};

	continueTab = (param) => {
		let tab = this.state.currentTab;
		let tabIndex = 0;
		if (param == "template") {
			tab = "info";
			tabIndex = 1;
		} else if (param == "info") {
			tab = "preview";
			tabIndex = 2;
		}

		this.setState({
			currentTab: tab,
			currentTabIndex: tabIndex,
		});
	};

	setSidebarActive(id) {
		if (this.state.sidebarActive == id) {
			this.setState({ sidebarActive: "" });
		} else {
			this.setState({ sidebarActive: id });
		}
	}

	onStyleChange = (data) => {
		let invoice = { ...this.state.invoice };
		invoice.style = data;

		this.setState({ invoice });
	};

	onItemLabelChange = (data) => {
		let invoice = { ...this.state.invoice };
		invoice.item_label = data;
		this.setState({ invoice });
	};

	onPaymentChange = (data, type, method = null) => {
		let invoice = { ...this.state.invoice };
		if (type == "method") {
			if (invoice.payment_methods.hasOwnProperty(data)) {
				// if payment method exist
				delete invoice.payment_methods[data];

				if (data == "bank") {
					this.setState({ invoice, paymentBankData: null });
				} else {
					this.setState({ invoice });
				}
			} else {
				if (method) {
					invoice.payment_methods[data] = method.id;
					if (method.type == "bank") {
						this.setState({ invoice, paymentBankData: method });
					} else {
						this.setState({ invoice });
					}
				} else {
					invoice.payment_methods[data] = null;
					this.setState({ invoice });
				}
			}
		} else {
			//type id
			invoice.payment_methods[data.type] = data.id;
			if (data.type == "bank") {
				this.setState({ invoice, paymentBankData: data });
			} else {
				this.setState({ invoice });
			}
		}
	};

	onExtraFieldChange = (i, item, type, type_val) => {
		let invoice = { ...this.state.invoice };
		let index = invoice.extra_field.findIndex((x) => x.id == item.id);
		if (type == "field") {
			if (index != -1) {
				// if payment method exist
				invoice.extra_field.splice(index, 1);
			} else {
				let data = {
					id: item.id,
					name: item.label,
					type: item.extra_amount_type,
					val: 0,
					val_type: item.val_type,
				};

				invoice.extra_field.splice(i, 0, data);
			}
			this.setState({ invoice });
		} else if (type == "type") {
			invoice.extra_field[index].val_type = type_val;
			this.setState({ invoice });
		} else if (type == "cal") {
			const name = type_val.target.name;
			const value = type_val.target.value;
			invoice.extra_field[index][name] = value;
			this.setState({ invoice });
		}
	};

	onReminderDefault = (data) => {
		let invoice = { ...this.state.invoice };
		invoice.reminder = data;
		this.setState({ invoice });
	};

	onReminderChange = (e, type) => {
		let invoice = { ...this.state.invoice };
		const target = e.target;
		const name = target.name;
		const value =
			name === "status" || name === "due_date" ? target.checked : target.value;

		if (wage.length > 0 && name == "status") {
			pro();
			return;
		}

		if (type) {
			//before, after
			let arr = invoice.reminder[type];
			if (target.checked) {
				arr.push(parseInt(value));
			} else {
				arr.splice(arr.indexOf(parseInt(value)), 1);
			}
		} else {
			invoice.reminder[name] = value;
		}

		this.setState({ invoice });
		if (name === "status" && value) {
			this.reminderRef.current.click();
		}
	};

	onRecurringChange = (e) => {
		let invoice = { ...this.state.invoice };
		const target = e.target;
		const name = target.name;
		const value = target.type == "checkbox" ? target.checked : target.value;

		if (wage.length > 0 && name == "status") {
			pro();
			return;
		}

		if (name == "subscription") {
			let payment = false;

			if (
				invoice.payment_methods.hasOwnProperty("paypal") &&
				invoice.payment_methods.paypal != null
			) {
				payment = true;
			} else if (
				invoice.payment_methods.hasOwnProperty("stripe") &&
				invoice.payment_methods.stripe != null
			) {
				payment = true;
			}

			if (!payment) {
				toast.error(
					'Please select Paypal or Stripe from "Payment Method" to active auto subscription'
				);
				return;
			}
		}

		invoice.recurring[name] = value;

		this.setState({ invoice });
		if (name === "status" && value) {
			this.recurringRef.current.click();
		}
	};

	render = () => {
		const {
			preload,
			title,
			tabs = [],
			currentTab,
			currentTabIndex,
			sidebarActive,
			invoice,
		} = this.state;

		const i18n = ndpv.i18n;
		return (
			<>
				<div>
					<div className="row">
						<div className="col-sm-6">
							<nav className="pv-breadcrumb">
								<ul className="">
									<li>
										<a href="#" className="">
											{i18n.home}
										</a>
									</li>
									<li>
										<svg width={5} height={10} viewBox="0 0 5 10" fill="none">
											<path
												d="M0.5 1.25L4.25 5L0.5 8.75"
												stroke="#718096"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</li>
									<li>
										<NavLink to={"/" + this.props.path}>{title}</NavLink>
									</li>
									<li>
										<svg width={5} height={10} viewBox="0 0 5 10" fill="none">
											<path
												d="M0.5 1.25L4.25 5L0.5 8.75"
												stroke="#718096"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</li>
									<li className="pv-active">
										{currentTab == "template" && i18n.select + " " + i18n.tmpl}
										{currentTab == "info" && i18n.add + " " + i18n.con}
										{currentTab == "preview" &&
											i18n.prv + " " + i18n.nd + " " + i18n.share}
									</li>
								</ul>
							</nav>
						</div>
						<div className="col-sm-6">
							<div className="pv-invoice-single-btn pv-text-right">
								{currentTab == "template" && (
									<button
										className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue pv-bg-shadow pv-color-white pv-mt-20"
										onClick={() => this.continueTab("template")}
									>
										{i18n.cont}
										<svg
											className="pv-mr-0 pv-ml-10 pv-mt-1"
											width={9}
											height={11}
											viewBox="0 0 6 9"
											fill="none"
										>
											<path
												d="M3.8 4.24267L0.5 0.942667L1.44267 0L5.68533 4.24267L1.44267 8.48533L0.5 7.54267L3.8 4.24267Z"
												fill="white"
											/>
										</svg>
									</button>
								)}

								{currentTab == "info" && (
									<button
										className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue pv-bg-shadow pv-color-white pv-mt-20"
										onClick={this.handleSave}
										disabled={this.state.submitPreloader}
									>
										{this.state.msg.saveTxt} {i18n.nd} {i18n.cont}
										<svg
											className="pv-mr-0 pv-ml-10 pv-mt-1"
											width={9}
											height={11}
											viewBox="0 0 6 9"
											fill="none"
										>
											<path
												d="M3.8 4.24267L0.5 0.942667L1.44267 0L5.68533 4.24267L1.44267 8.48533L0.5 7.54267L3.8 4.24267Z"
												fill="white"
											/>
										</svg>
									</button>
								)}

								{currentTab == "preview" && (
									<>
										<button
											className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue pv-bg-shadow pv-color-white pv-mt-20"
											onClick={() => this.setState({ emailModal: true })}
										>
											{i18n.send_email}
											<svg
												className="pv-mr-0 pv-ml-10"
												width={9}
												height={11}
												viewBox="0 0 6 9"
												fill="none"
											>
												<path
													d="M3.8 4.24267L0.5 0.942667L1.44267 0L5.68533 4.24267L1.44267 8.48533L0.5 7.54267L3.8 4.24267Z"
													fill="white"
												/>
											</svg>
										</button>
									</>
								)}
							</div>
						</div>
					</div>
					{/* ./row */}

					<div className="pv-single-tab-content">
						<div className="pv-single-tabs pv-text-center">
							{tabs.map((tab, index) => (
								<button
									key={index}
									className={
										"pv-tab-item tablink " +
										(index <= currentTabIndex ? "pv-active" : "")
									}
									onClick={(e) => this.setActiveTab(e, tab.id, index)}
								>
									{
										<span className="pv-single-tab-done">
											<svg
												width={12}
												height={11}
												viewBox="3.4 5.6 17.6 13.4"
												xmlSpace="preserve"
											>
												<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
											</svg>
										</span>
									}
									<span></span>
									{tab.text}
									{index < 2 && (
										<svg width={95} height={10} className="pv-arrow">
											<path
												d="M89.5 1l4 4m0 0l-4 4m4-4H1"
												stroke={index < currentTabIndex ? "#4c6fff" : "#E2E8F0"}
												strokeWidth={2}
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									)}
								</button>
							))}
						</div>

						{currentTab == "template" && (
							<Template
								path={this.props.path}
								currentTemplate={invoice.template}
								changeHandler={this.handleTemplateChange}
							/>
						)}

						{currentTab == "info" && (
							<div id="pv-tab-info" className="pv-invoice-tab-content">
								<div className="row">
									<div className="col-lg-9">
										<h2 className="pv-page-title">
											{i18n.addCon}
										</h2>
										<div className="pv-info-content pv-bg-white">
											<div className="pv-add-info-content">
												<h3 className="pv-color-blue pv-text-center">
													{this.props.path == "invoice" ? i18n.inv : i18n.est}
												</h3>
												<div className="row">
													<div className="col-12 col-md-6">
														<div className="pv-info-logo">
															{this.state.fromData &&
																this.state.fromData.logo && (
																	<img src={this.state.fromData.logo.src} />
																)}
															{false &&
																this.state.fromData &&
																!this.state.fromData.logo && (
																	<div className="pv-upload pv-cursor-pointer">
																		<svg
																			width={18}
																			height={18}
																			viewBox="0 0 18 18"
																			fill="none"
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
																			{i18n.upload} <br />
																			{i18n.logo}
																		</p>
																	</div>
																)}
														</div>
													</div>

													<div className="col-12 col-md-6">
														<div className="pv-info-form pv-form-style-one">
															<div className="pv-info-form-list">
																<div className="pv-info-lavel">
																	<label htmlFor="info-number">
																		{this.props.path == "invoice"
																			? i18n.inv_num
																			: i18n.est_num}
																		:
																	</label>
																</div>
																<div className="pv-info-input-field">
																	<input
																		type="text"
																		name="invoice_id"
																		value={invoice.num}
																		placeholder={
																			this.state.prefix
																				? this.state.prefix + "{id}"
																				: "{id}"
																		}
																		onChange={this.onNumChange}
																	/>
																</div>
															</div>

															<div className="pv-info-form-list">
																<div className="pv-info-lavel">
																	<label htmlFor="date">
																		{this.props.path == "invoice"
																			? i18n.inv_date
																			: i18n.est_date}
																		:
																	</label>
																</div>
																<div className="pv-info-input-field">
																	<DateField
																		date={invoice.date}
																		type="date"
																		onDateChange={this.onDateChange}
																	/>
																</div>
															</div>

															<div className="pv-info-form-list">
																<div className="pv-info-lavel">
																	<label htmlFor="due">{i18n.due_date}:</label>
																</div>
																<div className="pv-info-input-field">
																	<DateField
																		date={invoice.due_date}
																		type="due_date"
																		onDateChange={this.onDateChange}
																	/>
																</div>
															</div>
														</div>
														{/* ./ pv-info-form */}
													</div>
												</div>
											</div>
											{/* ./ pv-add-info-content */}
											<FromTo
												setFrom={this.handleSetFrom}
												setTo={this.handleSetTo}
												fromData={this.state.fromData}
												toData={this.state.toData}
												editId={this.props.id}
												moduleId={this.props.module_id}
												module={this.props.module}
											/>

											<Suspense fallback={<Spinner />}>
												<Section
													data={invoice.top_sections}
													top
													changeHandler={this.handleSectionChange}
													default={[
														{
															label: ndpv.i18n.title,
															content: "",
														},
													]}
												/>
											</Suspense>

											<Items
												items={invoice.items}
												item_label={invoice.item_label}
												currency={invoice.currency}
												labelChange={this.onItemLabelChange}
												item_tax={invoice.item_tax}
												currencyFormatter={this.formatCurrency}
												addHandler={this.handleAddLineItem}
												changeHandler={this.handleLineItemChange}
												handleItemsValue={this.handleItemsValue}
												focusHandler={this.handleFocusSelect}
												deleteHandler={this.handleRemoveLineItem}
												reorderHandler={this.handleReorderItems}
											/>

											<div className="pv-calculation">
												<div className="row">
													<div className="col-sm-4">
														<PaymentInfo data={this.state.paymentBankData} />
													</div>

													<div className="col-sm-8">
														<Total
															inv={invoice}
															currencyFormatter={this.formatCurrency}
															changeHandler={this.handleTotalChange}
															focusHandler={this.handleFocusSelect}
														/>
													</div>
												</div>
											</div>

											<Suspense fallback={<Spinner />}>
												<Section
													data={invoice.sections}
													changeHandler={this.handleSectionChange}
													default={[
														{
															label: ndpv.i18n.note,
															content: "",
														},
														{
															label: ndpv.i18n.termCondition,
															content: "",
														},
													]}
												/>
											</Suspense>

											<div className=" pv-inv-attachment pv-mt-30">
												<div className="row">
													<div className="col-md-6">
														{/* <Attach data={invoice.attach} changeHandler={this.handleAttachChange} /> */}
													</div>

													<div className="col-md-6 pv-text-right">
														<Signature
															data={this.state.invoice.sign}
															changeHandler={this.handleSignChange}
															handleRemoveSign={this.handleRemoveSign}
														/>
													</div>
												</div>
											</div>
										</div>
										{/* ./ pv-info-content */}
									</div>
									{/* ./ col-lg-9 */}

									<div className="col-lg-3">
										<div
											id="pv-right-sidebar"
											className="pv-right-sidebar"
											ref={this.sidebarRef}
										>
											<h2
												className="pv-title-medium"
												style={{ fontSize: "18px" }}
											>
												{i18n.tmpl_prv}
											</h2>

											<div
												className="pv-inv-sidebar-preview"
												style={{
													transformOrigin: "top left",
													marginBottom:
														"calc((" +
														this.state.previewScale +
														" - 1) * 1120px)",
													transform: "scale(" + this.state.previewScale + ")",
													display: (this.state.previewScale ? 'block' : 'none')
												}}
											>
												<InvTemplate
													key={invoice.style.primary_color}
													data={this.state}
													isPrvwLoad={this.isPrvwLoad}
												/>
											</div>

											<div className="pv-accordion-wrapper pv-mt-15">
												<ul>
													<Suspense>
														{(!sidebarActive || sidebarActive == "style") && (
															<li>
																<input
																	type="checkbox"
																	defaultChecked="checked"
																	onClick={() => this.setSidebarActive("style")}
																/>
																<i />
																<h3 className="pv-title-small">
																	{i18n.edit} {i18n.style}
																</h3>
																<Style
																	handleChange={this.onStyleChange}
																	data={invoice}
																/>
															</li>
														)}

														{(!sidebarActive || sidebarActive == "payment") &&
															this.props.path == "invoice" && (
																<li>
																	<input
																		type="checkbox"
																		defaultChecked="checked"
																		onClick={() =>
																			this.setSidebarActive("payment")
																		}
																	/>
																	<i />
																	<h3 className="pv-title-small">
																		{i18n.payment} {i18n.method}
																	</h3>
																	<Payment
																		handleChange={this.onPaymentChange}
																		wc={this.state.wc}
																		data={invoice}
																		subs={invoice.recurring.subscription}
																	/>
																</li>
															)}

														{(!sidebarActive ||
															sidebarActive == "currency") && (
																<li>
																	<input
																		type="checkbox"
																		defaultChecked="checked"
																		onClick={() =>
																			this.setSidebarActive("currency")
																		}
																	/>
																	<i />
																	<h3 className="pv-title-small">{i18n.cur}</h3>
																	<Currency
																		{...this.props}
																		currency={invoice.currency}
																		handleDefault={this.onCurrencyDefault}
																		lang={invoice.lang}
																		onChange={this.currencyChange}
																	/>
																</li>
															)}

														<ExtraAmount
															{...this.props}
															sidebar={sidebarActive}
															setSidebar={this.setSidebarActive}
															item_tax={invoice.item_tax}
															itemTaxChange={this.itemTaxChange}
															handleChange={this.onExtraFieldChange}
															data={invoice.extra_field}
														/>

														{(!sidebarActive ||
															sidebarActive == "reminder") && (
																<li>
																	<input
																		type="checkbox"
																		ref={this.reminderRef}
																		defaultChecked
																		onClick={() =>
																			this.setSidebarActive("reminder")
																		}
																	/>
																	<i />
																	<h3 className="pv-title-small">
																		{i18n.rem}
																		<ProLabel />
																		<span className="pv-field-switch-content">
																			<label className="pv-field-switch pv-field-switch-big">
																				<input
																					type="checkbox"
																					id="reminder-status"
																					name="status"
																					checked={
																						invoice.reminder.status
																							? "checked"
																							: ""
																					}
																					onChange={this.onReminderChange}
																				/>
																				<span className="pv-switch-slider pv-round" />
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
																</li>
															)}

														{(!sidebarActive || sidebarActive == "recurring") &&
															this.props.path == "invoice" && (
																<li>
																	<input
																		type="checkbox"
																		ref={this.recurringRef}
																		defaultChecked="checked"
																		onClick={() =>
																			this.setSidebarActive("recurring")
																		}
																	/>
																	<i />
																	<h3 className="pv-title-small">
																		{i18n.recur}
																		<ProLabel />
																		<span className="pv-field-switch-content">
																			<label className="pv-field-switch pv-field-switch-big">
																				<input
																					type="checkbox"
																					id="recurring-status"
																					name="status"
																					checked={
																						invoice.recurring.status
																							? "checked"
																							: ""
																					}
																					onChange={this.onRecurringChange}
																				/>
																				<span className="pv-switch-slider pv-round" />
																			</label>
																		</span>
																	</h3>
																	<Recurring
																		{...this.props}
																		handleChange={this.onRecurringChange}
																		data={invoice.recurring}
																	/>
																</li>
															)}
													</Suspense>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}

						{currentTab == "preview" && (
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
							/>
						)}
					</div>
				</div>
			</>
		);
	};
}
export default Invoice;
