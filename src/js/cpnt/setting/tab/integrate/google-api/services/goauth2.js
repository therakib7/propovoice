import React, { Component } from "react";
import { toast } from "react-toastify";
import AppContext from "context/app-context";

export default class GOAuth2 extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      client_id: "",
      client_secret: "",
      redirect_uri: "",
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

  toggleChange = () => {
    let value = !this.state.form.default;
    this.setState({ form: { ...this.state.form, ["default"]: value } });
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.props.getAll("settings", "tab=google_api_oauth2").then((resp) => {
      if (resp.data.success) {
        this.setState({ form: resp.data.data });
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let form = this.state.form;
    form.tab = "google_api_oauth2";

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
    const { client_id, client_secret, redirect_uri } = this.state.form;
    return (
      <form onSubmit={this.handleSubmit} className="pv-form-style-one">
        <h4
          className="pv-title-medium pv-mb-15"
          style={{ textTransform: "capitalize" }}
        >
          Google OAuth2 API
        </h4>
        <div className="row">
          <div className="col-md">
            <label htmlFor="client-id">Client ID</label>

            <input
              id="client_id"
              type="text"
              required
              name="client_id"
              value={client_id}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md">
            <label htmlFor="client-secret">Client Secret</label>

            <input
              id="client_secret"
              type="text"
              required
              name="client_secret"
              value={client_secret}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md">
            <label htmlFor="redirect-uri">Redirect URI</label>

            <input
              id="redirect_uri"
              type="text"
              name="redirect_uri"
              value={redirect_uri}
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
