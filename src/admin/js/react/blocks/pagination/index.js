import ReactPaginate from 'react-paginate';

const Pagination = (props) => {
	return (
		<ReactPaginate
			previousClassName='pi-previous'
			nextClassName='pi-next'
			disabledClassName='pi-disabled'
			previousLabel={
				<svg
					width={9}
					height={14}
					viewBox="0 0 9 14"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M7.5 12.833L1.667 7 7.5 1.167"
						stroke="#E2E8F0"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			}
			nextLabel={
				<svg
					width={9}
					height={14}
					viewBox="0 0 9 14"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1.5 12.833L7.333 7 1.5 1.167"
						stroke="#4C6FFF"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			}
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