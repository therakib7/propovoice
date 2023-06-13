// import React, { useState } from "react";
const DateField = lazy(() => import("block/date-picker"))

export default (props) => {

	const handleChange = props.handleChange;

	const fields = props.fields;
	const form = props.form;
	return (
		<>
			{fields.map((item, i) => (

				<div key={i} className="row">
					{console.log(item)}
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
		</>
	);
};