import Taxonomy from 'block/field/taxonomy/setting';
export default () => {  
    return (
        <div className="pi-form-style-one"> 
            <div className="row">
                <div className="col">
                    <label>Tag</label>
                    <Taxonomy taxonomy='tag' title='tag' reorder={false} />
                </div>
                <div className="col">
                </div>
            </div>
        </div>
    )
} 