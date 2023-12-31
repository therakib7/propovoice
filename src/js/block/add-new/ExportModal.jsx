import React, { Component } from "react";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import api from "api";
import pro from "block/pro-alert";
import ProLabel from "block/pro-alert/label";

import WithRouter from "hoc/Router";
import { Add } from "block/icon";
class Form extends Component {
  csvLink = React.createRef();
  today = new Date();
  date =
    this.today.getFullYear() +
    "-" +
    (this.today.getMonth() + 1) +
    "-" +
    this.today.getDate();
  time =
    this.today.getHours() +
    "-" +
    this.today.getMinutes() +
    "-" +
    this.today.getSeconds();
  dateTime = this.date + "-" + this.time;
  constructor(props) {
    super(props);
    this.initialState = {
      id: null,
      title: "",
      first_name: "",
      org_name: "",
      person_id: null,
      org_id: null,
      email: "",
      mobile: "",
      lead_id: "",
      stage_id: "",
      budget: "",
      currency: "USD",
      probability: 50,
      tags: [],
      desc: "",
      date: "",
      active: false,
      actions: [],
    };

    this.state = {
      form: this.initialState,
      csvFile: false,
    };
  }

  handleCheckbox = (e, type, slug = "") => {
    const target = e.target;
    let actions = this.state.form.actions;
    const fields = Object.keys(this.props.fields).filter(
      (key) => key != "not_assign",
    );
    if (type == "action") {
      const { value } = e.target;
      if (target.checked) {
        actions.push(value);
      } else {
        actions.splice(actions.indexOf(value));
      }
    } else if (type == "group") {
      if (target.checked) {
        actions = actions.concat(fields);
      } else {
        actions = actions.filter((x) => !fields.includes(x));
      }
    } else if (type == "none") {
      actions = [];
    }
    actions = Array.from(new Set(actions));
    this.setState({ form: { ...this.state.form, ["actions"]: actions } });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const title = this.props.title.toLowerCase();

    const actions = {};
    for (const [key, value] of Object.entries(this.props.fields)) {
      if (this.state.form.actions.includes(key)) {
        actions[key] = value;
      }
    }
    const data = { fields: actions, title };

    api
      .add("export/csv", data, "pro")
      .then((res) => {
        this.setState({ csvFile: res.data }, () => {
          this.csvLink.current.link.click();
        });
        this.props.close();
      })
      .catch((error) => console.log(error.message));
  };

  render() {
    const fields = Object.fromEntries(
      Object.entries(this.props.fields).filter(
        ([key, value]) => key != "not_assign",
      ),
    );
    const i18n = ndpv.i18n;
    const form = this.state.form;
    let title = "";

    return (
      <div className="pv-overlay pv-show">
        <div className="pv-modal-content">
          <div className="pv-modal-header pv-gradient">
            <span className="pv-close" onClick={() => this.props.close()}>
              <Add />
            </span>
            <h2 className="pv-modal-title">
              {title} {this.props.title} {i18n.exp}
            </h2>
            <p>{sprintf(i18n.formDesc, this.props.title, i18n.exp)}</p>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="pv-content">
              <div className="pv-form-style-one">
                <div className="pv-field-checkbox">
                  <input
                    type="checkbox"
                    id="select-all"
                    name="mod"
                    value={"Select all"}
                    onChange={(e) => this.handleCheckbox(e, "group")}
                  />
                  <label htmlFor="select-all">Select all</label>
                </div>
                <div className="pv-import-from-gird">
                  {Object.entries(fields).map((data, i) => (
                    <div key={i} className="pv-field-checkbox">
                      <input
                        type="checkbox"
                        id={i}
                        name="action"
                        value={data[0]}
                        checked={
                          form.actions.includes(data[0]) ? "checked" : ""
                        }
                        onChange={(e) => this.handleCheckbox(e, "action")}
                      />
                      <label htmlFor={i}>{data[1]} </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="pv-modal-footer">
              <div className="row">
                <div className="col">
                  <button
                    type="reset"
                    className="pv-btn pv-text-hover-blue"
                    onClick={() => this.props.close()}
                  >
                    {i18n.cancel}
                  </button>
                </div>
                <div className="col">
                  <button
                    type="submit"
                    className="pv-btn pv-bg-blue pv-bg-hover-blue pv-btn-big pv-float-right pv-color-white"
                  >
                    {i18n.exp} <ProLabel blueBtn />
                  </button>
                </div>
                {this.state.csvFile && (
                  <div className="col">
                    <CSVLink
                      data={this.state.csvFile}
                      className="d-none"
                      filename={`${this.props.title}-${this.dateTime}.csv`}
                      ref={this.csvLink}
                    ></CSVLink>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default WithRouter(Form);
