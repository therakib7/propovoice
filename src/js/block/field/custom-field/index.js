import React, { useState, useEffect, lazy } from "react";
import api from 'api';
import Spinner from 'block/preloader/spinner';
const DateField = lazy(() => import("block/date-picker"))

export default (props) => {
	const [loading, setLoading] = useState(false);
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

	const handleChange = props.onChange;

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

	// new Date(data.invoice.date);
	return (
		<>
			{loading ? <Spinner /> : <>
				{list.map((item, i) => {
					if (item.type === 'date' && form[item.slug] && props.type != 'new') {
						form[item.slug] = new Date(form[item.slug])
					}
					return (
						<div key={i} className="row">
							<div className="col">
								<label htmlFor={'custom-field-' + i} style={{ display: 'block' }}>
									{item.label}
								</label>

								{item.type === 'text' &&
									<input
										id={'custom-field-' + i}
										type='text'
										name={item.slug}
										value={form[item.slug]}
										onChange={handleChange}
									/>
								}

								{item.type === 'number' &&
									<input
										id={'custom-field-' + i}
										type='number'
										name={item.slug}
										value={form[item.slug]}
										onChange={handleChange}
									/>
								}

								{false && item.type === 'select' &&
									<select id={'custom-field-' + i} name={item.slug} value={form[item.slug]} onChange={handleChange}>
										{item.options.map((item, i) => {
											return (
												<option key={i} value={item}>{item}</option>
											);
										})}
									</select>
								}

								{(item.type == 'select' || item.type == 'multi-select') && item.options.length > 0 &&
									<select
										multiple={(item.type == 'multi-select')}
										name={item.slug}
										value={form[item.slug]}
										onChange={handleChange}
										ref={(n) => {
											if (n && (item.type == 'multi-select')) {
												n.style.setProperty("background-image", 'none', "important");
											} else if (n && (item.type == 'select')) {
												n.style.setProperty("background-image", 'auto', "important");
											}
										}}
									>
										{(item.type == 'select') && <option value=''>{ndpv.i18n.select}</option>}
										{item.options.map((item, i) => {
											return (
												<option key={i} value={item}>{item}</option>
											);
										})}
									</select>}

								{item.type === 'date' &&
									<DateField
										id={'custom-field-' + i}
										date={form[item.slug]}
										type="date"
										name={item.slug}
										onDateChange={(val) => handleDateChange(val, item.slug)}
									/>
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