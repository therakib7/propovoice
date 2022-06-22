import React, { useCallback, useRef, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import useClickOutside from 'block/outside-click';
import WithApi from 'hoc/Api';

import ContactForm from 'components/contact/Form'; 

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

	const handleSelect = ( data ) => {
		props.onChange( data );
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

	const handleContactSubmit = client => {
        if (this.state.clientModalType == 'new') {
            ApiContact.create(client)
                .then(resp => {
                    if (resp.data.success) {
                        this.setState({ clientModal: false })
                        toast.success(this.context.CrudMsg.create);
                        client.id = resp.data.data;
                        this.props.setTo(client);
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        } else {
            ApiContact.update(client.id, client)
                .then(resp => {
                    if (resp.data.success) {
                        this.setState({ clientModal: false })
                        toast.success(this.context.CrudMsg.update);
                        this.props.setTo(client);
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        }
    }

	return (
		<>
			<span
				className="pi-list"
				onClick={() => showDropdown()}
			>
				{ ( props.data ) ? props.data.name : 'Select Receiver'}
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
				<button onClick={(e) => { openModal(e, 'new') }}>+ Add New</button>

				{list && list.map((item, itemIndex) => {
					return (
						<a key={itemIndex} onClick={() => handleSelect(item)}>{item.name}</a>
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