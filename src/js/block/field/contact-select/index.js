import React, { useCallback, useRef, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import useClickOutside from 'block/outside-click';
import WithApi from 'hoc/Api';

import ContactForm from 'cpnt/contact/Form';

const Contact = (props) => {
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
		props.getAll('contacts', params).then(resp => {
			if (resp.data.success) {
				let toList = resp.data.data.result;
				setList(toList);
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
			props.getAll('contacts', 's=' + val).then(resp => {
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

	const i18n = ndpi.i18n;
	return (
		<>
			<span
				className="pi-list"
				onClick={() => showDropdown()}
			>

				{!props.data &&  i18n.select +' ' +i18n.rec}

				{props.data && <>
					{(props.data.type == 'person') ? props.data.first_name : props.data.org_name}
				</>}

				<svg
					style={{ marginTop: 6, float: "right" }}
					width={12}
					height={10}
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M5.00001 3.78145L8.30001 0.481445L9.24268 1.42411L5.00001 5.66678L0.757342 1.42411L1.70001 0.481445L5.00001 3.78145Z"
						fill="#718096"
					/>
				</svg>
			</span>

			{dropdown && <div className="pi-dropdown-content pi-show" ref={dropdownContent}>
				<div className="pi-search-field">
					<input type="text" onChange={handleFindContact} placeholder="Search" />
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

export default WithApi(Contact);  