import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import uuid from "uuid/v4";

import Editable from 'block/editable';

import { v4 as uuidv4 } from 'uuid'; 

const columnsFromBackend = {
	[uuidv4()]: {
		name: "Requested",
		items: [
			{ 
				id: uuidv4(), 
				deal: {
					name: "Deal Name", 
					buget: "500 USD", 
					probability: "70%", 
				},
				client: {
					name: 'Rakib Hasan',
					img: '',
					company: 'Nurency',
				}
			},
			{ 
				id: uuidv4(), 
				deal: {
					name: "Deal Name", 
					buget: "500 USD", 
					probability: "70%", 
				},
				client: {
					name: 'Hasan',
					img: '',
					company: 'Nurency',
				}
			}, 
		]
	},
	[uuidv4()]: {
		name: "To do",
		items: [
			{ 
				id: uuidv4(), 
				deal: {
					name: "Deal Name", 
					buget: "500 USD", 
					probability: "70%", 
				},
				client: {
					name: 'Nabil Hasan',
					img: '',
					company: 'Nurency',
				}
			},
		]
	},
	[uuidv4()]: {
		name: "In Progress",
		items: [ 
			{ 
				id: uuidv4(), 
				deal: {
					name: "Deal Name", 
					buget: "500 USD", 
					probability: "70%", 
				},
				client: {
					name: 'Nasir',
					img: '',
					company: 'Nurency',
				}
			},
		]
	},
	[uuidv4()]: {
		name: "Done",
		items: []
	}
}; 

const onDragEnd = (result, columns, setColumns) => {
	if ( !result.destination ) return;
	const { source, destination } = result;

	if ( source.droppableId !== destination.droppableId ) {
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
	}
};

function App() {
	const [columns, setColumns] = useState(columnsFromBackend);

	const addNewColumn = () => {
		let newColumns = {...columns};
		newColumns[uuidv4()] = {
			name: "Title",
			items: []
		} 
		setColumns(newColumns);
    };

	const handleCoumnLabel = (index, value) => {
		let newColumns = {...columns};
		newColumns[index].name = value; 
		setColumns(newColumns);
    };

	return (
		<div style={{ display: "flex", /* justifyContent: "center", */ height: "100%", /* overflowX: 'scroll' */ }}>
			<DragDropContext
				onDragEnd={result => onDragEnd(result, columns, setColumns)}
			>
				{Object.entries(columns).map(([columnId, column], index) => {
					return (
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								// alignItems: "center"
							}}
							key={columnId}
						>
							<h2>
								{/* {column.name} */}
								<Editable
									// key={columnId}
									value={column.name}
									index={columnId}
									changeHandler={handleCoumnLabel}
								/>
							</h2>
							<div style={{ marginRight: 8 }}>
								<Droppable droppableId={columnId} key={columnId}>
									{(provided, snapshot) => {
										return (
											<div
												{...provided.droppableProps}
												ref={provided.innerRef}
												style={{
													background: snapshot.isDraggingOver
														? "lightblue"
														: "lightgrey",
													padding: 4,
													width: 250,
													minHeight: 500
												}}
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
																		ref={provided.innerRef}
																		{...provided.draggableProps}
																		{...provided.dragHandleProps}
																		style={{
																			userSelect: "none",
																			padding: 16,
																			margin: "0 0 8px 0",
																			minHeight: "50px",
																			backgroundColor: snapshot.isDragging
																				? "#263B4A"
																				: "#456C86",
																			color: "white",
																			...provided.draggableProps.style
																		}}
																	>
																		{item.deal.name}<br />
																		{item.client.name}
																	</div>
																);
															}}
														</Draggable>
													);
												})}
												{provided.placeholder}
											</div>
										);
									}}
								</Droppable>
							</div>
						</div>
					);
				})}

				<div
					style={{
						display: "flex",
						flexDirection: "column", 
					}} 
				>
					<h2>&nbsp;</h2>
					<div style={{ marginRight: 8 }}>
						<button onClick={ () => addNewColumn() }>Add New Column</button>	
					</div>
				</div>
			</DragDropContext>
		</div>
	);
} 
export default App; 