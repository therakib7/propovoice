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
	const [dropdown, setDropdown] = useState(false);
	const [modal, setModal] = useState(false);

	const close = useCallback(() => setDropdown(false), []);
	useClickOutside(dropdownContent, close);

	useEffect(() => {
		getData();
	}, []);

	const getData = () => {

		api.getS('staffs', props.tab_id, 'pro').then(resp => {
			if (resp.data.success) {
				setList(resp.data.data.result);
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

	const openModal = (e) => {
		e.preventDefault();
		setModal(true);
	}


	const handleDelete = (id) => {

		if (confirm(ndpv.i18n.aConf)) {
			api.del('staffs', id + '/' + props.tab_id, 'pro').then(resp => {
				if (resp.data.success) {
					toast.success(ndpv.i18n.aDel);
					getData();
				} else {
					resp.data.data.forEach(function (value, index, array) {
						toast.error(value);
					});
				}
			});
		}
	}

	const { i18n, caps } = ndpv;
	return (
		<>
			<div className="pv-widget pv-info-box">
				<h3 className="pv-widget-title">
					Staff
					<button
						className="pv-btn pv-btn-small pv-bg-stroke pv-bg-hover-shadow pv-mb-20" style={{ width: 'auto' }}
						onClick={(e) => { openModal(e, 'new') }}
					>
						<svg
							width={12}
							height={12}
							viewBox="0 0 12 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1.875 6H10.125"
								stroke="#2D3748"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M6 1.875V10.125"
								stroke="#2D3748"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						Add Staff
					</button>
				</h3>

				{list && list.map((item, i) => {
					return (
						<div className="pv-persons-content" key={i}>
							<div className="pv-avatar-content pv-p-0">
								<img src={item.img} alt="avatar" />
								<div className="pv-avatar-text">
									<h5>{item.name}</h5>
									<p>{item.email}</p>
								</div>
								<div className="pv-action-content">
									<button onClick={() => handleDelete(item.id)}>
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
				})}
			</div>

			{modal && <Form
				{...props}
				reload={getData}
				close={() => setModal(false)}
			/>}
		</>
	);
}
