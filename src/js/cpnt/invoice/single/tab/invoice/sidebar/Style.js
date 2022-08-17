import ColorPicker from 'block/color-picker';

export default (props) => {

    const handleChange = (val) => {
        let style = { ...props.data.style }
        style.primary_color = val;

        props.handleChange(style);
    };

    const color = props.data.style.primary_color;
    return (
        <div className="pi-form-style-one pi-edit">
            <div className="row">
                <div className="col-12">
                    <label htmlFor="name">{ndpi.i18n.edit} {ndpi.i18n.color}</label>
                    <ColorPicker color={color} onChange={handleChange} />
                </div>
            </div>
        </div>
    );
} 