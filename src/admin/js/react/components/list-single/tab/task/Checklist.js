import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Editable from 'block/editable';

class Checklist extends Component {

    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            checklist: [
                {
                    label: 'Checklist',
                    // items: [{ text: '', done: false }]
                    items: [],
                    newItem: ''
                }
            ],
        };
    }

    componentDidUpdate() {
        if (!this.state.edit && this.props.data) {
            this.setState({ edit: true, checklist: this.props.data });
        }
    }

    handleChecklistLabel = (index, value = null) => {
        let items = this.state.checklist[index];
        items['label'] = value;

        let checklist = this.state.checklist;
        this.setState({ checklist: checklist });
        this.handlePros();
    }

    handleChange = (checklist_index, list_index) => (e) => {
        const { name, value } = e.target;
        let items = this.state.checklist[checklist_index].items.map((item, i) => {
            if (list_index !== i) return item;
            return { ...item, [name]: value }
        });

        this.state.checklist[checklist_index].items = items;
        let checklist = this.state.checklist;
        this.setState({ checklist: checklist });
        this.handlePros();
    }

    addChecklist = (e) => {
        e.preventDefault();
        let checklist = this.state.checklist;
        checklist.push({
            label: 'Checklist',
            // items: [{ text: '', done: false }]
            items: []
        });
        this.setState({ checklist: checklist });
    }; 

    handleNewItem = (e, index) => {
        let items = this.state.checklist[index]; 
        items['newItem'] = e.target.value;

        let checklist = this.state.checklist;
        this.setState({ checklist: checklist });
        this.handlePros();
    }

    addItem = (e, index) => {
        e.preventDefault();
        let items = this.state.checklist[index].items;
        let value = this.state.checklist[index].newItem
        if ( ! value ) return;
        items.push({ text: value });

        //remove value after add
        let newitems = this.state.checklist[index]; 
        newitems['newItem'] = '';

        let checklist = this.state.checklist;
        this.setState({ checklist: checklist });
    };

    handlePros = () => {
        this.props.changeHandler(this.state.checklist);
    };

    deleteHandler = (checklist_index, list_index = null) => {
        let array = [...this.state.checklist];

        if (list_index === null) {
            array.splice(checklist_index, 1);
        } else {
            let items = array[checklist_index].items;
            items.splice(list_index, 1);
        }

        this.setState({ checklist: array }, () => {
            this.handlePros();
        });
    }

    render = () => {
        const { checklist } = this.state;

        return (
            <>
                {checklist.map((checklist_single, checklist_index) => {
                    return (
                        <div className="pi-checklist pi-mb-15" key={checklist_index}>
                            <div className="pi-checklist-head">
                                <span>
                                    <Editable
                                        key={checklist_index}
                                        value={checklist_single.label}
                                        index={checklist_index}
                                        changeHandler={this.handleChecklistLabel}
                                    />
                                </span>
                                <span className="pi-float-right">45 Done</span>
                            </div>
                            <div className="pi-checklist-content">
                                <ul>
                                    {checklist_single.items.map((item, list_index) => {
                                        return (
                                            <li key={list_index}>
                                                <input id="checkbox" type="checkbox" />
                                                <label htmlFor="checkbox">{item.text}</label>
                                                <div className="pi-action-content pi-action-btn pi-bg-shadow">
                                                    <button>
                                                        <svg
                                                            width={20}
                                                            height={20}
                                                            viewBox="0 0 22 13"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14C6.10457 14 7 13.1046 7 12Z"
                                                                fill="#718096"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12Z"
                                                                fill="#718096"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14C20.1046 14 21 13.1046 21 12Z"
                                                                fill="#718096"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <div className="pi-dropdown-content">
                                                        <a href="#home">Edit</a>
                                                        <a href="#contact">Delete</a>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <input
                                    type="text"
                                    placeholder="Write new checklist item"
                                    value={checklist_single.newItem} 
                                    onChange={e => this.handleNewItem(e, checklist_index) }
                                    onKeyPress={e => {
                                        if (e.key === 'Enter') { 
                                            this.addItem(e, checklist_index)
                                        }
                                    }}
                                />
                            </div>
                        </div>

                    );
                })}

                <button
                    className="pi-btn pi-btn-small"
                    style={{ color: "#718096", marginTop: 10 }}
                    onClick={(e) => this.addChecklist(e)}
                >
                    <svg
                        width={12}
                        height={12}
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.875 6H10.125"
                            stroke="#718096"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M6 1.875V10.125"
                            stroke="#718096"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Add Checklist
                </button>
            </>
        )
    }
}

Checklist.propTypes = {
    title: PropTypes.string,
}

export default Checklist