import React, { Component } from 'react';
import ColorPicker from 'block/color-picker';
import { toast } from 'react-toastify';
import Upload from 'block/field/upload';
import WithApi from 'hoc/Api';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            label: '',
            color: '',
            bg_color: '',
            icon: null,
            val_type: 'fixed',
            show: true,
        };

        this.state = {
            form: this.initialState
        };
    }

    handleChange = e => {
        const target = e.target;
        const { name } = target;
        const value = target.type == 'checkbox' ? target.checked : target.value;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    handleColorChange = (val, key) => {
        let form = { ...this.state.form }
        if (key == 'bg_color') {
            form.bg_color = val;
            form.color = this.lightenDarkenColor(val, -80);
        } else {
            form.color = val;
        }

        this.setState({ form });
    }

    lightenDarkenColor = (color, percent) => {

        let R = parseInt(color.substring(1, 3), 16);
        let G = parseInt(color.substring(3, 5), 16);
        let B = parseInt(color.substring(5, 7), 16);

        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);

        R = (R < 255) ? R : 255;
        G = (G < 255) ? G : 255;
        B = (B < 255) ? B : 255;

        let RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
        let GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
        let BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

        return "#" + RR + GG + BB;
    }

    componentDidMount() {
        //added this multiple place, because not working in invoice single
        this.editData();
    }

    componentDidUpdate() {
        this.editData();
    }

    editData = () => {
        //condition added to stop multiple rendering 
        if (this.props.modalType == 'edit') {
            if (this.state.form.id != this.props.data.id) {
                this.setState({ form: this.props.data });
            }
        } else {
            if (this.state.form.id != null) {
                this.setState({ form: this.initialState });
            }
        }
    }

    handleSubmit = () => {

        let newForm = { ...this.state.form }
        newForm.taxonomy = this.props.taxonomy;

        if (this.props.modalType == 'new') {
            if (this.props.extra_amount_type) {
                newForm.extra_amount_type = this.props.extra_amount_type;
            }
            this.props.create('taxonomies', newForm).then(resp => {
                if (resp.data.success) {
                    toast.success('Successfully added'); //TODO: translation
                    this.props.reload();
                } else {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                }
            });
        } else {
            this.props.update('taxonomies', newForm.id, newForm).then(resp => {
                if (resp.data.success) {
                    toast.success('Successfully updated'); //TODO: translation
                    this.props.reload();
                } else {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                }
            });
        }
        // setModal(false);
        this.props.close()
    }

    handleLogoChange = (data, type = null) => {
        let form = { ...this.state.form }
        form.icon = data;
        this.setState({ form })
    }

    render() {
        const form = this.state.form;
        const i18n = ndpv.i18n;
        return (
            <div className="pv-overlay pv-show">
                <div className="pv-modal-content pv-modal-style-two pv-modal-small">

                    <div className="pv-modal-header">
                        <span className="pv-close" onClick={() => this.props.close()}>
                            <svg
                                width={25}
                                height={25}
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12.5 3.5L3.5 12.5"
                                    stroke="#718096"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12.5 12.5L3.5 3.5"
                                    stroke="#718096"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                        <h2 className="pv-modal-title">{this.props.modalType == 'new' ? i18n.new : i18n.edit} {this.props.title}</h2>
                    </div>

                    <div className="pv-content">
                        <div className="pv-form-style-one">
                            <div className="row">
                                <div className="col-md">
                                    <label htmlFor="field-label">
                                        {i18n.name}
                                    </label>

                                    <input
                                        id="field-label"
                                        type="text"
                                        name="label"
                                        value={form.label}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </div>
                            </div>

                            {this.props.color && <>
                                <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="field-bg_color">
                                        {i18n.bg} {i18n.color}
                                        </label>
                                        <ColorPicker color={form.bg_color} onChange={(val) => this.handleColorChange(val, 'bg_color')} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="field-color">
                                        {i18n.text} {i18n.color}
                                        </label>
                                        <ColorPicker color={form.color} onChange={(val) => this.handleColorChange(val, 'color')} />
                                    </div>
                                </div>

                                {false && <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="field-color">
                                            {i18n.prv}
                                        </label>
                                        <div className='pv-field-btn-preview'>
                                            <button
                                                className='pv-btn pv-btn-medium pv-bg-orange pv-bg-hover-shadow pv-color-orange'
                                                style={{
                                                    backgroundColor: form.bg_color,
                                                    color: form.color,
                                                    border: 'none'
                                                }}
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                {form.label ? form.label : 'Button'}
                                                <svg
                                                    width={10}
                                                    height={6}
                                                    style={{ marginLeft: '10px' }}
                                                    className='pv-mr-0'
                                                    viewBox="0 0 10 6"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M5.00001 3.78145L8.30001 0.481445L9.24268 1.42411L5.00001 5.66678L0.757342 1.42411L1.70001 0.481445L5.00001 3.78145Z"
                                                        fill={form.color}
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>}
                            </>}

                            {this.props.icon &&
                                <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="field-icon">
                                        {i18n.icon}
                                        </label>
                                        <Upload data={form.icon} small changeHandler={this.handleLogoChange} />
                                    </div>
                                </div>}

                            {this.props.extra_amount_type &&
                                <>
                                    <div className="row">
                                        <div className="col-md">
                                            <label htmlFor="field-label">{i18n.rate} {i18n.type}</label>
                                            <select name="val_type" value={form.val_type} onChange={this.handleChange}>
                                                <option value="percent">Percent</option>
                                                <option value="fixed">Fixed</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <label id="form-show">{i18n.alw} {i18n.show}</label>
                                            <div className="pv-field-switch pv-mt-3 pv-ml-10">
                                                <label className='pv-switch'>
                                                    <input type='checkbox'
                                                        id="form-show"
                                                        name='show'
                                                        checked={form.show ? 'checked' : ''}
                                                        onChange={this.handleChange}
                                                    />
                                                    <span className='pv-switch-slider pv-round'></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </div>

                    <div className="pv-modal-footer pv-mt-10">
                        <div className="row">
                            <div className="col">
                                <button type='reset' className="pv-btn pv-text-hover-blue">{i18n.clear}</button>
                            </div>
                            <div className="col">
                                <button onClick={this.handleSubmit} className="pv-btn pv-bg-blue pv-bg-hover-blue pv-btn-medium pv-float-right pv-color-white">
                                    {i18n.save}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default WithApi(Form); 