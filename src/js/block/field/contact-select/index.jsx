import React, { useCallback, useEffect, useRef, useState } from "react";
import api from 'api';
import useClickOutside from 'block/outside-click';
import ContactForm from 'cpnt/contact/Form';

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

	let timeout = 0;

	const close = useCallback(() => setDropdown(false), []);
	useClickOutside(dropdownContent, close);

	useEffect(() => {
		getData();
	}, []);

	const getData = () => {

		let args = {
			page: 1,
			per_page: 10
		}
		let params = new URLSearchParams(args).toString();
		api.get('contacts', params).then(resp => {
			if (resp.data.success) {
				let toList = resp.data.data.result;
				setList(toList);
			}
		});
	}

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

	const handleSelect = (data) => {
		props.onChange(data);
		setDropdown(false);
	}

	const handleFindContact = (e) => {

		const target = e.target;
		const val = target.value;

		if (val.length < 2) return;

		//search when typing stop
		if (timeout) clearTimeout(timeout);

		timeout = setTimeout(() => {
			api.get('contacts', 's=' + val).then(resp => {
				if (resp.data.success) {
					let toList = resp.data.data.result;
					setList(toList);
				}
			});
		}, 300);
	}

	const handleContactSubmit = contact => {
		props.onChange(contact);
		setDropdown(false);
	}

	const i18n = ndpv.i18n;
	return (
		<>
			<span
				className="pv-list"
				onClick={() => setDropdown(val => !val)}
			>
				{!props.data && i18n.select + ' ' + i18n.rec}
				{props.data && <>
					{(props.data.type == 'person') ? props.data.first_name : props.data.org_name}
				</>}

				<svg
					style={{ marginTop: 6, float: "right" }}
					width={12}
					height={10}
					viewBox="0 0 10 6"
					fill="none"

				>
					<path
						d="M5.00001 3.78145L8.30001 0.481445L9.24268 1.42411L5.00001 5.66678L0.757342 1.42411L1.70001 0.481445L5.00001 3.78145Z"
						fill="#718096"
					/>
				</svg>
			</span>

			{dropdown && <div className="pv-dropdown-content pv-show" ref={dropdownContent}>
				<div className="pv-search-field">
					<input type="text" onChange={handleFindContact} placeholder={i18n.search} />
				</div>
				<button onClick={(e) => { openModal(e, 'new') }}>+ {i18n.add} {i18n.new}</button>

				{list && list.map((item, itemIndex) => {
					return (
						<a key={itemIndex} onClick={() => handleSelect(item)}>{(item.type == 'person') ? item.first_name : item.org_name}</a>
					)
				})}
			</div>}

			{modal && <ContactForm
				handleSubmit={handleContactSubmit}
				modalType={modalType}
				data={form}
				close={() => setModal(false)}
			/>}
		</>
	);
}
