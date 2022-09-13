import React, { Component, Suspense, lazy } from 'react';
import { Add } from 'block/icon';

// const Editor = lazy(() => import('block/editor'));

class FormBank extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            type: 'bank',
            name: '',
            details: '',
            default: false,
            date: false
        };

        this.state = {
            form: this.initialState
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    handleDesc = (value = null) => {
        let form = this.state.form;
        form['details'] = value;
        this.setState({ form });
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
                            <Add />
                        </span>
                        <h2 className="pv-modal-title">{this.props.modalType == 'new' ? i18n.new : i18n.edit} {i18n.account}</h2>
                        <p>Please fill up necessary information in the form.</p>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="pv-content">

                            <div className='pv-form-style-one'>
                                <div className="row">
                                    <div className="col-lg">
                                        <label
                                            htmlFor="form-name">
                                            {i18n.name}
                                        </label>

                                        <input
                                            id="form-name"
                                            type="text"
                                            required
                                            name="name"
                                            value={this.state.form.name}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="form-details">
                                            {i18n.dtl}
                                        </label>
                                        <textarea
                                            id="form-details"
                                            rows={4}
                                            name="details"
                                            value={this.state.form.details}
                                            onChange={this.handleChange}
                                        />
                                        {/*<Suspense fallback={<Spinner />}> 
                                            <Editor
                                                key={'pv-bank-details'}
                                                value={this.state.form.details} 
                                                changeHandler={this.handleDesc}
                                            />
                                        </Suspense> */}

                                        <p className='pv-field-desc'>You need to mention bank details here, Like: Name, Routing No. etc</p>
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
export default FormBank;