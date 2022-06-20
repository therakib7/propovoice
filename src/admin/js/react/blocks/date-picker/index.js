import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const CustomInput = React.forwardRef((props, ref) => {
	return (
		<div className="pi-info-input-field">
			<input type="text" onClick={props.onClick} ref={ref} placeholder={props.value || props.placeholder} />
			<span className="pi-calendar" onClick={props.onClick}>
				<svg
					width={16}
					height={16}
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M13 2.5H3a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h10a.5.5 0 00.5-.5V3a.5.5 0 00-.5-.5zM11 1.5v2M5 1.5v2M2.5 5.5h11"
						stroke="#4A5568"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</span>
		</div>
	);
});

const DateField = (props) => {
	return (
		<DatePicker selected={props.date} onChange={(date) => props.onDateChange(date, props.type)} customInput={<CustomInput />} />
	);
};

export default DateField;