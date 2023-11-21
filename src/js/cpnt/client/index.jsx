import { useEffect } from "react";
import Breadcrumb from "block/breadcrumb";
import AddNew from "block/add-new";
import Action from "block/action/table";
import Pagination from "block/pagination";
import EntityFields from "block/add-new/EntityFields";
import Preloader from "block/preloader/table";

import Form from "./Form";
import Table from "./Table";
import Search from "./Search";
import Empty from "block/empty";

import Crud from "hoc/Crud";

const Client = (props) => {
  useEffect(() => {
    props.getLists();
  }, []);

  const { title, lists, checkedBoxes, searchVal } = props.state;
  return (
    <div className="">
      <Breadcrumb title={title} />

      <div className="row">
        <div className="col-6">
          <h2 className="pv-page-title">{ndpv.i18n.client}</h2>
        </div>
        <div className="col-6">
          <AddNew
            title={title}
            fields={EntityFields.client}
            openForm={props.openForm}
            reload={() => props.getLists()}
          />
        </div>
      </div>

      <Search
        title={title}
        showing={lists.length}
        total={props.state.total}
        handleSubmit={props.getLists}
      />

      {checkedBoxes.length > 0 && (
        <Action
          length={checkedBoxes.length}
          uncheckAll={props.uncheckAll}
          deleteEntry={props.deleteEntry}
        />
      )}

      {props.state.formModal && (
        <Form
          handleSubmit={props.handleSubmit}
          modalType={props.state.formModalType}
          data={props.state.list}
          submitPreloader={props.state.submitPreloader}
          close={props.closeForm}
        />
      )}

      {props.state.empty && (
        <Empty
          mod="client"
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
          checkedBoxes={{
            data: checkedBoxes,
            handle: props.handleCheckbox,
            totalRow: lists.length
          }}
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

export default Crud(Client, "client", ndpv.i18n.client);
