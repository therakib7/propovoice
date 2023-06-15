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
							<label htmlFor={'custom-field-' + i}>
								{item.label}
							</label>
							{item.type === 'date' &&
								// <input
								//     id={'custom-field-' + i}
								//     type='date'
								//     name={item.id}
								//     value={form[item.id]}
								//     onChange={handleChange}
								// />
								<DateField
									id={'custom-field-' + i}
									date={form.start_date}
									type="date"
									name={item.id}
									onDateChange={handleChange}
								/>
							}
							{item.type === 'number' &&
								<input
									id={'custom-field-' + i}
									type='number'
									name={item.id}
									value={form[item.id]}
									onChange={handleChange}
								/>
							}
							{item.type === 'text' &&
								<input
									id={'custom-field-' + i}
									type='text'
									name={item.id}
									value={form[item.id]}
									onChange={handleChange}
								/>}
							{item.desc && <p className='pv-field-desc'>{item.desc}</p>}
						</div>
					</div>
				))}
			</>}
		</>
	);
};