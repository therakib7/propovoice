export default (props) => {

    return (
        <div className="pv-table-action pv-mb-10">
            <div className="pv-checkbox-field pv-mt-6">
                {/* <input type="checkbox" defaultChecked onChange={() => props.uncheckAll()} /> */}
                <span style={{ marginLeft: 0 }}>{props.length}  {ndpv.i18n.iselec} </span>
            </div>
            <div className="pv-small-button-group">
                {/*<button className="pv-btn pv-btn-small pv-bg-stroke pv-bg-shadow pv-bg-hover-shadow">
                    Export CVC
                </button>
                <button className="pv-btn pv-btn-small pv-bg-stroke pv-bg-shadow pv-bg-hover-shadow">
                    Active
                </button>
                <button className="pv-btn pv-btn-small pv-bg-stroke pv-bg-shadow pv-bg-hover-shadow">
                    Archive
                </button>*/}
                <button
                    className="pv-btn pv-btn-small pv-bg-stroke pv-bg-shadow pv-bg-hover-shadow"
                    onClick={() => props.deleteEntry('selected')}
                >
                    {ndpv.i18n.del}
                </button>
            </div>
        </div>
    );
}