import React, { useCallback, useRef, useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import "./style.css";
import useClickOutside from "./useClickOutside";

const ColorPicker = ({ color, onChange }) => {
	const popover = useRef();
	const [isOpen, toggle] = useState(false);

	const close = useCallback(() => toggle(false), []);
	useClickOutside(popover, close);

	return (
		<>
			<div className='pi-style-color'>
				<span className="pi-bg-blue" onClick={() => onChange('#4c6fff')} />
				<span className="pi-bg-green" onClick={() => onChange('#18954d')} />
				<span className="pi-bg-red" onClick={() => onChange('#f10606')} />
				<span className="pi-bg-pink" onClick={() => onChange('#ff92ae')} />

				<span 
					style={{ backgroundColor: color }}
					onClick={() => toggle(true)}
				>
					<svg
						width={26}
						height={12}
						viewBox="0 0 13 13"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12.524.476a1.625 1.625 0 00-2.298 0L4.062 6.64v2.297H6.36l6.164-6.163a1.625 1.625 0 000-2.298z"
							fill="#fff"
						/>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M0 3.25a1.625 1.625 0 011.625-1.625h3.25a.813.813 0 110 1.625h-3.25v8.125H9.75v-3.25a.813.813 0 011.625 0v3.25A1.625 1.625 0 019.75 13H1.625A1.625 1.625 0 010 11.375V3.25z"
							fill="#fff"
						/>
					</svg>
				</span>
			</div>
			{isOpen && (
				<div className="pi-popover" ref={popover}>
					<HexColorPicker color={color} onChange={onChange} />
					<HexColorInput color={color} onChange={onChange} />
				</div>
			)}
		</>
	);
};

export default ColorPicker;