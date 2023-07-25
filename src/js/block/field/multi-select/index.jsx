import React, { useCallback, useRef, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import useClickOutside from 'block/outside-click';
import api from 'api';

import pro from 'block/pro-alert';
import ProLabel from 'block/pro-alert/label';

export default (props) => {
	const dropdownContent = useRef();

	const [list, setList] = useState([]);
	const [value, setValue] = useState([]);
	const [dropdown, setDropdown] = useState(false);

	const close = useCallback(() => setDropdown(false), []);
	useClickOutside(dropdownContent, close);

	useEffect(() => {
		if (props.options) {
			setValue(props.value);
			setList(props.options);
		}
	}, [props.options]);

	const showDropdown = (e) => {
		e.preventDefault();
		if (dropdown) {
			setDropdown(false);
		} else {
			setDropdown(true);
		}
	};

	const handleSelect = (item) => {

		setDropdown(false);

		if (!value.includes(item)) {
			setValue([...value, item]);

			if (props.onChange) {
				props.onChange([...value, item]);
			}
		}
	}

	const handleDelete = (del) => {
		if (confirm(ndpv.i18n.aConf)) {

			const filtered = value.filter(item => {
				return item !== del;
			});
			setValue(filtered);
			if (props.onChange) {
				props.onChange(filtered);
			}
		}
	}

	const { i18n, caps } = ndpv;
	return (
		<>
			{value && value.map((item, i) => {
				return (
					<span key={i} className="pv-badge">{item} <b onClick={() => handleDelete(item)}>X</b></span>
				)
			})}

			<div className="pv-action-content" ref={dropdownContent}>
				<button
					className={(!props.small) ? 'pv-btn pv-btn-medium pv-bg-stroke pv-bg-hover-shadow' : 'pv-btn pv-btn-small pv-bg-stroke pv-bg-hover-shadow'}
					onClick={(e) => showDropdown(e)}>
					+ {i18n.add} {i18n.def}
				</button>

				{dropdown && <div className="pv-dropdown-content pv-show">
					{list && list.map((item, i) => {
						return (
							<a key={i} onClick={() => handleSelect(item)}>{item}</a>
						)
					})}
				</div>}
			</div>
		</>
	);
}
