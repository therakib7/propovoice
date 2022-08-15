import Taxonomy from 'block/field/taxonomy/setting';
export default () => {  
    return (
        <div className="pi-form-style-one"> 
            <div className="row">
                <div className="col">
                    <label>Status</label>
                    <Taxonomy taxonomy='contact_status' title='Status' color />
                </div>
                <div className="col">
                </div>
            </div>
        </div>
    )
} 