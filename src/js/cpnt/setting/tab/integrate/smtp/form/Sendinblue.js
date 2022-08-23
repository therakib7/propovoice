import React, { Component } from 'react';
import { toast } from 'react-toastify';
import AppContext from 'context/app-context';

export default class Business extends Component {
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
            logo: null,
            zip: '',
            default: true,
            date: false
        };

        this.state = {
            form: this.initialState
        };
    }

    static contextType = AppContext;

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    toggleChange = () => {
        let value = !this.state.form.default;
        this.setState({ form: { ...this.state.form, ['default']: value } });
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        this.props.getAll('businesses', 'default=1').then(resp => {
            let businessData = resp.data.data.result;
            if (businessData.length) {
                this.setState({ form: businessData[0] });
            }
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        let form = { ...this.state.form }
        if (form.logo) {
            form.logo = form.logo.id;
        }

        if (!form.id) {
            this.props.create('businesses', form).then(resp => {
                if (resp.data.success) {
                    toast.success(this.context.CrudMsg.create);
                } else {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                }
            })
        } else {
            this.props.update('businesses', form.id, form).then(resp => {
                if (resp.data.success) {
                    toast.success(this.context.CrudMsg.update);
                } else {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                }
            })
        }
    }

    render() {
        const i18n = ndpi.i18n;
        return (
            <form onSubmit={this.handleSubmit} className="pi-form-style-one">
                <h4 className='pi-title-medium pi-mb-15' style={{ textTransform: 'capitalize' }}>Sendinblue</h4>
                <div className="row">
                    <div className="col-md">
                        <label htmlFor="field-key">
                            API Key
                        </label>

                        <input
                            id="field-key"
                            type="text"
                            name="name"
                            value={this.state.form.name}
                            onChange={this.handleChange}
                        />
                    </div>

                </div>

                <div className="row">
                    <div className="col-md">
                        <label htmlFor="field-web">
                            {i18n.web}
                        </label>

                        <input
                            id="field-web"
                            type="text"
                            name="web"
                            value={this.state.form.web}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <button className="pi-btn pi-bg-blue pi-bg-hover-blue">
                            {i18n.act}
                        </button>
                    </div>
                </div>
            </form>
        );
    }
} 