import api from "api";
import { currency, countryByCode } from "helper";
import Action from "block/action/row/single";
import Taxonomy from "block/field/taxonomy";
import Spinner from "block/preloader/spinner";
import ContactPerson from "cpnt/contact/person/Form";
import ContactOrg from "cpnt/contact/org/Form";
import DealForm from "cpnt/deal/Form";
import LeadForm from "cpnt/lead/Form";
import ProjectForm from "cpnt/project/Form";
import React, { Component, lazy, Suspense } from "react";
import Moment from "react-moment";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Task = lazy(() => import("./tab/task"));
const Discussion = lazy(() => import("./tab/discussion"));
const Note = lazy(() => import("./tab/note"));
const File = lazy(() => import("./tab/file"));
const Invoice = lazy(() => import("cpnt/invoice/list"));
const Project = lazy(() => import("cpnt/project"));
const Deal = lazy(() => import("cpnt/deal"));

const Staff = lazy(() => import("block/staff"));
const Email = lazy(() => import("cpnt/email"))

class ListSingle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabs: [],
      currentTab: "task",
      leadModal: false,
      dealModal: false,
      dealModalType: "edit",
      projectModal: false,
      projectModalType: "edit",
      contactModal: false,
      submitPreloader: false,
      levels: [],
      stages: [],
      tags: [],
      project_status: [],
      path: '',
      data: {
        id: null,
        person: {
          first_name: "",
          country: "",
          region: "",
        },
        org: {
          name: "",
          country: "",
          region: "",
        },
        level_id: null,
        stage_id: null,
        status_id: null,
        probability: 0,
      },
    };

    this.timeout = 0;
  }

  componentDidMount() {
    this.whenRender();
  }

  componentDidUpdate() {
    const path = this.props.path;
    if (this.state.path != path) {
      this.whenRender();
    }
  }

  whenRender = () => {
    this.getData();
    const path = this.props.path;

    let tabs = [
      {
        id: "task",
        text: ndpv.i18n.taska,
      },
      {
        id: "note",
        text: ndpv.i18n.note,
      },
      {
        id: "file",
        text: ndpv.i18n.file,
      },
      {
        id: "email",
        text: ndpv.i18n.email,
      },
    ];

    if (!wage.length && path == "project") {
      tabs.splice(1, 0, {
        id: "discussion",
        text: ndpv.i18n.discuss,
      });
    }

    if (path == "deal") {
      tabs.push({
        id: "estimate",
        text: ndpv.i18n.est,
      });
    }

    if (path == "project" || path == "client") {
      tabs.push({
        id: "invoice",
        text: ndpv.i18n.inv,
      });
      tabs.push({
        id: "estimate",
        text: ndpv.i18n.est,
      });
    }

    if (path == "client" || path == "contact") {
      tabs.push({
        id: "project",
        text: ndpv.i18n.project,
      });
    }

    if (path == "contact") {
      tabs.push({
        id: "deal",
        text: ndpv.i18n.deal,
      });
    }

    this.setState({ tabs, currentTab: 'task', path: this.props.path });
  }

  getData = () => {
    const path = this.props.path;
    const url = (path == "client" ? "contact" : path) + "s";
    api.getS(url, this.props.id).then((resp) => {
      this.setState({ data: resp.data.data });
      if (path == "lead") {
        this.getLevelTagData();
      } else {
        this.getStageTagData();
      }
    });
  };

  getLevelTagData = () => {

  };

  getStageTagData = () => {
    api
      .get("taxonomies", "taxonomy=deal_stage,tag,project_status")
      .then((resp) => {
        if (resp.data.success) {
          this.setState({
            stages: resp.data.data.deal_stage,
            tags: resp.data.data.tag,
            project_status: resp.data.data.project_status,
          });
        }
      });
  };

  addTabItem = (newTab) => {
    let tabs = this.state.tabs;
    const isIdExists = tabs.some(tab => tab.id === newTab.id);

    // If the id does not exist, push the new object into the array
    if (!isIdExists) {
      tabs.push(newTab);
    }
  }

  setActiveTab(e, id) {
    e.preventDefault();
    this.setState({ currentTab: id });
  }

  handleFindLevel = (val, callback) => {
    return;
    if (val.length < 2) return;

    //search when typing stop
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      //search function
      ApiPerson.getAll("first_name=" + val + "&last_name=" + val).then(
        (resp) => {
          let toData = resp.data.data.result;
          callback(toData);
        }
      );
    }, 300);
  };

  handleprobabilityChange = (e) => {
    let data = { ...this.state.data };

    const target = e.target;

    data.probability = target.value;
    this.setState({ data }, () => {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        let newData = {};
        if (data.probability) {
          newData.probability = data.probability;
          newData.change_prob = true;
        }
        api.edit("deals", this.props.id, newData);
      }, 300);
    });
  };

  handleStageChange = (val) => {
    let data = { ...this.state.data };
    if (val == "won" || val == "lost") {
      let obj = this.state.stages.find((o) => o.type === val);
      data.stage_id = obj;
      this.setState({ data }, () => {
        let newData = {};
        if (data.stage_id) {
          newData.stage_id = data.stage_id.id;
          newData.change_tax = true;
        }
        api.edit("deals", this.props.id, newData);
      });
    } else {
      data.stage_id = val;
      this.setState({ data });
    }
  };

  handleProjectStatusChange = (val) => {
    let data = { ...this.state.data };
    if (val == "completed") {
      let obj = this.state.project_status.find((o) => o.type === val);
      data.status_id = obj;
      this.setState({ data }, () => {
        let newData = {};
        if (data.status_id) {
          newData.change_tax = true;
          newData.status_id = data.status_id.id;
        }
        api.edit("projects", this.props.id, newData);
      });
    } else {
      data.status_id = val;
      this.setState({ data });
    }
  };

  personEdit = (data) => {
    this.setState({ submitPreloader: true });
    api.edit("persons", data.id, data).then((resp) => {
      if (resp.data.success) {
        this.setState({ contactModal: false, submitPreloader: false });
        toast.success(ndpv.i18n.aUpd);
        this.getData();
      } else {
        resp.data.data.forEach(function (value, index, array) {
          this.setState({ submitPreloader: false });
          toast.error(value);
        });
      }
    });
  };

  orgEdit = (data) => {
    this.setState({ submitPreloader: true });
    api.edit("organizations", data.id, data).then((resp) => {
      if (resp.data.success) {
        this.setState({ contactModal: false, submitPreloader: false });
        toast.success(ndpv.i18n.aUpd);
        this.getData();
      } else {
        resp.data.data.forEach(function (value, index, array) {
          this.setState({ submitPreloader: false });
          toast.error(value);
        });
      }
    });
  };

  deleteEntry = (type, id) => {
    if (confirm(ndpv.i18n.aConf)) {
      api.del(type + "s", id).then((resp) => {
        if (resp.data.success) {
          toast.success(ndpv.i18n.aDel);
          this.props.navigate(`/${type}`);
        } else {
          resp.data.data.forEach(function (value, index, array) {
            toast.error(value);
          });
        }
      });
    }
  };

  render() {
    const { tabs = [], currentTab } = this.state;
    const { path } = this.props;
    const data = this.state.data;

    let img = ndpv.assetImgUri + "avatar.png";
    if (data.person && data.person.img) {
      img = data.person.img.src;
    } else if (data.org && data.org.logo) {
      img = data.org.logo.src;
    }

    if (data.org == null) data.org = {};

    const { i18n, caps } = ndpv;
    const isClient = caps.includes("ndpv_client_role");
    return (
      <div className="ndpv-cpnt">
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
              {path == "lead" && <NavLink to="/lead">{i18n.lead}</NavLink>}
              {path == "deal" && <NavLink to="/deal">{i18n.deal}</NavLink>}
              {path == "client" && (
                <NavLink to="/client">{i18n.client}</NavLink>
              )}
              {path == "project" && (
                <NavLink to="/project">{i18n.project}</NavLink>
              )}
              {path == "contact" && <NavLink to={'/contact/'}>{i18n.ct}</NavLink>}
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
              {path == "lead" && (
                <>{data.person ? data.person.first_name : data.org.name}</>
              )}
              {(path == "deal" || path == "project") && data.title}
              {path == "client" && (
                <>{data.person ? data.person.first_name : data.org.name}</>
              )}
              {path == "contact" && (
                <>{data.person ? data.person.first_name : data.org.name}</>
              )}
            </li>
          </ul>
        </nav>

        {path == "lead" && (
          <>
            <div className="pv-list-single-head">
              <div className="row">
                <div className="col-md-6">
                  <div className="pv-list-content">
                    <img src={img} alt="logo" className="logo" />
                    <div className="pv-lead-address">
                      <h3 className="">
                        {data.person ? data.person.first_name : data.org.name}
                        <button
                          className="pv-btn pv-edit-btn pv-btn-small pv-bg-stroke pv-bg-shadow"
                          onClick={() => this.setState({ leadModal: true })}
                        >
                          {i18n.edit}
                        </button>
                      </h3>
                      <address>
                        {data.person ? data.person.email : data.org.email}
                        <br />
                        {data.person && data.org && (
                          <>
                            {i18n.org}: {data.org.name}
                            <br />
                          </>
                        )}
                        {i18n.budget}:{" "}
                        {data.budget && currency(data.budget, data.currency)}
                      </address>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="pv-list-single-button-content">
                    <div className="pv-select">
                      <label>
                        {i18n.lead} {i18n.level}:
                      </label>
                      {data.id && (
                        <Taxonomy
                          id={data.id}
                          data={data.level_id}
                          taxonomy="lead_level"
                          title={i18n.level}
                          color
                        />
                      )}
                    </div>
                    <div className="pv-buttons pv-text-right">
                      <button
                        className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue pv-color-white pv-bg-shadow"
                        onClick={() =>
                          this.setState({
                            dealModal: true,
                            dealModalType: "move",
                          })
                        }
                      >
                        <svg
                          width={14}
                          height={12}
                          viewBox="0 0 12 15"
                          fill="none"
                        >
                          <path
                            d="M2.5 8H13.5"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 2.5V13.5"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {i18n.add} {i18n.to} {i18n.deal} {i18n.pipeline}
                      </button>

                      <Action
                        id={data.id}
                        module="lead"
                        edit={() => this.setState({ leadModal: true })}
                        del={this.deleteEntry}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pv-tag-content">
              <ul>
                <li>
                  <label htmlFor="">{i18n.tag}: </label>
                  {data.id && (
                    <Taxonomy
                      id={data.id}
                      data={data.tags}
                      taxonomy="tag"
                      title={i18n.tag}
                      small
                      multi
                    />
                  )}
                </li>

                <li>
                  <label htmlFor="">{i18n.source}: </label>
                  {data.id && (
                    <Taxonomy
                      id={data.id}
                      data={data.source_id}
                      taxonomy="lead_source"
                      title={i18n.source}
                      small
                      color
                      hide_bg
                    />
                  )}
                </li>
              </ul>
            </div>
          </>
        )}

        {path == "deal" && (
          <>
            <div className="pv-list-single-head pv-list-single-head-two">
              <div className="row">
                <div className="col-md-6">
                  <div className="pv-list-content">
                    <h3 className="">
                      {data.title}
                      <button
                        className="pv-btn pv-edit-btn pv-btn-small pv-bg-stroke pv-bg-shadow"
                        onClick={() => this.setState({ dealModal: true })}
                      >
                        {i18n.edit}
                      </button>
                    </h3>
                    <div className="pv-avatar-content">
                      <img src={img} alt="avatar" />
                      <div className="pv-avatar-text">
                        <h5 style={{ fontSize: 12 }}>
                          {data.person ? data.person.first_name : data.org.name}
                        </h5>
                        <p style={{ fontSize: 12 }}>
                          {data.person ? <>
                            {(data.person.region || data.person.country) &&
                              <>
                                {(data.person.region && data.person.country) ? data.person.region + ', ' : ''} {countryByCode(data.person.country)}
                              </>
                            }
                          </> : <>
                            {(data.org.region || data.org.country) &&
                              <>
                                {(data.org.region && data.org.country) ? data.org.region + ', ' : ''} {countryByCode(data.org.country)}
                              </>
                            }
                          </>}
                        </p>
                      </div>
                    </div>

                    {!wage.length && (
                      <div className="pv-range">
                        <span>{data.probability}%</span>
                        <label htmlFor="field-probability">{i18n.proba}</label>
                        <input
                          id="field-probability"
                          type="range"
                          min="1"
                          max="100"
                          name="probability"
                          value={data.probability}
                          style={{
                            background: `linear-gradient(to right, #3264fe ${(data.probability / 100) * 100
                              }%, #ccd6ff ${(data.probability / 100) * 100}%)`,
                          }}
                          onChange={this.handleprobabilityChange}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="pv-list-single-button-content">
                    <div className="pv-select">
                      <label>
                        {i18n.deal} {i18n.stage}:
                      </label>
                      {data.id && data.stage_id && (
                        <Taxonomy
                          key={data.stage_id.id}
                          id={data.id}
                          data={data.stage_id}
                          onChange={this.handleStageChange}
                          taxonomy="deal_stage"
                          title={i18n.stage}
                          color
                        />
                      )}
                    </div>
                    <div className="pv-buttons pv-text-right">
                      <button
                        className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue pv-color-white pv-bg-shadow"
                        onClick={() =>
                          this.setState({
                            projectModal: true,
                            projectModalType: "move",
                          })
                        }
                      >
                        <svg
                          width={15}
                          height={15}
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M2.5 8H13.5"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 2.5V13.5"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {i18n.move} {i18n.to} {i18n.project}
                      </button>

                      {data.stage_id && (
                        <>
                          {(data.stage_id.type == "won" ||
                            data.stage_id.type == "") && (
                              <button
                                className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-shadow"
                                style={{ padding: "9px 15px !important" }}
                                onClick={() => this.handleStageChange("won")}
                              >
                                <img
                                  className="pv-mr-5"
                                  src={ndpv.assetImgUri + "happy.png"}
                                  alt="won"
                                />
                                {i18n.won}
                              </button>
                            )}

                          {(data.stage_id.type == "lost" ||
                            data.stage_id.type == "") && (
                              <button
                                className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-shadow"
                                style={{ padding: "9px 15px !important" }}
                                onClick={() => this.handleStageChange("lost")}
                              >
                                <img
                                  className="pv-mr-5"
                                  src={ndpv.assetImgUri + "sad.png"}
                                  alt="sad"
                                />
                                {i18n.lost}
                              </button>
                            )}
                        </>
                      )}

                      <Action
                        id={data.id}
                        module="deal"
                        edit={() => this.setState({ dealModal: true })}
                        del={this.deleteEntry}
                        padding={1}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pv-tag-content">
              <ul>
                <li className="pv-budget">
                  <label htmlFor="">{i18n.budget}:</label>
                  <span>
                    {data.budget && currency(data.budget, data.currency)}
                  </span>
                </li>
                <li>
                  <label htmlFor="">{i18n.tag}: </label>
                  {data.id && (
                    <Taxonomy
                      id={data.id}
                      data={data.tags}
                      taxonomy="tag"
                      title={i18n.tag}
                      small
                      multi
                    />
                  )}
                </li>
              </ul>
            </div>
          </>
        )}

        {path == "project" && (
          <>
            <div className="pv-list-single-head pv-list-single-head-two">
              <div className="row">
                <div className="col-md-6">
                  <div className="pv-list-content">
                    <h3 className="">
                      {data.title}
                      {isClient && <button
                        className="pv-btn pv-edit-btn pv-btn-small pv-bg-stroke pv-bg-shadow"
                        onClick={() => this.setState({ projectModal: true })}
                      >
                        {i18n.edit}
                      </button>}
                    </h3>
                    <div className="pv-avatar-content">
                      <img src={img} alt="avatar" />
                      <div className="pv-avatar-text">
                        <h5 style={{ fontSize: 12 }}>
                          {data.person ? data.person.first_name : data.org.name}
                        </h5>
                        <p style={{ fontSize: 12 }}>
                          {data.person ? <>
                            {(data.person.region || data.person.country) &&
                              <>
                                {(data.person.region && data.person.country) ? data.person.region + ', ' : ''} {countryByCode(data.person.country)}
                              </>
                            }
                          </> : <>
                            {(data.org.region || data.org.country) &&
                              <>
                                {(data.org.region && data.org.country) ? data.org.region + ', ' : ''} {countryByCode(data.org.country)}
                              </>
                            }
                          </>}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="pv-list-single-button-content">
                    <div className="pv-select">
                      <label>
                        {i18n.project} {i18n.status}:

                        {isClient && data.id && data.status_id && (
                          <> {data.status_id.label}</>
                        )}
                      </label>
                      {!isClient && data.id && data.status_id && (
                        <Taxonomy
                          key={data.status_id.id}
                          id={data.id}
                          data={data.status_id}
                          taxonomy="project_status"
                          onChange={this.handleProjectStatusChange}
                          title={i18n.status}
                          color
                        />
                      )}
                    </div>
                    <div className="pv-buttons pv-text-right">
                      {!isClient && data.status_id && data.status_id.type != "completed" && (
                        <button
                          className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue pv-color-white pv-bg-shadow"
                          onClick={() =>
                            this.handleProjectStatusChange("completed")
                          }
                        >
                          {i18n.mark} {i18n.comp}
                        </button>
                      )}

                      {!isClient && <Action
                        id={data.id}
                        module="project"
                        edit={() => this.setState({ projectModal: true })}
                        del={this.deleteEntry}
                        padding={1}
                      />}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pv-tag-content">
              <ul>
                {!isClient && <li>
                  <label htmlFor="">{i18n.tag}: </label>
                  {data.id && (
                    <Taxonomy
                      id={data.id}
                      data={data.tags}
                      taxonomy="tag"
                      title={i18n.tag}
                      small
                      multi
                    />
                  )}
                </li>}
                <li>
                  <label htmlFor="">
                    {i18n.start} {i18n.date}:
                  </label>
                  <span className="pv-date">
                    {data.start_date && (
                      <Moment format="YYYY-MM-DD">{data.start_date}</Moment>
                    )}
                  </span>
                </li>
                <li>
                  <label htmlFor="">{i18n.due_date}:</label>
                  <span className="pv-date">
                    {data.due_date && (
                      <Moment format="YYYY-MM-DD">{data.due_date}</Moment>
                    )}
                  </span>
                </li>
                <li />
              </ul>
            </div>

            {!wage.length && (
              <div className="pv-cards pv-mt-25">
                <div className="row">
                  <div className="col-md-6 col-lg">
                    <div className="pv-cards-content">
                      <span
                        className=""
                        style={{ background: "rgba(76, 111, 255, 0.12)" }}
                      >
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 6.75V8.25"
                            stroke="#4C6FFF"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 15.75V17.25"
                            stroke="#4C6FFF"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                            stroke="#4C6FFF"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9.75 15.75H13.125C13.6223 15.75 14.0992 15.5525 14.4508 15.2008C14.8025 14.8492 15 14.3723 15 13.875C15 13.3777 14.8025 12.9008 14.4508 12.5492C14.0992 12.1975 13.6223 12 13.125 12H10.875C10.3777 12 9.90081 11.8025 9.54917 11.4508C9.19754 11.0992 9 10.6223 9 10.125C9 9.62772 9.19754 9.15081 9.54917 8.79917C9.90081 8.44754 10.3777 8.25 10.875 8.25H14.25"
                            stroke="#4C6FFF"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <p className="">
                        {i18n.total} {i18n.budget}
                      </p>
                      <h4>
                        {data.budget && currency(data.budget, data.currency)}
                      </h4>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg">
                    <div className="pv-cards-content">
                      <span className="" style={{ background: "#f1faf1" }}>
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M3.75 10.7531V5.25C3.75 5.05109 3.82902 4.86032 3.96967 4.71967C4.11032 4.57902 4.30109 4.5 4.5 4.5H19.5C19.6989 4.5 19.8897 4.57902 20.0303 4.71967C20.171 4.86032 20.25 5.05109 20.25 5.25V10.7531C20.25 18.6281 13.5656 21.2344 12.2344 21.675C12.0831 21.731 11.9169 21.731 11.7656 21.675C10.4344 21.2344 3.75 18.6281 3.75 10.7531Z"
                            stroke="#78C377"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.125 9.75L10.6219 15L7.875 12.375"
                            stroke="#78C377"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <p className="">
                        {i18n.paid} {i18n.amt}
                      </p>
                      <h4>{data.invoice && data.invoice.paid}</h4>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg">
                    <div className="pv-cards-content">
                      <span className="" style={{ background: "#faf0f5" }}>
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M3.75 10.7531V5.25C3.75 5.05109 3.82902 4.86032 3.96967 4.71967C4.11032 4.57902 4.30109 4.5 4.5 4.5H19.5C19.6989 4.5 19.8897 4.57902 20.0303 4.71967C20.171 4.86032 20.25 5.05109 20.25 5.25V10.7531C20.25 18.6281 13.5656 21.2344 12.2344 21.675C12.0831 21.731 11.9169 21.731 11.7656 21.675C10.4344 21.2344 3.75 18.6281 3.75 10.7531Z"
                            stroke="#C2769F"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 9V12.75"
                            stroke="#C2769F"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 17.25C12.6213 17.25 13.125 16.7463 13.125 16.125C13.125 15.5037 12.6213 15 12 15C11.3787 15 10.875 15.5037 10.875 16.125C10.875 16.7463 11.3787 17.25 12 17.25Z"
                            fill="#C2769F"
                          />
                        </svg>
                      </span>
                      <p className="">
                        {i18n.due} {i18n.amt}
                      </p>
                      <h4>{data.invoice && data.invoice.due}</h4>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg">
                    <div className="pv-cards-content">
                      <span className="" style={{ background: "#f0faf9" }}>
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M7.125 9.75H16.875"
                            stroke="#76C2B7"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.125 12.75H16.875"
                            stroke="#76C2B7"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3 19.5V5.25C3 5.05109 3.07902 4.86032 3.21967 4.71967C3.36032 4.57902 3.55109 4.5 3.75 4.5H20.25C20.4489 4.5 20.6397 4.57902 20.7803 4.71967C20.921 4.86032 21 5.05109 21 5.25V19.5L18 18L15 19.5L12 18L9 19.5L6 18L3 19.5Z"
                            stroke="#76C2B7"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <p className="">
                        {i18n.total} {i18n.inv}
                      </p>
                      <h4>{data.invoice && data.invoice.number}</h4>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {(path == "contact" || path == "client") && (
          <>
            <div className="pv-list-single-head">
              <div className="row">
                <div className="col-md-6">
                  <div className="pv-list-content">
                    <img src={img} alt="logo" className="logo" />
                    <div className="pv-lead-address">
                      <h3 className="">
                        {data.person ? data.person.first_name : data.org.name}
                        <button
                          className="pv-btn pv-edit-btn pv-btn-small pv-bg-stroke pv-bg-shadow"
                          onClick={() => this.setState({ contactModal: true })}
                        >
                          {i18n.edit}
                        </button>
                      </h3>
                      <address>
                        {data.person ? data.person.email : data.org.email}
                        <br />
                        {data.person && data.org && (
                          <>
                            {i18n.org}: {data.org.name}
                            <br />
                          </>
                        )}
                      </address>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="pv-list-single-button-content">
                    <div className="pv-select">
                      <label>{i18n.status}:</label>
                      {data.id && (
                        <Taxonomy
                          id={data.id}
                          data={data.status_id}
                          taxonomy="contact_status"
                          title={i18n.status}
                          color
                        />
                      )}
                    </div>

                    <Action
                      id={data.id}
                      module="contact"
                      edit={() => this.setState({ contactModal: true })}
                      del={this.deleteEntry}
                      class="pv-float-right"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pv-tag-content">
              <ul>
                <li>
                  <label htmlFor="">{i18n.tag}: </label>
                  {data.id && (
                    <Taxonomy
                      id={data.id}
                      taxonomy="tag"
                      title={i18n.tag}
                      small
                      multi
                    />
                  )}
                </li>
                <li>
                  {i18n.project} {data.project}
                </li>
                <li>
                  {i18n.deal} {data.deal}
                </li>
              </ul>
            </div>
          </>
        )}

        {this.state.leadModal && (
          <LeadForm
            data={data}
            custom_field={data.custom_field}
            modalType="edit"
            close={() => this.setState({ leadModal: false })}
            reload={() => this.getData()}
          />
        )}

        {this.state.dealModal && (
          <DealForm
            data={data}
            custom_field={data.custom_field}
            modalType={this.state.dealModalType}
            close={() => this.setState({ dealModal: false })}
            reload={() => {
              if (path != 'deal') {
                this.addTabItem({
                  id: "estimate",
                  text: i18n.est,
                });
              }
              this.getData();
            }}
          />
        )}

        {this.state.projectModal && (
          <ProjectForm
            data={data}
            custom_field={data.custom_field}
            modalType={this.state.projectModalType}
            close={() => this.setState({ projectModal: false })}
            reload={() => {
              if (path != 'project') {
                this.addTabItem({
                  id: "invoice",
                  text: i18n.inv,
                });
              }

              this.getData();
            }}
          />
        )}

        {this.state.contactModal &&
          (data.person ? (
            <ContactPerson
              single
              data={data.person}
              modalType="edit"
              submitPreloader={this.state.submitPreloader}
              handleSubmit={this.personEdit}
              close={() => this.setState({ contactModal: false })}
              reload={() => this.getData()}
            />
          ) : (
            <ContactOrg
              single
              data={data.org}
              modalType="edit"
              submitPreloader={this.state.submitPreloader}
              handleSubmit={this.orgEdit}
              close={() => this.setState({ contactModal: false })}
              reload={() => this.getData()}
            />
          ))}

        <div className="row pv-mt-25">
          <div className="col-lg-9">
            <div
              className="pv-horizontal-tab"
              style={{ border: "1px solid rgba(221, 221, 221, 0.6588235294)" }}
            >
              <ul className="pv-tabs">
                {tabs.map((tab, index) => (
                  <li
                    className={
                      "pv-tab " + (currentTab == tab.id ? "pv-active" : "")
                    }
                    key={index}
                    onClick={(e) => this.setActiveTab(e, tab.id)}
                  >
                    {tab.text}
                  </li>
                ))}
              </ul>

              <div className="pv-tab-content">
                <Suspense fallback={<Spinner />}>

                  {currentTab == "task" && data.tab_id && (
                    <Task tab_id={data.tab_id} />
                  )}

                  {!wage.length && currentTab == "discussion" && path == "project" && data.tab_id && (
                    <Discussion tab_id={data.tab_id} path={path} />
                  )}

                  {currentTab == "note" && data.tab_id && (
                    <Note tab_id={data.tab_id} />
                  )}

                  {currentTab == "file" && data.tab_id && (
                    <File tab_id={data.tab_id} />
                  )}
                  {(currentTab == "estimate" || currentTab == "invoice") && data.id && (
                    <Invoice module_id={data.id} path={currentTab} client_mod={(path == "client")} parent={path} />
                  )}
                  {currentTab == "project" && data.id && (
                    <Project module_id={data.id} data={data} parent={path} />
                  )}
                  {currentTab == "deal" && data.id && (
                    <Deal module_id={data.id} data={data} parent={path} />
                  )}
                  {currentTab == "email" && data.id && (
                    <Email module_id={data.id} data={data} parent={path} />
                  )}
                </Suspense>
              </div>
            </div>
          </div>

          <div className="col-lg-3 pv-lead-right-content">

            {!wage.length && data.tab_id && !isClient && <Suspense fallback={<Spinner />}>
              <Staff tab_id={data.tab_id} />
            </Suspense>}

            <div className="pv-widget pv-info-box">
              <h3 className="pv-widget-title">
                {i18n.addi} {i18n.info}
              </h3>
              <address>

                {caps.includes("ndpv_contact") && ((data.person && data.person.mobile) || (data.org && data.org.mobile)) && (
                  <>
                    <span>{i18n.mob}:</span>
                    {data.person ? data.person.mobile : data.org.mobile}
                  </>
                )}

                {((data.person && data.person.web) || (data.org && data.org.web)) && (
                  <>
                    <span>{i18n.web}:</span>
                    {data.person ? data.person.web : data.org.web}
                  </>
                )}

                {((data.person && (data.person.address || data.person.region || data.person.country)) ||
                  (data.org && (data.org.address || data.org.region || data.org.country))) && (
                    <>
                      <span>{i18n.addr}:</span>
                      {data.person ? data.person.address : data.org.address}
                      {(data.person && (data.person.address)) ||
                        (data.org && (data.org.address)) ? <br /> : ''}

                      {data.person ? (
                        <>
                          {(data.person.region || data.person.country) && (
                            <>
                              {(data.person.region && data.person.country) ? `${data.person.region}, ` : ''}
                              {countryByCode(data.person.country)}
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {(data.org.region || data.org.country) && (
                            <>
                              {(data.org.region && data.org.country) ? `${data.org.region}, ` : ''}
                              {countryByCode(data.org.country)}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
              </address>

              <div className="pv-desc-content">
                {data.desc && (
                  <>
                    <h5>{i18n.desc}:</h5>
                    <p
                      style={{ marginTop: 0 }}
                      dangerouslySetInnerHTML={{ __html: data.desc }}
                    ></p>
                  </>
                )}

                {data.custom_field && data.custom_field.map((item, i) => (
                  <React.Fragment key={i}>
                    {data[item.slug] && <h5>{item.label}:</h5>}
                    {(item.type == 'date' && data[item.slug]) ? <p><Moment format={ndpv.date_format}>{data[item.slug]}</Moment></p> : <p style={{ marginTop: 0 }} dangerouslySetInnerHTML={{ __html: data[item.slug] }}></p>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default function SingleWrap() {
  const { id } = useParams();

  const location = useLocation();
  let path = "";

  let url_path = location.pathname.slice(0, location.pathname.lastIndexOf("/"));
  if (url_path.includes("lead")) {
    path = "lead";
  } else if (url_path.includes("deal")) {
    path = "deal";
  } else if (url_path.includes("project")) {
    path = "project";
  } else if (url_path.includes("client")) {
    path = "client";
  } else if (url_path.includes("contact")) {
    path = "contact";
  }

  const navigate = useNavigate();

  return <ListSingle id={id} path={path} navigate={navigate} />;
}
