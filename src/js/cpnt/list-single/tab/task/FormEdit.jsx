import React, { Component, lazy, Suspense } from "react";
import moment from "moment";
import { Add } from "block/icon";
import api from "api";
import { createEvent } from "api/gapi/gcalendar";

import Taxonomy from "block/field/taxonomy";
const DateField = lazy(() => import("block/date-picker"));
import Checklist from "./Checklist";
import Spinner from "block/preloader/spinner";
const Staff = lazy(() => import("block/staff"));
const Discussion = lazy(() => import("cpnt/list-single/tab/discussion"));

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      id: null,
      tab_id: this.props.tab_id,
      title: "",
      google_meet: "",
      status_id: null,
      type_id: null,
      priority_id: null,
      desc: "",
      note: "",
      checklist: null,
    };

    this.state = {
      form: this.initialState,
      dropdown: null,
    };
    this.timeout = 0;
  }

  myRef = React.createRef();

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ form: { ...this.state.form, [name]: value } }, () => {
      // let reload = name == "title" ? true : false;
      let reload = true;
      this.updateRequest(reload);
    });
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);

    //added this multiple place, because not working in invoice single
    this.editData();
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  componentDidUpdate() {
    this.editData();
  }

  handleClickOutside = (e) => {
    if (!this.myRef.current.contains(e.target)) {
      this.props.close();
    }
  };

  editData = () => {
    //condition added to stop multiple rendering
    if (this.props.modalType == "edit") {
      if (this.state.form.id != this.props.data.id) {
        this.setState({ form: this.props.data });
      }
    } else {
      if (this.state.form.id != null) {
        this.setState({ form: this.initialState });
      }
    }
  };

  handleChecklistChange = (data) => {
    let form = { ...this.state.form };
    form.checklist = data;
    this.setState({ form }, () => {
      this.updateRequest();
    });
  };

  updateRequest = (reload = false) => {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      let form = { ...this.state.form };
      let status_id = form.status_id.id;
      delete form.priority_id;
      delete form.status_id;
      delete form.type_id;

      if (form.start_date) {
        let startDate = moment(form.start_date).format("YYYY-MM-DD");
        form.start_date = startDate;
      }

      if (form.end_date) {
        let endDate = moment(form.end_date).format("YYYY-MM-DD");
        form.end_date = endDate;
      }

      api.edit("tasks", form.id, form).then((resp) => {
        if (resp.data.success && reload) {
          this.props.reload({ status_id });
        }
      });
    }, 300);
  };

  /* handleSubmit = (e) => {
    e.preventDefault();
    let form = { ...this.state.form };
    let status_id = form.status_id.id;
    delete form.priority_id;
    delete form.status_id;
    delete form.type_id;

    if (form.start_date) {
      let startDate = moment(form.start_date).format("YYYY-MM-DD");
      form.start_date = startDate;
    }

    if (form.end_date) {
      let endDate = moment(form.end_date).format("YYYY-MM-DD");
      form.end_date = endDate;
    }

    api.edit("tasks", form.id, form).then((resp) => {
      if (resp.data.success) {
        this.props.reload({ status_id });
      }
    });
  }; */
  handleSubmit = (e) => {
    e.preventDefault();
    let form = { ...this.state.form }

    if (form.status_id) {
      form.status_id = form.status_id.id;
    }
    if (form.priority_id) {
      form.priority_id = form.priority_id.id;
    }
    if (form.type_id) {
      form.type_id = form.type_id.id;
    }
    this.props.handleSubmit(form);
    this.setState({ form: this.initialState });
  }

  handleTaskStatusChange = (val) => {
    let data = { ...this.state.form };

    let status_id = {};
    if (this.props.activeTab) {
      status_id = this.props.activeTab;
    }

    if (val == "done") {
      let obj = this.props.taxonomies.status.find((o) => o.type === val);
      data.status_id = obj;

      this.setState({ form: data }, () => {
        let newData = {};
        if (data.status_id) {
          newData.status_id = data.status_id.id;
        }
        api.edit("tasks", data.id, newData).then((resp) => {
          if (resp.data.success) {
            this.props.reload({ status_id });
          }
        });
      });
    } else {
      data.status_id = val;
      this.setState({ form: data });
    }
  };

  handleTaskTaxDone = () => {

    let status_id = {};
    if (this.props.activeTab) {
      status_id = this.props.activeTab;
    }
    this.props.reload({ status_id });
  };

  onDateChange = (date, type = null) => {
    let form = { ...this.state.form };

    if (type == "date") {
      form.start_date = date;
    } else {
      form.due_date = date;
    }

    this.setState({ form }, () => {
      this.updateRequest(true);
    });
  };

  getContactEmail = async () => {
    const url = location.href;
    const endpoint = url.includes("lead") ? "leads" : "contacts";
    return api.getS(endpoint, this.props.tab_id).then((resp) => {
      return resp.data.data.person
        ? resp.data.data.person.email
        : resp.data.data.org
          ? resp.data.data.org.email
          : "";
    });
  };

  generateFakeDate = (start_date = new Date(), after = 0) => {
    const result = new Date(start_date);
    result.setDate(result.getDate() + after);
    return result;
  };

  updateGoogleMeet = (link) => {
    let form = { ...this.state.form };

    this.setState({ form: { ...form, google_meet: link } });

    delete form.priority_id;
    delete form.status_id;
    delete form.type_id;

    api.edit("tasks", form.id, form);
  };

  generateGoogleMeetLink = async () => {
    const form = this.state.form;

    // delete form.status_id;
    // delete form.type_id;

    let start_date = form.start_date;
    let due_date = form.due_date;

    if (!start_date) {
      start_date = this.generateFakeDate();
    }
    if (!due_date) {
      due_date = this.generateFakeDate(start_date, 1);
    }

    const eventData = {
      form: form,
      type: "tasks",
      summary: form.title,
      start: {
        dateTime: start_date,
      },
      end: {
        dateTime: due_date,
      },
      attendees: [{ email: await this.getContactEmail() }],
    };

    createEvent(eventData, this.updateGoogleMeet);
  };

  render() {
    const form = this.state.form;
    const { i18n, caps } = ndpv;
    return (
      <div className="pv-overlay">
        <div
          className={`pv-modal-content`}
          ref={this.myRef}
          style={{
            borderTopRightRadius: '0%',
            borderBottomRightRadius: '0%'
          }}
        >
          <span className="pv-close" style={{top: '5%'}} onClick={() => this.props.close()}>
            <Add />
          </span>
          <div
            className={`pv-modal-task ${!wage.length ? 'pv-modal-task-discussion' : ''}`}
          >
            <div className="pv-modal-task-content">
              <form onSubmit={this.handleSubmit} >
                <div className="dpv-content">
                  <div className="pv-form-style-one">
                    <div className="row">
                      <div className="col-lg">
                        {form.id && (
                          <Taxonomy
                            key={form.status_id.id}
                            onChange={this.handleTaskStatusChange}
                            onDone={this.handleTaskTaxDone}
                            id={form.id}
                            data={form.status_id}
                            taxonomy="task_status"
                            title={i18n.status}
                            color
                          />
                        )}
                      </div>
                      <div className="col-lg">
                        {form.status_id && form.status_id.type != "done" && (
                          <button
                            className="pv-btn pv-btn-medium pv-float-right pv-bg-green"
                            onClick={() => this.handleTaskStatusChange("done")}
                          >
                            <svg width={13} height={10} viewBox="0 0 13 10" fill="none">
                              <path
                                d="M11.5 1.5L4.5 8.5L1 5"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {i18n.mark} {i18n.done}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg">
                        <label htmlFor="title">{i18n.title}</label>

                        <input
                          id="title"
                          className="pv-title-field"
                          type="text"
                          name="title"
                          value={form.title}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md">
                        <label htmlFor="field-start_date">
                          {i18n.start_date}
                        </label>
                        <div className="pv-field-date">
                          <DateField
                            date={form.start_date}
                            label={i18n.start_date}
                            type="date"
                            onDateChange={this.onDateChange}
                          />
                        </div>
                      </div>

                      <div className="col-md">
                        <label htmlFor="field-start_date">
                          {i18n.due_date}
                        </label>
                        <div className="pv-field-date">
                          <DateField
                            date={form.due_date}
                            label={i18n.due_date}
                            type="due_date"
                            onDateChange={this.onDateChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="form-desc">
                          {i18n.task} {i18n.type}:
                        </label>
                        <div className="pv-field-action">
                          {form.id && (
                            <Taxonomy
                              id={form.id}
                              data={form.type_id}
                              taxonomy="task_type"
                              title={i18n.type}
                          /* small */ color
                            />
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="form-desc">
                          {i18n.task} {i18n.prior}:
                        </label>
                        <div className="pv-field-action">
                          {form.id && (
                            <Taxonomy
                              id={form.id}
                              data={form.priority_id}
                              taxonomy="task_priority"
                              title={i18n.prior}
                              onDone={this.handleTaskTaxDone}
                          /* small */ color
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {this.props.tab_id && !wage.length && (
                      <div className="row">
                        <div className="col-lg">
                          <label htmlFor="google_meet">
                            {i18n.meeting} {i18n.link}
                          </label>
                          <input
                            type="text"
                            id="google_meet"
                            name="google_meet"
                            value={form.google_meet}
                            onChange={this.handleChange}
                          />
                          <div className="pv-buttons pv-mt-15">
                            <button
                              className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-shadow pv-mr-10"
                              onClick={() => {
                                this.generateGoogleMeetLink();
                              }}
                            >
                              <svg
                                width={17}
                                height={14}
                                viewBox="0 0 17 14"
                                fill="none"
                              >
                                <path
                                  d="M4.5 0.399902L0.5 4.3999L2.5 5.63793L4.5 4.3999L5.62941 2.3999L4.5 0.399902Z"
                                  fill="#FF2820"
                                />
                                <path
                                  d="M4.5 4.3999H0.5V9.5999L2.5 10.6982L4.5 9.5999V4.3999Z"
                                  fill="#0084FF"
                                />
                                <path
                                  d="M0.5 9.59985V12.2665C0.5 12.9999 1.1 13.5999 1.83334 13.5999H4.5L5.62941 11.4767L4.5 9.59985H0.5Z"
                                  fill="#0066DD"
                                />
                                <path
                                  d="M15.6738 1.82014L13.1999 3.77986V3.79995L12.3931 6.88026L13.1999 9.99755L15.6628 11.9798C15.9933 12.257 16.4999 12.0241 16.4999 11.5916V2.20833C16.4999 1.77576 16.0043 1.54286 15.6738 1.82014Z"
                                  fill="#00AD3C"
                                />
                                <path
                                  d="M13.2 3.77981V1.71793C13.2 0.993027 12.6128 0.399902 11.895 0.399902H9.285H4.5V4.3999H9.4V6.9999L12.0326 6.70662L13.2 3.77981Z"
                                  fill="#FFBA00"
                                />
                                <path
                                  d="M9.4 9.6H4.5V13.6H9.285H11.895C12.6128 13.6 13.2 13.0078 13.2 12.2839V10L11.894 7.31684L9.4 7V9.6Z"
                                  fill="#00AD3C"
                                />
                                <path
                                  d="M9.3999 6.99988L13.1999 9.99988V3.77979L9.3999 6.99988Z"
                                  fill="#00831E"
                                />
                              </svg>
                              {i18n.add} Google {i18n.meet}
                            </button>
                            {false && (
                              <button className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-shadow">
                                <svg
                                  width={17}
                                  height={10}
                                  viewBox="0 0 17 10"
                                  fill="none"
                                >
                                  <path
                                    d="M0.5 1.09594V6.95562C0.505313 8.28062 1.5875 9.34687 2.90719 9.34156H11.4481C11.6909 9.34156 11.8862 9.14625 11.8862 8.90875V3.04937C11.8809 1.72437 10.7991 0.657811 9.47906 0.663124H0.938125C0.695313 0.663124 0.5 0.858437 0.5 1.09594H0.5ZM12.43 3.38187L15.9563 0.805624C16.2625 0.552499 16.5 0.615624 16.5 1.075V8.92969C16.5 9.4525 16.2097 9.38906 15.9563 9.19906L12.43 6.62812V3.38187Z"
                                    fill="#4A8CFF"
                                  />
                                </svg>
                                {i18n.zoomconn}
                              </button>
                            )}{" "}
                          </div>

                        </div>
                      </div>
                    )}
                    <div className="row">
                      <div className="col">
                        <label htmlFor="form-desc">{i18n.desc}</label>

                        <textarea
                          id="form-desc"
                          name="desc"
                          value={form.desc}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <label htmlFor="form-note">{i18n.note}</label>

                        <textarea
                          id="form-note"
                          name="note"
                          value={form.note}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <Checklist
                          data={this.state.form.checklist}
                          changeHandler={this.handleChecklistChange}
                        />
                      </div>
                    </div>

                  </div>
                </div>

                <div className="pv-modal-footer">
                  <div className="row">
                    <div className="col">
                      <button type='reset' className="pv-btn pv-text-hover-blue" onClick={() => this.props.close()}>{i18n.cancel}</button>
                    </div>
                    <div className="col">
                      <button type='submit' className="pv-btn pv-bg-blue pv-bg-hover-blue pv-btn-big pv-float-right pv-color-white">
                        {i18n.save}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="pv-modal-discussion-content">

              <div className="row">
                <div className="col">

                  {!wage.length && this.props.data.id && <Suspense fallback={<Spinner />}>
                    <Staff tab_id={this.props.data.id} parent_tab_id={this.props.tab_id} inForm avatarGroup />
                  </Suspense>}
                </div>
              </div>

              {form.id && <Discussion tab_id={form.id} path='task' taskMod />}
            </div>
          </div>
        </div>

      </div>
    );
  }
}
