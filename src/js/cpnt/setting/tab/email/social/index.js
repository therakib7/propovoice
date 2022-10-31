import Taxonomy from 'block/field/taxonomy/setting';
export default (props) => {
    const i18n = ndpv.i18n;
    return (
        <div className="pv-form-style-one">
            <div className="row">
                <div className="col">
                    <label>Social Links</label>
                    <Taxonomy taxonomy='email_social' title='Social' url icon />
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
} 