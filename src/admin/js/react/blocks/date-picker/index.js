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
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					x="0px"
					y="0px"
					viewBox="0 0 1000 1000"
					enableBackground="new 0 0 1000 1000"
					xmlSpace="preserve"
				>
					<g>
						<path d="M867.2,131.4h-58.5V53.6c0-24.6-20.2-44.8-44.8-44.8h-2.4c-24.6,0-44.8,20.2-44.8,44.8v77.8h-430V53.6c0-24.6-20.2-44.8-44.8-44.8h-2.4c-24.6,0-44.8,20.2-44.8,44.8v77.8h-61.9C65.3,131.4,10,186.7,10,254.2v614.1c0,67.6,55.3,122.8,122.8,122.8h734.4c67.6,0,122.8-55.3,122.8-122.8V254.2C990,186.7,934.7,131.4,867.2,131.4z M900.4,899H100.8V407.8h799.6V899z M900.4,314.4H100.8V221h799.6V314.4z" />
					</g>
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