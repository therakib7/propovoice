import { useEffect, useState } from "react";
import Breadcrumb from "block/breadcrumb";
import AddNew from "block/add-new";
import Action from "block/action/table";
import Preloader from "block/preloader/table";
import Pagination from "block/pagination";
import EntityFields from "block/add-new/EntityFields";

import Form from "./Form";
import Table from "./Table";
import Search from "./Search";
import Empty from "block/empty";

import Crud from "hoc/Crud";

import api from "api";

const Lead = (props) => {
  const [fields, setFields] = useState({});
  useEffect(() => {
    props.getLists();

    if (!wage.length) {
      getFields();
    }
  }, []);

  // Custom field: props.state.extra.custom_field : Array of Object
  // [{slug: "", label: ""}]
  const getFields = async () => {
    const finalFields = EntityFields.lead;
    const customFields = await getCustomFields();

    customFields.map((field) => {
      finalFields[field["slug"]] = field["label"];
    });
    setFields(finalFields);
  };

  const getCustomFields = () => {
    return api.get("custom-fields", "mod=lead").then((resp) => {
      if (resp.data.success) {
        return resp.data.data;
      }
    });
  };

  const { title, lists, extra, checkedBoxes, searchVal } = props.state;
  return (
    <div className="ndpv-cpnt">
      <Breadcrumb title={title} />
      <div className="row">
        <div className="col">
          <h2 className="pv-page-title">{ndpv.i18n.lead}</h2>
        </div>
        <div className="col">
          <AddNew
            title={title}
            openForm={props.openForm}
            fields={fields}
            reload={() => props.getLists()}
          />
        </div>
      </div>

      <Search
        title={title}
        showing={lists.length}
        showItem={props.showItem}
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
          mod="lead"
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

export default Crud(Lead, "lead", ndpv.i18n.lead);
