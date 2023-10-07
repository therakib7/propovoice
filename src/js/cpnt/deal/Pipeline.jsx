import { useRef, useCallback, useState, useEffect } from 'react';
import useClickOutside from 'block/outside-click';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { currency, countryByCode } from "helper";
import { useNavigate } from 'react-router-dom';
import WithApi from 'hoc/Api';

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
		let deal_stage_id = parseInt(destColumn.id);
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

	const actionStageDropdownRef = useRef();
	const [dropdownStageAction, setStageDropdownAction] = useState(null);
	const closeAction = useCallback(() => setStageDropdownAction(null), []);
	useClickOutside(actionStageDropdownRef, closeAction);

	const [columns, setColumns] = useState({});

	const showStageDropdown = (id) => {
		if (dropdownStageAction == id) {
			setStageDropdownAction(null);
		} else {
			setStageDropdownAction(id);
		}
	};

	useEffect(() => {
		setColumns(props.data);
	}, [props.data]);

	const navigate = useNavigate();
	const goToSingle = (id) => {
		navigate(`/deal/${id}`);
	};

	const CharLimit = (string) => {
		let limit = 28;
		if (string.length > limit) {
			return `${string.substring(0, limit)}... `;
		}
		return string;
	};
	const i18n = ndpv.i18n;
	return (
		<div className="pv-board">
			<DragDropContext
				onDragEnd={result => onDragEnd(props.update, result, columns, setColumns)}
			>
				{Object.entries(columns).map(([columnId, column], index) => {
					return (
						<div className="pv-board-column" key={columnId}>
							<div className="pv-board-column-title pv-bg-shadow" style={{ borderColor: column.color, color: column.color }}>
								<h4 className="">{column.name}</h4>
								<div className="pv-action-content">
									<button className={(columnId == dropdownStageAction ? 'pv-active' : '')} onClick={() => showStageDropdown(columnId)}>
										<svg
											width={24}
											height={24}
											viewBox="0 0 24 24"
											fill="none"
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

									{columnId == dropdownStageAction && <div className="pv-dropdown-content pv-show" ref={actionStageDropdownRef} >
										<a onClick={() => { props.taxForm('edit', column); showStageDropdown(columnId); }}>{i18n.edit}</a>
									</div>}
								</div>
							</div>
							<Droppable droppableId={columnId} key={columnId}>
								{(provided, snapshot) => {
									return (
										<div
											{...provided.droppableProps}
											ref={provided.innerRef}
											className="pv-board-content"
										>
											{column.items.map((item, index) => {
												let img = ndpv.assetImgUri + 'avatar.png';
												if (item.person && item.person.img) {
													img = item.person.img.src;
												} else if (item.org && item.org.img) {
													img = item.org.img.src;
												}
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
																	className="pv-board-column-item pv-bg-shadow"
																>
																	<div className="pv-board-item-top">
																		<h4>{CharLimit(item.title)}</h4>
																		{item.budget && <span>{currency(item.budget, item.currency)}</span>}
																		{!wage.length && <p>{i18n.proba}: {item.probability}%</p>}
																	</div>
																	<div className="pv-avatar-content">
																		<img src={img} alt="avatar" />
																		<div className="pv-avatar-text">
																			<h5>{(item.person || item.org) && <>{(item.person) ? item.person.first_name : item.org.name}</>}</h5>
																			<p>
																				{(item.person || item.org) && <>{item.person ? <>
																					{(item.person.region || item.person.country) &&
																						<>
																							{(item.person.region && item.person.country) ? item.person.region + ', ' : ''} {countryByCode(item.person.country)}
																						</>
																					}
																				</> : <>
																					{(item.org.region || item.org.country) &&
																						<>
																							{(item.org.region && item.org.country) ? item.org.region + ', ' : ''} {countryByCode(item.org.country)}
																						</>
																					}
																				</>}</>}
																			</p>

																			{column.type == 'won' && <span className="pv-badge" style={{ backgroundColor: '#DDFFDE', color: '#0BA24B' }}>{i18n.won}</span>}
																			{column.type == 'lost' && <span className="pv-badge" style={{ backgroundColor: '#FFDEEB', color: '#FF267F' }}>{i18n.lost}</span>}
																		</div>
																	</div>
																</div>
															);
														}}
													</Draggable>
												);
											})}
											{provided.placeholder}

											{index == 0 &&
												<button
													className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-shadow pv-bg-hover-shadow"
													onClick={() => props.new('new')}
												>
													<svg
														width={14}
														height={12}
														viewBox="0 0 12 15"
														fill="none"
													>
														<path
															d="M2.5 8H13.5"
															stroke="#4A5568"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M8 2.5V13.5"
															stroke="#4A5568"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
													{i18n.new} {i18n.deal}
												</button>
											}

										</div>
									);
								}}
							</Droppable>
						</div>
					);
				})}
			</DragDropContext>
		</div>
	);
}

export default WithApi(Pipeline);