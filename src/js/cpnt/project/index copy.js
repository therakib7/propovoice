import React, { useCallback, useRef, useState, useEffect } from "react";
import Breadcrumb from 'block/breadcrumb';
import Preloader from 'block/preloader/table';
import Pagination from 'block/pagination';

import Board from './Board';
import TaxonomyForm from 'block/field/taxonomy/Form';
import Action from 'block/action/table';
import Form from './Form';
import Table from './Table';
import Search from './Search';
import Empty from 'block/empty';
import pro from 'block/pro-alert';

import Crud from 'hoc/Crud';

const Project = (props) => {

  const [loading, setLoading] = useState(false);
  const [boardView, setBoardView] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState('new');
  const newForm = {
    id: null,
    label: '',
    color: '',
    bg_color: '',
    icon: null
  };
  const [form, setForm] = useState(newForm);
  const taxForm = (type = 'new', data = null) => {

    if (type == 'new' && wage.length > 0) {
      pro();
      return;
    }

    setModal(true)
    setModalType(type)
    if (type == 'new') {
      setForm(newForm)
    } else {
      const newData = {
        id: data.id,
        label: data.name,
        color: data.color,
        bg_color: data.bg_color,
        icon: null
      }
      setForm(newData)
    }
  };

  useEffect(() => {
    if (props.onLoad) {
      if (wage.length > 0) {
        props.onLoad(false);
      } else {
        props.onLoad(true);
      }
    }

    if (wage.length > 0) {
      setBoardView(false)
      props.getLists({ table_view: true });
    } else {
      props.getLists()
    }

    return () => {
      if (props.onLoad) {
        props.onLoad(false);
      }
    }

  }, []);

  const viewChange = (view = '') => {
    if (wage.length > 0 && (view == 'board')) {
      pro();
      return;
    }

    setLoading(true);
    if (view == 'board') {
      const promise = props.getLists();
      promise.then(resp => {
        setBoardView(true);
        props.onLoad(true);
        setLoading(false);
      })
    } else {
      const promise = props.getLists({ table_view: true });
      promise.then(resp => {
        setBoardView(false);
        props.onLoad(false);
        setLoading(false);
      })
    }
  }

  const getTaxList = () => {
    if (boardView) {
      props.getLists()
    } else {
      props.getLists({ table_view: true });
    }
  }

  const handleSubmit = (data) => {
    if (boardView) {
      props.handleSubmit(data)
    } else {
      props.handleSubmit(data, props.state.formModalType, { table_view: true });
    }
  }

  const showItem = (e) => {
    if (boardView) {
      props.showItem(e)
    } else {
      props.showItem(e, { table_view: true });
    }
  }

  const deleteEntry = (type, id) => {
    if (boardView) {
      props.deleteEntry(type, id)
    } else {
      props.deleteEntry(type, id, null, { table_view: true });
    }
  }

  const { title, lists, checkedBoxes, searchVal } = props.state;

  const i18n = ndpv.i18n;
  return (
    <div className="ndpv-cpnt">
      {!props.module_id && <Breadcrumb title={title} />}

      {props.state.formModal && <Form
        handleSubmit={handleSubmit}
        modalType={props.state.formModalType}
        data={props.state.list}
        close={props.closeForm}
        boardView={boardView}
      />}

      {modal && <TaxonomyForm
        {...props}
        taxonomy='project_status'
        title={i18n.status}
        reload={getTaxList}
        modalType={modalType}
        data={form}
        color
        close={() => setModal(false)}
      />}

      <div className="row">
        <div className="col">
          <h2 className="pv-page-title">{title}</h2>
        </div>
        <div className="col">
          <div className="pv-list-single-button-content">
            <button
              className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-hover-shadow"
              onClick={() => taxForm('new')}
            >
              <svg
                width={14}
                height={12}
                viewBox="0 0 12 15"
                fill="none"

              >
                <path
                  d="M2.5 8H13.5"
                  stroke="#4A5568"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 2.5V13.5"
                  stroke="#4A5568"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {i18n.add} {i18n.status}
            </button>

            <button
              className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue pv-bg-shadow pv-color-white"
              onClick={() => props.openForm('new')}
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
              {i18n.add} {title}
            </button>
          </div>
        </div>
      </div>

      {/* <div className="pv-buttons-group pv-mb-20"> 
            </div> */}

      <Search
        title={title}
        showing={lists.length}
        showItem={showItem}
        total={props.state.total}
        handleSubmit={props.getLists}
        boardView={boardView}
        viewChange={viewChange}
      />

      {checkedBoxes.length > 0 &&
        <Action
          length={checkedBoxes.length}
          uncheckAll={props.uncheckAll}
          deleteEntry={deleteEntry}
        />
      }

      {props.state.empty && <Empty title={title} searchVal={searchVal} clickHandler={() => props.openForm('new')} />}

      {props.state.preloader || loading ? <Preloader /> : <>
        {(!props.module_id && boardView) && <Board
          new={props.openForm}
          data={lists}
          taxForm={taxForm}
        />}
        {/* {(props.module_id || !boardView) && <> 
                    {console.log(lists)}
                </>} */}

        {(props.module_id || !boardView) && <>
          <Table tableData={lists} searchVal={searchVal} editEntry={props.openForm} checkedBoxes={{ data: checkedBoxes, handle: props.handleCheckbox }} deleteEntry={deleteEntry} />

          {props.state.totalPage > 1 && <Pagination forcePage={props.state.currentPage - 1} pageCount={props.state.totalPage} onPageChange={props.handlePageClick} />}
        </>}
      </>}
    </div>
  );
}

export default Crud(Project, 'project', ndpv.i18n.project);