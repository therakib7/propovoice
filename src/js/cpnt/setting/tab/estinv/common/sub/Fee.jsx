import Taxonomy from 'block/field/taxonomy/setting';
export default () => {
    const i18n = ndpv.i18n;
    return (
        <div className="pv-form-style-one">
            <div className="row">
                <div className="col">
                    <label>{i18n.fee} {i18n.fields}</label>
                    <Taxonomy taxonomy='extra_amount' title={i18n.fee + ' ' + i18n.field} extra_amount_type='fee' tax_cal />
                </div>
                <div className="col">
                </div>
            </div>
        </div>
    )
} 