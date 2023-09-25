import { Svg } from 'block/icon';

const Button = ({ label, type = "button", iconName, size, cssStyle, handleClick, buttonStyle = "default" }) => {

	const sizes = {
		big: "pv-btn-big",
		medium: " pv-btn-medium"
	}

	const buttonStyles = {
		white: {
			button: {
				css: {},
				class: "pv-bg-stroke pv-bg-hover-stroke"
			},
			icon: "blue"
		},
		default: {
			button: {
				css: {
				},
				class: "pv-bg-blue pv-color-white pv-bg-air-white pv-bg-hover-blue"
			},
			icon: "default"
		}
	}

	return (<button
		type={type}
		style={{ margin: "5px", ...cssStyle, ...buttonStyles[buttonStyle]["button"]["css"] }}
		className={'pv-btn' + " " + sizes[size] + " " + buttonStyles[buttonStyle]["button"]["class"]}
		onClick={(e) => {
			e.preventDefault();
			handleClick();
		}
		}
	>
		<Svg name={iconName} style={buttonStyles[buttonStyle]["icon"]} />
		{label}
	</button>)
}

export default Button;