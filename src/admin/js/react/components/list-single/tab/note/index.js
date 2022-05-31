import ReactPaginate from 'react-paginate';

import Preloader from 'block/preloader/table';
 
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

            {props.state.totalPage > 1 && <ReactPaginate
                previousClassName='pi-previous'
                nextClassName='pi-next'
                disabledClassName='pi-disabled'
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName='break'
                forcePage={props.state.currentPage - 1}
                pageCount={props.state.totalPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={props.handlePageClick}
                containerClassName={"pi-pagination"}
                activeClassName='pi-active' />
            } 
        </div>
    );
}

 
export default Crud(Note, 'note');