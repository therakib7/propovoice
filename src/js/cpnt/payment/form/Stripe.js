import React, { Component } from 'react';
import { Add } from 'block/icon';
import { toast } from 'react-toastify';

import pro from 'block/pro-alert';
import ProLabel from 'block/pro-alert/label';

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
                    <form onSubmit={this.handleSubmit}>
                        <div className="pv-content">

                            <div className='pv-form-style-one'>
                                <div className="row">
                                    <div className="col-lg">
                                        <label
                                            htmlFor="form-account_name">
                                            {i18n.account} {i18n.name}
                                        </label>

                                        <input
                                            id="form-account_name"
                                            type="text"
                                            required
                                            name="account_name"
                                            value={this.state.form.account_name}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg">
                                        <label
                                            htmlFor="form-public_key">
                                            {i18n.pub} {i18n.key}
                                        </label>

                                        <input
                                            id="form-public_key"
                                            type="text"
                                            required
                                            name="public_key"
                                            value={this.state.form.public_key}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg">
                                        <label
                                            htmlFor="form-secret_key">
                                            {i18n.secret} {i18n.key}
                                        </label>

                                        <input
                                            id="form-secret_key"
                                            type="text"
                                            required
                                            name="secret_key"
                                            value={this.state.form.secret_key}
                                            onChange={this.handleChange}
                                        />
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
                                        {i18n.save} <ProLabel blueBtn />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                {/* ./ pv-modal-content */}
            </div>
        );
    }
}
export default FormStripe;
