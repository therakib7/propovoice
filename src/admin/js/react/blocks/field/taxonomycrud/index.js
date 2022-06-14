
import Pagination from 'block/pagination';
import Preloader from 'block/preloader/table';

import Form from './Form';
import Table from './Table';

import Crud from 'hoc/Crud';

const Taxonomy = (props) => {
	const { lists } = props.state;
	return (
		<>
			{props.state.formModal && <Form
				handleSubmit={props.handleSubmit}
				modalType={props.state.formModalType}
				data={props.state.list}
				close={props.closeForm}
			/>}

			<div className="pi-field-repeater"> 

				{props.state.preloader ? <Preloader /> : <Table tableData={lists.tag} editEntry={props.openForm} deleteEntry={props.deleteEntry} />}

				<button className="pi-btn" onClick={() => props.openForm('new')}>
					<svg
						width={12}
						height={13}
						viewBox="0 0 12 13"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M1.875 6.5H10.125"
							stroke="#718096"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M6 2.375V10.625"
							stroke="#718096"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					Add new {props.title}
				</button>
			</div>
		</>
	);
}

export default Crud(Taxonomy, 'taxonomy', 'taxonomies');