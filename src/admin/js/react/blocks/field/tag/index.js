import React, { useCallback, useRef, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import ColorPicker from 'block/color-picker';
import useClickOutside from 'block/outside-click';
import WithApi from 'hoc/Api';

const Tag = (props) => {
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
			{listById && listById.map((item, itemIndex) => {
				return (
					<span key={itemIndex} className="pi-badge">{item.label} <b onClick={() => handleDelete(item.id)}>X</b></span>
				)
			})}

			<div className="pi-action-content" ref={dropdownContent}>
				<button className="pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-shadow" onClick={() => showDropdown()}>
					+ Add {props.title}
				</button>
				{dropdown && <div className="pi-dropdown-content pi-show">
					<button onClick={(e) => { openModal(e, 'new') }}>+ Add New {props.title}</button>
					{list && list.map((item, itemIndex) => {
						return (
							<a key={itemIndex} onClick={() => handleSelect(item.id)}>{item.label}</a>
						)
					})}
				</div>}
			</div>

			{modal && <div className="pi-overlay pi-show">
				<div className="pi-modal-content pi-modal-style-two pi-modal-small">

					<div className="pi-modal-header">
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
						<h2 className="pi-modal-title">{modalType == 'new' ? 'Add new' : 'Edit'} {props.title}</h2>
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

							{props.color && <>
								<div className="row">
									<div className="col-md">
										<label htmlFor="field-color">
											Text Color
										</label>
										<ColorPicker color={form.color} onChange={(val) => handleColorChange(val, 'color')} />
									</div>
								</div>

								<div className="row">
									<div className="col-md">
										<label htmlFor="field-bg_color">
											Background Color
										</label>
										<ColorPicker color={form.bg_color} onChange={(val) => handleColorChange(val, 'bg_color')} />
									</div>
								</div>
							</>}
						</div>
					</div>

					<div className="pi-modal-footer pi-mt-10">
						<div className="row">
							<div className="col"></div>
							<div className="col">
								<button type='submit' onClick={(e) => handleSubmit(e)} className="pi-btn pi-bg-blue pi-bg-hover-blue pi-btn-medium pi-float-right pi-color-white">
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

export default WithApi(Tag);  