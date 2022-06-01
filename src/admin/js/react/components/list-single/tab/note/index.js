
import Preloader from 'block/preloader/table';
import Pagination from 'block/pagination';

import Form from './Form';
import Table from './Table';
// import Search from './Search';
// import Empty from 'block/empty';

import Crud from 'hoc/Crud';

const Note = ( props ) => {
    const { lists, checkedBoxes, searchVal } = props.state;
    return (
        <div className="">  
            <Form
                handleSubmit={props.handleSubmit}  
                tab_id={props.tab_id}
            /> 
            <div className="pi-work-button-group">
                <h3>My Note</h3> 
            </div> 

            {props.state.preloader ? <Preloader /> : <Table tableData={lists} searchVal={searchVal} editEntry={props.openForm} checkedBoxes={{ data: checkedBoxes, handle: props.handleCheckbox }} deleteEntry={props.deleteEntry} />}

            <div className="pi-pagination-content">
                { props.state.totalPage > 1 && <Pagination forcePage={props.state.currentPage - 1} pageCount={props.state.totalPage} onPageChange={props.handlePageClick} />} 
            </div>
        </div>
    );
}  
export default Crud(Note, 'note');