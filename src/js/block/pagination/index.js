import ReactPaginate from 'react-paginate';

const Pagination = (props) => {
	return (
		<div className="pv-pagination-content">
			<ReactPaginate
				previousClassName='pv-previous'
				nextClassName='pv-next'
				disabledClassName='pv-disabled'
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
				breakLabel={
					<svg
						width={15}
						height={15}
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M7 12a2 2 0 10-4 0 2 2 0 004 0zM14 12a2 2 0 10-4 0 2 2 0 004 0zM21 12a2 2 0 10-4 0 2 2 0 004 0z"
							fill="#718096"
						/>
					</svg>
				}
				breakClassName='break'
				forcePage={props.forcePage}
				pageCount={props.pageCount}
				marginPagesDisplayed={2}
				pageRangeDisplayed={5}
				onPageChange={props.onPageChange}
				containerClassName={"pv-pagination"}
				activeClassName='pv-active'
			/>
		</div> 
	);
};

export default Pagination;