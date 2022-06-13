import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import WithApi from 'hoc/Api';
import styles from './Items.module.scss'

const Contact = (props) => {
	const [list, setList] = useState([]);
	const [modal, setModal] = useState(false);
	const [modalType, setModalType] = useState('new');
	const newForm = {
		label: '',
		color: '#dfdfdf'
	};
	const [form, setForm] = useState(newForm);

	useEffect(() => {
		//TODO: stop multiple rendering if loaded  
		props.getAll('taxonomies', 'taxonomy=' + props.taxonomy).then(resp => {
			if (resp.data.success) {
				setList(resp.data.data[props.taxonomy]);
			}
		});

	}, []);

	const openModal = (e, type, tax = '') => {
		e.preventDefault();
		setModal(true);
		if (type == 'new') {
			setModalType(type);
			setForm(newForm);
		} else {
			setModalType(type);
			setForm(tax);
		}
	}

	const handleChange = (e) => {
		const target = e.target;
		const name = target.name;
		const value = target.value;
		setForm({ ...form, [name]: value })
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('submited');
	}

	const handleDragEnd = (result) => {

		if (!result.destination) return

		//helper function to reorder result (src: react-beautiful-dnd docs)
		const reorder = (list, startIndex, endIndex) => {
			const result = Array.from(list)
			const [removed] = result.splice(startIndex, 1)
			result.splice(endIndex, 0, removed)
			return result
		}

		// perform reorder
		const Items = reorder(
			list,
			result.source.index,
			result.destination.index
		)
		setList(Items);

		let finalArray = Items.map(function (obj) {
			return parseInt(obj.id);
		});

		console.log(finalArray)
		// call parent handler with new state representation
		// this.props.reorderHandler(Items)

	}

	return (
		<>
			<div className="pi-form-repeater-content">
				<div className="pi-form-repeater">
					<DragDropContext onDragEnd={handleDragEnd}>
						<Droppable droppableId="droppable">
							{(provided, snapshot) => (
								<ul
									ref={provided.innerRef}
									className={snapshot.isDraggingOver ? styles.listDraggingOver : ''}
								>
									{list.map((item, i) => (
										<Draggable key={item.id} draggableId={item.id} index={i}>
											{(provided, snapshot) => (
												<li
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													style={provided.draggableProps.style}
													className={snapshot.isDragging ? styles.listItemDragging : ''}
												>
													<div className="row">
														<div className="col">
															<span className="pi-mt-2 pi-dot-list">
																<svg
																	width={24}
																	height={24}
																	viewBox="0 0 24 24"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path
																		d="M5.625 9.75C6.24632 9.75 6.75 9.24632 6.75 8.625C6.75 8.00368 6.24632 7.5 5.625 7.5C5.00368 7.5 4.5 8.00368 4.5 8.625C4.5 9.24632 5.00368 9.75 5.625 9.75Z"
																		fill="#CBD5E0"
																	/>
																	<path
																		d="M12 9.75C12.6213 9.75 13.125 9.24632 13.125 8.625C13.125 8.00368 12.6213 7.5 12 7.5C11.3787 7.5 10.875 8.00368 10.875 8.625C10.875 9.24632 11.3787 9.75 12 9.75Z"
																		fill="#CBD5E0"
																	/>
																	<path
																		d="M18.375 9.75C18.9963 9.75 19.5 9.24632 19.5 8.625C19.5 8.00368 18.9963 7.5 18.375 7.5C17.7537 7.5 17.25 8.00368 17.25 8.625C17.25 9.24632 17.7537 9.75 18.375 9.75Z"
																		fill="#CBD5E0"
																	/>
																	<path
																		d="M5.625 16.5C6.24632 16.5 6.75 15.9963 6.75 15.375C6.75 14.7537 6.24632 14.25 5.625 14.25C5.00368 14.25 4.5 14.7537 4.5 15.375C4.5 15.9963 5.00368 16.5 5.625 16.5Z"
																		fill="#CBD5E0"
																	/>
																	<path
																		d="M12 16.5C12.6213 16.5 13.125 15.9963 13.125 15.375C13.125 14.7537 12.6213 14.25 12 14.25C11.3787 14.25 10.875 14.7537 10.875 15.375C10.875 15.9963 11.3787 16.5 12 16.5Z"
																		fill="#CBD5E0"
																	/>
																	<path
																		d="M18.375 16.5C18.9963 16.5 19.5 15.9963 19.5 15.375C19.5 14.7537 18.9963 14.25 18.375 14.25C17.7537 14.25 17.25 14.7537 17.25 15.375C17.25 15.9963 17.7537 16.5 18.375 16.5Z"
																		fill="#CBD5E0"
																	/>
																</svg>
															</span>
															<span
																className="pi-badge pi-bg-orange"
																style={{
																	backgroundColor: "#ddffde !important",
																	color: "#108315"
																}}
															>
																<svg
																	width={6}
																	height={6}
																	viewBox="0 0 6 6"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<circle cx={3} cy={3} r={3} fill="#108315" />
																</svg>
																{item.label}
															</span>
														</div>
														<div className="col pi-text-right pi-mt-6">
															<span onClick={(e) => { openModal(e, 'edit', item) }}>
																<svg
																	width={16}
																	height={16}
																	viewBox="0 0 16 16"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path
																		d="M5.79375 13.4999H3C2.86739 13.4999 2.74022 13.4473 2.64645 13.3535C2.55268 13.2597 2.5 13.1326 2.5 12.9999V10.2062C2.49978 10.1413 2.51236 10.0769 2.53702 10.0169C2.56169 9.95682 2.59796 9.90222 2.64375 9.85619L10.1438 2.3562C10.1903 2.30895 10.2457 2.27144 10.3069 2.24583C10.3681 2.22022 10.4337 2.20703 10.5 2.20703C10.5663 2.20703 10.632 2.22022 10.6931 2.24583C10.7543 2.27144 10.8097 2.30895 10.8563 2.3562L13.6438 5.1437C13.691 5.19022 13.7285 5.24568 13.7541 5.30684C13.7797 5.368 13.7929 5.43364 13.7929 5.49995C13.7929 5.56625 13.7797 5.63189 13.7541 5.69305C13.7285 5.75421 13.691 5.80967 13.6438 5.85619L6.14375 13.3562C6.09773 13.402 6.04313 13.4383 5.98307 13.4629C5.92301 13.4876 5.85868 13.5002 5.79375 13.4999V13.4999Z"
																		stroke="#CBD5E0"
																		strokeWidth="1.5"
																		strokeLinecap="round"
																		strokeLinejoin="round"
																	/>
																	<path
																		d="M8.5 4L12 7.5"
																		stroke="#CBD5E0"
																		strokeWidth="1.5"
																		strokeLinecap="round"
																		strokeLinejoin="round"
																	/>
																</svg>
															</span>
															<span>
																<svg
																	width={16}
																	height={16}
																	viewBox="0 0 16 16"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path
																		d="M13.5 3.5H2.5"
																		stroke="#CBD5E0"
																		strokeWidth="1.5"
																		strokeLinecap="round"
																		strokeLinejoin="round"
																	/>
																	<path
																		d="M5.5 1.5H10.5"
																		stroke="#CBD5E0"
																		strokeWidth="1.5"
																		strokeLinecap="round"
																		strokeLinejoin="round"
																	/>
																	<path
																		d="M12.5 3.5V13C12.5 13.1326 12.4473 13.2598 12.3536 13.3536C12.2598 13.4473 12.1326 13.5 12 13.5H4C3.86739 13.5 3.74021 13.4473 3.64645 13.3536C3.55268 13.2598 3.5 13.1326 3.5 13V3.5"
																		stroke="#CBD5E0"
																		strokeWidth="1.5"
																		strokeLinecap="round"
																		strokeLinejoin="round"
																	/>
																</svg>
															</span>
														</div>
													</div>
												</li>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</ul>
							)}
						</Droppable>
					</DragDropContext>

					<button className="pi-btn" onClick={(e) => { openModal(e, 'new') }}>
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
						Add New
					</button>
				</div>
			</div>


			{modal && <div className="pi-overlay pi-show">
				<div className="pi-modal-content">

					<div className="pi-modal-header pi-gradient">
						<span className="pi-close" onClick={() => setModal(false)}>
							<svg
								width={25}
								height={25}
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12.5 3.5L3.5 12.5"
									stroke="#718096"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M12.5 12.5L3.5 3.5"
									stroke="#718096"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</span>
						<h2 className="pi-modal-title">{modalType == 'new' ? 'New' : 'Edit'} item</h2>
						<p>{modalType == 'new' ? 'New' : 'Edit'} item from here</p>
					</div>

					<div className="pi-content">
						<div className="pi-form-style-one">


							<div className="row">
								<div className="col-md">
									<label htmlFor="field-label">
										Name
									</label>

									<input
										id="field-label"
										type="text"
										name="label"
										value={form.label}
										onChange={(e) => handleChange(e)}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="pi-modal-footer">
						<div className="row">
							<div className="col">
								<button type='submit' onClick={(e) => handleSubmit(e)} className="pi-btn pi-bg-blue pi-bg-hover-blue pi-btn-big pi-float-right pi-color-white">
									Save
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>}
		</>
	);
}

export default WithApi(Contact);  