import React, { Component, Suspense, lazy } from 'react'
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
        return (
            <div className="pi-overlay">
                <div className="pi-modal-content">
                    <div className="pi-modal-header pi-gradient">
                        <span className="pi-close" onClick={() => this.props.close()} >
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
                        <h2 className="pi-modal-title">{this.props.modalType == 'new' ? 'New' : 'Edit'} Account</h2>
                        <p>Please fill up necessary informaiton in the form.</p>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="pi-content">

                            <div className='pi-form-style-one'>
                                <div className="row">
                                    <div className="col-lg">
                                        <label
                                            htmlFor="form-name">
                                            Name
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
                                            Details
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
                                                key={'pi-bank-details'}
                                                value={this.state.form.details} 
                                                changeHandler={this.handleDesc}
                                            />
                                        </Suspense> */}

                                        <p className='pi-field-desc'>You need to mention bank details here, Like: Name, Routing No. etc</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pi-modal-footer">
                            <div className="row">
                                <div className="col">
                                    <button type='reset' className="pi-btn pi-text-hover-blue">Clear</button>
                                </div>
                                <div className="col">
                                    <button type='submit' className="pi-btn pi-bg-blue pi-bg-hover-blue pi-btn-big pi-float-right pi-color-white">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                {/* ./ pi-modal-content */}
            </div>
        );
    }
}

export default FormBank;
