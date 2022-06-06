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

            if ( name == 'text' ) { 
                //search when typing stop
                if ( this.timeout ) clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.props.handleSubmit(this.state.form);
                }, 300);
            } else {
                this.props.handleSubmit(this.state.form);
            }
        });
    } 

    render() {
        const { title, showing, total } = this.props;
        return (
            <div className="pi-search-bar">
                <div className="pi-search-box pi-mediun-search-bar">
                    <svg width={24} height={24}>
                        <path
                            d="M10.77 18.3C9.2807 18.3 7.82485 17.8584 6.58655 17.031C5.34825 16.2036 4.38311 15.0275 3.81318 13.6516C3.24325 12.2757 3.09413 10.7616 3.38468 9.30096C3.67523 7.84029 4.39239 6.49857 5.44548 5.44548C6.49857 4.39239 7.84029 3.67523 9.30096 3.38468C10.7616 3.09413 12.2757 3.24325 13.6516 3.81318C15.0275 4.38311 16.2036 5.34825 17.031 6.58655C17.8584 7.82485 18.3 9.2807 18.3 10.77C18.3 11.7588 18.1052 12.738 17.7268 13.6516C17.3484 14.5652 16.7937 15.3953 16.0945 16.0945C15.3953 16.7937 14.5652 17.3484 13.6516 17.7268C12.738 18.1052 11.7588 18.3 10.77 18.3V18.3ZM10.77 4.74999C9.58331 4.74999 8.42327 5.10189 7.43657 5.76118C6.44988 6.42046 5.68084 7.35754 5.22672 8.45389C4.77259 9.55025 4.65377 10.7566 4.88528 11.9205C5.11679 13.0844 5.68824 14.1535 6.52735 14.9926C7.36647 15.8317 8.43556 16.4032 9.59945 16.6347C10.7633 16.8662 11.9697 16.7474 13.0661 16.2933C14.1625 15.8391 15.0995 15.0701 15.7588 14.0834C16.4181 13.0967 16.77 11.9367 16.77 10.75C16.77 9.15869 16.1379 7.63257 15.0126 6.50735C13.8874 5.38213 12.3613 4.74999 10.77 4.74999Z"
                            fill="#718096"
                        />
                        <path
                            d="M20 20.75C19.9014 20.7505 19.8038 20.7312 19.7128 20.6935C19.6218 20.6557 19.5392 20.6001 19.47 20.53L15.34 16.4C15.2075 16.2578 15.1354 16.0698 15.1388 15.8755C15.1422 15.6812 15.2209 15.4958 15.3583 15.3584C15.4958 15.221 15.6811 15.1422 15.8754 15.1388C16.0697 15.1354 16.2578 15.2075 16.4 15.34L20.53 19.47C20.6704 19.6106 20.7493 19.8012 20.7493 20C20.7493 20.1987 20.6704 20.3894 20.53 20.53C20.4607 20.6001 20.3782 20.6557 20.2872 20.6935C20.1961 20.7312 20.0985 20.7505 20 20.75Z"
                            fill="#718096"
                        />
                    </svg>
                    <input
                        type="text"
                        className="pi-search-input"
                        placeholder={'Search ' + title}
                        name="text"
                        value={this.state.form.text}
                        onChange={this.handleChange}
                    /> 
                </div>
                <div className="pi-search-btn">
                    <button className={this.state.searchModal ? 'pi-active' : ''} onClick={() => this.setState(prevState => ({ searchModal: !prevState.searchModal }))}>
                        <svg
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5 10H15"
                                stroke="#4A5568"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M1.875 6.25H18.125"
                                stroke="#4A5568"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8.125 13.75H11.875"
                                stroke="#4A5568"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    {this.state.searchModal && <div className="pi-search-form">
                        <ul>
                            <li>
                                <svg
                                    width={15}
                                    height={10}
                                    viewBox="0 0 15 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
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
                                    xmlns="http://www.w3.org/2000/svg"
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
                                    xmlns="http://www.w3.org/2000/svg"
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
                                    <option value="">Category</option>
                                    <option value="">Category</option>
                                    <option value="">Category</option>
                                </select>
                            </li>
                            <li>
                                <span onClick={() => this.setState({ searchModal: false })}>
                                    <svg
                                        width={16}
                                        height={16}
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
                            </li>
                        </ul>
                    </div>}
                </div>
                <div className="pi-total-list">
                    <p>{showing} {title} showing from <span>{total}</span></p>
                </div>
            </div>
        );
    }
} 