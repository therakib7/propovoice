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

    showRecurring = e => {
        if (wage.length > 0) {
            pro();
            return;
        }

        this.setState({ recurring: !this.state.recurring }, () => {
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
                </button>

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