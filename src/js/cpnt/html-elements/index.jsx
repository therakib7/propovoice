export const Icon = ({ name }) => {
  let icon;
  const xIcon = (<svg width="25" height="25" fill="none" viewBox="0 0 16 16">
    <path
      stroke="#718096"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.5 3.5l-9 9M12.5 12.5l-9-9"
    ></path>
  </svg>)

  const uploadIcon = (<svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
  >
    <path
      d="M3.668 10.09a2.7 2.7 0 01-1.779-.662 2.563 2.563 0 01-.394-3.457 2.67 2.67 0 011.587-1.03 3.199 3.199 0 01.46-2.452 3.334 3.334 0 012.1-1.417 3.395 3.395 0 012.508.45 3.26 3.26 0 011.448 2.053h.067c.826 0 1.623.299 2.236.84a3.205 3.205 0 01.45 4.35 3.34 3.34 0 01-2.02 1.26M9 8.137l-2-1.954m0 0L5.002 8.136M7 6.182V13"
      stroke="#136ACD"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>)

  switch (name) {
    case "upload":
      icon = uploadIcon;
      break;
    case "x":
      icon = xIcon;
      break;
    default:
      icon = ""
  }

  return (icon)
}

export const Button = ({ type = "button", iconName, size, handleClick }) => {
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
    className={'pv-btn pv-bg-air-white pv-bg-hover-blue pv-hover-color-white pv-bg-blue pv-color-white' + addClassName}
    onClick={(e) => {
      e.preventDefault();
      handleClick();
    }
    }
  >
    <Icon name={iconName} />
    Upload
  </button>)
}
