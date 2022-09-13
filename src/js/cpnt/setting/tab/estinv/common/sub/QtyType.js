import Taxonomy from 'block/field/taxonomy/setting';
export default () => {  
    const i18n = ndpv.i18n;
    return (
        <div className="pv-form-style-one"> 
            <div className="row">
                <div className="col">
                    <label>{i18n.qty + ' ' + i18n.type}</label>
                    <Taxonomy taxonomy='estinv_qty_type' title={i18n.qty + ' ' + i18n.type} />
                </div>
                <div className="col">
                </div>
            </div>
        </div>
    )
} 