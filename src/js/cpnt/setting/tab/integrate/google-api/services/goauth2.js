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
      api_key: "",
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
    const { client_id, client_secret, redirect_uri, api_key } = this.state.form;
    return (
      <form onSubmit={this.handleSubmit} className="pv-form-style-one">
        <h4
          className="pv-title-medium pv-mb-15"
          style={{ textTransform: "capitalize" }}
        >
          Add Google Auth
        </h4>
        <div className="row">
          <div className="col-md">
            <label htmlFor="client-id">Client ID</label>

            <input
              id="client_id"
              type="text"
              required
              name="client_id"
              placeholder="Enter Client ID"
              value={client_id}
              onChange={this.handleChange}
            />

            <p className="pv-google-p">Note: <a href="#https://developers.google.com/adwords/api/docs/guides/authentication">Click Here</a> to see how to obtain a google client ID and secrete</p>
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
              placeholder="Enter Client Secret"
              value={client_secret}
              onChange={this.handleChange}
            />
            <p className="pv-google-p">Note: <a href="#https://developers.google.com/adwords/api/docs/guides/authentication">Click Here</a> to see how to obtain a google client ID and secrete</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md">
            <label htmlFor="redirect-uri">Redirect URI</label>

            <input
              id="redirect_uri"
              type="text"
              name="redirect_uri"
              placeholder="Enter Redirect URI"
              value={redirect_uri}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <h4
          className="pv-title-medium pv-mt-15 pv-mb-15"
          style={{ textTransform: "capitalize" }}
        >
          Apps
        </h4>
        <div className="row">
          <div className="col-md">
            <div className="pv-google-app">
              <div className="pv-google-icon">
                <div className="pv-svg">
                  <svg
                    width={20}
                    height={17}
                    viewBox="0 0 20 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_7220_103625)">
                      <path
                        d="M11.313 8.22873L13.2625 10.4571L15.8839 12.1323L16.341 8.24245L15.8839 4.43945L13.2122 5.91128L11.313 8.22873Z"
                        fill="#00832D"
                      />
                      <path
                        d="M0 11.7696V15.0835C0 15.8412 0.613644 16.4548 1.37127 16.4548H4.68518L5.37081 13.9499L4.68518 11.7696L2.41115 11.084L0 11.7696Z"
                        fill="#0066DA"
                      />
                      <path
                        d="M4.68518 0L0 4.68518L2.41115 5.37081L4.68518 4.68518L5.35939 2.53457L4.68518 0Z"
                        fill="#E94235"
                      />
                      <path d="M4.68518 4.68555H0V11.7705H4.68518V4.68555Z" fill="#2684FC" />
                      <path
                        d="M18.8778 1.98491L15.8839 4.43948V12.1323L18.8916 14.5983C19.3418 14.9503 20 14.6292 20 14.0567V2.51513C20 1.93577 19.3269 1.61809 18.8778 1.98491ZM11.313 8.22876V11.7712H4.68518V16.4564H14.5126C15.2703 16.4564 15.8839 15.8428 15.8839 15.0851V12.1323L11.313 8.22876Z"
                        fill="#00AC47"
                      />
                      <path
                        d="M14.5126 0H4.68518V4.68518H11.313V8.22763L15.8839 4.44064V1.37127C15.8839 0.613644 15.2703 0 14.5126 0Z"
                        fill="#FFBA00"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_7220_103625">
                        <rect width={20} height="16.456" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h6>Google Meet</h6>
              </div>
              <span className="pv-field-switch-content">
                <label className="pv-field-switch pv-field-switch-big">
                  <input type='checkbox'
                    name='active'
                    // checked={item.active ? 'checked' : ''}
                    onChange={(e) => this.handleChange(e, i)}
                  />
                  <span className="pv-switch-slider pv-round" />
                </label>
              </span>
            </div>
            <div className="pv-google-app">
              <div className="pv-google-icon">
                <div className="pv-svg">
                  <svg
                    width={20}
                    height={18}
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_7220_103656)">
                      <path
                        d="M1.51273 15.3154L2.39472 16.8388C2.57798 17.1596 2.84143 17.4116 3.1507 17.5948L6.30064 12.1426H0.000762939C0.000762939 12.4977 0.0923975 12.8527 0.275667 13.1735L1.51273 15.3154Z"
                        fill="#0066DA"
                      />
                      <path
                        d="M10.0004 5.7296L6.85045 0.277344C6.54118 0.460613 6.27773 0.712608 6.09446 1.03333L0.275667 11.1131C0.095768 11.4269 0.00100246 11.7823 0.000762939 12.144H6.30064L10.0004 5.7296Z"
                        fill="#00AC47"
                      />
                      <path
                        d="M16.8501 17.5948C17.1593 17.4116 17.4228 17.1596 17.606 16.8388L17.9726 16.2089L19.7251 13.1735C19.9084 12.8527 20 12.4977 20 12.1426H13.6997L15.0403 14.7771L16.8501 17.5948Z"
                        fill="#EA4335"
                      />
                      <path
                        d="M10.0004 5.72911L13.1503 0.276857C12.8411 0.0935877 12.486 0.00195312 12.1194 0.00195312H7.88133C7.51479 0.00195312 7.15971 0.105042 6.85044 0.276857L10.0004 5.72911Z"
                        fill="#00832D"
                      />
                      <path
                        d="M13.7001 12.1426H6.30063L3.1507 17.5948C3.45996 17.7781 3.81505 17.8697 4.18158 17.8697H15.8192C16.1857 17.8697 16.5408 17.7666 16.8501 17.5948L13.7001 12.1426Z"
                        fill="#2684FC"
                      />
                      <path
                        d="M16.8157 6.07323L13.9063 1.03333C13.723 0.712608 13.4596 0.460613 13.1503 0.277344L10.0004 5.7296L13.7001 12.144H19.9885C19.9885 11.7889 19.8969 11.4338 19.7136 11.1131L16.8157 6.07323Z"
                        fill="#FFBA00"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_7220_103656">
                        <rect width={20} height="17.872" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h6>Google Drive</h6>
              </div>
              <span className="pv-field-switch-content">
                <label className="pv-field-switch pv-field-switch-big">
                  <input type='checkbox'
                    name='active'
                    // checked={item.active ? 'checked' : ''}
                    onChange={(e) => this.handleChange(e)}
                  />
                  <span className="pv-switch-slider pv-round" />
                </label>
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col" style={{ textAlign: "right" }} >
            <button className="pv-btn pv-btn-big pv-bg-blue pv-bg-hover-blue">
              {i18n.save}
            </button>
          </div>
        </div>
      </form>
    );
  }
}
