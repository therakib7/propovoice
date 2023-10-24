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
                    } else {
                        if (this.props.isClient) {
                            form.table_view = true;
                            form.project_req = true;
                        }
                    }
                    this.props.handleSubmit(form);
                }, 300);
            } else {
                this.props.handleSubmit(this.state.form);
            }
        });
    }

    render() {
        const { title, boardView, showing, showItem, total, isClient, module_id } = this.props;
        const activeColor = '#4A5568';
        const inactiveColor = '#A0AEC0';

        const i18n = ndpv.i18n;
        return (
            <div className="pv-search-bar">

                {!module_id && <>
                    <button
                        className="pv-btn pv-btn-icon pv-bg-hover-shadow"
                        onClick={() => this.props.viewChange('table')}
                        style={{ marginLeft: 0, marginRight: 10 }}
                        title={isClient ? i18n.project : i18n.tbl_view}
                    >
                        {!isClient ? <svg
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
                        </svg> : <span style={{ color: (!boardView ? activeColor : inactiveColor) }}>{i18n.project}</span>}
                    </button>

                    <button
                        className="pv-btn pv-btn-icon pv-bg-hover-shadow pv-mr-10"
                        onClick={() => this.props.viewChange('board')}
                        style={{ marginLeft: 0 }}
                        title={isClient ? i18n.req_project : i18n.board_view}
                    >
                        {!isClient ? <svg
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
                        </svg> : <span style={{ color: (boardView ? activeColor : inactiveColor) }}>{i18n.req_project}</span>}
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

                <div className="pv-total-list">
                    <p>
                        {i18n.show} <select onChange={showItem} >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="99">99</option>
                        </select>
                        {title} {this.props.boardView ? i18n.per + ' ' + i18n.stage : <>{i18n.from} <span>{total}</span></>}
                    </p>
                </div>
            </div>
        );
    }
}