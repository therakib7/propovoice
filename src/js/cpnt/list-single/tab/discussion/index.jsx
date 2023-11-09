import { useRef, useEffect, useState } from 'react';
import Preloader from "block/preloader/table";
import Pagination from "block/pagination";

import Form from "./Form";
import FormEdit from "./FormEdit";
import Table from "./Table";

import Crud from "hoc/Crud";

const Message = (props) => {
  const containerRef = useRef(null);
  
  const { lists, checkedBoxes, searchVal } = props.state;

  useEffect(() => {
    if (!wage.length) {
      props.getLists();
      containerRef.current.scrollTop = containerRef.current.scrollHeight;

      const interval = setInterval(() => {
        props.getLists();
      }, 15000); // Set the interval duration in milliseconds (e.g., 1000ms = 1 second)

      // Clear the interval when the component is unmounted or the dependencies change
      return () => clearInterval(interval);
    }

  }, []);

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
}, [lists]);

  const formSubmit = (data, type) => {
    props.handleSubmit(data, type);
  }

  const taskMod = props.taskMod;

  let customStyle = {};
  if (taskMod) {
    customStyle = {
      marginTop: "15px",
      background: "#fff",
      padding: "20px",
      flex: "1",
      overflow: "auto",
    };
  }

  return (
    <>
      <div ref={containerRef} style={customStyle}>
        {props.state.formModal && (
          <FormEdit
            tab_id={props.tab_id}
            handleSubmit={props.handleSubmit}
            modalType={props.state.formModalType}
            data={props.state.list}
            close={props.closeForm}
            taskMod={taskMod}
          />
        )}

        {taskMod && (wage.length > 0 || (!props.state.preloader && !(lists.length > 0))) && (
          <p style={{ color: "#718096" }}>{ndpv.i18n.no_comment}</p>
        )}

        {!wage.length && <>
          {props.state.preloader ? (
            <Preloader />
          ) : (
            <Table
              tableData={lists}
              searchVal={searchVal}
              editEntry={props.openForm}
              checkedBoxes={{ data: checkedBoxes, handle: props.handleCheckbox }}
              deleteEntry={props.deleteEntry}
              taskMod={taskMod}
            />
          )}
        </>}

        <div className="pv-pagination-content-two">
          {props.state.totalPage > 1 && (
            <Pagination
              forcePage={props.state.currentPage - 1}
              pageCount={props.state.totalPage}
              onPageChange={props.handlePageClick}
            />
          )}
        </div>
      </div>

      <Form
        handleSubmit={formSubmit}
        tab_id={props.tab_id}
        path={props.path}
        taskMod={taskMod}
      />
    </>
  );
};
export default Crud(Message, "message", "Messages", "", true);
