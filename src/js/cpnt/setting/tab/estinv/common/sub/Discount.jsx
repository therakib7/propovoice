import Taxonomy from 'block/field/taxonomy/setting';
export default () => {
    const i18n = ndpv.i18n;
    return (
        <div className="pv-form-style-one">
            <div className="row">
                <div className="col">
                    <label>{i18n.discount} {i18n.fields}</label>
                    <Taxonomy taxonomy='extra_amount' title={i18n.discount + ' ' + i18n.field} extra_amount_type='discount' tax_cal fee_cal />
                </div>
                <div className="col">
                </div>
            </div>
        </div>
    )
} 