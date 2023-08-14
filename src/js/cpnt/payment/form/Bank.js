import React, { Component } from 'react';
import { Add } from 'block/icon';
import { toast } from 'react-toastify';
import { TextInput } from 'block/form/input';
import { FormWrapper, FormContent } from 'block/form';

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
                        <p>{i18n.necInfo}</p>
                    </div>
                    <FormWrapper submitHandler={this.handleSubmit} close={this.props.close}>
                        <FormContent formStyleClass="pv-form-style-one">
                            <div className="row">
                                <TextInput
                                    label={i18n.name}
                                    id="form-name"
                                    type="text"
                                    name="name"
                                    wrapperClassName='col-lg'
                                    value={this.state.form.name}
                                    onChange={this.handleChange}
                                    validation={{ required: { value: true } }}
                                />
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

                                    <p className='pv-field-desc'>{i18n.bankDesc}</p>
                                </div>
                            </div>
                        </FormContent>
                    </FormWrapper>
                </div >
                {/* ./ pv-modal-content */}
            </div >
        );
    }
}
export default FormBank;
