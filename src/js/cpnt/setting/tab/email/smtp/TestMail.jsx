import React, { Component } from 'react';
import { toast } from 'react-toastify';
import api from 'api';
import Preloader from "block/preloader/spinner";

export default class TestMail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                from: '',
                to: '',
                subject: '',
                msg: ''
            },
            submitPreloader: false,
        };
    }

    _isMounted = false;

    componentDidMount() {

        this._isMounted = true;
        api.get('settings', 'tab=email_smtp_test').then(resp => {
            if (this._isMounted && resp.data.success) {
                this.setState({ form: resp.data.data });
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let form = this.state.form;
        form.tab = 'email_smtp_test';
        this.setState({ submitPreloader: true });

        api.add('settings', form).then(resp => {
            this.setState({ submitPreloader: false });
            if (resp.data.success) {
                toast.success('Test Mail send successfully');
            } else {
                resp.data.data.forEach(function (value) {
                    toast.error(value);
                });
            }
        })
    }

    render() {
        const i18n = ndpv.i18n;
        const { submitPreloader, form } = this.state;
        return (
            <form onSubmit={this.handleSubmit} className="pv-form-style-one">
                <h4 className='pv-title-medium pv-mb-15 pv-mt-30' style={{ textTransform: 'capitalize' }}>Test Mail</h4>

                <div className="row">
                    <div className="col">
                        <label htmlFor="form-from">
                            {i18n.from}
                        </label>
                        <input
                            id="form-from"
                            type="email"
                            required
                            name="from"
                            value={form.from}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="form-to">
                            {i18n.to}
                        </label>
                        <input
                            id="form-to"
                            type="email"
                            required
                            name="to"
                            value={form.to}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="form-subject">
                            {i18n.sub}
                        </label>
                        <input
                            id="form-subject"
                            type="text"
                            required
                            name="subject"
                            value={form.subject}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="form-msg">{i18n.msg}</label>
                        <textarea
                            id="form-msg"
                            required
                            rows={6}
                            name="msg"
                            value={form.msg}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <button disabled={submitPreloader} className="pv-btn pv-bg-blue pv-bg-hover-blue">
                            {submitPreloader && <Preloader submit />} {i18n.send}
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}
