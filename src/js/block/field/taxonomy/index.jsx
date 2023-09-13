import React, { useCallback, useRef, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import useClickOutside from 'block/outside-click';
import Form from './Form';
import api from 'api';

import pro from 'block/pro-alert';
import ProLabel from 'block/pro-alert/label';

export default (props) => {
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

			if (props.multi) {
				setListById(props.data);
			} else {
				setListById([props.data]);
			}

			getData();
		} else {
			getDataWithSingle();
		}
	}, [props.data]);

	const getData = (submit = null) => {
		if (submit) {
			handleSelect(submit);
		}

		if (props.list) {
			setList(props.list);
			return;
		}
		//this is for lead source
		let hide_bg = '';
		if (props.hide_bg) {
			hide_bg = '&hide_bg=true';
		}
		api.get('taxonomies', 'taxonomy=' + props.taxonomy + hide_bg).then(resp => {
			if (resp.data.success) {
				setList(resp.data.data[props.taxonomy]);
			}
		});
	}

	const getDataWithSingle = () => {
		api.get('taxonomies', 'taxonomy=' + props.taxonomy + '&id=' + props.id).then(resp => {
			if (resp.data.success) {
				setList(resp.data.data[props.taxonomy]);
				//if new chose first one
				if (!props.data && props.modalType && (props.modalType == 'new' || props.modalType == 'move') && props.selectedFirst) {
					handleSelect(resp.data.data[props.taxonomy][0]);
				}
				if (props.id) {
					setListById(resp.data.data['single_' + props.taxonomy]);
				}
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

	const handleSelect = (item) => {
		let newForm = {}
		newForm.taxonomy = props.taxonomy;
		newForm.add = true;
		newForm.append = props.multi ? true : false;
		if (props.id) {
			newForm.post_id = parseInt(props.id);
		}
		newForm.id = parseInt(item.id);

		setDropdown(false);

		if (!props.multi) {
			setListById([item]);
			if (props.onChange) {
				props.onChange(item);
			}
		} else {
			if (!listById.some(e => e.id == item.id)) {
				setListById([...listById, item]);

				if (props.onChange) {
					props.onChange([...listById, item]);
				}
			}
		}

		if (!props.id) {
			return;
		}

		api.edit('taxonomies', newForm.id, newForm).then(resp => {
			if (resp.data.success) {
				if (props.onDone) {
					props.onDone()
				}
				getData();
			} else {
				resp.data.data.forEach(function (value) {
					toast.error(value);
				});
			}
		});
	}

	const handleDelete = (id) => {
		if (confirm(ndpv.i18n.aConf)) {

			let newForm = {}
			newForm.taxonomy = props.taxonomy;
			newForm.delete = true;
			newForm.post_id = parseInt(props.id);
			newForm.id = parseInt(id);

			const filtered = listById.filter(obj => {
				return obj.id !== id;
			});
			setListById(filtered);
			if (props.onChange) {
				props.onChange(filtered);
			}

			if (!props.id) {
				return;
			}

			api.edit('taxonomies', newForm.id, newForm).then(resp => {
				if (resp.data.success) {
					toast.success(ndpv.i18n.aDel);
					getData();
				} else {
					resp.data.data.forEach(function (value) {
						toast.error(value);
					});
				}
			});
		}
	}

	const { i18n, caps } = ndpv;
	const isClient = caps.includes("ndpv_client_role");
	return (
		<>
			{props.multi && listById && listById.map((item, itemIndex) => {
				return (
					<span key={itemIndex} className="pv-badge">{item.label} <b onClick={() => handleDelete(item.id)}>X</b></span>
				)
			})}

			<div className="pv-action-content" ref={dropdownContent}>
				{props.multi && <button
					className={(!props.small) ? 'pv-btn pv-btn-medium pv-bg-stroke pv-bg-hover-shadow' : 'pv-btn pv-btn-small pv-bg-stroke pv-bg-hover-shadow'}
					onClick={(e) => showDropdown(e)}>
					+ {i18n.add} {props.title}
				</button>}

				{!props.multi && listById.length > 0 && <button
					className={(!props.small) ? 'pv-btn pv-btn-medium' : 'pv-btn pv-btn-small'}
					ref={(n) => {
						if (n) {
							n.style.setProperty("background-color", (listById[0].bg_color ? listById[0].bg_color : '#E2E8F0'), "important");
							n.style.setProperty("color", (listById[0].color ? listById[0].color : '#4a5568'), "important");
						}
					}}
					onClick={(e) => showDropdown(e)}
				>
					{listById[0].label}
					<svg
						width={10}
						height={6}
						style={{ marginLeft: (!props.small) ? '10px' : '7px' }}
						className='pv-mr-0'
						viewBox="0 0 10 6"
						fill="none"
					>
						<path
							d="M5.00001 3.78145L8.30001 0.481445L9.24268 1.42411L5.00001 5.66678L0.757342 1.42411L1.70001 0.481445L5.00001 3.78145Z"
							fill={(listById[0].color ? listById[0].color : '#4a5568')}
						/>
					</svg>
				</button>}

				{!isClient && !props.multi && !listById.length && <button
					ref={(n) => {
						if (n) {
							n.style.setProperty("background-color", '#E2E8F0', "important");
							n.style.setProperty("color", '#4a5568', "important");
						}
					}}
					className={(!props.small) ? 'pv-btn pv-btn-medium pv-bg-hover-shadow' : 'pv-btn pv-btn-small pv-bg-stroke pv-bg-hover-shadow'}
					onClick={(e) => showDropdown(e)}
				>
					+ {i18n.add} {props.title}
				</button>}

				{dropdown && <div className="pv-dropdown-content pv-show">
					{!isClient && <button onClick={(e) => { openModal(e, 'new') }}>
						+ {i18n.add} {i18n.new} {props.title}
						{wage.length > 0 && (props.taxonomy != 'tag' && props.taxonomy != 'lead_source') && <ProLabel />}
					</button>}
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
				color={props.color}
				close={() => setModal(false)}
				formTag={props.formTag}
			/>}
		</>
	);
}
