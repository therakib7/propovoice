import React, { useCallback, useRef, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import useClickOutside from 'block/outside-click';
import Form from './Form';
import WithApi from 'hoc/Api';

const Taxonomy = (props) => {
	const dropdownContent = useRef();

	const [list, setList] = useState([]);
	const [listById, setListById] = useState([]);
	const [dropdown, setDropdown] = useState(false);
	const [modal, setModal] = useState(false);
	const [modalType, setModalType] = useState('new');
	const newForm = {
		label: '',
		color: '',
		bg_color: ''
	};
	const [form, setForm] = useState(newForm);

	const close = useCallback(() => setDropdown(false), []);
	useClickOutside(dropdownContent, close);

	useEffect(() => {
		getData();
	}, []);

	const getData = () => {
		props.getAll('taxonomies', 'taxonomy=' + props.taxonomy + '&id=' + props.id).then(resp => {
			if (resp.data.success) {
				setList(resp.data.data[props.taxonomy]);
				setListById(resp.data.data['single_' + props.taxonomy]);
			}
		});
	}

	const showDropdown = () => {
		if (dropdown) {
			setDropdown(false);
		} else {
			setDropdown(true);
		}
	};

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

	const handleColorChange = (val, key) => {
		setForm({ ...form, [key]: val })
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		let newForm = { ...form }
		newForm.taxonomy = props.taxonomy;

		if (modalType == 'new') {
			props.create('taxonomies', newForm).then(resp => {
				if (resp.data.success) {
					toast.success('Successfully added'); //TODO: translation
					getData();
				} else {
					resp.data.data.forEach(function (value, index, array) {
						toast.error(value);
					});
				}
			});;
		} else {
			props.update('taxonomies', newForm.id, newForm).then(resp => {
				if (resp.data.success) {
					toast.success('Successfully updated'); //TODO: translation
					getData();
				} else {
					resp.data.data.forEach(function (value, index, array) {
						toast.error(value);
					});
				}
			});;
		}
		setModal(false);
	}

	const handleDelete = (id) => {
		if (confirm('Are you sure, to delete it?')) { //TODO: translation

			let newForm = {}
			newForm.taxonomy = props.taxonomy;
			newForm.delete = true;
			newForm.post_id = parseInt(props.id);
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

	const handleSelect = (id) => {
		let newForm = {}
		newForm.taxonomy = props.taxonomy;
		newForm.add = true;
		newForm.append = props.multiple ? true : false;
		newForm.post_id = parseInt(props.id);
		newForm.id = parseInt(id);
		setDropdown(false);
		props.update('taxonomies', newForm.id, newForm).then(resp => {
			if (resp.data.success) {
				getData();
			} else {
				resp.data.data.forEach(function (value, index, array) {
					toast.error(value);
				});
			}
		});
	}

	return (
		<>
			{props.multiple && listById && listById.map((item, itemIndex) => {
				return (
					<span key={itemIndex} className="pi-badge">{item.label} <b onClick={() => handleDelete(item.id)}>X</b></span>
				)
			})}

			<div className="pi-action-content" ref={dropdownContent}>
				{props.multiple && <button className="pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-shadow" onClick={() => showDropdown()}>
					+ Add {props.title}
				</button>}

				{!props.multiple && listById.length > 0 && <button
					className={(props.btnMid) ? 'pi-btn pi-btn-medium' : 'pi-btn pi-btn-small'}
					style={{
						backgroundColor: listById[0].bg_color,
						color: listById[0].color
					}}
					onClick={() => showDropdown()}
				>
					{listById[0].label}
					<svg
						width={10}
						height={6}
						style={{ marginLeft: (props.btnMid) ? '10px' : '7px' }}
						className='pi-mr-0'
						viewBox="0 0 10 6"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M5.00001 3.78145L8.30001 0.481445L9.24268 1.42411L5.00001 5.66678L0.757342 1.42411L1.70001 0.481445L5.00001 3.78145Z"
							fill={listById[0].color}
						/>
					</svg>
				</button>}

				{!props.multiple && !listById.length && <button
					style={{ backgroundColor: '#E2E8F0', color: '#4a5568' }}
					className={(props.btnMid) ? 'pi-btn pi-btn-medium pi-bg-hover-shadow' : 'pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-shadow'}
					onClick={() => showDropdown()}
				>
					+ Add {props.title}
				</button>}

				{dropdown && <div className="pi-dropdown-content pi-show">
					<button onClick={(e) => { openModal(e, 'new') }}>+ Add New {props.title}</button>
					{list && list.map((item, itemIndex) => {
						return (
							<a key={itemIndex} onClick={() => handleSelect(item.id)}>{item.label}</a>
						)
					})}
				</div>}
			</div>

			{modal && <Form
				{...props}
				taxonomy={props.taxonomy}
				title={props.title}
				modalType={modalType}
				reload={getData}
				data={form}
				color={true}
				close={() => setModal(false)}
			/>}
		</>
	);
}
export default WithApi(Taxonomy);  