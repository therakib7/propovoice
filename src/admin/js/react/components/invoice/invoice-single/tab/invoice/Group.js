import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Editable from 'block/editable';
import Editor from 'block/editor';

class Group extends Component {

    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            groups: [
                {
                    label: 'Note',
                    content: '',
                },
                {
                    label: 'Terms',
                    content: '',
                }
            ],
        };
    }

    componentDidMount() {
        if (!this.state.edit && this.props.data) {
            this.setState({ edit: true, groups: this.props.data });
        }
    }

    componentDidUpdate() {
        if (!this.state.edit && this.props.data) {
            this.setState({ edit: true, groups: this.props.data });
        }
    }

    handleGroupLabel = (index, value = null) => {
        let items = this.state.groups[index];
        items['label'] = value;

        let groups = this.state.groups;
        this.setState({ groups });
        this.handlePros();
    }

    handleGroupContent = (index, value = null) => {
        let items = this.state.groups[index];
        items['content'] = value;
        let groups = this.state.groups;
        this.setState({ groups }, () => {
            this.handlePros();
        });
    }

    addGroup = () => {
        let groups = this.state.groups;
        groups.push({
            label: 'Group Label',
            content: '',
        });
        this.setState({ groups: groups });
    };

    handlePros = () => {
        this.props.changeHandler(this.state.groups);
    };

    deleteHandler = (group_index) => {
        let array = [...this.state.groups];
        array.splice(group_index, 1);
        this.setState({ groups: array }, () => {
            this.handlePros();
        });
    }

    render = () => {
        const { groups } = this.state;
        return (
            <>
                {groups.map((group_single, group_index) => {
                    return (
                        <div className="pi-add-term" key={group_index}>
                            <div className="row">
                                <div className="col-md-6">
                                    <Editable
                                        key={group_index}
                                        value={group_single.label}
                                        index={group_index}
                                        changeHandler={this.handleGroupLabel}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <div className="pi-radio-group">

                                        <span
                                            className='pi-delate'
                                            title='Delete this group'
                                            onClick={() => this.deleteHandler(group_index)}
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

                            <div className="dpi-group-item dpi-bg-air-white">
                                <Editor
                                    key={group_index}
                                    value={group_single.content}
                                    index={group_index}
                                    changeHandler={this.handleGroupContent}
                                />
                            </div>
                        </div>
                    );
                })}

                <button
                    className="pi-group-btn pi-ml-10"
                    onClick={() => this.addGroup()}
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
                    Add New Group
                </button>
            </>
        )
    }
}

Group.propTypes = {
    title: PropTypes.string,
}

export default Group
