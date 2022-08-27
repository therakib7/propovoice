import Taxonomy from 'block/field/taxonomy/setting';
export default () => {  
    return (
        <div className="pi-form-style-one"> 
            <div className="row">
                <div className="col">
                    <label>{ndpv.i18n.status}</label>
                    <Taxonomy taxonomy='contact_status' title={ndpv.i18n.status} color />
                </div>
                <div className="col">
                </div>
            </div>
        </div>
    )
} 