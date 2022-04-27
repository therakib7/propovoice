import React, { Component } from 'react'

class Editable extends Component {

	constructor(props) {
		super(props);

		this.state = {
			text: '',
			edit: false,
		};
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ text: value });
	}

	done = () => {
		if (this.props.index == null) {
			this.props.changeHandler(this.state.text);
		} else {
			this.props.changeHandler(this.props.index, this.state.text);
		}
		this.setState({ edit: false });
	};

	render = () => {
		const { value } = this.props;
		const { edit, text } = this.state;
		return (
			<>
				{edit &&
					<>
						<div className='pi-editable' style={{marginBottom: '10px'}}>
							<input
								type="text"
								style={{ border: '1px solid var(--border-color-gray)' }}
								onChange={this.handleChange}
								name="text"
								value={text}
							/>
							<span className='pi-cursor-pointer' style={{marginLeft: '5px'}}>
								<svg
									width={15}
									height={15}
									onClick={this.done}
									xmlns="http://www.w3.org/2000/svg"
									xmlnsXlink="http://www.w3.org/1999/xlink"
									viewBox="3.4 5.6 17.6 13.4"
									enableBackground="new 3.4 5.6 17.6 13.4"
									xmlSpace="preserve"
								>
									<path d="M9,16.2L4.8,12l-1.4,1.4L9,19L21,7l-1.4-1.4L9,16.2z" />
								</svg>
							</span>
						</div>
					</>
				}
				{!edit &&
					<label
						onClick={() => this.setState({ edit: true, text: value })}
					>
						{value}
						<span>
							<svg
								width={23}
								height={12}
								viewBox="0 0 13 13"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12.524.476a1.625 1.625 0 00-2.298 0L4.062 6.64v2.297H6.36l6.164-6.163a1.625 1.625 0 000-2.298z"
									fill="#A0AEC0"
								/>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M0 3.25a1.625 1.625 0 011.625-1.625h3.25a.813.813 0 110 1.625h-3.25v8.125H9.75v-3.25a.813.813 0 011.625 0v3.25A1.625 1.625 0 019.75 13H1.625A1.625 1.625 0 010 11.375V3.25z"
									fill="#A0AEC0"
								/>
							</svg>
						</span>
					</label>}
			</>
		)
	}
}

export default Editable
