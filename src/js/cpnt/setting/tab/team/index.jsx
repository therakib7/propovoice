import { useEffect } from "react";
import AddNew from "block/add-new";
import Action from "block/action/table";
import Preloader from "block/preloader/table";
import Pagination from "block/pagination";

import Form from "./Form";
import Table from "./Table";
import Empty from "block/empty";

import Crud from "hoc/Crud";
const Team = (props) => {
  useEffect(() => {
    props.getLists();
  }, []);

  const { title, lists, extra, checkedBoxes, searchVal } = props.state;
  const { i18n, caps } = ndpv;
  const isStaff = caps.includes("ndpv_staff");
  return (
    <div className="ndpv-cpnt">
      <div className="row">
        <div className="col">
          <h2 className="pv-page-title">{i18n.team_member}</h2>
        </div>
        <div className="col">
          {!isStaff && <AddNew
            title={title}
            openForm={props.openForm}
            reload={() => props.getLists()}
          />}
        </div>
      </div>

      {checkedBoxes.length > 0 && (
        <Action
          length={checkedBoxes.length}
          uncheckAll={props.uncheckAll}
          deleteEntry={props.deleteEntry}
        />
      )}

      {props.state.formModal && (
        <Form
          custom_field={extra.custom_field}
          handleSubmit={props.handleSubmit}
          modalType={props.state.formModalType}
          data={props.state.list}
          submitPreloader={props.state.submitPreloader}
          close={props.closeForm}
        />
      )}

      {props.state.empty && (
        <Empty
          mod="team"
          title={title}
          searchVal={searchVal}
          clickHandler={() => props.openForm("new")}
        />
      )}

      {props.state.preloader ? (
        <Preloader />
      ) : (
        <Table
          tableData={lists}
          searchVal={searchVal}
          editEntry={props.openForm}
          checkedBoxes={{ data: checkedBoxes, handle: props.handleCheckbox }}
          deleteEntry={props.deleteEntry}
        />
      )}

      {props.state.totalPage > 1 && (
        <Pagination
          forcePage={props.state.currentPage - 1}
          pageCount={props.state.totalPage}
          onPageChange={props.handlePageClick}
        />
      )}
    </div>
  );
};

export default Crud(Team, "team", ndpv.i18n.team_member);
