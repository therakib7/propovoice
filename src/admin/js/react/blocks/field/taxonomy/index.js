import React, { useState, useEffect } from "react";
import AsyncSelect from 'react-select/async';
import WithApi from 'hoc/Api';

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
		if ( type == 'new' ) {
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

	const handleSubmit = ( e ) => { 
		e.preventDefault(); 
		console.log('submited');
	}

	return (
		<>
			<div className='pi-field-repeater'>
				{list && <ul>
					{list.map((tax, taxIndex) => {
						return (
							<li key={taxIndex}>
								{tax.label}
								<button onClick={(e) => { openModal(e, 'edit', tax) }}>Edit</button>
								<button>Del</button>
							</li>
						)
					})}
				</ul>}
				<button onClick={(e) => { openModal(e, 'new') }}>Add New</button>
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
						<h2 className="pi-modal-title">Add New</h2>
						<p>Add new item from here</p>
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
										onChange={(e) => handleChange(e) }
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="pi-modal-footer">
						<div className="row">
							<div className="col">
								<button type='submit' onClick={(e) => handleSubmit(e) } className="pi-btn pi-bg-blue pi-bg-hover-blue pi-btn-big pi-float-right pi-color-white">
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