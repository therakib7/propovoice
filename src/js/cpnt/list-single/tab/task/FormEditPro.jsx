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
import ProLabel from "block/pro-alert/label";
import { Link } from "react-router-dom";

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
    const { i18n } = ndpv;
    return (
      <div className="pv-overlay">
        <div
          className='pv-modal-content'
          ref={this.myRef}
          style={{
            maxWidth: 1040,
            borderTopRightRadius: '0%',
            borderBottomRightRadius: '0%'
          }}
        >
          <span className="pv-close" style={{ top: '5%' }} onClick={() => this.props.close()}>
            <Add />
          </span>
          <div className='pv-modal-task pv-modal-task-discussion' >
            <div className="pv-modal-task-content" style={{ height: 690 }}>
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

                    {false && <div className="row">
                      <div className="col">
                        <label htmlFor="form-note">{i18n.note}</label>

                        <textarea
                          id="form-note"
                          name="note"
                          value={form.note}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>}

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

                <div className="pv-modal-footer" style={{padding: 0}}>
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

            <div className="pv-modal-discussion-content" style={{ height: 690 }}>
              <div className="pv-modal-discussion-head-area">
                <div className="pv-modal-discussion-head">
                  <div className="pv-modal-discussion-info">
                    <p>{i18n.task_creator}:</p>
                    <p style={{ fontWeight: 500 }}>{this.props.data.author}</p>
                  </div>

                  <div className="pv-modal-discussion-info">
                    <p>{i18n.created_at}:</p>
                    <p>{this.props.data.date}</p>
                  </div>

                  <div className="pv-modal-discussion-info">
                    <p>{i18n.source}: <ProLabel blueBtn /></p>
                    <p>
                      {(!wage.length) && this.props.data.tab_title &&
                        <Link to={'/' + this.props.data.tab_url} >
                          <svg style={{ top: 1, marginRight: 5 }} width={10} height={10} viewBox="0 0 12 12">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.97636 1.90264C8.11473 1.75937 8.28025 1.6451 8.46326 1.56648C8.64626 1.48787 8.84309 1.44649 9.04226 1.44476C9.24143 1.44303 9.43895 1.48098 9.62329 1.5564C9.80764 1.63182 9.97512 1.7432 10.116 1.88404C10.2568 2.02488 10.3682 2.19236 10.4436 2.3767C10.519 2.56105 10.557 2.75857 10.5552 2.95774C10.5535 3.15691 10.5121 3.35374 10.4335 3.53674C10.3549 3.71975 10.2406 3.88527 10.0974 4.02364L7.84736 6.27364C7.56607 6.55484 7.18461 6.71282 6.78686 6.71282C6.38912 6.71282 6.00766 6.55484 5.72636 6.27364C5.58491 6.13702 5.39546 6.06142 5.19881 6.06313C5.00217 6.06484 4.81406 6.14372 4.675 6.28277C4.53594 6.42183 4.45707 6.60994 4.45536 6.80658C4.45365 7.00323 4.52925 7.19268 4.66586 7.33414C5.22845 7.89655 5.99137 8.21249 6.78686 8.21249C7.58236 8.21249 8.34528 7.89655 8.90786 7.33414L11.1579 5.08414C11.7043 4.51833 12.0067 3.76052 11.9999 2.97393C11.9931 2.18734 11.6775 1.4349 11.1213 0.87868C10.5651 0.322456 9.81266 0.00694867 9.02607 0.000113408C8.23948 -0.00672185 7.48167 0.295661 6.91586 0.842135L5.79086 1.96714C5.71923 2.03632 5.6621 2.11908 5.62279 2.21058C5.58348 2.30209 5.56279 2.4005 5.56193 2.50008C5.56106 2.59967 5.58004 2.69843 5.61775 2.7906C5.65546 2.88277 5.71115 2.96651 5.78157 3.03693C5.85199 3.10735 5.93573 3.16304 6.0279 3.20075C6.12007 3.23846 6.21883 3.25744 6.31841 3.25657C6.418 3.25571 6.51641 3.23502 6.60792 3.19571C6.69942 3.15641 6.78218 3.09927 6.85136 3.02764L7.97636 1.90264ZM4.22636 5.65264C4.50766 5.37143 4.88912 5.21346 5.28686 5.21346C5.68461 5.21346 6.06607 5.37143 6.34736 5.65264C6.41655 5.72427 6.49931 5.7814 6.59081 5.82071C6.68231 5.86002 6.78073 5.88071 6.88031 5.88157C6.9799 5.88244 7.07866 5.86346 7.17083 5.82575C7.263 5.78804 7.34674 5.73235 7.41716 5.66193C7.48758 5.59151 7.54327 5.50777 7.58098 5.4156C7.61869 5.32343 7.63767 5.22467 7.6368 5.12508C7.63594 5.0255 7.61525 4.92709 7.57594 4.83558C7.53663 4.74408 7.4795 4.66132 7.40786 4.59214C6.84528 4.02972 6.08236 3.71378 5.28686 3.71378C4.49137 3.71378 3.72845 4.02972 3.16586 4.59214L0.915865 6.84214C0.629334 7.11888 0.400787 7.44991 0.24356 7.81592C0.0863335 8.18193 0.00357472 8.57559 0.00011327 8.97393C-0.00334818 9.37227 0.0725569 9.76731 0.2234 10.136C0.374242 10.5047 0.597002 10.8396 0.87868 11.1213C1.16036 11.403 1.49531 11.6258 1.864 11.7766C2.23269 11.9274 2.62773 12.0033 3.02607 11.9999C3.42441 11.9964 3.81807 11.9137 4.18408 11.7564C4.55009 11.5992 4.88112 11.3707 5.15786 11.0841L6.28286 9.95914C6.3545 9.88995 6.41163 9.80719 6.45094 9.71569C6.49025 9.62419 6.51094 9.52577 6.5118 9.42619C6.51267 9.3266 6.49369 9.22784 6.45598 9.13567C6.41827 9.0435 6.36258 8.95976 6.29216 8.88934C6.22174 8.81892 6.138 8.76323 6.04583 8.72552C5.95366 8.68781 5.8549 8.66883 5.75531 8.6697C5.65573 8.67056 5.55731 8.69125 5.46581 8.73056C5.37431 8.76987 5.29155 8.827 5.22236 8.89864L4.09736 10.0236C3.95899 10.1669 3.79348 10.2812 3.61047 10.3598C3.42747 10.4384 3.23064 10.4798 3.03147 10.4815C2.8323 10.4832 2.63478 10.4453 2.45043 10.3699C2.26609 10.2944 2.09861 10.1831 1.95777 10.0422C1.81693 9.90139 1.70555 9.73391 1.63013 9.54957C1.55471 9.36522 1.51676 9.1677 1.51849 8.96853C1.52022 8.76936 1.5616 8.57254 1.64021 8.38953C1.71883 8.20652 1.8331 8.04101 1.97636 7.90264L4.22636 5.65264Z"
                              fill="#718096"
                            />
                          </svg>
                          {this.props.data.tab_title}
                        </Link>
                      }
                    </p>
                  </div>

                  <div className="pv-avatar-group">
                    {this.props.data.id && <Suspense fallback={<Spinner />}>
                      <Staff tab_id={this.props.data.id} parent_tab_id={this.props.tab_id} inForm avatarGroup />
                    </Suspense>}
                  </div>
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
