import ReactPaginate from 'react-paginate';

const Pagination = (props) => { 
	return ( 
		<ReactPaginate
			previousClassName='pi-previous'
			nextClassName='pi-next'
			disabledClassName='pi-disabled'
			previousLabel={"<"}
			nextLabel={">"}
			breakLabel={"..."}
			breakClassName='break'
			forcePage={props.forcePage}
			pageCount={props.pageCount}
			marginPagesDisplayed={2}
			pageRangeDisplayed={5}
			onPageChange={props.onPageChange}
			containerClassName={"pi-pagination"}
			activeClassName='pi-active' 
		/>
	);
};

export default Pagination;