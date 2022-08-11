import { useEffect } from "react";
import Breadcrumb from 'block/breadcrumb';
import AddNew from 'block/add-new';
import Action from 'block/action/table';
import Preloader from 'block/preloader/table';
import Pagination from 'block/pagination';

import Form from './Form';
import Table from './Table';
import Search from './Search';
import Empty from 'block/empty';

import Crud from 'hoc/Crud';

import { __ } from '@wordpress/i18n';

const Lead = (props) => { 

	useEffect(() => {
		props.getLists();
	}, []);

	const { title, lists, checkedBoxes, searchVal } = props.state;
	return (
		<div className="ncpi-components">
			<Breadcrumb title={title} /> 
			<div className="row">
				<div className="col">
					<h2 className="pi-page-title">{__( 'Hello, world!', 'propovoice' )} {title}</h2>
				</div>
				<div className="col">
					<AddNew
						title={title}
						openForm={props.openForm}
					/>
				</div>
			</div>

			{false && <div className="pi-buttons-group pi-mb-20">
				<button className="pi-btn pi-btn-icon pi-bg-hover-shadow pi-mr-5">
					<svg
						width={20}
						height={20}
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M7.5 5H16.875"
							stroke="#4A5568"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M7.5 10H16.875"
							stroke="#4A5568"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M7.5 15H16.875"
							stroke="#4A5568"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M3.125 5H4.375"
							stroke="#4A5568"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M3.125 10H4.375"
							stroke="#4A5568"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M3.125 15H4.375"
							stroke="#4A5568"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
				<button className="pi-btn pi-btn-icon pi-bg-hover-shadow">
					<svg
						width={20}
						height={20}
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M17.5 4.375H2.5C2.15482 4.375 1.875 4.65482 1.875 5V6.875C1.875 7.22018 2.15482 7.5 2.5 7.5H17.5C17.8452 7.5 18.125 7.22018 18.125 6.875V5C18.125 4.65482 17.8452 4.375 17.5 4.375Z"
							stroke="#A0AEC0"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M16.875 7.5V15C16.875 15.1658 16.8092 15.3247 16.6919 15.4419C16.5747 15.5592 16.4158 15.625 16.25 15.625H3.75C3.58424 15.625 3.42527 15.5592 3.30806 15.4419C3.19085 15.3247 3.125 15.1658 3.125 15V7.5"
							stroke="#A0AEC0"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M8.125 10.625H11.875"
							stroke="#A0AEC0"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</div>}

			<Search
				title={title}
				showing={lists.length}
				showItem={props.showItem}
				total={props.state.total}
				handleSubmit={props.getLists}
			/>

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
				close={props.closeForm}
			/>}

			{props.state.empty && <Empty title={title} searchVal={searchVal} clickHandler={() => props.openForm('new')} />}

			{props.state.preloader ? <Preloader /> : <Table tableData={lists} searchVal={searchVal} editEntry={props.openForm} checkedBoxes={{ data: checkedBoxes, handle: props.handleCheckbox }} deleteEntry={props.deleteEntry} />}

			{props.state.totalPage > 1 && <Pagination forcePage={props.state.currentPage - 1} pageCount={props.state.totalPage} onPageChange={props.handlePageClick} />}
		</div>
	);
}

export default Crud(Lead, 'lead');