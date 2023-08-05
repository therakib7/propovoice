import React, { Component } from 'react';
import { Add } from 'block/icon';

import { toast } from 'react-toastify';
import pro from 'block/pro-alert';
import ProLabel from 'block/pro-alert/label';
import { TextInput } from 'block/form/input';
import { FormWrapper, FormContent } from 'block/form';

class FormPaypal extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            type: 'paypal',
            account_type: 'business',
            account_name: '',
            account_email: '',
            client_id: '',
            secret_id: '',
            default: false,
        };

        this.state = {
            form: this.initialState
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    toggleChange = () => {
        let value = !this.state.form.default;
        this.setState({ form: { ...this.state.form, ['default']: value } });
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
                this.setState({ form: this.props.data });
            }
        } else {
            if (this.state.form.id != null) {
                this.setState({ form: this.initialState });
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (ndpv.isDemo) { toast.error(ndpv.demoMsg); return; }
        if (wage.length > 0) {
            pro();
            return;
        }
        this.props.handleSubmit(this.state.form);
        // this.setState({ form: this.initialState });
    }

    render() {
        const i18n = ndpv.i18n;
        return (
            <div className="pv-overlay">
                <div className="pv-modal-content">
                    <div className="pv-modal-header pv-gradient">
                        <span className="pv-close" onClick={() => this.props.close()} >
                            <Add />
                        </span>
                        <h2 className="pv-modal-title">{this.props.modalType == 'new' ? i18n.new : i18n.edit} Paypal</h2>
                        <p>Please fill up necessary informaiton in the form.</p>
                    </div>

                    <FormWrapper submitHandler={this.handleSubmit} close={this.props.close}>
                        <FormContent formStyleClass="pv-form-style-one">
                            <div className="row d-none">
                                <div className="col-lg">
                                    <label
                                        htmlFor="form-account_type">
                                        {i18n.account} {i18n.type}
                                    </label>

                                    <div>
                                        <label htmlFor="form-account_type_personal">
                                            {i18n.pers}
                                        </label>
                                        <input
                                            id="form-account_type_personal"
                                            type="radio"
                                            name="account_type"
                                            value='personal'
                                            onChange={this.handleChange}
                                        />

                                        <label htmlFor="form-account_type_business">
                                            {i18n.biz}
                                        </label>
                                        <input
                                            id="form-account_type_business"
                                            type="radio"
                                            name="account_type"
                                            value='business'
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <TextInput
                                    label={i18n.account + " " + i18n.name}
                                    id="form-account_name"
                                    type="text"
                                    name="account_name"
                                    wrapperClassName='col-lg'
                                    value={this.state.form.account_name}
                                    onChange={this.handleChange}
                                    validation={{ required: { value: true } }}
                                />
                            </div>

                            {this.state.form.account_type == 'personal' && <div className="row">
                                <div className="col-lg">
                                    <label htmlFor="form-account_email">
                                        {i18n.account} {i18n.email}
                                    </label>
                                    <input
                                        id="form-account_email"
                                        type="email"
                                        name="account_email"
                                        value={this.state.form.account_email}
                                    //onChange={this.handleChange}
                                    />
                                </div>
                            </div>}

                            <div className="row">

                                <TextInput
                                    label={i18n.client + " " + i18n.id}
                                    id="form-client_id"
                                    type="text"
                                    name="client_id"
                                    wrapperClassName='col-lg'
                                    value={this.state.form.client_id}
                                    onChange={this.handleChange}
                                    validation={{ required: { value: true } }}
                                />
                            </div>

                            <div className="row">
                                <TextInput
                                    label={i18n.secret + " " + i18n.id}
                                    id="form-secret_id"
                                    type="text"
                                    name="secret_id"
                                    wrapperClassName='col-lg'
                                    value={this.state.form.secret_id}
                                    onChange={this.handleChange}
                                    validation={{ required: { value: true } }}
                                />
                            </div>
                        </FormContent>
                    </FormWrapper>
                </div >
                {/* ./ pv-modal-content */}
            </div >
        );
    }
}

export default FormPaypal;
