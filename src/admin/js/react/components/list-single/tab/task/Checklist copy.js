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

        if ( list_index === null ) {
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
                {checklists.map((checklist_single, checklist_index) => {
                    let list_style = 'decimal';
                    if (checklist_single.list_type == 'letter') {
                        list_style = 'decimal';
                    } else if (checklist_single.list_type == 'text') {
                        list_style = 'lower-alpha';
                    } else if (checklist_single.list_type == 'dot') {
                        list_style = 'disc';
                    }

                    return (
                        <div className="pi-add-term" key={checklist_index}>
                            <div className="row">
                                <div className="col-md-6">
                                    <Editable
                                        key={checklist_index}
                                        value={checklist_single.label}
                                        index={checklist_index}
                                        changeHandler={this.handleChecklistLabel}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <div className="pi-radio-checklist"> 

                                        <span
                                            className='pi-delate'
                                            title='Delete this checklist'
                                            onClick={() => this.deleteHandler(checklist_index)}
                                        >
                                            <svg
                                                width={18}
                                                height={18}
                                                viewBox="0 0 9 9"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M8.073 2.387a.39.39 0 01-.345.388l-.045.003h-.33l-.48 4.886a1.073 1.073 0 01-1.069.967H2.927a1.073 1.073 0 01-1.068-.967l-.48-4.886h-.33a.39.39 0 010-.78h1.95a1.366 1.366 0 112.732 0h1.952a.39.39 0 01.39.39zm-2.83 1.269a.293.293 0 00-.29.253l-.002.04V6.68l.003.04a.293.293 0 00.58 0l.002-.04V3.948l-.002-.04a.293.293 0 00-.29-.252zm-1.756 0a.293.293 0 00-.29.253l-.002.04V6.68l.003.04a.293.293 0 00.58 0l.002-.04V3.948l-.003-.04a.293.293 0 00-.29-.252zm.879-2.244a.585.585 0 00-.586.585h1.17a.585.585 0 00-.584-.585z"
                                                    fill="#718096"
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="pi-checklist-item pi-bg-air-white">
                                <ul style={{ listStyleType: list_style }}>
                                    {checklist_single.items.map((item, list_index) => {
                                        return (
                                            <li key={list_index}>
                                                <input
                                                    type="text"
                                                    name="text"
                                                    value={item.text}
                                                    onChange={this.handleChange(checklist_index, list_index)} />
                                                <span className='pi-list-delete' onClick={() => this.deleteHandler(checklist_index, list_index)}>×</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <button
                                    className="pi-checklist-btn"
                                    onClick={(e) => this.addList(e, checklist_index)}
                                >
                                    <span>
                                        <svg
                                            width={10}
                                            height={10}
                                            viewBox="0 0 10 10"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M5 0a1 1 0 011 1v3h3a1 1 0 010 2H6v3a1 1 0 01-2 0V6H1a1 1 0 010-2h3V1a1 1 0 011-1z"
                                                fill="#2D3748"
                                            />
                                        </svg>
                                    </span>
                                    Add New Term
                                </button>
                            </div>
                        </div>
                    );
                })}

                <button
                    className="pi-checklist-btn pi-ml-10"
                    onClick={(e) => this.addChecklist(e)}
                >
                    <span>
                        <svg
                            width={10}
                            height={10}
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5 0a1 1 0 011 1v3h3a1 1 0 010 2H6v3a1 1 0 01-2 0V6H1a1 1 0 010-2h3V1a1 1 0 011-1z"
                                fill="#2D3748"
                            />
                        </svg>
                    </span>
                    Add New Checklist
                </button>
            </>
        )
    }
}

Checklist.propTypes = {
    title: PropTypes.string,
}

export default Checklist