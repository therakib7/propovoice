export default (props) => {
  const { i18n } = ndpv;

  console.log(props);

  const viewActionButton = (action) => (
    <button
      key={action.slug}
      className="pv-btn pv-btn-small pv-bg-stroke pv-bg-shadow pv-bg-hover-shadow"
      onClick={() => action.handleClick("selected")}
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
        {props.actions[props.path].map((action) => {
          return viewActionButton(action);
        })}
        {props.actions["common"].map((action) => {
          return viewActionButton(action);
        })}
      </div>
    </div>
  );
};
