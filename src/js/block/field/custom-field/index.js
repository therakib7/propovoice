import React, { useState, useEffect, lazy } from "react";
import api from 'api';
import Spinner from 'block/preloader/spinner';
import MultiSelect from 'block/field/multi-select';
const DateField = lazy(() => import("block/date-picker"))

export default (props) => {
	const [loading, setLoading] = useState(false);
	const [defaultValue, setDefaultValue] = useState(true);
	const [list, setList] = useState([]);

	useEffect(() => {
		if (!wage.length) {
			if (list.length === 0) {
				setLoading(true);
				getData();
			}
		}
	}, []);

	const getData = () => {
		api.get('custom-fields', 'mod=' + props.mod).then(resp => {
			if (resp.data.success) {
				setList(resp.data.data);
				setLoading(false);
			}
		});
	}

	// const handleChange = props.onChange;

	const handleChange = (e) => {
		setDefaultValue(false);
		props.onChange(e)
	};

	const handleMultiSelect = (value, name) => {
		const e = {
			target: {
				name,
				value
			}
		};
		props.onChange(e)
	};

	const handleDateChange = (value, name) => {
		const e = {
			target: {
				name,
				value
			}
		};
		props.onChange(e)
	};

	const form = props.form;

	const { i18n } = ndpv;

	return (
		<>
			{loading ? <Spinner /> : <>
				{list.map((item, i) => {
					if (item.type === 'date' && form[item.slug] && props.type != 'new') {
						form[item.slug] = new Date(form[item.slug])
					}

					if (props.type == 'new' && defaultValue && item.value) {
						form[item.slug] = item.value;
					}

					return (
						<div key={i} className="row">
							<div className="col">
								<label htmlFor={'custom-field-' + i} style={{ display: 'block' }}>
									{item.label}
								</label>

								{(item.type === 'text' ||
									item.type === 'email' ||
									item.type === 'number') &&
									<input
										id={'custom-field-' + i}
										type={item.type}
										name={item.slug}
										value={form[item.slug]}
										onChange={handleChange}
									/>
								}

								{item.type === 'select' &&
									<select id={'custom-field-' + i} name={item.slug} value={form[item.slug]} onChange={handleChange}>
										<option value=''>{i18n.select}</option>
										{item.options.map((item, i) => {
											return (
												<option key={i} value={item}>{item}</option>
											);
										})}
									</select>
								}

								{(item.type == 'multi-select') && <div className="pi-field-multi">
									<MultiSelect
										onChange={(val) => handleMultiSelect(val, item.slug)}
										options={item.options}
										value={form[item.slug]}
										title={item.label}
									/>
								</div>}

								{item.type === 'date' &&
									<div className="pv-field-date">
										<DateField
											key={form[item.slug]}
											id={'custom-field-' + i}
											date={form[item.slug]}
											type="date"
											name={item.slug}
											onDateChange={(val) => handleDateChange(val, item.slug)}
										/>
									</div>
								}
								{item.desc && <p className='pv-field-desc'>{item.desc}</p>}
							</div>
						</div>
					)
				})}
			</>}
		</>
	);
};