import React, { Component } from 'react';
import { Add } from 'block/icon';
import { sprintf } from 'sprintf-js';
import Upload from 'block/field/upload';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            tab_id: this.props.tab_id,
            type: 'file',
            title: '',
            file: '',
        };

        this.state = {
            form: this.initialState
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let form = { ...this.state.form }
        this.props.handleSubmit(form);
        this.setState({ form: this.initialState });
        this.props.close();
    }

    handleUploadChange = (data, type = null) => {
        let form = { ...this.state.form }
        form.file = data;
        this.setState({ form })
    }

    render() {
        const form = this.state.form;
        const i18n = ndpv.i18n;
        return (
            <div className="pv-overlay pv-show">
                <div className="pv-modal-content">

                    <div className="pv-modal-header pv-gradient">
                        <span className="pv-close" onClick={() => this.props.close()}>
                            <Add />
                        </span>
                        <h2 className="pv-modal-title">{this.props.modalType == 'new' ? i18n.new : i18n.edit} {i18n.file}</h2>
                        <p>{sprintf(i18n.formDesc, i18n.file)}</p>
                    </div>

                    <form onSubmit={this.handleSubmit} >
                        <div className="pv-content">
                            <div className="pv-form-style-one">
                                <div className="row">
                                    <div className="col-lg">
                                        <label htmlFor="title">
                                            {i18n.title}
                                        </label>

                                        <input
                                            id="title"
                                            type="text"
                                            name="title"
                                            value={form.title}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg">
                                        <label htmlFor="file_id">
                                            {i18n.file}
                                        </label>
                                        <Upload data={form.file} changeHandler={this.handleUploadChange} />
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
            </div>
        );
    }
}

export default Form;
