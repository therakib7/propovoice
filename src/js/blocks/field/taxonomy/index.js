import React, { useCallback, useRef, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import useClickOutside from 'block/outside-click';
import Form from './Form';
import WithApi from 'hoc/Api';
import pro from 'block/pro-alert';

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
		if (props.data) {
			if (props.multiple) {
				setListById(props.data);
			} else {
				setListById([props.data]);
			}

			getData();
		} else {
			getDataWithSingle();
		}
	}, []);

	const getData = () => {
		if (props.list) {
			setList(props.list);
			return;
		}
		props.getAll('taxonomies', 'taxonomy=' + props.taxonomy).then(resp => {
			if (resp.data.success) {
				setList(resp.data.data[props.taxonomy]);
			}
		});
	}

	const getDataWithSingle = () => {
		props.getAll('taxonomies', 'taxonomy=' + props.taxonomy + '&id=' + props.id).then(resp => {
			if (resp.data.success) {
				setList(resp.data.data[props.taxonomy]);
				setListById(resp.data.data['single_' + props.taxonomy]);
			}
		});
	}

	const showDropdown = (e) => {
		e.preventDefault();
		if (dropdown) {
			setDropdown(false);
		} else {
			setDropdown(true);
		}
	};

	const openModal = (e, type, tax = '') => {
		e.preventDefault();


		if (type == 'new' && wage.length > 0 && (props.taxonomy != 'tag' && props.taxonomy != 'lead_source')) {
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
			newForm.post_id = parseInt(props.id);
			newForm.id = parseInt(id);

			const filtered = listById.filter(obj => {
				return obj.id !== id;
			});
			setListById(filtered);

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

	const handleSelect = (item) => {
		let newForm = {}
		newForm.taxonomy = props.taxonomy;
		newForm.add = true;
		newForm.append = props.multiple ? true : false;
		newForm.post_id = parseInt(props.id);
		newForm.id = parseInt(item.id);

		setDropdown(false);

		if (props.onChange) {
			props.onChange(item);
		}

		if (!props.multiple) {
			setListById([item]);
		} else {
			if (!listById.some(e => e.id == item.id)) {
				setListById([...listById, item]);
			}
		}

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
				{props.multiple && <button
					className={(!props.small) ? 'pi-btn pi-btn-medium pi-bg-stroke pi-bg-hover-shadow' : 'pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-shadow'}
					onClick={(e) => showDropdown(e)}>
					+ Add {props.title}
				</button>}

				{!props.multiple && listById.length > 0 && <button
					className={(!props.small) ? 'pi-btn pi-btn-medium' : 'pi-btn pi-btn-small'}
					style={{
						backgroundColor: listById[0].bg_color,
						color: listById[0].color
					}}
					onClick={(e) => showDropdown(e)}
				>
					{listById[0].label}
					<svg
						width={10}
						height={6}
						style={{ marginLeft: (!props.small) ? '10px' : '7px' }}
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
					className={(!props.small) ? 'pi-btn pi-btn-medium pi-bg-hover-shadow' : 'pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-shadow'}
					onClick={(e) => showDropdown(e)}
				>
					+ Add {props.title}
				</button>}

				{dropdown && <div className="pi-dropdown-content pi-show">
					<button onClick={(e) => { openModal(e, 'new') }}>
						+ Add New {props.title}
						{wage.length > 0 && (props.taxonomy != 'tag' && props.taxonomy != 'lead_source') && <>
							<span className="pi-pro-label">PRO</span>
						</>}
					</button>
					{list && list.map((item, itemIndex) => {
						return (
							<a key={itemIndex} onClick={() => handleSelect(item)}>{item.label}</a>
						)
					})}
				</div>}
			</div>

			{modal && <Form
				{...props}
				taxonomy={props.taxonomy}
				extra_amount_type={props.extra_amount_type}
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