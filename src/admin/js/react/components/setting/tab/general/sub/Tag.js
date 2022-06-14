import Taxonomy from 'block/field/taxonomy';
export default () => {  
    return (
        <div className="pi-form-style-one"> 
            <div className="row">
                <div className="col">
                    <label>Tag</label>
                    <Taxonomy taxonomy='tag' title='tag' color={true} />
                </div>
                <div className="col">
                </div>
            </div>
        </div>
    )
} 