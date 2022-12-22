import React, { Component } from 'react';
import { Search, Filter, Arrow, Cross } from 'block/icon';
import pro from 'block/pro-alert';
export default class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {
                text: '',
                level: '',
                tag: '',
            },
            recurring: false,
            searchModal: false,
        };

        this.timeout = 0;
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } }, () => {

            if (name == 'text') {
                //search when typing stop
                if (this.timeout) clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.props.handleSubmit(this.state.form);
                }, 300);
            } else {
                this.props.handleSubmit(this.state.form);
            }
        });
    }

    showRecurring = (view) => {
        if (wage.length > 0 && (!view)) {
            pro();
            return;
        }
        if (this.state.recurring == view) return;

        this.setState({ recurring: view }, () => {
            let form = { ...this.state.form }
            if (this.state.recurring) {
                form.recurring = true;
            }
            this.props.handleSubmit(form);
        });

        /* this.setState({ form: { ...this.state.form, 'recurring': true } }, () => {
            this.props.handleSubmit(this.state.form);
        }); */
    }

    render() {
        const { title, showing, showItem, total } = this.props;

        const activeColor = '#4A5568';
        const inactiveColor = '#A0AEC0';
        const recurring = this.state.recurring;

        const i18n = ndpv.i18n;
        return (
            <div className="pv-search-bar">
                <button
                    className="pv-btn pv-btn-icon pv-bg-hover-shadow pv-mr-5"
                    onClick={() => this.showRecurring(false)}
                    style={{ marginLeft: 0 }}
                    title={i18n.all + ' ' + i18n.inv}
                >
                    {/* <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                    >
                        <path
                            d="M3.125 4.375h13.75v9.375a.624.624 0 01-.625.625h-3.125a.624.624 0 01-.625-.625v-1.875h-5v4.375a.625.625 0 01-.625.625H3.75a.625.625 0 01-.625-.625V4.375zM7.5 9.375H3.125M7.5 4.375v7.5M12.5 9.375h4.375M12.5 4.375v7.5"
                            stroke={!recurring ? activeColor : inactiveColor}
                            strokeWidth={1.2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg> */}
                    <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                    >
                        <path
                            d="M16.0547 0.343262V3.90643H19.6176L16.0547 0.343262Z"
                            fill="#CBD5E0"
                        />
                        <path
                            d="M15.4688 5.07812C15.1452 5.07812 14.8828 4.81578 14.8828 4.49219V0H6.48438C5.51512 0 4.72656 0.788555 4.72656 1.75781V8.30816C4.91961 8.29066 5.11496 8.28125 5.3125 8.28125C7.30969 8.28125 9.09754 9.19438 10.2807 10.625H16.6406C16.9642 10.625 17.2266 10.8873 17.2266 11.2109C17.2266 11.5345 16.9642 11.7969 16.6406 11.7969H11.0527C11.4189 12.5116 11.6551 13.3033 11.7309 14.1406H16.6406C16.9642 14.1406 17.2266 14.403 17.2266 14.7266C17.2266 15.0502 16.9642 15.3125 16.6406 15.3125H11.7309C11.5557 17.2476 10.5218 18.9385 9.01398 20H18.2031C19.1724 20 19.9609 19.2114 19.9609 18.2422V5.07812H15.4688ZM16.6406 8.28125H8.04688C7.72328 8.28125 7.46094 8.01891 7.46094 7.69531C7.46094 7.37172 7.72328 7.10938 8.04688 7.10938H16.6406C16.9642 7.10938 17.2266 7.37172 17.2266 7.69531C17.2266 8.01891 16.9642 8.28125 16.6406 8.28125Z"
                            fill={!recurring ? activeColor : inactiveColor}
                        />
                        <path
                            d="M5.3125 9.45312C2.40473 9.45312 0.0390625 11.8188 0.0390625 14.7266C0.0390625 17.6343 2.40473 20 5.3125 20C8.22027 20 10.5859 17.6343 10.5859 14.7266C10.5859 11.8188 8.22027 9.45312 5.3125 9.45312ZM4.98699 14.1406H5.63805C6.32008 14.1406 6.875 14.6955 6.875 15.3776V16.0286C6.875 16.6214 6.45586 17.1179 5.89844 17.2378V17.4609C5.89844 17.7845 5.63609 18.0469 5.3125 18.0469C4.98891 18.0469 4.72656 17.7845 4.72656 17.4609V17.2378C4.16914 17.1179 3.75 16.6214 3.75 16.0286C3.75 15.705 4.01234 15.4427 4.33594 15.4427C4.65953 15.4427 4.92188 15.705 4.92188 16.0286C4.92188 16.0645 4.95109 16.0938 4.98699 16.0938H5.63805C5.67395 16.0938 5.70316 16.0645 5.70316 16.0286V15.3776C5.70316 15.3417 5.67395 15.3125 5.63805 15.3125H4.98699C4.30492 15.3125 3.75 14.7576 3.75 14.0755V13.4245C3.75 12.8318 4.16914 12.3353 4.72656 12.2153V11.9922C4.72656 11.6686 4.98891 11.4062 5.3125 11.4062C5.63609 11.4062 5.89844 11.6686 5.89844 11.9922V12.2153C6.45586 12.3353 6.875 12.8318 6.875 13.4245C6.875 13.7481 6.61266 14.0104 6.28906 14.0104C5.96547 14.0104 5.70312 13.7481 5.70312 13.4245C5.70312 13.3886 5.67391 13.3594 5.63801 13.3594H4.98695C4.95105 13.3594 4.92184 13.3886 4.92184 13.4245V14.0755C4.92188 14.1114 4.95109 14.1406 4.98699 14.1406Z"
                            fill="#CBD5E0"
                        />
                    </svg>
                </button>

                <button
                    className="pv-btn pv-btn-icon pv-bg-hover-shadow"
                    onClick={() => this.showRecurring(true)}
                    style={{ marginLeft: 0, marginRight: 10 }}
                    title={i18n.recur + ' ' + i18n.inv}
                >
                    <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                    >
                        <path
                            d="M7.5 5H16.875"
                            stroke={recurring ? activeColor : inactiveColor}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M7.5 10H16.875"
                            stroke={recurring ? activeColor : inactiveColor}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M7.5 15H16.875"
                            stroke={recurring ? activeColor : inactiveColor}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M3.125 5H4.375"
                            stroke={recurring ? activeColor : inactiveColor}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M3.125 10H4.375"
                            stroke={recurring ? activeColor : inactiveColor}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M3.125 15H4.375"
                            stroke={recurring ? activeColor : inactiveColor}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                {/* <button
                    className="pv-btn pv-btn-icon pv-bg-hover-shadow"
                    onClick={() => this.showRecurring()}
                    style={{ marginLeft: 0, marginRight: 10 }}
                    title={i18n.recur + ' ' + i18n.inv}
                >
                    <svg
                        width={20}
                        height={20}
                        viewBox="0 0 25 25"
                        fill="none"
                    >
                        <path
                            d="M22.822 12.385l-2.316 1.153-3-5.737 2.344-1.172a.74.74 0 01.993.318l2.307 4.416a.75.75 0 01-.328 1.022v0zM4.006 13.444L1.69 12.28a.741.741 0 01-.328-1.012l2.306-4.416a.75.75 0 01.994-.328l2.344 1.172-3 5.747zM20.506 13.538l-1.5 1.763-3.45 3.45a.798.798 0 01-.713.197l-5.437-1.36a.751.751 0 01-.272-.14l-5.128-4.004"
                            stroke={recurring ? activeColor : inactiveColor}
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M19.006 15.3l-4.125-3-1.2.9a3.01 3.01 0 01-3.6 0l-.506-.385a.758.758 0 01-.085-1.134l3.675-3.666a.742.742 0 01.525-.215h3.816"
                            stroke={recurring ? activeColor : inactiveColor}
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M7.063 7.697l4.809-1.406a.75.75 0 01.515.037L15.631 7.8M10.756 20.925l-2.822-.712a.694.694 0 01-.31-.16l-2.118-1.837"
                            stroke={recurring ? activeColor : inactiveColor}
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button> */}

                <div className="pv-search-box pv-medium-search-bar">
                    <Search />
                    <input
                        type="text"
                        className="pv-search-input"
                        placeholder={i18n.search + ' ' + title}
                        name="text"
                        value={this.state.form.text}
                        onChange={this.handleChange}
                    />
                </div>
                {false && <div className="pv-search-btn">
                    <button className={this.state.searchModal ? 'pv-active' : ''} onClick={() => this.setState(prevState => ({ searchModal: !prevState.searchModal }))}>
                        <Filter />
                    </button>

                    {this.state.searchModal && <div className="pv-search-form">
                        <ul>
                            <li>
                                <Arrow />
                                <select name="" id="">
                                    <option value="">Lead Label</option>
                                </select>
                            </li>
                            <li>
                                <span onClick={() => this.setState({ searchModal: false })}>
                                    <Cross size='small' />
                                </span>
                            </li>
                        </ul>
                    </div>}
                </div>}
                <div className="pv-total-list">
                    <p>
                        {i18n.show} <select onChange={showItem} >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="99">99</option>
                        </select>
                        {title} {i18n.from} <span>{total}</span>
                    </p>
                </div>
            </div>
        );
    }
} 