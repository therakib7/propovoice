import Taxonomy from 'block/field/taxonomy/setting';
export default (props) => {
    const i18n = ndpv.i18n;
    return (
        <div className="pv-form-style-one">
            <div className="row">
                <div className="col">
                    <label>{i18n.task} {i18n.status}</label>
                    <Taxonomy taxonomy='task_status' title={i18n.status} color />
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
} 