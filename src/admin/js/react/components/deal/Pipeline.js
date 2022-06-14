import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useNavigate } from 'react-router-dom';

import WithApi from 'hoc/Api';

import Editable from 'block/editable';
import { v4 as uuidv4 } from 'uuid';
import { data } from "autoprefixer";

const onDragEnd = (update, result, columns, setColumns) => {
	if (!result.destination) return;
	const { source, destination } = result;

	if (source.droppableId !== destination.droppableId) {

		const sourceColumn = columns[source.droppableId];
		const destColumn = columns[destination.droppableId];
		const sourceItems = [...sourceColumn.items];
		const destItems = [...destColumn.items];
		const [removed] = sourceItems.splice(source.index, 1);
		destItems.splice(destination.index, 0, removed);

		setColumns({
			...columns,
			[source.droppableId]: {
				...sourceColumn,
				items: sourceItems
			},
			[destination.droppableId]: {
				...destColumn,
				items: destItems
			}
		});

		//update another stage
		let deal_id = parseInt(columns[source.droppableId].items[source.index].id);
		let deal_stage_id = parseInt(destination.droppableId);
		let finalArray = destItems.map(function (obj) {
			return parseInt(obj.id);
		});
		update('deals', deal_id, { stage_id: deal_stage_id, reorder: finalArray }); //update come from api hoc

	} else {
		const column = columns[source.droppableId];
		const copiedItems = [...column.items];
		const [removed] = copiedItems.splice(source.index, 1);
		copiedItems.splice(destination.index, 0, removed);

		setColumns({
			...columns,
			[source.droppableId]: {
				...column,
				items: copiedItems
			}
		});

		//update deal in same stage
		let finalArray = copiedItems.map(function (obj) {
			return parseInt(obj.id);
		});
		let deal_id = parseInt(columns[source.droppableId].items[source.index].id);
		update('deals', deal_id, { reorder: finalArray });
	}
};

function Pipeline(props) {
	// const [columns, setColumns] = useState(columnsFromBackend);
	const [columns, setColumns] = useState({});

	const addNewColumn = () => {
		let newColumns = { ...columns };
		newColumns[uuidv4()] = {
			name: 'Stage Label',
			items: []
		}
		setColumns(newColumns);
	};

	const [dropdown, setDropdown] = useState(null);

	const showDropdown = (id) => {
		if (dropdown == id) {
			setDropdown(null);
		} else {
			setDropdown(id);
		}
	};

	useEffect(() => {
		setColumns(props.data);
	}, [props.data]);

	const navigate = useNavigate();
	const goToSingle = (id) => {
		navigate(`/deal/single/${id}`, { replace: true });
	};

	const handleCoumnLabel = (index, value) => {
		let newColumns = { ...columns };
		newColumns[index].name = value;
		setColumns(newColumns);
	};

	const CharLimit = (string) => {
		let limit = 22;
		if (string.length > limit) {
			return `${string.substring(0, limit)}... `;
		}
		return string;
	};

	return (
		<div className="pi-board">
			<DragDropContext
				onDragEnd={result => onDragEnd(props.update, result, columns, setColumns)}
			>
				{Object.entries(columns).map(([columnId, column], index) => {
					return (
						<div className="pi-board-column" key={columnId}>
							<div className="pi-board-column-title pi-bg-shadow">
								<h4 className="pi-color-blue">{column.name}</h4>
								{/* <h4 className="pi-color-blue">
								<Editable
									// key={columnId}
									value={column.name}
									index={columnId}
									changeHandler={handleCoumnLabel}
								/>
								</h4> */}

								<div className="pi-action-content">
									<button className={(columnId == dropdown ? 'pi-active' : '')} onClick={() => showDropdown(columnId)}>
										<svg
											width={24}
											height={24}
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14C6.10457 14 7 13.1046 7 12Z"
												fill="#718096"
											/>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12Z"
												fill="#718096"
											/>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14C20.1046 14 21 13.1046 21 12Z"
												fill="#718096"
											/>
										</svg>
									</button>
									{columnId == dropdown && <div className="pi-dropdown-content pi-show"
									// ref={popover}
									>
										<a onClick={() => props.editEntry('edit', columnId)}>Edit</a>
										<a onClick={() => props.deleteEntry('single', columnId)}>Delete</a>
									</div>}
								</div>
							</div>
							<Droppable droppableId={columnId} key={columnId}>
								{(provided, snapshot) => {
									return (
										<div
											{...provided.droppableProps}
											ref={provided.innerRef}
											className="pi-board-content"
										/* style={{
											background: snapshot.isDraggingOver
												? "lightblue"
												: "lightgrey",
											padding: 4,
											width: 250,
											minHeight: 500
										}} */
										>
											{column.items.map((item, index) => {
												return (
													<Draggable
														key={item.id}
														draggableId={item.id}
														index={index}
													>
														{(provided, snapshot) => {
															return (
																<div
																	onClick={() => goToSingle(item.id)}
																	ref={provided.innerRef}
																	{...provided.draggableProps}
																	{...provided.dragHandleProps}
																	/* style={{
																		userSelect: "none",
																		padding: 16,
																		margin: "0 0 8px 0",
																		minHeight: "50px",
																		backgroundColor: snapshot.isDragging
																			? "#263B4A"
																			: "#456C86",
																		color: "white",
																		...provided.draggableProps.style
																	}} */
																	className="pi-board-column-item pi-bg-shadow"
																>
																	<div className="pi-board-item-top">
																		<h4>{CharLimit(item.title)}</h4>
																		<span>$ {item.budget}</span>
																		<p>Probability: {item.provability}%</p>
																		{item.status == 'won' && <span className="pi-badge pi-bg-green pi-color-white">Won</span>}
																		{item.status == 'lost' && <span className="pi-badge pi-bg-red pi-color-white">Lost</span>}
																	</div>
																	<div className="pi-avatar-content">
																		<img src={ncpi.assetImgUri + 'avatar.png'} alt="avatar" />
																		<div className="pi-avatar-text">
																			<h5>{item.contact.first_name}</h5>
																			<p>{(item.contact.region) ? item.contact.region + ',' : ''} {item.contact.country}</p>
																		</div>
																	</div>
																</div>
															);
														}}
													</Draggable>
												);
											})}
											{provided.placeholder}

											{index == 0 && <button
												className="pi-btn pi-btn-big pi-bg-blue pi-bg-hover-blue pi-bg-shadow"
												onClick={() => props.new('new')}
											>
												<svg
													width={16}
													height={14}
													viewBox="0 0 12 15"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M2.5 8H13.5"
														stroke="white"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M8 2.5V13.5"
														stroke="white"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
												New Deal
											</button>}

										</div>
									);
								}}
							</Droppable>
						</div>
					);
				})}

				<div className="pi-board-column">
					<div className="pi-board-content" style={{ padding: 0 }}>
						<button
							className="pi-btn pi-btn-medium pi-bg-stroke"
							onClick={() => addNewColumn()}
						>
							<svg
								width={16}
								height={14}
								viewBox="0 0 12 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M2.5 8H13.5"
									stroke="white"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M8 2.5V13.5"
									stroke="white"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							Add New Column
						</button>

					</div>
				</div>
			</DragDropContext>

		</div>
	);
}

export default WithApi(Pipeline);  