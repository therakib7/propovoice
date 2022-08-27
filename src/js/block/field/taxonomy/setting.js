import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { toast } from 'react-toastify';
import WithApi from 'hoc/Api';
import styles from './Items.module.scss'
import Form from './Form';
import Spinner from 'block/preloader/spinner';
import pro from 'block/pro-alert';
import ProLabel from 'block/pro-alert/label';

const Taxonomy = (props) => {
	const [loading, setLoading] = useState(false);
	const [list, setList] = useState([]);
	const [modal, setModal] = useState(false);
	const [modalType, setModalType] = useState('new');
	const newForm = {
		label: '',
		color: '',
		bg_color: ''
	};
	const [form, setForm] = useState(newForm);

	useEffect(() => {
		setLoading(true);
		getData();
	}, []);

	const getData = () => {
		let type = '';
		if ( props.extra_amount_type ) {
			type = '&extra_amount_type=' + props.extra_amount_type;
		}
		props.getAll('taxonomies', 'taxonomy=' + props.taxonomy + type).then(resp => {
			if (resp.data.success) {
				setList(resp.data.data[props.taxonomy]);
				setLoading(false);
			}
		});
	}

	const openModal = (e, type, tax = '') => {
		e.preventDefault();

		if ( type == 'new' && wage.length > 0 && ( props.taxonomy != 'tag' && props.taxonomy != 'lead_source' ) ) {
			pro();
			return;
		}

		setModal(true);
		if (type == 'new') {
			setModalType(type);
			setForm(newForm);
		} else {
			setModalType(type);
			setForm(tax);
		}
	}

	const handleDelete = (id) => {

		if (confirm('Are you sure, to delete it?')) { //TODO: translation 
			let newForm = {}
			newForm.taxonomy = props.taxonomy;
			newForm.delete = true;
			newForm.id = parseInt(id);

			props.update('taxonomies', newForm.id, newForm).then(resp => {
				if (resp.data.success) {
					toast.success('Successfully deleted'); //TODO: translation
					getData();
				} else {
					resp.data.data.forEach(function (value, index, array) {
						toast.error(value);
					});
				}
			});
		}
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

		// console.log(finalArray)
		let newForm = {
			reorder: finalArray,
			taxonomy: props.taxonomy
		}
		props.create('taxonomies', newForm);
		// call parent handler with new state representation
		// this.props.reorderHandler(Items)

	}

	const i18n = ndpv.i18n; 

	return (
		<>
			<div className="pi-field-repeater">
				{loading ? <Spinner /> : <DragDropContext onDragEnd={handleDragEnd}>
					<Droppable droppableId="droppable">
						{(provided, snapshot) => (
							<ul
								ref={provided.innerRef}
								style={{ margin: 0 }}
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
												className={snapshot.isDragging ? styles.listItemDragging : styles.listItem}
											>

												<div className="">
													<span className="pi-mt-3 pi-dot-list">
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
													{props.color && <>
														{(item.color && item.bg_color) && <span className="pi-badge"
															style={{
																backgroundColor: item.bg_color,
																color: item.color
															}}
														>
															<svg
																width={6}
																height={6}
																viewBox="0 0 6 6"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<circle cx={3} cy={3} r={3} fill={item.color} />
															</svg>
															{item.label}
														</span>}

														{(!item.color || !item.bg_color) && <span className="pi-badge">
															{item.label}
														</span>}
													</>}

													{!props.color && <span className="pi-badge">
														{item.label}
													</span>}

												</div>
												<div className="pi-mt-3">
													<span style={{ padding: '5px', cursor: 'pointer' }} onClick={(e) => { openModal(e, 'edit', item) }}>
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

													{ true && (!item.hasOwnProperty('type') || !item.type) && <span style={{ padding: '5px', cursor: 'pointer' }} onClick={() => { handleDelete(item.id) }}>
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
													</span>}
												</div>

											</li>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</ul>
						)}
					</Droppable>
				</DragDropContext>}

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
					{i18n.add} {i18n.new} {props.title} 
					{wage.length > 0 && ( props.taxonomy != 'tag' && props.taxonomy != 'lead_source' ) && <>
						<ProLabel />
					</>}
				</button>
			</div>

			{modal && <Form
				{...props}
				taxonomy={props.taxonomy}
				title={props.title}
				modalType={modalType}
				reload={getData}
				data={form}
				color={props.color}
				close={() => setModal(false)}
			/>}
		</>
	);
}

export default WithApi(Taxonomy);  