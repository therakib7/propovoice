import { forwardRef } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CustomInput = forwardRef((props, ref) => {
	return (
		<>
			{props.place != 'task' && <div className="pv-info-input-field">
				<input type="text" onClick={props.onClick} ref={ref} placeholder={props.value || props.placeholder} />
				<span className="pv-calendar" onClick={props.onClick}>
					<svg
						width={16}
						height={16}
						viewBox="0 0 16 16"
						fill="none"
					>
						<path
							d="M13 2.5H3a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h10a.5.5 0 00.5-.5V3a.5.5 0 00-.5-.5zM11 1.5v2M5 1.5v2M2.5 5.5h11"
							stroke="#4A5568"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</span>
			</div>}

			{props.place == 'task' && <button className='pv-task-btn' type='button' onClick={props.onClick}>
				{props.value && <span>{props.value}</span>}
				{/* {props.value && <span onClick={() => props.clear(null, props.type)}>x</span>} */}
				<svg
					width={20}
					height={20}
					viewBox="0 0 20 20"
					fill="none"
				>
					<path
						d="M6 5V1V5ZM14 5V1V5ZM5 9H15H5ZM3 19H17C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V5C19 4.46957 18.7893 3.96086 18.4142 3.58579C18.0391 3.21071 17.5304 3 17 3H3C2.46957 3 1.96086 3.21071 1.58579 3.58579C1.21071 3.96086 1 4.46957 1 5V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19Z"
						stroke="#CBD5E0"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>}
		</>
	);
});

const CustomContainer = ({ className, label, children, ...props }) => {
	return (
		<CalendarContainer {...props} className={className}>
			{label && <div style={{
				background: "rgb(241 241 241)",
				padding: '5px 10px',
				textAlign: 'center',
				fontFamily: "Inter",
				fontWeight: 500
			}}>
				{label}
			</div>}
			<div style={{ position: "relative" }}>{children}</div>
		</CalendarContainer>
	);
};

export default (props) => {
	return (
		<DatePicker
			selected={props.date}
			onChange={(date) => props.onDateChange(date, props.type)}
			customInput={<CustomInput
				type={props.type}
				place={props.place}
				clear={(val, type) => props.onDateChange(null, type)}
			/>}
			calendarContainer={({ className, children }) => (
				<CustomContainer className={className} label={props.label}>
					{children}
				</CustomContainer>
			)}
			// dateFormat={ndpv.date_format} 
			dateFormat="PP"
		/>
	);
};