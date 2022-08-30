import React, { useCallback, useRef, useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import "./style.scss";
import useClickOutside from 'block/outside-click';

export default ({ color, onChange }) => {
	const popover = useRef();
	const [colorPicker, SetColorPicker] = useState(false);

	const close = useCallback(() => SetColorPicker(false), []);
	useClickOutside(popover, close);

	return (
		<>
			<div className="pv-field-color-picker">
				<span style={{ background: "#edf2f7" }} onClick={() => onChange('')}>
					<svg
						width={24}
						height={24}
						viewBox="0 0 24 24"
						fill="none"
						
					>
						<path
							d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
							stroke="#718096"
							strokeWidth="1.5"
							strokeMiterlimit={10}
						/>
						<path
							d="M17.5452 5.88672L6.29517 17.8867"
							stroke="#718096"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</span> 

				<span style={{backgroundColor: '#f16063'}} onClick={() => onChange('#f16063')} />
				<span style={{backgroundColor: '#f7936f'}} onClick={() => onChange('#f7936f')} />
				<span style={{backgroundColor: '#4c6fff'}} onClick={() => onChange('#4c6fff')} />
				<span style={{backgroundColor: '#18954d'}} onClick={() => onChange('#18954d')} />
				
				<span style={{ backgroundColor: color ? color : '#edf2f7' }} onClick={() => SetColorPicker(true)}>
					<svg
						width={24}
						height={24}
						viewBox="0 0 24 24"
						fill="none"
						
					>
						<path
							d="M16.8562 10.8556L17.3155 11.315C17.5938 11.5974 17.7498 11.9779 17.7498 12.3744C17.7498 12.7708 17.5938 13.1513 17.3155 13.4337L16.6593 14.09C16.5895 14.1609 16.5063 14.2171 16.4146 14.2555C16.3228 14.294 16.2244 14.3137 16.1249 14.3137C16.0255 14.3137 15.927 14.294 15.8353 14.2555C15.7435 14.2171 15.6603 14.1609 15.5905 14.09L9.90929 8.40874C9.83843 8.33895 9.78215 8.25577 9.74374 8.16403C9.70533 8.07229 9.68555 7.97382 9.68555 7.87437C9.68555 7.77491 9.70533 7.67644 9.74374 7.5847C9.78215 7.49296 9.83843 7.40978 9.90929 7.33999L10.5655 6.68374C10.8479 6.40549 11.2285 6.24951 11.6249 6.24951C12.0214 6.24951 12.4019 6.40549 12.6843 6.68374L13.1437 7.14312L15.7312 4.55562C16.7437 3.54312 18.3937 3.48687 19.4249 4.47124C19.6795 4.71202 19.8833 5.00134 20.0243 5.32213C20.1653 5.64292 20.2406 5.9887 20.2458 6.33907C20.2511 6.68943 20.1861 7.03731 20.0548 7.36217C19.9235 7.68704 19.7284 7.98232 19.4812 8.23062L16.8562 10.8556Z"
							stroke="#718096"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M14.8684 13.3684L9.61835 18.6184C9.24788 18.9933 8.78434 19.263 8.27529 19.3997C7.76623 19.5365 7.22996 19.5353 6.72148 19.3965L4.52773 20.3527C4.39091 20.4127 4.23929 20.4305 4.0923 20.4038C3.94532 20.3771 3.80966 20.3071 3.70273 20.2027V20.2027C3.62495 20.1262 3.57248 20.0276 3.55237 19.9204C3.53225 19.8131 3.54547 19.7023 3.59023 19.6027L4.60273 17.2777C4.46387 16.7692 4.46276 16.233 4.5995 15.7239C4.73623 15.2149 5.0059 14.7513 5.38085 14.3809L10.6309 9.13086"
							stroke="#718096"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</span>
			</div>

			{colorPicker && (
				<div className="pv-popover" ref={popover}>
					<HexColorPicker color={color} onChange={onChange} />
					<span style={{ marginRight: '2px', width: 'auto' }}>#</span><HexColorInput color={color} onChange={onChange} />
				</div>
			)}
		</>
	);
} 