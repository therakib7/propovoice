import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DateField = (props) => {
	// const [startDate, setStartDate] = useState(new Date());
	return (
		<DatePicker selected={props.date} onChange={(date) => props.onDateChange(date, props.type)} />
	);
};

export default DateField;