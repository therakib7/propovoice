import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Breadcrumb from 'block/breadcrumb';
import AddNew from 'block/add-new';
import Action from 'block/action/table';
import Pagination from 'block/pagination';
import Preloader from 'block/preloader/table';
import EntityFields from "../../../block/add-new/EntityFields"

import Form from './Form';
import Table from './Table';
import Search from './Search';
import Empty from 'block/empty';

import Crud from 'hoc/Crud';

const Contact = (props) => {
  useEffect(() => {
    props.getLists();
  }, []);
  const navigate = useNavigate();
  const i18n = ndpv.i18n;
  const { title, lists, checkedBoxes, searchVal } = props.state;
  return (
    <div className="ndpv-cpnt">
      <Breadcrumb title={i18n.ct_book} />

      <div className="row">
        <div className="col">
          <h2 className="pv-page-title">{i18n.ct_book}</h2>
        </div>
        <div className="col">
          <AddNew
            title={i18n.ct}
            openForm={props.openForm}
            fields={EntityFields.person}
          />
        </div>
      </div>

      <Search
        title={i18n.ct}
        showing={lists.length}
        showItem={props.showItem}
        total={props.state.total}
        handleSubmit={props.getLists}
      />

      {false && <div className="pv-small-button-group pv-mb-30">
        <button
          className="pv-btn pv-active pv-btn-small pv-bg-stroke pv-bg-hover-shadow"
          onClick={() => navigate(`/contact/person`)}
        >
          {i18n.prsn}
        </button>
        <button
          className="pv-btn pv-btn-small pv-bg-stroke pv-bg-hover-shadow"
          onClick={() => navigate(`/contact/organization`)}
        >
          {i18n.org}
        </button>
      </div>}

      {checkedBoxes.length > 0 &&
        <Action
          length={checkedBoxes.length}
          uncheckAll={props.uncheckAll}
          deleteEntry={props.deleteEntry}
        />
      }

      {props.state.formModal && <Form
        handleSubmit={props.handleSubmit}
        modalType={props.state.formModalType}
        data={props.state.list}
        submitPreloader={props.state.submitPreloader}
        close={props.closeForm}
      />}

      {props.state.empty && <Empty mod='person' title={title} searchVal={searchVal} clickHandler={() => props.openForm('new')} />}
      {props.state.preloader ? <Preloader /> : <Table tableData={lists} searchVal={searchVal} editEntry={props.openForm} checkedBoxes={{ data: checkedBoxes, handle: props.handleCheckbox }} deleteEntry={props.deleteEntry} />}

      {props.state.totalPage > 1 && <Pagination forcePage={props.state.currentPage - 1} pageCount={props.state.totalPage} onPageChange={props.handlePageClick} />}
    </div>
  );
}

export default Crud(Contact, 'person', ndpv.i18n.prsn);