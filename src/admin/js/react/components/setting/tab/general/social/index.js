import React, { Component } from 'react';

import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
import Api from 'api/setting';

export default class Social extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                social: []
            }

        };
    }

    static contextType = AppContext;

    componentDidMount() {
        Api.getAll('tab=general_social')
            .then(resp => {
                if (resp.data.success) {
                    this.setState({ form: resp.data.data });
                }
            });
    }

    handleChange = (e, i) => {
        let form = { ...this.state.form }
        const target = e.target; 
        const value = target.value 
        form.social[i]['url'] = value;

        this.setState({ form });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let form = this.state.form;
        form.tab = 'general_social';

        Api.create(form)
            .then(resp => {
                if (resp.data.success) {
                    toast.success(this.context.CrudMsg.update);
                } else {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                }
            })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="pi-form-style-one">

                {this.state.form.social.map((row, i) => (
                    <div className="row" key={i}>
                        <div className="col">
                            <label htmlFor={"form-" + row.id}>
                                {row.label}
                            </label>
                            <input
                                id={"form-" + row.id}
                                type="url" 
                                name={row.id}
                                value={row.url}
                                onChange={(e) => this.handleChange(e, i) }
                            />
                        </div>
                    </div>
                ))}

                <div className="row" style={{ marginTop: '10px' }}>
                    <div className="col">
                        <button className="pi-btn pi-bg-blue pi-bg-hover-blue">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        );
    }
} 