import React, { useCallback, useRef, useState, useEffect } from "react";
import useClickOutside from 'block/outside-click';

export default (props) => {

	const inputRef = useRef();
	const [dropdown, setDropdown] = useState(false);
	const [text, setText] = useState('');
	// const close = useCallback(() => setDropdown(false), []);
	// const close = useCallback(() => done(), []);
	useClickOutside(inputRef, close);

	useEffect(() => {

	}, []);

	const handleChange = (e) => {
		setText(e.target.value);
	}

	const done = () => {
		if (props.index == null) {
			props.changeHandler(text);
		} else {
			props.changeHandler(props.index, text);
		}
		setDropdown(false);
	};

	const handleKeyEnter = (e) => {
		if (e.key === 'Enter') {
			done();
		}
	};

	return (
		<>
			{dropdown &&
				<div className='pv-editable'>
					<input
						type="text"
						ref={inputRef}
						onChange={handleChange}
						onKeyDown={handleKeyEnter}
						name="text"
						value={text}
					/>
					<span className='pv-cursor-pointer' style={{ marginLeft: '5px' }}>
						<svg
							width={15}
							height={15}
							onClick={done}
							
							xmlnsXlink="http://www.w3.org/1999/xlink"
							viewBox="3.4 5.6 17.6 13.4"
							enableBackground="new 3.4 5.6 17.6 13.4"
							xmlSpace="preserve"
						>
							<path d="M9,16.2L4.8,12l-1.4,1.4L9,19L21,7l-1.4-1.4L9,16.2z" />
						</svg>
					</span>
				</div>
			}

			{!dropdown &&
				<label
					// onClick={() => setState({ edit: true, text: value })}
					onClick={() => { setText(props.value); setDropdown(true); }}
				>
					{props.value}
					<span>
						<svg
							width={16}
							height={16}
							viewBox="0 0 16 16"
							fill="none"
							
						>
							<path
								d="M5.79375 13.4999H3C2.86739 13.4999 2.74022 13.4473 2.64645 13.3535C2.55268 13.2597 2.5 13.1326 2.5 12.9999V10.2062C2.49978 10.1413 2.51236 10.0769 2.53702 10.0169C2.56169 9.95682 2.59796 9.90222 2.64375 9.85619L10.1438 2.3562C10.1903 2.30895 10.2457 2.27144 10.3069 2.24583C10.3681 2.22022 10.4337 2.20703 10.5 2.20703C10.5663 2.20703 10.632 2.22022 10.6931 2.24583C10.7543 2.27144 10.8097 2.30895 10.8563 2.3562L13.6438 5.1437C13.691 5.19022 13.7285 5.24568 13.7541 5.30684C13.7797 5.368 13.7929 5.43364 13.7929 5.49995C13.7929 5.56625 13.7797 5.63189 13.7541 5.69305C13.7285 5.75421 13.691 5.80967 13.6438 5.85619L6.14375 13.3562C6.09773 13.402 6.04313 13.4383 5.98307 13.4629C5.92301 13.4876 5.85868 13.5002 5.79375 13.4999V13.4999Z"
								stroke="#CBD5E0"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M8.5 4L12 7.5"
								stroke="#CBD5E0"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</span>
				</label>}
		</>
	);
} 