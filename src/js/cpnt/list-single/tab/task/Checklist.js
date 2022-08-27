import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Editable from './ChecklistTitle';
import Action from './Action';

import pro from 'block/pro-alert';
import ProLabel from 'block/pro-alert/label';

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
        if ( wage.length > 0 ) {
			pro();
			return;
		}

        let checklist = this.state.checklist;
        checklist.push({
            label: 'Checklist',
            items: []
        });
        this.setState({ checklist: checklist });
    };

    handleNewItem = (e, index) => {
        if ( wage.length > 0 ) {
			pro();
			return;
		}
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
                        <div className="pv-checklist pv-mb-15" key={checklist_index}>
                            <div className="pv-checklist-head">
                                <Editable
                                    key={checklist_index}
                                    value={checklist_single.label}
                                    index={checklist_index}
                                    changeHandler={this.handleChecklistLabel}
                                />
                                {wage.length > 0 && <>
                                    <ProLabel />
                                </>}
                                <span>{this.doneCount(checklist_index, true)} task done out of {this.doneCount(checklist_index, false)}</span>
                                <div
                                    className="pv-close-icon"
                                    onClick={() => this.deleteHandler(checklist_index)}
                                >
                                    <svg
                                        width={15}
                                        height={15}
                                        viewBox="0 0 10 10"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M1.19499 1.20353C1.31989 1.07854 1.48926 1.00833 1.66585 1.00833C1.84245 1.00833 2.01182 1.07854 2.13671 1.20353L4.99584 4.06553L7.85496 1.20353C7.9164 1.13985 7.98988 1.08906 8.07114 1.05412C8.15239 1.01919 8.23979 1.00079 8.32822 1.00003C8.41665 0.999256 8.50434 1.01612 8.58619 1.04964C8.66804 1.08316 8.7424 1.13267 8.80493 1.19526C8.86747 1.25786 8.91692 1.33229 8.95041 1.41422C8.98389 1.49615 9.00074 1.58394 8.99997 1.67246C8.99921 1.76098 8.98083 1.84846 8.94593 1.9298C8.91103 2.01113 8.86029 2.08469 8.79668 2.14619L5.93756 5.00819L8.79668 7.87019C8.91799 7.99593 8.98512 8.16433 8.98361 8.33913C8.98209 8.51392 8.91205 8.68113 8.78857 8.80474C8.66508 8.92834 8.49804 8.99846 8.32342 8.99997C8.1488 9.00149 7.98057 8.9343 7.85496 8.81286L4.99584 5.95086L2.13671 8.81286C2.01111 8.9343 1.84287 9.00149 1.66825 8.99997C1.49363 8.99846 1.32659 8.92834 1.20311 8.80474C1.07963 8.68113 1.00958 8.51392 1.00807 8.33913C1.00655 8.16433 1.07368 7.99593 1.19499 7.87019L4.05412 5.00819L1.19499 2.14619C1.07014 2.02117 1 1.85163 1 1.67486C1 1.49808 1.07014 1.32854 1.19499 1.20353Z"
                                            fill="#4A5568"
                                            stroke="#4A5568"
                                            strokeWidth="0.2"
                                        />
                                    </svg>
                                </div>

                            </div>
                            <div className="pv-checklist-content">
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
                    className="pv-btn pv-btn-small"
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
                    {ndpv.i18n.add} Checklist
                    {wage.length > 0 && <>
                        <ProLabel />
                    </>}
                </button>
            </>
        )
    }
}

Checklist.propTypes = {
    title: PropTypes.string,
}

export default Checklist