import React, { Component } from 'react';
import { Add } from 'block/icon';
import Contact from 'block/field/contact';
import Upload from 'block/field/upload';
import { sprintf } from 'sprintf-js';
import { Text, Address } from 'block/form/input';
import { FormWrapper, FormContent } from 'block/form';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            first_name: '',
            person_id: null,
            org_id: null,
            org_name: '',
            email: '',
            web: '',
            mobile: '',
            country: '',
            region: '',
            address: '',
            city: '',
            zip: '',
            img: '',
            client_portal: false,
            date: false
        };

        this.state = {
            form: this.initialState
        };

        this.selectCountry = this.selectCountry.bind(this);
    }

    handleChange = e => {
        const target = e.target;
        const { name } = target;
        const value = target.type == 'checkbox' ? target.checked : target.value;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    selectCountry(val) {
        this.setState({ form: { ...this.state.form, ['country']: val } });
    }

    selectRegion(val) {
        this.setState({ form: { ...this.state.form, ['region']: val } });
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

                let form = this.props.data;
                if (form.org) {
                    form.org_name = (form.org) ? form.org.name : '';
                    form.org_id = (form.org) ? form.org.id : null;
                }
                this.setState({ form });
            }
        } else {
            if (this.state.form.id != null) {
                this.setState({ form: this.initialState });
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleSubmit(this.state.form);
        // this.setState({ form: this.initialState });
    }

    handleContactChange = (val, type) => {
        let form = { ...this.state.form }
        if (type == 'person') {
            form.first_name = val;
        } else {
            form.org_name = val;
        }
        this.setState({ form });
    }

    handleContactSelect = (val, type) => {
        let form = { ...this.state.form }
        if (!val) {
            if (type == 'person') {
                form.person_id = null;
            } else {
                form.org_id = null;
            }
            this.setState({ form });
            return;
        };

        if (type == 'person') {
            form.first_name = val.first_name;
            form.person_id = (val) ? val.id : null;
            form.email = (val) ? val.email : '';
            form.mobile = (val) ? val.mobile : '';
            form.web = (val) ? val.web : '';
            form.country = (val) ? val.country : '';
            form.region = (val) ? val.region : '';
            form.address = (val) ? val.address : '';
            form.img = (val) ? val.img : '';
        } else {
            form.org_name = val.name;
            form.org_id = (val) ? val.id : null;
        }

        this.setState({ form });
    }

    handleImgChange = (data, type = null) => {
        let form = { ...this.state.form }
        form.img = data;
        this.setState({ form })
    }

    render() {
        const form = this.state.form;
        const i18n = ndpv.i18n;
        const modalType = this.props.modalType == 'new' ? i18n.add + ' ' + i18n.new : i18n.edit;
        return (
            <div className="pv-overlay pv-show">
                <div className="pv-modal-content">

                    <div className="pv-modal-header pv-gradient">
                        <span className="pv-close" onClick={() => this.props.close()}>
                            <Add />
                        </span>
                        <h2 className="pv-modal-title">{modalType} {i18n.client}</h2>
                        <p>{sprintf(i18n.formDesc, modalType, i18n.client)}</p>
                    </div>

                    <FormWrapper submitHandler={this.handleSubmit} close={this.props.close}>
                        <FormContent formStyleClass="pv-form-style-one">
                            <Contact
                                first_name={form.first_name}
                                org_name={form.org_name}
                                onChange={this.handleContactChange}
                                onSelect={this.handleContactSelect}
                            />

                            <div className="row">

                                <Text
                                    label={i18n.email}
                                    id="form-email"
                                    type="email"
                                    wrapperClassName='col-lg'
                                    name="email"
                                    value={form.email}
                                    onChange={this.handleChange}
                                    validation={{ required: { value: true }, email: { value: true } }}
                                />
                                <div className="col-lg">
                                    <label htmlFor="form-mobile">
                                        {i18n.mob}
                                    </label>

                                    <input
                                        id="form-mobile"
                                        type="text"
                                        name="mobile"
                                        value={form.mobile}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <Address
                                data={form}
                                selectCountry={this.selectCountry}
                                handleChange={this.handleChange}
                            />

                            <div className="row">
                                <div className="col-lg">
                                    <label htmlFor="form-web">
                                        {i18n.web}
                                    </label>

                                    <input
                                        id="form-web"
                                        type="text"
                                        name="web"
                                        value={form.web}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label htmlFor="field-img">
                                        {i18n.img}
                                    </label>
                                    <Upload data={form.img} changeHandler={this.handleImgChange} />
                                </div>
                            </div>

                            {!wage.length && <div className="row">
                                <div className="col">
                                    <label id="form-client_portal">Client Portal Access</label>
                                    <div className="pv-field-switch pv-ml-10">
                                        <label className='pv-switch'>
                                            <input type='checkbox'
                                                id="form-client_portal"
                                                name='client_portal'
                                                checked={form.client_portal ? 'checked' : ''}
                                                onChange={this.handleChange}
                                            />
                                            <span className='pv-switch-slider pv-round'></span>
                                        </label>
                                    </div>
                                </div>
                            </div>}
                        </FormContent>
                    </FormWrapper>
                </div >
            </div >
        );
    }
}

export default Form;
