import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Editable from 'block/editable';
import Action from './Action';

class Checklist extends Component {

    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            itemEdit: false,
            checklist: [
                {
                    label: 'Checklist',
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
        if (!value) return;
        items.push({ text: value, done: false });

        //remove value after add
        let newitems = this.state.checklist[index];
        newitems['newItem'] = '';

        let checklist = this.state.checklist;
        this.setState({ checklist: checklist });
    };

    handlePros = () => {
        this.props.changeHandler(this.state.checklist);
    };

    doneHandler = (checklist_index, list_index = null) => {
        let array = [...this.state.checklist];

        let items = array[checklist_index].items[list_index];
        items['done'] = !items.done;
        this.setState({ checklist: array }, () => {
            this.handlePros();
        });
    }

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

    doneCount = (checklist_index, type) => {
        const items = this.state.checklist[checklist_index].items;
        if (type) {
            const list = items.filter(item => item.done === true);
            return list.length;
        } else {
            return items.length;
        }

    }

    render = () => {
        const { checklist } = this.state;
        const itemEdit = this.state.itemEdit;
        return (
            <>
                {checklist.map((checklist_single, checklist_index) => {
                    return (
                        <div className="pi-checklist pi-mb-15" key={checklist_index}>
                            <div className="pi-checklist-head">
                                <Editable
                                    key={checklist_index}
                                    value={checklist_single.label}
                                    index={checklist_index}
                                    changeHandler={this.handleChecklistLabel}
                                />
                                <span className="pi-float-right">{this.doneCount(checklist_index, true)} task done out of {this.doneCount(checklist_index, false)}</span>
                            </div>
                            <div className="pi-checklist-content">
                                <ul>
                                    {checklist_single.items.map((item, list_index) => {
                                        return (
                                            <li
                                                key={list_index}
                                            >
                                                <input
                                                    type="checkbox"
                                                    id={checklist_index + '-task-' + list_index}
                                                    value={item.done}
                                                    checked={item.done}
                                                    onChange={() => this.doneHandler(checklist_index, list_index)}
                                                />
                                                <label
                                                    htmlFor={checklist_index + '-task-' + list_index}
                                                    style={{ textDecoration: item.done ? "line-through" : "" }}
                                                >
                                                    {itemEdit && (itemEdit.checklist == checklist_index && itemEdit.list == list_index) ? (
                                                        <input
                                                            type="text"
                                                            name="text"
                                                            value={item.text}
                                                            onChange={this.handleChange(checklist_index, list_index)}
                                                            onKeyPress={e => {
                                                                if (e.key === 'Enter') {
                                                                    this.setState({ itemEdit: false })
                                                                }
                                                            }}
                                                        />
                                                    ) : (
                                                        item.text
                                                    )}
                                                </label>

                                                <Action
                                                    row={item}
                                                    editEntry={() => {
                                                        this.setState({
                                                            itemEdit: {
                                                                checklist: checklist_index,
                                                                list: list_index,
                                                            }
                                                        })
                                                    }}
                                                    deleteEntry={() => this.deleteHandler(checklist_index, list_index)}
                                                />
                                            </li>
                                        );
                                    })}
                                </ul>
                                <input
                                    type="text"
                                    placeholder={"Write new " + checklist_single.label + " item"}
                                    value={checklist_single.newItem}
                                    onChange={e => this.handleNewItem(e, checklist_index)}
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