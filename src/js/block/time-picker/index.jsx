import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const TimeField = (props) => { 
	return ( 
		<DatePicker
			selected={props.date}
			onChange={(date) => props.onDateChange(date, props.type)}
			showTimeSelect
			showTimeSelectOnly
			timeIntervals={15}
			timeCaption="Time"
			dateFormat="h:mm aa"
		/>
	);
};

export default TimeField;