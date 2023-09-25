import React, { Component } from 'react';
import { Add } from 'block/icon';
import { toast } from 'react-toastify';

import pro from 'block/pro-alert';
import ProLabel from 'block/pro-alert/label';
import { Text } from 'block/form/input';
import { FormWrapper, FormContent } from 'block/form';

class FormStripe extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            type: 'stripe',
            account_name: '',
            public_key: '',
            secret_key: '',
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
                        <h2 className="pv-modal-title">{this.props.modalType == 'new' ? i18n.new : i18n.edit} {i18n.stripe}</h2>
                        <p>Please fill up necessary informaiton in the form.</p>
                    </div>
                    <FormWrapper submitHandler={this.handleSubmit}
                        close={this.props.close}>
                        <FormContent formStyleClass="pv-form-style-one">
                            <div className="row">

                                <Text
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

                            <div className="row">

                                <Text
                                    label={i18n.pub + " " + i18n.key}
                                    id="form-public_key"
                                    type="text"
                                    name="public_key"
                                    wrapperClassName='col-lg'
                                    value={this.state.form.public_key}
                                    onChange={this.handleChange}
                                    validation={{ required: { value: true } }}
                                />
                            </div>

                            <div className="row">

                                <Text
                                    label={i18n.secret + " " + i18n.key}
                                    id="form-secret_key"
                                    type="text"
                                    name="secret_key"
                                    wrapperClassName='col-lg'
                                    value={this.state.form.secret_key}
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
export default FormStripe;
