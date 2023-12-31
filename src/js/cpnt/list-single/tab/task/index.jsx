import { useState, useEffect } from "react";
import Preloader from "block/preloader/table";
import { toast } from "react-toastify";
import Form from "./Form";
import FormEditPro from "./FormEditPro";
import Table from "./Table";
//import Search from './Search';
//import Empty from 'block/empty';
import Crud from "hoc/Crud";
import api from "api";
const Task = (props) => {
  useEffect(() => {
    props.getLists();
  }, []);

  const [activeTab, setActiveTab] = useState(null);
  const [taxonomies, setTaxonomies] = useState({
    status: [],
    types: [],
    priorities: [],
  });

  const { lists, checkedBoxes, searchVal } = props.state;

  let openTodayTab,
    openOtherTab,
    openUnscheduleTab = false;

  if (lists.hasOwnProperty("today")) {
    if (lists.today.length > 0) {
      openTodayTab = true;
    }

    if (!lists.today.length && lists.other.length > 0) {
      openOtherTab = true;
    }

    if (
      !lists.today.length &&
      !lists.other.length &&
      lists.unschedule.length > 0
    ) {
      openUnscheduleTab = true;
    }
  }

  const handleSubmit = (data, type) => {
    props.handleSubmit(data, type);
    if (taxonomies.status.length) {
      setActiveTab(taxonomies.status[0].id);
    }
  };

  const reload = () => {
    props.getLists({ status_id: activeTab });
  };

  const handleDelete = (type, id) => {
    if (confirm(ndpv.i18n.aConf)) {
      api.del("tasks", id).then((resp) => {
        if (resp.data.success) {
          toast.success(ndpv.i18n.aDel);
          reload();
        } else {
          resp.data.data.forEach(function (value) {
            toast.error(value);
          });
        }
      });
    }
  };

  const i18n = ndpv.i18n;

  return (
    <div className="">
      <Form
        handleSubmit={handleSubmit}
        setTaxonomies={setTaxonomies}
        tab_id={props.tab_id}
      />

      {props.state.formModal &&
        <FormEditPro
          key={activeTab}
          activeTab={activeTab}
          tab_id={props.tab_id}
          reload={props.getLists}
          taxonomies={taxonomies}
          handleSubmit={props.handleSubmit}
          modalType={props.state.formModalType}
          data={props.state.list}
          close={props.closeForm}
        />}

      {!props.dashboard && (
        <div className="pv-small-button-group">
          <h3 className="pv-title-small">{i18n.myw}</h3>
          {lists.task_status &&
            lists.task_status.map((item, i) => {
              return (
                <button
                  key={i}
                  className={
                    "pv-btn pv-btn-small pv-bg-stroke pv-bg-hover-shadow " +
                    (activeTab == item.id || (!activeTab && i == 0)
                      ? "pv-active"
                      : "")
                  }
                  onClick={() => {
                    setActiveTab(item.id);
                    props.getLists({ status_id: item.id });
                  }}
                >
                  {item.label}
                </button>
              );
            })}
        </div>
      )}

      {props.state.preloader ? (
        <Preloader />
      ) : (
        <>
          {props.dashboard && <div style={{ marginTop: "15px" }}></div>}
          {props.dashboard && (
            <Table
              dashboard
              source={props.source}
              reload={reload}
              tableData={lists.latest}
              taxonomies={taxonomies}
              searchVal={searchVal}
              editEntry={props.openForm}
              checkedBoxes={{
                data: checkedBoxes,
                handle: props.handleCheckbox,
              }}
              handleSubmit={props.handleSubmit}
              deleteEntry={handleDelete}
            />
          )}

          {!props.dashboard && (
            <div className="pv-accordion">
              {lists.today.length > 0 && (
                <>
                  <input
                    type="radio"
                    name="pv-accordion"
                    defaultChecked={openTodayTab}
                    id="pv-task-today"
                  />
                  <section className="pv-accordion-table">
                    <label
                      className="pv-accordion-title"
                      htmlFor="pv-task-today"
                    >
                      <span className="pv-down-angle">
                        <svg
                          width={11}
                          height={7}
                          viewBox="0 0 11 7"
                          fill="none"
                        >
                          <path
                            d="M9.72339 1.53915L5.72339 5.53915L1.72339 1.53915"
                            stroke="#CBD5E0"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <b>{i18n.today}</b>
                    </label>
                    <label className="pv-table-close" htmlFor="pv-acc-close" />
                    <div className="pv-accordion-content">
                      <Table
                        source={props.source}
                        reload={reload}
                        tableData={lists.today}
                        taxonomies={taxonomies}
                        searchVal={searchVal}
                        editEntry={props.openForm}
                        checkedBoxes={{
                          data: checkedBoxes,
                          handle: props.handleCheckbox,
                        }}
                        handleSubmit={props.handleSubmit}
                        deleteEntry={handleDelete}
                      />
                    </div>
                  </section>
                </>
              )}

              {lists.other.length > 0 && (
                <>
                  <input
                    type="radio"
                    name="pv-accordion"
                    defaultChecked={openOtherTab}
                    id="pv-task-other"
                  />
                  <section className="pv-accordion-table">
                    <label
                      className="pv-accordion-title"
                      htmlFor="pv-task-other"
                    >
                      <span className="pv-down-angle">
                        <svg
                          width={11}
                          height={7}
                          viewBox="0 0 11 7"
                          fill="none"
                        >
                          <path
                            d="M9.72339 1.53915L5.72339 5.53915L1.72339 1.53915"
                            stroke="#CBD5E0"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <b>{i18n.othrday}</b>
                    </label>
                    <label className="pv-table-close" htmlFor="pv-acc-close" />
                    <div className="pv-accordion-content">
                      <Table
                        source={props.source}
                        reload={reload}
                        tableData={lists.other}
                        taxonomies={taxonomies}
                        searchVal={searchVal}
                        editEntry={props.openForm}
                        checkedBoxes={{
                          data: checkedBoxes,
                          handle: props.handleCheckbox,
                        }}
                        deleteEntry={handleDelete}
                      />
                    </div>
                  </section>
                </>
              )}

              {lists.unschedule.length > 0 && (
                <>
                  <input
                    type="radio"
                    name="pv-accordion"
                    defaultChecked={openUnscheduleTab}
                    id="pv-task-unschedule"
                  />
                  <section className="pv-accordion-table">
                    <label
                      className="pv-accordion-title"
                      htmlFor="pv-task-unschedule"
                    >
                      <span className="pv-down-angle">
                        <svg
                          width={11}
                          height={7}
                          viewBox="0 0 11 7"
                          fill="none"
                        >
                          <path
                            d="M9.72339 1.53915L5.72339 5.53915L1.72339 1.53915"
                            stroke="#CBD5E0"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <b>{i18n.unskd}</b>
                    </label>
                    <label className="pv-table-close" htmlFor="pv-acc-close" />
                    <div className="pv-accordion-content">
                      <Table
                        source={props.source}
                        reload={reload}
                        tableData={lists.unschedule}
                        taxonomies={taxonomies}
                        searchVal={searchVal}
                        editEntry={props.openForm}
                        checkedBoxes={{
                          data: checkedBoxes,
                          handle: props.handleCheckbox,
                        }}
                        deleteEntry={handleDelete}
                      />
                    </div>
                  </section>
                </>
              )}
              <input type="radio" name="pv-accordion" id="pv-acc-close" />
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Crud(Task, "task", ndpv.i18n.taska);
