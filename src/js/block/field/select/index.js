import React, { useCallback, useRef, useState, useEffect } from "react";
import useClickOutside from 'block/outside-click';

export default (props) => {
	const dropdownContent = useRef();

	const [list, setList] = useState([]);
	const [search, setSearch] = useState('');
	const [searchList, setSearchList] = useState([]);
	const [dropdown, setDropdown] = useState(false);

	const close = useCallback(() => setDropdown(false), []);
	useClickOutside(dropdownContent, close);

	useEffect(() => {
		if (props.options) {
			setList(props.options)
		}
	}, []);

	const escapeRegExp = (str) => {
		// or better use 'escape-string-regexp' package
		return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
	}

	const filterBy = (term) => {
		const re = new RegExp(escapeRegExp(term), 'i')
		return person => {
			for (let prop in person) {
				if (!person.hasOwnProperty(prop)) {
					continue;
				}
				if (re.test(person[prop])) {
					return true;
				}
			}
			return false;
		}
	}

	const fuzzySearch = (items, query) => {
		return items.filter(filterBy(query)); 
	}

	const handleSearch = (e) => {
		const value = e.target.value;
		setSearch(value); 
		const found = fuzzySearch(list, value);
		if (found) {
			setSearchList(found);
		} else {
			setSearchList([]);
		}
	}

	const handleSelect = (item) => {

		setDropdown(false)

		if (props.onChange) {
			props.onChange(item);
		}
	}

	const i18n = ndpv.i18n;

	const mapData = searchList.length ? searchList : list;
	return (
		<>
			<div className="pv-action-content" ref={dropdownContent}>

				<button
					className='pv-btn pv-btn-medium'
					style={{
						width: '100%',
						backgroundColor: '#fff',
						border: '1px solid #E2E8F0',
						color: '#4A5568',
						fontWeight: '400',
						textAlign: 'left'
					}}
					ref={(n) => {
						if (n && props.form) {
							n.style.setProperty("padding", "13px 15px", "important");
						}
					}}
					onClick={(e) => { e.preventDefault(); setDropdown(prev => !prev); }}
				>
					{props.value ? props.value.label : i18n.select}
					<svg
						width={12}
						height={6}
						style={{ position: 'absolute', right: '8px' }}
						viewBox="0 0 12 6"
						fill="none"
					>
						<path
							d="M5.00001 3.78145L8.30001 0.481445L9.24268 1.42411L5.00001 5.66678L0.757342 1.42411L1.70001 0.481445L5.00001 3.78145Z"
							fill="#4A5568"
						/>
					</svg>
				</button>

				{dropdown && <div className="pv-dropdown-content pv-show">
					{props.search && <div className="pv-search-field">
						<input type="text" value={search} onChange={handleSearch} placeholder={i18n.search} />
					</div>}

					<div style={{ maxHeight: 250, overflowY: 'scroll' }}>
						{mapData && mapData.map((item, itemIndex) => {
							return (
								<a key={itemIndex} onClick={() => handleSelect(item)}>{item.label}</a>
							)
						})}
					</div>
				</div>}
			</div>

		</>
	);
} 