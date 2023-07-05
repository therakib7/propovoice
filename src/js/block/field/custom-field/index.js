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

	const form = props.form;
	return (
		<>
			{loading ? <Spinner /> : <>
				{list.map((item, i) => (

					<div key={i} className="row">
						{/* {console.log(item)} */}
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

							{item.type === 'select' &&
								<select id={'custom-field-' + i} name={item.slug} value={form[item.slug]} onChange={handleChange}>
									{item.options.map((item, i) => {
										return (
											<option key={i} value={item}>{item}</option>
										);
									})}
								</select>
							}

							{item.type === 'date' &&
								// <input
								//     id={'custom-field-' + i}
								//     type='date'
								//     name={item.slug}
								//     value={form[item.slug]}
								//     onChange={handleChange}
								// />
								<DateField
									id={'custom-field-' + i}
									// date={form.start_date}
									type="date"
									name={item.slug}
									onDateChange={handleChange}
								/>
							}
							{item.desc && <p className='pv-field-desc'>{item.desc}</p>}
						</div>
					</div>
				))}
			</>}
		</>
	);
};