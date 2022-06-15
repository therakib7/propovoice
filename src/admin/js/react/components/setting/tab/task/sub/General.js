import React, { Component } from 'react';

import { toast } from 'react-toastify';
import AppContext from 'context/app-context';
import Taxonomy from 'block/field/taxonomy';

export default class General extends Component {
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

        this.props.getAll('settings', 'tab=general_social').then(resp => {
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

        this.props.create('settings', form).then(resp => {
            if (resp.data.success) {
                toast.success(this.context.CrudMsg.update);
            } else {
                resp.data.data.forEach(function (value, index, array) {
                    toast.error(value);
                });
            }
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="pi-form-style-one"> 
                <div className="row">
                    <div className="col">
                        <label>Task Status</label>
                        <Taxonomy taxonomy='task_status' title='status' color={true} />
                    </div>
                    <div className="col"></div>
                </div> 

                <div className="row">
                    <div className="col">
                        <label>Task Type</label>
                        <Taxonomy taxonomy='task_type' title='type' />
                    </div>
                    <div className="col"></div>
                </div> 

                <div className="row">
                    <div className="col">
                        <label>Task Priority</label>
                        <Taxonomy taxonomy='task_priority' title='priority' color={true} />
                    </div>
                    <div className="col"></div>
                </div> 

            </form>
        );
    }
} 