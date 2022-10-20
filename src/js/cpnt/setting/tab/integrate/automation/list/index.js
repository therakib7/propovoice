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
const Webhook = (props) => {

	useEffect(() => {
		props.getLists({type: props.item.slug});
	}, []);

	const deleteEntry = (type, id) => {
        props.deleteEntry(type, id, null, {type: props.item.slug});
    }

	const { lists, checkedBoxes, searchVal } = props.state;
	const title = props.item.name + ( props.item.slug != 'webhook' ? ' Webhook' : '');
	return (
		<div className="ndpv-cpnt"> 
			<div className="row">
				<div className="col">
					<h2 className="pv-page-title">{title}</h2>
				</div>
				<div className="col">
					<AddNew
						title={title}
						openForm={props.openForm}
					/>
				</div>
			</div>  

			{checkedBoxes.length > 0 &&
				<Action
					length={checkedBoxes.length}
					uncheckAll={props.uncheckAll}
					deleteEntry={deleteEntry}
				/>
			}

			{props.state.formModal && <Form
				title={title}
				handleSubmit={props.handleSubmit}
				modalType={props.state.formModalType}
				type={props.item.slug}
				data={props.state.list}
				close={props.closeForm}
			/>}

			{props.state.empty && <Empty title={title} searchVal={searchVal} clickHandler={() => props.openForm('new')} />}

			{props.state.preloader ? <Preloader /> : <Table tableData={lists} searchVal={searchVal} editEntry={props.openForm} checkedBoxes={{ data: checkedBoxes, handle: props.handleCheckbox }} deleteEntry={deleteEntry} />}

			{props.state.totalPage > 1 && <Pagination forcePage={props.state.currentPage - 1} pageCount={props.state.totalPage} onPageChange={props.handlePageClick} />}
		</div>
	);
}

export default Crud(Webhook, 'webhook', 'Webhook');
