import React, { Component } from 'react';

import { toast } from 'react-toastify'; 
import api from 'api';

export default class General extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                prefix: '' 
            }
        };
    } 

    componentDidMount() {
        api.get('settings', 'tab=estimate_general').then(resp => {
            if (resp.data.success) {
                this.setState({ form: resp.data.data });
            }
        });
    }

    handleChange = (e) => {
        let general = { ...this.state.form }
        const target = e.target;
        const name = target.name;
        const value = target.value;
        general[name] = value;
        this.setState({ form: general })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let form = this.state.form;
        form.tab = 'estimate_general';

        api.add('settings', form).then(resp => {
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
        const form = this.state.form;
        const i18n = ndpv.i18n;
        return (
            <form onSubmit={this.handleSubmit} className="pv-form-style-one">
                <div className="row">
                    <div className="col">
                        <label htmlFor="field-prefix">
                            {i18n.inv} {i18n.num} {i18n.pre}
                        </label>

                        <input
                            id="field-prefix"
                            type="text"
                            name="prefix"
                            value={form.prefix}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="col"> 
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