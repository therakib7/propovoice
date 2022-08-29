import React, { Component } from 'react';

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

    handleSubmit = (e) => {
        e.preventDefault();
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
                        <h2 className="pv-modal-title">{this.props.modalType == 'new' ? i18n.new : i18n.edit} Paypal</h2>
                        <p>Please fill up necessary informaiton in the form.</p>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="pv-content">

                            <div className='pv-form-style-one'>
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
                                    <div className="col-lg">
                                        <label
                                            htmlFor="form-client_id">
                                            {i18n.client} {i18n.id}
                                        </label>

                                        <input
                                            id="form-client_id"
                                            type="text"
                                            required
                                            name="client_id"
                                            value={this.state.form.client_id}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg">
                                        <label
                                            htmlFor="form-secret_id">
                                            {i18n.secret} {i18n.id}
                                        </label>

                                        <input
                                            id="form-secret_id"
                                            type="text"
                                            required
                                            name="secret_id"
                                            value={this.state.form.secret_id}
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
                                        {i18n.save}
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

export default FormPaypal;
