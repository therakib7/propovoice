import React, { Component, Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import Select from "react-select";
import ReactToPrint from "react-to-print";
import Spinner from "block/preloader/spinner";
// import Template from 'inv-tmpl';
import ApiInv from "api/invoice";
import api from "api";
import InvTemplate from "inv-tmpl";

import Feedback from "./Feedback";
//payment
const Bank = lazy(() => import("./payment/bank"));
const Stripe = lazy(() => import("./payment/stripe"));
const Paypal = lazy(() => import("./payment/paypal"));
// import Bank from './payment/bank';
// //TODO do it on lazy load
// import Stripe from './payment/stripe';
// import Paypal from './payment/paypal';

const EditDownload = (props) => {
	const i18n = ndpv.i18n;
	return (
		<>
			<ReactToPrint
				content={() => props.componentRef}
				trigger={() => (
					<button
						className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-hover-stroke pv-bg-shadow pv-mr-5"
					// style={{ color: '#000', marginRight: '5px' }}
					// onClick={() => props.handleDownload()}
					>
						<svg width={12} height={14} viewBox="0 0 12 14" fill="none">
							<path
								d="M6.667 7h2L6 9.668 3.333 7.001h2V4.334h1.334v2.667zM8 1.668H1.333v10.667h9.334v-8H8V1.667zM0 .995C0 .63.298.334.666.334h8L12 3.667v9.329a.666.666 0 01-.662.671H.662A.666.666 0 010 13.006V.996z"
								fill="#2D3748"
							/>
						</svg>
						{i18n.down}
					</button>
				)}
			/>

			<ReactToPrint
				content={() => props.componentRef}
				// pageStyle="@page { size: 2.5in 4in }"
				trigger={() => (
					<button
						className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-hover-stroke pv-bg-shadow pv-mr-5"
					// style={{ color: '#000', marginRight: '5px' }}
					// onClick={() => props.handlePrint()}
					>
						<svg width={15} height={14} viewBox="0 0 15 14" fill="none">
							<path
								d="M3.5 11.667h-2a.667.667 0 01-.667-.666V4.334a.667.667 0 01.667-.667h2V1.001a.667.667 0 01.667-.667h6.666a.667.667 0 01.667.667v2.666h2a.666.666 0 01.667.667v6.667a.667.667 0 01-.667.666h-2v1.334a.667.667 0 01-.667.666H4.167a.667.667 0 01-.667-.666v-1.334zm0-1.333v-.667a.667.667 0 01.667-.666h6.666a.667.667 0 01.667.666v.667h1.333V5.001H2.167v5.333H3.5zm1.333-8.667v2h5.334v-2H4.833zm0 8.667v2h5.334v-2H4.833zm-2-4.667h2v1.334h-2V5.667z"
								fill="#2D3748"
							/>
						</svg>
						{i18n.print}
					</button>
				)}
			/>
		</>
	);
};

const InvoiceBtn = (props) => {
	if (!props.type) return null;
	const wc = props.wc;
	const payment_methods = props.payment_methods.list;
	const selected_method = props.payment_methods.selected;
	const changeMethod = props.payment_methods.changeMethod;
	let status = props.status;
	if (
		status == "accept" ||
		status == "decline" ||
		status == "overdue" ||
		status == "paid_req" ||
		status == "paid"
	) {
		return null;
	}
	const i18n = ndpv.i18n;
	return (
		<>
			{props.type == "estimate" && (
				<>
					<button
						className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue pv-bg-shadow pv-color-white"
						onClick={() => props.handleChange("feedback", "accept")}
						style={{ marginRight: "5px" }}
					>
						{i18n.acpt}
					</button>

					<button
						className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-hover-stroke pv-bg-shadow"
						style={{ color: "#000" }}
						onClick={() => props.handleChange("feedback", "decline")}
					>
						{i18n.dec}
					</button>
				</>
			)}

			{props.type == "invoice" && (
				<>
					{wc && !props.invoice.hasOwnProperty('recurring') ? <>
						<button
							className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue pv-bg-shadow pv-color-white"
							style={{ marginLeft: 10 }}
							onClick={() => props.handleChange('wc-order')}
						>
							{i18n.pay}
						</button>
					</> : <>
						{payment_methods.length > 0 &&
							<>
								<span>{i18n.pay} {!wc ? i18n.with : ''}:</span>
								<div style={{ width: "150px", marginLeft: 10, display: "inline-block" }}>
									<Select
										value={selected_method}
										onChange={changeMethod}
										getOptionValue={(payment_methods) => payment_methods.id}
										getOptionLabel={(payment_methods) => payment_methods.label}
										options={payment_methods}
									/>
								</div>

								<button
									className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue pv-bg-shadow pv-color-white"
									style={{ marginLeft: "10px" }}
									onClick={() => props.handleChange("payment", selected_method.id)}
								>
									{props.invoice.hasOwnProperty('recurring') ? i18n.subs : i18n.pay}
								</button>
							</>
						}
					</>}
				</>
			)}
		</>
	);
};

export default class Invoice extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: null,
			status: null,
			emailModal: false,
			paymentModal: false,
			payment_method: "",
			payment_methods: [],
			selected_payment_method: null,
			feedback: "",
			fromData: null,
			toData: null,
			invoice: {
				template: {
					id: null,
					img: "",
				},
				from: null,
				to: null,
				items: [],
				note: null,
				group: null,
				attach: [],
				sign: null,
			},
			previewHeight: "auto",
		};

		this.previewRef = React.createRef();
	}

	componentDidMount() {
		this.getData();
	}

	isPrvwLoad = () => {
		let previewRef = this.previewRef.current;
		if (previewRef) {
			let height;

			if (previewRef.clientHeight > 1123) {
				height = Math.ceil(previewRef.clientHeight / 1123) * 1123 + "px";
			} else {
				height = "1123px";
			}
			this.setState({ previewHeight: height });
		}
	};

	getData = () => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const id = urlParams.get("id");
		const token = urlParams.get("token");
		ApiInv.get(id + '?client_view=1&token=' + token).then((resp) => {
			let data = resp.data.data;
			let payment_methods = [];

			let paypal = {
				id: "paypal",
				label: "Paypal",
			};

			let stripe = {
				id: "stripe",
				label: "Stripe",
			};

			let bank = {
				id: "bank",
				label: "Bank",
			};

			if (!wage.length) {
				if (
					data.invoice.payment_methods.hasOwnProperty("paypal") &&
					data.invoice.payment_methods.paypal
				) {
					payment_methods.push(paypal);
				}

				if (
					data.invoice.payment_methods.hasOwnProperty("stripe") &&
					data.invoice.payment_methods.stripe
				) {
					payment_methods.push(stripe);
				}
			}

			if (
				data.invoice.payment_methods.hasOwnProperty("bank") &&
				data.invoice.payment_methods.bank &&
				!data.invoice.hasOwnProperty('recurring')
			) {
				payment_methods.push(bank);
			}

			data.payment_methods = payment_methods;

			if (
				!wage.length &&
				data.invoice.payment_methods.hasOwnProperty("paypal") &&
				data.invoice.payment_methods.paypal
			) {
				data.selected_payment_method = paypal;
			} else if (
				!wage.length &&
				data.invoice.payment_methods.hasOwnProperty("stripe") &&
				data.invoice.payment_methods.stripe
			) {
				data.selected_payment_method = stripe;
			} else if (
				data.invoice.payment_methods.hasOwnProperty("bank") &&
				data.invoice.payment_methods.bank
			) {
				data.selected_payment_method = bank;
			}

			data.invoice.id = data.id;

			this.setState(data);
		});
	};
	handleClick = (type, data = null) => {
		if (type == "feedback") {
			this.setState({ emailModal: true, feedback_type: data });
		} else if (type == `wc-order`) {
			this.reqWCOrder();
		} else {
			this.setState({ paymentModal: true, payment_method: data });
		}
	};

	getUrlParams = () => {
		const queryString = window.location.search;
		return new URLSearchParams(queryString);
	};

	reqWCOrder = () => {
		const urlParams = this.getUrlParams();
		const invoiceId = urlParams.get('id');
		api.get(`wc-order/${invoiceId}`, '', 'pro').then(res => {
			window.location.href = res.data;
			return null;
		})
			.catch((error) => console.log(error.message));
	};

	changePaymentMethod = (data) => {
		this.setState({ selected_payment_method: data });
	};

	handleSubmit = (status) => {
		this.setState({ status });
	};

	render() {
		return (
			<div>
				<ToastContainer hideProgressBar />
				<iframe
					id="ndpv-invoice-print"
					style={{
						margin: 0,
						padding: 0,
						height: 0,
						width: 0,
						position: "absolute",
					}}
				></iframe>
				<div className="row justify-content-md-center">
					<div className="col-md-8 pv-no-print" style={{ margin: "30px 0" }}>
						<div className="" style={{ maxWidth: "794px", margin: "0 auto" }}>
							<div className="pv-float-left">
								<EditDownload componentRef={this.componentRef} />
							</div>
							<div className="pv-float-right">
								<InvoiceBtn
									status={this.state.status}
									handleChange={this.handleClick}
									type={this.state.invoice.path}
									invoice={this.state.invoice}
									wc={this.state.wc}
									payment_methods={{
										list: this.state.payment_methods,
										selected: this.state.selected_payment_method,
										changeMethod: this.changePaymentMethod,
									}}
								/>
							</div>
						</div>
					</div>

					<div className="col-md-8">
						<div
							className="pv-inv-hidden-preview"
							style={{ position: "absolute", left: 9999 }}
							ref={this.previewRef}
						>
							{this.state.fromData && (
								<InvTemplate data={this.state} isPrvwLoad={this.isPrvwLoad} />
							)}
						</div>

						<div className="pv-inv-preview-wrap">
							<div
								className="pv-inv-preview"
								ref={(response) => (this.componentRef = response)}
							>
								{this.state.fromData && (
									<InvTemplate
										data={this.state}
										height={this.state.previewHeight}
									/>
								)}
							</div>
						</div>
					</div>

					<div className="col-md-8 pv-no-print" style={{ margin: "30px 0" }}>
						<div className="" style={{ maxWidth: "794px", margin: "0 auto" }}>
							<div className="pv-float-left">
								<EditDownload componentRef={this.componentRef} />
							</div>
							<div className="pv-float-right">
								<InvoiceBtn
									status={this.state.status}
									handleChange={this.handleClick}
									type={this.state.invoice.path}
									invoice={this.state.invoice}
									wc={this.state.wc}
									payment_methods={{
										list: this.state.payment_methods,
										selected: this.state.selected_payment_method,
										changeMethod: this.changePaymentMethod,
									}}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* TODO: check this step for every component or pass show props */}
				{this.state.emailModal && (
					<Feedback
						show={this.state.emailModal}
						data={this.state}
						invoice_id={this.state.id}
						handleSubmit={this.handleSubmit}
						close={() => this.setState({ emailModal: false })}
					/>
				)}

				{this.state.paymentModal && (
					<>
						<Suspense fallback={<Spinner />}>
							{this.state.payment_method == "bank" && (
								<Bank
									show={this.state.paymentModal}
									invoice_id={this.state.id}
									handleSubmit={this.handleSubmit}
									close={() => this.setState({ paymentModal: false })}
								/>
							)}

							{this.state.payment_method == "paypal" && (
								<Paypal
									show={this.state.paymentModal}
									invoice={this.state.invoice}
									close={() => this.setState({ paymentModal: false })}
								/>
							)}
							{this.state.payment_method == "stripe" && (
								<Stripe
									show={this.state.paymentModal}
									invoice={this.state.invoice}
									close={() => this.setState({ paymentModal: false })}
								/>
							)}
						</Suspense>
					</>
				)}
			</div>
		);
	}
}
