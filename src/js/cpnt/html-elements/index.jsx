import SvgIcon from "../svg-icons";

export const Button = ({ label, type = "button", iconName, size, cssStyle, handleClick, buttonStyle = "default" }) => {


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
    <SvgIcon name={iconName} style={buttonStyles[buttonStyle]["icon"]} />
    {label}
  </button>)
}

export const Checkbox = ({ style, id, name, label = {}, changeHandler, isChecked }) => {
  // label={{ text: "Test label", position: "right" }}
  // label position => left / right
  const viewCheckboxInput = (
    <input type='checkbox'
      id={id}
      name={name}
      checked={isChecked}
      onChange={changeHandler}
    />
  )

  const viewSwitch = (
    <div className="pv-field-switch">
      <label className='pv-switch'>
        {viewCheckboxInput}
        <span className='pv-switch-slider pv-round'></span>
      </label>
    </div>
  )

  const labelStyle = label.position === "left"
    ? "marginRight"
    : "marginLeft";

  const viewLabel = label.text
    && <label id={id} style={{ [labelStyle]: "10px" }}>
      {label.text}
    </label >;

  return (
    <>
      {label && label.position === "left" && viewLabel}
      {style === "switch" ? viewSwitch : viewCheckboxInput}
      {label && label.position === "right" && viewLabel}
    </>
  )
}
