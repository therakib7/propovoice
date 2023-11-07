import Taxonomy from 'block/field/taxonomy/setting';

export default (props) => {

    const i18n = ndpv.i18n;
    return (
        <div className="pv-form-style-one">
            <div className="row">
                <div className="col">
                    <label>{i18n.deal_stage}</label>
                    <Taxonomy taxonomy='deal_stage' title={i18n.stage} color />
                </div>
                <div className="col">
                </div>
            </div>
        </div>
    );
}