import { useEffect } from "react";
import Preloader from 'block/preloader/table';
import Pagination from 'block/pagination';

import Form from './Form';
import FormEdit from './FormEdit';
import Table from './Table';
// import Search from './Search';
// import Empty from 'block/empty';

import Crud from 'hoc/Crud';

const Message = (props) => {
    useEffect(() => {
        props.getLists();
    }, []);
    const { lists, checkedBoxes, searchVal } = props.state;
    return (
        <div className="">
            {props.state.formModal && <FormEdit
                tab_id={props.tab_id}
                handleSubmit={props.handleSubmit}
                modalType={props.state.formModalType}
                data={props.state.list}
                close={props.closeForm}
            />}

            {props.state.preloader ? <Preloader /> : <Table tableData={lists} searchVal={searchVal} editEntry={props.openForm} checkedBoxes={{ data: checkedBoxes, handle: props.handleCheckbox }} deleteEntry={props.deleteEntry} />}

            <div className="pv-pagination-content-two">
                {props.state.totalPage > 1 && <Pagination forcePage={props.state.currentPage - 1} pageCount={props.state.totalPage} onPageChange={props.handlePageClick} />}
            </div>

            <Form
                handleSubmit={props.handleSubmit}
                tab_id={props.tab_id}
            />
        </div>
    );
}
export default Crud(Message, 'message', 'Messages', '', true);