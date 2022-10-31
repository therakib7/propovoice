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

            <div className="row">
                <div className="col">
                    <label>{i18n.task} {i18n.type}</label>
                    <Taxonomy taxonomy='task_type' title={i18n.type} icon />
                </div>
                <div className="col"></div>
            </div>

            <div className="row">
                <div className="col">
                    <label>{i18n.task} {i18n.prior}</label>
                    <Taxonomy taxonomy='task_priority' title={i18n.prior} color />
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
} 