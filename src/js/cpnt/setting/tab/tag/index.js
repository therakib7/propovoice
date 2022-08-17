import Taxonomy from 'block/field/taxonomy/setting';
export default () => {  
    return (
        <div className="pi-form-style-one"> 
            <div className="row">
                <div className="col">
                    <label>{ndpi.i18n.tag}</label>
                    <Taxonomy taxonomy='tag' title='tag' />
                </div>
                <div className="col">
                </div>
            </div>
        </div>
    )
} 