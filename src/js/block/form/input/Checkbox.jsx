const Checkbox = ({ style, id, name, label = {}, changeHandler, isChecked }) => {
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

	const labelStyle = label?.position === "left"
		? "marginRight"
		: "marginLeft";

	const viewLabel = label?.text
		&& (<label id={id} style={{ [labelStyle]: "10px" }}>
			{label.text}
		</label >);

	return (
		<>
			{label?.position === "left" && viewLabel}
			{style === "switch" ? viewSwitch : viewCheckboxInput}
			{label?.position === "right" && viewLabel}
		</>
	)
}

export default Checkbox;