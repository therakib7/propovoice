export default (props) => {
  const viewActionButton = (action) => (
    <button
      key={action.slug}
      className="pv-btn pv-btn-small pv-bg-stroke pv-bg-shadow pv-bg-hover-shadow"
      onClick={() => action.handleClick(action.type)}
    >
      {action.label}
    </button>
  );

  return (
    <div className="pv-table-action pv-mb-10">
      <div className="pv-checkbox-field pv-mt-6">
        {/* <input type="checkbox" defaultChecked onChange={() => props.uncheckAll()} /> */}
        <span style={{ marginLeft: 0 }}>
          {props.length} {ndpv.i18n.iselec}{" "}
        </span>
      </div>
      <div className="pv-small-button-group">
        {/* Show path based action buttons */}
        {props.path &&
          props.actions &&
          props.actions[props.path].map((action) => {
            return viewActionButton(action);
          })}

        {/* Show common action buttons */}
        {props.actions &&
          props.actions["common"].map((action) => {
            return viewActionButton(action);
          })}

        {/* if actions not set in props then show delete button */}
        {!props.actions &&
          viewActionButton({
            slug: "delete",
            type: "selected",
            label: ndpv.i18n.del,
            handleClick: props.deleteEntry,
          })}
      </div>
    </div>
  );
};
