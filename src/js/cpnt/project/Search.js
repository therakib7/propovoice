import { Search, Filter } from 'block/icon';
import React, { Component } from 'react';

export default class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {
                text: '',
                level: '',
                tag: '',
            },
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
                    let form = { ...this.state.form }
                    if (!this.props.boardView) {
                        form.table_view = true;
                    }
                    this.props.handleSubmit(form);
                }, 300);
            } else {
                this.props.handleSubmit(this.state.form);
            }
        });
    }

    render() {
        const { title, boardView, showing, showItem, total } = this.props;

        const activeColor = '#4A5568';
        const inactiveColor = '#A0AEC0';

        const i18n = ndpv.i18n;
        return (
            <div className="pv-search-bar">
                {!this.props.isClient && <>
                    <button
                        className="pv-btn pv-btn-icon pv-bg-hover-shadow pv-mr-5"
                        onClick={() => this.props.viewChange('board')}
                        style={{ marginLeft: 0 }}
                        title='Board View'
                    >
                        <svg
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <path
                                d="M3.125 4.375h13.75v9.375a.624.624 0 01-.625.625h-3.125a.624.624 0 01-.625-.625v-1.875h-5v4.375a.625.625 0 01-.625.625H3.75a.625.625 0 01-.625-.625V4.375zM7.5 9.375H3.125M7.5 4.375v7.5M12.5 9.375h4.375M12.5 4.375v7.5"
                                stroke={boardView ? activeColor : inactiveColor}
                                strokeWidth={1.2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    <button
                        className="pv-btn pv-btn-icon pv-bg-hover-shadow"
                        onClick={() => this.props.viewChange('table')}
                        style={{ marginLeft: 0, marginRight: 10 }}
                        title='Table View'
                    >
                        <svg
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <path
                                d="M7.5 5H16.875"
                                stroke={!boardView ? activeColor : inactiveColor}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M7.5 10H16.875"
                                stroke={!boardView ? activeColor : inactiveColor}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M7.5 15H16.875"
                                stroke={!boardView ? activeColor : inactiveColor}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M3.125 5H4.375"
                                stroke={!boardView ? activeColor : inactiveColor}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M3.125 10H4.375"
                                stroke={!boardView ? activeColor : inactiveColor}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M3.125 15H4.375"
                                stroke={!boardView ? activeColor : inactiveColor}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </>}

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
                                <svg
                                    width={15}
                                    height={10}
                                    viewBox="0 0 15 10"
                                    fill="none"

                                >
                                    <path
                                        d="M11.15 9.27502L14 5.00002L11.15 0.725021C11.1048 0.655309 11.0427 0.59814 10.9695 0.558809C10.8963 0.519478 10.8143 0.499258 10.7312 0.500021H1.5C1.36739 0.500021 1.24021 0.552699 1.14645 0.646468C1.05268 0.740236 1 0.867413 1 1.00002V9.00002C1 9.13263 1.05268 9.25981 1.14645 9.35357C1.24021 9.44734 1.36739 9.50002 1.5 9.50002H10.7312C10.8143 9.50078 10.8963 9.48056 10.9695 9.44123C11.0427 9.4019 11.1048 9.34473 11.15 9.27502V9.27502Z"
                                        stroke="#718096"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <select name="" id="">
                                    <option value="">Lead Label</option>
                                    <option value="">Lead Label</option>
                                    <option value="">Lead Label</option>
                                </select>
                            </li>
                            <li>
                                <svg
                                    width={16}
                                    height={16}
                                    viewBox="0 0 16 16"
                                    fill="none"

                                >
                                    <path
                                        d="M7.66869 1.61869L2.62494 2.62494L1.61869 7.66869C1.60292 7.74922 1.60722 7.8324 1.6312 7.91088C1.65518 7.98936 1.69811 8.06073 1.75619 8.11869L8.28119 14.6437C8.32718 14.6907 8.38211 14.7281 8.44275 14.7537C8.50339 14.7792 8.56852 14.7923 8.63432 14.7923C8.70011 14.7923 8.76524 14.7792 8.82589 14.7537C8.88653 14.7281 8.94146 14.6907 8.98744 14.6437L14.6437 8.98744C14.6907 8.94146 14.7281 8.88653 14.7537 8.82589C14.7792 8.76524 14.7923 8.70011 14.7923 8.63432C14.7923 8.56852 14.7792 8.50339 14.7537 8.44275C14.7281 8.38211 14.6907 8.32718 14.6437 8.28119L8.11869 1.75619C8.06073 1.69811 7.98936 1.65518 7.91088 1.6312C7.8324 1.60722 7.74922 1.60292 7.66869 1.61869V1.61869Z"
                                        stroke="#718096"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M5.25 6C5.66421 6 6 5.66421 6 5.25C6 4.83579 5.66421 4.5 5.25 4.5C4.83579 4.5 4.5 4.83579 4.5 5.25C4.5 5.66421 4.83579 6 5.25 6Z"
                                        fill="#718096"
                                    />
                                </svg>
                                <select name="" id="">
                                    <option value="">Tag Name</option>
                                    <option value="">Tag Name</option>
                                    <option value="">Tag Name</option>
                                </select>
                            </li>
                            <li>
                                <svg
                                    width={17}
                                    height={17}
                                    viewBox="0 0 17 17"
                                    fill="none"

                                >
                                    <path
                                        d="M7.32788 3.42358H3.32788V7.42358H7.32788V3.42358Z"
                                        stroke="#718096"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M13.3279 3.42358H9.32788V7.42358H13.3279V3.42358Z"
                                        stroke="#718096"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M7.32788 9.42358H3.32788V13.4236H7.32788V9.42358Z"
                                        stroke="#718096"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M13.3279 9.42358H9.32788V13.4236H13.3279V9.42358Z"
                                        stroke="#718096"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <select name="" id="">
                                    <option value="">{i18n.cat}</option>
                                    <option value="">{i18n.cat}</option>
                                    <option value="">{i18n.cat}</option>
                                </select>
                            </li>
                            <li>
                                <span onClick={() => this.setState({ searchModal: false })}>
                                    <svg
                                        width={16}
                                        height={16}
                                        viewBox="0 0 16 16"
                                        fill="none"
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
                        {title} {this.props.boardView ? i18n.per + ' ' + i18n.stage : <>from <span>{total}</span></>}
                    </p>
                </div>
            </div>
        );
    }
} 