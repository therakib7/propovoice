import React, { useCallback, useRef, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import useClickOutside from 'block/outside-click';
import api from 'api';

export default (props) => {
	const dropdownContent = useRef();

	const [list, setList] = useState([]);
	const [listById, setListById] = useState([]);
	const [dropdown, setDropdown] = useState(false);

	const close = useCallback(() => setDropdown(false), []);
	useClickOutside(dropdownContent, close);

	useEffect(() => {
		getData();
		getDataWithSingle();
	}, []);

	const getData = () => {
		let tab_id = props.parent_tab_id ? props.parent_tab_id : props.tab_id;
		api.get('staffs', 'tab_id=' + tab_id, 'pro').then(resp => {
			if (resp.data.success) {
				setList(resp.data.data.result);
			}
		});
	}

	const getDataWithSingle = () => {
		api.getS('staffs', props.tab_id, 'pro').then(resp => {
			if (resp.data.success) {
				setListById(resp.data.data.result);
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

	const handleSelect = (item) => {
		let newForm = {}
		newForm.tab_id = parseInt(props.tab_id);
		newForm.user_id = parseInt(item.id);

		setDropdown(false);

		if (!listById.some(e => e.id == item.id)) {
			setListById([...listById, item]);

			api.add('staffs', newForm, 'pro').then(resp => {
				if (resp.data.success) {
					toast.success(ndpv.i18n.aAdd);
				} else {
					resp.data.data.forEach(function (value) {
						toast.error(value);
					});
				}
			});
		}
	}

	const handleDelete = (id) => {
		if (confirm(ndpv.i18n.aConf)) {

			let newForm = {}
			newForm.tab_id = parseInt(props.tab_id);
			newForm.user_id = parseInt(id);

			const filtered = listById.filter(obj => {
				return obj.id !== id;
			});
			setListById(filtered);

			api.del('staffs', id + '/' + props.tab_id, 'pro').then(resp => {
				if (resp.data.success) {
					toast.success(ndpv.i18n.aDel);
				} else {
					resp.data.data.forEach(function (value) {
						toast.error(value);
					});
				}
			});
		}
	}

	const { i18n, caps } = ndpv;
	return (
		<div
			className={props.inForm ? 'pv-tag-content' : 'pv-widget pv-info-box'}
			style={props.inForm ? { padding: 0, border: 0 } : {}}
		>
			<div className="pv-action-content" ref={dropdownContent}>
				{props.inForm &&
					<>
						<label htmlFor="form-asign">Team:</label>
						<button
							className="pv-btn pv-btn-medium pv-bg-stroke"
							style={{
								margin: '0 10px',
								width: 'auto',
								border: '1px solid rgba(221, 221, 221, 0.6588235294)'
							}}
							onClick={(e) => showDropdown(e)}
						>
							Asign
							<svg
								width={10}
								height={6}
								style={{ marginLeft: '10px' }}
								className='pv-mr-0'
								viewBox="0 0 10 6"
								fill="none"
							>
								<path
									d="M5.00001 3.78145L8.30001 0.481445L9.24268 1.42411L5.00001 5.66678L0.757342 1.42411L1.70001 0.481445L5.00001 3.78145Z"
									fill='#4A5568'
								/>
							</svg>
						</button>
					</>
				}

				{!props.inForm && <h3 className="pv-widget-title">
					Team
					<button
						className="pv-btn pv-btn-small pv-bg-stroke pv-bg-hover-shadow pv-mb-20"
						style={{
							width: 'auto',
							border: '1px solid rgba(221, 221, 221, 0.6588235294)'
						}}
						onClick={(e) => showDropdown(e)}
					>
						Asign
						<svg
							width={10}
							height={6}
							style={{ marginLeft: '10px' }}
							className='pv-mr-0'
							viewBox="0 0 10 6"
							fill="none"
						>
							<path
								d="M5.00001 3.78145L8.30001 0.481445L9.24268 1.42411L5.00001 5.66678L0.757342 1.42411L1.70001 0.481445L5.00001 3.78145Z"
								fill='#4A5568'
							/>
						</svg>
					</button>
				</h3>}

				{dropdown && <div className="pv-dropdown-content pv-show" style={{ left: 0 }}>
					{list && list.map((v, i) => {
						return (
							<a key={i} onClick={() => handleSelect(v)}>{v.name}</a>
						)
					})}
				</div>}
			</div>

			{listById && listById.map((v, i) => {
				if (props.inForm) {
					return (
						<span key={i} style={{ marginRight: 10, padding: '12px 10px', fontSize: 12 }} className="pv-badge">{v.name} <b onClick={() => handleDelete(v.id)} style={{ padding: '9px 7px' }}>X</b></span>
					)
				} else {
					return (
						<div className="pv-persons-content" key={i}>
							<div className="pv-avatar-content pv-p-0">
								<img src={v.img} alt="avatar" />
								<div className="pv-avatar-text">
									<h5>{v.name}</h5>
									<p>{v.email}</p>
								</div>
								<div className="pv-action-content">
									<button onClick={() => handleDelete(v.id)}>
										<span className="pv-action-btn pv-bg-stroke pv-bg-shadow" >
											<svg
												width={16}
												height={16}
												viewBox="0 0 16 16"
												fill="none"
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
									</button>
								</div>
							</div>
						</div>
					)
				}
			})}
		</div>
	);
}
