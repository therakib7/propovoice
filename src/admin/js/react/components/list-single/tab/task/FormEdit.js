import React, { Component } from 'react';

import Select from 'react-select';
import WithApi from 'hoc/Api';

import Checklist from './Checklist';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            tab_id: this.props.tab_id,
            title: '',
            status_id: null,
            type_id: null,
            priority_id: null,
            desc: '',
            note: '',
            checklist: null,
        };

        this.state = {
            form: this.initialState,
            dropdown: null,
            status: [],
            types: [],
            priorities: [],
        };
    }

    showDropdown = (e, id) => {
        e.preventDefault();
        if (this.state.dropdown == id) {
            this.setState({ dropdown: null });
        } else {
            this.setState({ dropdown: id });
        }
    };

    setTax = (e, value, key) => {
        e.preventDefault();
        this.setState({ dropdown: null, form: { ...this.state.form, [key]: value } });
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    componentDidMount() {
        this.props.getAll('taxonomies', 'taxonomy=task_status,task_type,task_priority').then(resp => {
            if (resp.data.success) {

                this.setState({
                    status: resp.data.data.task_status,
                    types: resp.data.data.task_type,
                    priorities: resp.data.data.task_priority,
                });

                /* if (this.state.form.type_id) {
                    this.setState({
                        types: resp.data.data.task_type  
                    });
                } else {
                    let form = { ...this.state.form }
                    form.type_id = resp.data.data.task_type[0];
                    this.setState({
                        form,
                        types: resp.data.data.task_type 
                    });
                } */
            }
        });

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

            /* if ( JSON.stringify(this.state.form) != JSON.stringify(this.props.data) ) {
                this.setState({ form: this.props.data }); 
            } */
        } else {
            if (this.state.form.id != null) {
                this.setState({ form: this.initialState });
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let form = { ...this.state.form }

        if (form.status_id) {
            form.status_id = form.status_id.id;
        }

        if (form.type_id) {
            form.type_id = form.type_id.id;
        }

        if (form.priority_id) {
            form.priority_id = form.priority_id.id;
        }

        this.props.handleSubmit(form);
        this.props.close();
        this.setState({ form: this.initialState });
    }

    handleChecklistChange = (data) => {
        let form = { ...this.state.form }
        form.checklist = data;
        this.setState({ form })
    }

    handleTaxChange = (val, key) => {
        this.setState({ form: { ...this.state.form, [key]: val } });
    }

    render() {
        const form = this.state.form;
        const statusList = this.state.status;
        const typeList = this.state.types;
        const priorityList = this.state.priorities;

        return (
            <div className="pi-overlay">
                <div className="pi-modal-content pi-modal-sidebar pi-modal-sidebar-two">
                    <div className="pi-modal-header pi-gradient">
                        <span className="pi-close" onClick={() => this.props.close()}>
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

                        <div className="pi-small-button-group">
                            <div className="pi-action-content">
                                {form.status_id && <button
                                    className="pi-btn pi-btn-small"
                                    style={{
                                        backgroundColor: form.status_id.bg_color 
                                    }}
                                    onClick={e => this.showDropdown(e, 'status')}
                                    ref={e => e && e.style.setProperty('color', form.status_id.color, 'important')}
                                >
                                    {form.status_id.label}
                                </button>}

                                {this.state.dropdown == 'status' && <div className="pi-dropdown-content pi-show">
                                    {statusList && statusList.map((item, itemIndex) => {
                                        return (
                                            <a onClick={(e) => this.setTax(e, item, 'status_id')} key={itemIndex}>
                                                {item.label}
                                            </a>
                                        )
                                    })}
                                </div>}
                            </div>

                            <button className="pi-btn pi-btn-medium pi-float-right">
                                <svg
                                    width={13}
                                    height={10}
                                    viewBox="0 0 13 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11.5 1.5L4.5 8.5L1 5"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Mark as Done
                            </button>
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmit} >
                        <div className="pi-content">
                            <div className="pi-form-style-one">

                                <div className="row">
                                    <div className="col-lg">
                                        <label htmlFor="title">
                                            Title
                                        </label>

                                        <input
                                            id="title"
                                            className='pi-title-field'
                                            type="text"
                                            name="title"
                                            value={form.title}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="form-desc">
                                            Task Type
                                        </label>

                                        <Select
                                            value={form.type_id}
                                            onChange={(val) => this.handleTaxChange(val, 'type_id')}
                                            getOptionValue={data => data.id}
                                            getOptionLabel={data => data.label}
                                            options={typeList}
                                        />
                                    </div>

                                    <div className="col">
                                        <label htmlFor="form-desc">
                                            Task Priority
                                        </label>

                                        <Select
                                            value={form.priority_id}
                                            onChange={(val) => this.handleTaxChange(val, 'priority_id')}
                                            getOptionValue={data => data.id}
                                            getOptionLabel={data => data.label}
                                            options={priorityList}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg">
                                        <label htmlFor="name">Meeting Place or Link</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            defaultValue="Add Location"
                                        />
                                        <div className="pi-buttons pi-mt-15">
                                            <button className="pi-btn pi-btn-medium pi-bg-stroke pi-bg-shadow pi-mr-10">
                                                <svg
                                                    width={17}
                                                    height={14}
                                                    viewBox="0 0 17 14"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M4.5 0.399902L0.5 4.3999L2.5 5.63793L4.5 4.3999L5.62941 2.3999L4.5 0.399902Z"
                                                        fill="#FF2820"
                                                    />
                                                    <path
                                                        d="M4.5 4.3999H0.5V9.5999L2.5 10.6982L4.5 9.5999V4.3999Z"
                                                        fill="#0084FF"
                                                    />
                                                    <path
                                                        d="M0.5 9.59985V12.2665C0.5 12.9999 1.1 13.5999 1.83334 13.5999H4.5L5.62941 11.4767L4.5 9.59985H0.5Z"
                                                        fill="#0066DD"
                                                    />
                                                    <path
                                                        d="M15.6738 1.82014L13.1999 3.77986V3.79995L12.3931 6.88026L13.1999 9.99755L15.6628 11.9798C15.9933 12.257 16.4999 12.0241 16.4999 11.5916V2.20833C16.4999 1.77576 16.0043 1.54286 15.6738 1.82014Z"
                                                        fill="#00AD3C"
                                                    />
                                                    <path
                                                        d="M13.2 3.77981V1.71793C13.2 0.993027 12.6128 0.399902 11.895 0.399902H9.285H4.5V4.3999H9.4V6.9999L12.0326 6.70662L13.2 3.77981Z"
                                                        fill="#FFBA00"
                                                    />
                                                    <path
                                                        d="M9.4 9.6H4.5V13.6H9.285H11.895C12.6128 13.6 13.2 13.0078 13.2 12.2839V10L11.894 7.31684L9.4 7V9.6Z"
                                                        fill="#00AD3C"
                                                    />
                                                    <path
                                                        d="M9.3999 6.99988L13.1999 9.99988V3.77979L9.3999 6.99988Z"
                                                        fill="#00831E"
                                                    />
                                                </svg>
                                                Add Google meet
                                            </button>
                                            <button className="pi-btn pi-btn-medium pi-bg-stroke pi-bg-shadow">
                                                <svg
                                                    width={17}
                                                    height={10}
                                                    viewBox="0 0 17 10"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M0.5 1.09594V6.95562C0.505313 8.28062 1.5875 9.34687 2.90719 9.34156H11.4481C11.6909 9.34156 11.8862 9.14625 11.8862 8.90875V3.04937C11.8809 1.72437 10.7991 0.657811 9.47906 0.663124H0.938125C0.695313 0.663124 0.5 0.858437 0.5 1.09594H0.5ZM12.43 3.38187L15.9563 0.805624C16.2625 0.552499 16.5 0.615624 16.5 1.075V8.92969C16.5 9.4525 16.2097 9.38906 15.9563 9.19906L12.43 6.62812V3.38187Z"
                                                        fill="#4A8CFF"
                                                    />
                                                </svg>
                                                Connect Zoom
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="form-desc">
                                            Description
                                        </label>

                                        <textarea
                                            id="form-desc"
                                            name="desc"
                                            value={form.desc}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="form-note">
                                            Note
                                        </label>

                                        <textarea
                                            id="form-note"
                                            name="note"
                                            value={form.note}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <Checklist data={this.state.form.checklist} changeHandler={this.handleChecklistChange} />
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
            </div>
        );
    }
}

export default WithApi(Form); 
