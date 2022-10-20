import React, { Component } from 'react';
import Upload from 'block/field/upload';
import { Add } from 'block/icon';


class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            name: '',
            org_name: '',
            web: '',
            email: '',
            mobile: '',
            address: '',
            zip: '',
            default: true,
            logo: null,
            date: false
        };

        this.state = {
            form: this.initialState
        }; 
    }

    handleChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    componentDidMount() {
        //added this multi place, because not working in invoice single
        this.editData();
    }

    componentDidUpdate() {
        this.editData();
    }

    editData = () => {
        //condition added to stop multi rendering 
        if (this.props.modalType == 'edit') {
            if (this.state.form.id != this.props.data.id) {
                if (!wage.length) {
                    this.setState({ form: this.props.data });
                } else {
                    let data = this.props.data;
                    data.default = true;
                    this.setState({ form: data });
                }
            }
        } else {
            if (this.state.form.id != null) {
                if (!wage.length) {
                    this.setState({ form: this.initialState });
                } else {
                    let data = this.initialState;
                    data.default = true;
                    this.setState({ form: data });
                }
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let form = { ...this.state.form }
        if (form.logo) {
            form.logo = {
                id: form.logo.id,
                src: form.logo.src
            }
        }
        this.props.handleSubmit(form);
        //this.setState({ form: this.initialState });
    }

    handleLogoChange = (data, type = null) => {
        let form = { ...this.state.form }
        form.logo = data;
        this.setState({ form })
    }

    render() {
        const form = this.state.form;
        const i18n = ndpv.i18n;
        let title = '';
        if (this.props.modalType == 'new') {
            title = i18n.new
        } else if (this.props.modalType == 'edit') {
            title = i18n.edit
        }
        return (
            <div className="pv-overlay pv-show">
                <div className="pv-modal-content">

                    <div className="pv-modal-header pv-gradient">
                        <span className="pv-close" onClick={() => this.props.close()}>
                            <Add />
                        </span>
                        <h2 className="pv-modal-title">{title} {i18n.biz}</h2>
                        <p>{i18n.add + ' ' + i18n.new + ' ' + i18n.biz + ' ' + i18n.from + ' ' + i18n.here}</p>
                    </div>

                    <form onSubmit={this.handleSubmit} >
                        <div className="pv-content">
                            <div className="pv-form-style-one">
                                <div className="row">
                                    <div className="col-md">
                                        <label
                                            htmlFor="field-name">
                                            {i18n.name}
                                        </label>

                                        <input
                                            id="field-name"
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                    {/* <div className="col-md">
                                            <label
                                                htmlFor="field-org_name">
                                                Company Name
                                            </label>

                                            <input
                                                id="field-org_name"
                                                type="text" 
                                                name="org_name"
                                                value={form.org_name}
                                                onChange={this.handleChange}
                                            />
                                        </div> */}

                                </div>
                                <div className="row">
                                    <div className="col-md">
                                        <label
                                            htmlFor="field-web">
                                            {i18n.web}
                                        </label>

                                        <input
                                            id="field-web"
                                            type="text"
                                            name="web"
                                            value={form.web}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="col-md">
                                        <label
                                            htmlFor="field-email">

                                            {i18n.email}

                                        </label>

                                        <input
                                            id="field-email"
                                            type="email"
                                            required
                                            name="email"
                                            value={form.email}
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md">
                                        <label
                                            htmlFor="field-mobile">
                                            {i18n.mob}
                                        </label>

                                        <input
                                            id="field-mobile"
                                            type="text" 
                                            name="mobile"
                                            value={form.mobile}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="col-md">
                                        <label
                                            htmlFor="field-zip">
                                            {i18n.zip}
                                        </label>

                                        <input
                                            id="field-zip"
                                            type="number"
                                            name="zip"
                                            value={form.zip}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label
                                            htmlFor="field-address">
                                            {i18n.addr}
                                        </label>

                                        <input
                                            id="field-address"
                                            type="text"
                                            name="address"
                                            placeholder='Write you full address here'
                                            value={form.address}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label
                                            htmlFor="field-logo">
                                            {i18n.logo}
                                        </label>
                                        <Upload data={form.logo} changeHandler={this.handleLogoChange} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pv-modal-footer">
                            <div className="row">
                                <div className="col">
                                    <button type='reset' className="pv-btn pv-text-hover-blue">{i18n.clear}</button>
                                </div>
                                <div className="col">
                                    <button type='submit' className="pv-btn pv-bg-blue pv-bg-hover-blue pv-btn-big pv-float-right pv-color-white">
                                        {i18n.save}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Form;
