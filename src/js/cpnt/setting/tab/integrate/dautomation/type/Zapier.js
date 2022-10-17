import React, { Component } from "react";
import { toast } from "react-toastify";
import AppContext from "context/app-context";

export default class GoogleCalendar extends Component {
	constructor(props) {
		super(props);

		this.initialState = {
			name: "",
			url: "",
			actions: "", 
		};

		this.state = {
			form: this.initialState,
		};
	}

	static contextType = AppContext;

	handleChange = (e) => {
		const { name } = e.target;
		const value = name === "auth" ? e.target.checked : e.target.value;
		this.setState({ form: { ...this.state.form, [name]: value } });
	}; 

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		this.props.getAll("settings", "tab=automation_zapier").then((resp) => {
			if (resp.data.success) {
				this.setState({ form: resp.data.data });
			}
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		let form = this.state.form;
		form.tab = "automation_zapier";

		this.props.create("settings", form).then((resp) => {
			if (resp.data.success) {
				toast.success(ndpv.i18n.aUpd);
				this.props.close();
			} else {
				resp.data.data.forEach(function (value, index, array) {
					toast.error(value);
				});
			}
		});
	};

	render() {
		const i18n = ndpv.i18n;
		const { name, url, actions } = this.state.form;
		return (
			<form onSubmit={this.handleSubmit} className="pv-form-style-one">
				<h4
					className="pv-title-medium pv-mb-15"
					style={{ textTransform: "capitalize" }}
				>
					Zapier
				</h4>

				<div className="row">
					<div className="col-md">
						<label htmlFor="name">Name</label>

						<input
							id="name"
							type="text"
							required
							name="name"
							value={name}
							onChange={this.handleChange}
						/>
					</div>
				</div> 

				<div className="row">
					<div className="col-md">
						<label htmlFor="url">Webhook URL</label>

						<input
							id="url"
							type="text"
							required
							name="url"
							value={url}
							onChange={this.handleChange}
						/>
					</div>
				</div> 

				<div className="row">
					<div className="col">
						<button className="pv-btn pv-bg-blue pv-bg-hover-blue">
							{i18n.save}
						</button>
					</div>
				</div>
			</form>
		);
	}
}
