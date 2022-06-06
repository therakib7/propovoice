import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Editable from 'block/editable';

class Checklist extends Component {

    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            checklists: [
                {
                    label: 'Terms',
                    list_type: 'letter',
                    items: [{ text: '' }]
                }
            ],
        };
    }

    componentDidUpdate() {
        if (!this.state.edit && this.props.data) {
            this.setState({ edit: true, checklists: this.props.data });
        }
    }

    handleChecklistLabel = (index, value = null) => {
        let items = this.state.checklists[index];
        items['label'] = value;

        let checklists = this.state.checklists;
        this.setState({ checklists: checklists });
        this.handlePros();
    }

    handleChange = (checklist_index, list_index) => (e) => {
        const { name, value } = e.target;
        let items = this.state.checklists[checklist_index].items.map((item, i) => {
            if (list_index !== i) return item;
            return { ...item, [name]: value }
        });

        this.state.checklists[checklist_index].items = items;
        let checklists = this.state.checklists;
        this.setState({ checklists: checklists });
        this.handlePros();
    }

    addChecklist = (e) => {
        e.preventDefault();
        let checklists = this.state.checklists;
        checklists.push({
            label: 'Terms',
            list_type: 'letter',
            items: [{ text: '' }]
        });
        this.setState({ checklists: checklists });
    };

    addList = (e, index) => {
        e.preventDefault();
        let items = this.state.checklists[index].items;
        items.push({ text: '' });
        let checklists = this.state.checklists;
        this.setState({ checklists: checklists });
    };

    handlePros = () => {
        this.props.changeHandler(this.state.checklists);
    };

    deleteHandler = (checklist_index, list_index = null) => {
        let array = [...this.state.checklists];

        if (list_index === null) {
            array.splice(checklist_index, 1);
        } else {
            let items = array[checklist_index].items;
            items.splice(list_index, 1);
        }

        this.setState({ checklists: array }, () => {
            this.handlePros();
        });
    }

    render = () => {
        const { checklists } = this.state;

        return (
            <>
                {checklists.map( (single, index) => {

                    return (
                        <div className="col">
                            <div className="pi-checklist-head">
                                <span>Checklist</span>
                                <span className="pi-float-right">45 Done</span>
                            </div>
                            <div className="pi-checklist-content">
                                <ul>
                                    <li><input type="checkbox" /> <label>Checkbox</label></li>
                                </ul>
                                
                                <button className="pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-shadow pi-bg-shadow">
                                    <svg
                                        width={12}
                                        height={12}
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1.875 6H10.125"
                                            stroke="#2D3748"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M6 1.875V10.125"
                                            stroke="#2D3748"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    Add an Item
                                </button>
                            </div>
                        </div>
                    );
                })}
            </>
        )
    }
}

Checklist.propTypes = {
    title: PropTypes.string,
}

export default Checklist