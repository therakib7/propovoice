import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from 'block/breadcrumb';
import AddNew from 'block/add-new';
import Action from 'block/action/table';
import Preloader from 'block/preloader/table';
import Pagination from 'block/pagination';
import EntityFields from "block/add-new/EntityFields";

import Form from './Form';
import Table from './Table';
import Search from './Search';
import Empty from 'block/empty';

import Crud from 'hoc/Crud';

const Subscription = (props) => {
	const { id } = useParams();

	useEffect(() => {
		props.getLists({ ref_id: id });
	}, []);

	const { title, lists, checkedBoxes, searchVal } = props.state;
	console.log(props.state);
	const i18n = ndpv.i18n;

	return (
		<div className="ndpv-cpnt">
			<div className="pv-list-single-head">
				<div className="row">
					<div className="col-md-6">
						<div className="pv-list-content">
							{/* <img src={img} alt="logo" className="logo" /> */}
							<div className="pv-lead-address">
								<h3 className="">
									{i18n.inv + ' ' + i18n.id + ': ' + id}
								</h3>

								<address>
									{/* {data.person ? data.person.email : data.org.email} */}
									Name: <br />
									Email: <br />
									Subscription ID:
									{/* {data.person && data.org && (
										<>
											{i18n.org}: {data.org.name}
											<br />
										</>
									)}
									{i18n.budget}:{" "}
									{data.budget && currency(data.budget, data.currency)} */}
								</address>
							</div>
						</div>
					</div>

					<div className="col-md-6">
						{false && <div className="pv-list-single-button-content">
							<div className="pv-select">
								<label>
									{i18n.lead} {i18n.level}:
								</label>
							</div>
							<div className="pv-buttons pv-text-right">
								<button
									className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue pv-color-white pv-bg-shadow"
								// onClick={() =>
								// 	this.setState({
								// 		dealModal: true,
								// 		dealModalType: "move",
								// 	})
								// }
								>
									Cancel Subscription
								</button>

								{/* <Action
									id={data.id}
									module="lead"
									edit={() => this.setState({ leadModal: true })}
									del={this.deleteEntry}
								/> */}
							</div>
						</div>}
					</div>
				</div>
			</div>

			<div className="row pv-mt-25">
				<div className="col-lg-9">
					<div className="pv-horizontal-tab" style={{ border: "1px solid rgba(221, 221, 221, 0.6588235294)" }}>
						<div className="pv-tab-content">
							{/* {preloader ? (
								<Preloader />
							) : (
								<Table
									tableData={lists}
								/>
							)} */}
							{props.state.empty && <Empty mod='lead' title={title} searchVal={searchVal} clickHandler={() => props.openForm('new')} />}

							{props.state.preloader ? <Preloader /> : <Table tableData={lists} searchVal={searchVal} editEntry={props.openForm} checkedBoxes={{ data: checkedBoxes, handle: props.handleCheckbox }} deleteEntry={props.deleteEntry} />}

							{props.state.totalPage > 1 && <Pagination forcePage={props.state.currentPage - 1} pageCount={props.state.totalPage} onPageChange={props.handlePageClick} />}
						</div>
					</div>
				</div>

				<div className="col-lg-3 pv-lead-right-content">
					<div className="pv-widget pv-info-box">
						<h3 className="pv-widget-title">
							{i18n.addi} {i18n.info}
						</h3>
						<address>
							{false && (
								<>
									<span>{i18n.mob}:</span>
									{/* {data.person ? data.person.mobile : data.org.mobile} */}
								</>
							)}
						</address>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Crud(Subscription, 'subscription', ndpv.i18n.substion);