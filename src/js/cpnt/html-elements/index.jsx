import SvgIcon from "../svg-icons";

export const Button = ({ label, type = "button", iconName, size, cssStyle, handleClick }) => {
  let addClassName = "";
  switch (size) {
    case 'big':
      addClassName += " pv-btn-big";
      break;
    case 'medium':
      addClassName += " pv-btn-medium";
      break;

  }

  return (<button
    type={type}
    style={cssStyle}
    className={'pv-btn pv-bg-air-white pv-bg-hover-blue pv-hover-color-white pv-bg-blue pv-color-white' + addClassName}
    onClick={(e) => {
      e.preventDefault();
      handleClick();
    }
    }
  >
    <SvgIcon name={iconName} />
    {label}
  </button>)
}
