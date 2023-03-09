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
        if (wage.length > 0 && view) {
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
                    <svg height="20" width="20" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_7584_99984)">
                            <path d="M10 14.7266C10 17.3154 7.90133 19.4141 5.3125 19.4141C2.72367 19.4141 0.625 17.3154 0.625 14.7266C0.625 12.1377 2.72367 10.0391 5.3125 10.0391C7.90133 10.0391 10 12.1377 10 14.7266Z" stroke={!recurring ? activeColor : inactiveColor} strokeLinecap="round" strokeWidth="1.2" />
                            <path d="M4.98699 14.7266H5.63805C5.99762 14.7266 6.28906 15.018 6.28906 15.3776V16.0286C6.28906 16.3882 5.99762 16.6797 5.63805 16.6797H4.98699C4.62742 16.6797 4.33594 16.3882 4.33594 16.0286" stroke={!recurring ? activeColor : inactiveColor} strokeLinecap="round" strokeWidth="1.2" />
                            <path d="M5.63801 14.7266H4.98695C4.62738 14.7266 4.33594 14.4351 4.33594 14.0755V13.4245C4.33594 13.0649 4.62738 12.7734 4.98695 12.7734H5.63801C5.99758 12.7734 6.28906 13.0649 6.28906 13.4245" stroke={!recurring ? activeColor : inactiveColor} strokeLinecap="round" strokeWidth="1.2" />
                            <path d="M5.3125 12.7734V11.9922" stroke={!recurring ? activeColor : inactiveColor} strokeLinecap="round" strokeWidth="1.2" />
                            <path d="M5.3125 17.4609V16.6797" stroke={!recurring ? activeColor : inactiveColor} strokeLinecap="round" strokeWidth="1.2" />
                            <path d="M5.3125 19.4141H18.2031C18.8503 19.4141 19.375 18.8894 19.375 18.2422V4.49231L15.4689 0.585939H6.48438C5.83719 0.585939 5.3125 1.11063 5.3125 1.75781V10.0391" stroke={!recurring ? activeColor : inactiveColor} strokeLinecap="round" strokeWidth="1.2" />
                            <path d="M15.4688 0.585938V4.49219H19.375L15.4688 0.585938Z" stroke={!recurring ? activeColor : inactiveColor} strokeLinecap="round" strokeWidth="1.2" />
                            <path d="M8.4126 11.2109H16.6406" stroke={!recurring ? activeColor : inactiveColor} strokeLinecap="round" strokeWidth="1.2" />
                            <path d="M8.04688 7.69531H16.6406" stroke={!recurring ? activeColor : inactiveColor} strokeLinecap="round" strokeWidth="1.2" />
                            <path d="M10 14.7266H16.6406" stroke={!recurring ? activeColor : inactiveColor} strokeLinecap="round" strokeWidth="1.2" />
                        </g>
                        <defs>
                            <clipPath id="clip0_7584_99984">
                                <rect height="20" width="20" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>

                <button
                    className="pv-btn pv-btn-icon pv-bg-hover-shadow"
                    onClick={() => this.showRecurring(true)}
                    style={{ marginLeft: 0, marginRight: 10 }}
                    title={i18n.recur + ' ' + i18n.inv}
                >
                    <svg height="20" width="16" fill="none" viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 17.9141C1 18.7425 1.67157 19.4141 2.5 19.4141H13.8906C14.5378 19.4141 15.0625 18.8894 15.0625 18.2422V4.49231L11.1564 0.585939H2.17188C1.52469 0.585939 1 1.11063 1 1.75781V17.9141Z" stroke={recurring ? activeColor : inactiveColor} strokeLinecap="round" strokeWidth="1.2" />
                        <path d="M11.1562 0.585938V4.49219H15.0625L11.1562 0.585938Z" stroke={recurring ? activeColor : inactiveColor} strokeLinecap="round" strokeWidth="1.2" />
                        <path d="M13.1457 7.08325V9.68742C13.1457 9.82555 13.0908 9.95802 12.9931 10.0557C12.8954 10.1534 12.763 10.2082 12.6248 10.2082H10.0207C9.88254 10.2082 9.75006 10.1534 9.65239 10.0557C9.55471 9.95802 9.49984 9.82555 9.49984 9.68742C9.49984 9.54928 9.55471 9.41681 9.65239 9.31913C9.75006 9.22146 9.88254 9.16658 10.0207 9.16658H11.5363C11.0987 8.40686 10.4323 7.80486 9.63208 7.44657C8.83191 7.08828 7.93898 6.99202 7.08084 7.17155C6.2227 7.35108 5.44324 7.79722 4.85381 8.44623C4.26438 9.09523 3.89512 9.91392 3.7988 10.7853C3.78494 10.9129 3.7245 11.0308 3.62906 11.1165C3.53362 11.2023 3.4099 11.2498 3.28161 11.2499C3.26247 11.2499 3.24334 11.2489 3.22432 11.2468C3.08722 11.2318 2.96165 11.1631 2.87514 11.0557C2.78864 10.9483 2.74826 10.811 2.76286 10.6739C2.87766 9.63615 3.30192 8.65693 3.98049 7.86346C4.65906 7.06999 5.56059 6.49895 6.56794 6.22452C7.57528 5.95009 8.64188 5.98496 9.62915 6.32461C10.6164 6.66426 11.4787 7.29298 12.104 8.12908V7.08325C12.104 6.94511 12.1589 6.81264 12.2566 6.71496C12.3542 6.61729 12.4867 6.56242 12.6248 6.56242C12.763 6.56242 12.8954 6.61729 12.9931 6.71496C13.0908 6.81264 13.1457 6.94511 13.1457 7.08325ZM12.6504 11.253C12.5132 11.2384 12.3759 11.2788 12.2685 11.3653C12.1611 11.4518 12.0924 11.5774 12.0774 11.7145C11.9815 12.5864 11.6124 13.4056 11.0229 14.0551C10.4333 14.7046 9.65354 15.151 8.79498 15.3306C7.93642 15.5102 7.04306 15.4137 6.24263 15.055C5.4422 14.6962 4.77568 14.0936 4.33838 13.3332H5.854C5.99214 13.3332 6.12461 13.2784 6.22229 13.1807C6.31996 13.083 6.37484 12.9505 6.37484 12.8124C6.37484 12.6743 6.31996 12.5418 6.22229 12.4441C6.12461 12.3465 5.99214 12.2916 5.854 12.2916H3.24984C3.1117 12.2916 2.97923 12.3465 2.88155 12.4441C2.78388 12.5418 2.729 12.6743 2.729 12.8124V15.4166C2.729 15.5547 2.78388 15.6872 2.88155 15.7849C2.97923 15.8825 3.1117 15.9374 3.24984 15.9374C3.38797 15.9374 3.52045 15.8825 3.61812 15.7849C3.7158 15.6872 3.77067 15.5547 3.77067 15.4166V14.3707C4.3959 15.2068 5.25811 15.8355 6.24529 16.1752C7.23248 16.5149 8.299 16.5499 9.30632 16.2756C10.3136 16.0013 11.2152 15.4304 11.8938 14.6371C12.5725 13.8437 12.9968 12.8646 13.1118 11.827C13.1267 11.6897 13.0865 11.5521 12.9999 11.4445C12.9134 11.3368 12.7877 11.268 12.6504 11.253Z" fill={recurring ? activeColor : inactiveColor} />
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