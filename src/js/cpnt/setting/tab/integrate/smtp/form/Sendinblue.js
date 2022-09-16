import React, { Component } from 'react';
import { toast } from 'react-toastify';
import AppContext from 'context/app-context';

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = { 
            key: '', 
            web: '' 
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

        this.props.getAll('settings', 'tab=smtp_sendinblue').then(resp => {
            if (resp.data.success) {
                this.setState({ form: resp.data.data });
            }
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        let form = this.state.form;
        form.tab = 'smtp_sendinblue';

        this.props.create('settings', form).then(resp => {
            if (resp.data.success) {
                toast.success(ndpv.i18n.aUpd);
            } else {
                resp.data.data.forEach(function (value, index, array) {
                    toast.error(value);
                });
            }
        })

    }

    render() {
        const i18n = ndpv.i18n;
        return (
            <form onSubmit={this.handleSubmit} className="pv-form-style-one">
                <h4 className='pv-title-medium pv-mb-15' style={{ textTransform: 'capitalize' }}>Sendinblue</h4>
                <div className="row">
                    <div className="col-md">
                        <label htmlFor="field-key">
                            API Key
                        </label>

                        <input
                            id="field-key"
                            type="text"
                            required
                            name="key"
                            value={this.state.form.key}
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
                            type="url"
                            required
                            name="web"
                            value={this.state.form.web}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <button className="pv-btn pv-bg-blue pv-bg-hover-blue">
                            {i18n.save}
                        </button>
                    </div>
                </div>
            </form>
        );
    }
} 