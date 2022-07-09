import React, { Component, Suspense, lazy } from 'react'
import WithApi from 'hoc/Api';
import Moment from 'react-moment';
const DateField = lazy(() => import('block/date-picker'));

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            tab_id: this.props.tab_id,
            title: '',
            status_id: '',
            type_id: '',
            priority_id: '',
            start_date: false,
            end_date: false,
            date: false,
        };

        this.state = {
            form: this.initialState,
            dropdown: null,
            status: [],
            types: [],
            priorities: [],
        };
    }

    componentDidMount() {
        this.props.getAll('taxonomies', 'taxonomy=task_status,task_type,task_priority').then(resp => {
            if (resp.data.success) {
                let form = { ...this.state.form }
                const status = resp.data.data.task_status;
                const types = resp.data.data.task_type;
                const priorities = resp.data.data.task_priority;
                //TODO: add fallback if no taxonomy
                form.status_id = status[0];
                form.type_id = types[0];
                form.priority_id = priorities[0];

                this.setState({
                    form,
                    status,
                    types,
                    priorities,
                });

                this.props.setTaxonomies({
                    status,
                    types,
                    priorities,
                });
            }
        });
    }

    showDropdown = (id) => {
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

    handleChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    onDateChange = (date, type = null) => {
		let form = { ...this.state.form }

        // const startDateStr = new Moment(date).format('YYYY-MM-DD HH:mm:ss')
        //  const endDateStr = moment(endDate).format('YYYY-MM-DD HH:mm:ss')    
        // console.log(startDateStr);
        // console.log(date);
        // console.log(date.toLocaleString());
		if (type == 'start_date') {
			form.start_date = date;
		} else {
			form.end_date = date;
		}
		this.setState({ form });
	}

    handleSubmit = (e) => {
        e.preventDefault();

        let form = { ...this.state.form }

        if (form.status_id) {
            form.status_id = parseInt(form.status_id.id);
        }

        if (form.type_id) {
            form.type_id = parseInt(form.type_id.id);
        }

        if (form.priority_id) {
            form.priority_id = parseInt(form.priority_id.id);
        }

        this.props.handleSubmit(form, 'new');

        let newFrom = { ...this.initialState };
        newFrom.status_id = this.state.status[0];
        newFrom.type_id = this.state.types[0];
        newFrom.priority_id = this.state.priorities[0];

        this.setState({ form: newFrom });
    }

    render() {
        const typeList = this.state.types;
        const priorityList = this.state.priorities;
        const form = this.state.form;
        return (
            <form onSubmit={this.handleSubmit} className="">
                <div className="pi-tab-buttons-group">
                    <div className="pi-activity-field">
                        <input
                            id="field-title"
                            type="text"
                            //className='pi-mb-20'
                            required
                            name="title"
                            value={form.title}
                            placeholder='Add activity or task'
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="pi-tab-buttons">
                        <div className="pi-action-content">
                            <DateField date={form.start_date} type='start_date' onDateChange={this.onDateChange} /> 
                        </div>
                        <div className="pi-action-content">
                            <button className='pi-task-btn' type='button' onClick={() => this.showDropdown('type')}>
                                {form.type_id.icon && <img src={form.type_id.icon.src} />}
                                {!form.type_id.icon && <svg
                                    width={16}
                                    height={20}
                                    viewBox="0 0 16 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5 3H3C2.46957 3 1.96086 3.21071 1.58579 3.58579C1.21071 3.96086 1 4.46957 1 5V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H13C13.5304 19 14.0391 18.7893 14.4142 18.4142C14.7893 18.0391 15 17.5304 15 17V5C15 4.46957 14.7893 3.96086 14.4142 3.58579C14.0391 3.21071 13.5304 3 13 3H11M5 3C5 3.53043 5.21071 4.03914 5.58579 4.41421C5.96086 4.78929 6.46957 5 7 5H9C9.53043 5 10.0391 4.78929 10.4142 4.41421C10.7893 4.03914 11 3.53043 11 3M5 3C5 2.46957 5.21071 1.96086 5.58579 1.58579C5.96086 1.21071 6.46957 1 7 1H9C9.53043 1 10.0391 1.21071 10.4142 1.58579C10.7893 1.96086 11 2.46957 11 3M5 12L7 14L11 10"
                                        stroke="#CBD5E0"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>}
                            </button>

                            {this.state.dropdown == 'type' && <div className="pi-dropdown-content pi-show">
                                {typeList && typeList.map((item, itemIndex) => {
                                    return (
                                        <a onClick={(e) => this.setTax(e, item, 'type_id')} key={itemIndex}>
                                            {item.icon && <img src={item.icon.src} />}
                                            {item.label}
                                        </a>
                                    )
                                })}
                            </div>}
                        </div>

                        <div className="pi-action-content">
                            <button className='pi-task-btn' type='button' onClick={() => this.showDropdown('priority')}>
                                <svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10 1.5V7M1 19V15V19ZM1 15V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H9.5L10.5 2H19L16 8L19 14H10.5L9.5 13H3C2.46957 13 1.96086 13.2107 1.58579 13.5858C1.21071 13.9609 1 14.4696 1 15V15Z"
                                        stroke={form.priority_id && form.priority_id.bg_color ? form.priority_id.bg_color : '#CBD5E0'}
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                            {this.state.dropdown == 'priority' && <div className="pi-dropdown-content pi-show">
                                {priorityList && priorityList.map((item, itemIndex) => {
                                    return (
                                        <a onClick={(e) => this.setTax(e, item, 'priority_id')} key={itemIndex}>
                                            <svg
                                                ref={e => e && e.style.setProperty('top', '8px', 'important')}
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M3.75 20.25V4.5"
                                                    stroke={item.bg_color ? item.bg_color : "#CBD5E0"}
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M3.75 15.75C9.75 11.25 14.25 20.25 20.25 15.75V4.49997C14.25 8.99997 9.75 -3.40939e-05 3.75 4.49997"
                                                    fill={item.bg_color ? item.bg_color : "#CBD5E0"}
                                                />
                                            </svg>
                                            {item.label}
                                        </a>
                                    )
                                })}
                            </div>}
                        </div>
                        <button type='submit' className="pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-bg-shadow pi-br-4">
                            Save
                        </button>
                    </div>
                </div>

            </form>
        );
    }
}
export default WithApi(Form);  