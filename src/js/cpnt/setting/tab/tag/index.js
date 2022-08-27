import Taxonomy from 'block/field/taxonomy/setting';
export default () => {  
    return (
        <div className="pi-form-style-one"> 
            <div className="row">
                <div className="col">
                    <label>{ndpv.i18n.tag}</label>
                    <Taxonomy taxonomy='tag' title={ndpv.i18n.tag} />
                </div>
                <div className="col">
                </div>
            </div>
        </div>
    )
} 