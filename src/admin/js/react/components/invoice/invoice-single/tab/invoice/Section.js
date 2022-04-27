import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Editable from 'block/editable';
import Editor from 'block/editor';

class Section extends Component {

    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            sections: [
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
            this.setState({ edit: true, sections: this.props.data });
        }
    }

    componentDidUpdate() {
        if (!this.state.edit && this.props.data) {
            this.setState({ edit: true, sections: this.props.data });
        }
    }

    handleSectionLabel = (index, value = null) => {
        let items = this.state.sections[index];
        items['label'] = value;

        let sections = this.state.sections;
        this.setState({ sections });
        this.handlePros();
    }

    handleSectionContent = (index, value = null) => {
        let items = this.state.sections[index];
        items['content'] = value;
        let sections = this.state.sections;
        this.setState({ sections }, () => {
            this.handlePros();
        });
    }

    addSection = () => {
        let sections = this.state.sections;
        sections.push({
            label: 'Section Label',
            content: '',
        });
        this.setState({ sections: sections });
    };

    handlePros = () => {
        this.props.changeHandler(this.state.sections);
    };

    deleteHandler = (section_index) => {
        let array = [...this.state.sections];
        array.splice(section_index, 1);
        this.setState({ sections: array }, () => {
            this.handlePros();
        });
    }

    render = () => {
        const { sections } = this.state;
        return (
            <>
                {sections.map((section_single, section_index) => {
                    return (
                        <div className="pi-add-term" key={section_index}>
                            <div className="row">
                                <div className="col-md-6">
                                    <Editable
                                        key={section_index}
                                        value={section_single.label}
                                        index={section_index}
                                        changeHandler={this.handleSectionLabel}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <div className="pi-radio-group">

                                        <span
                                            className='pi-delate'
                                            title='Delete this section'
                                            onClick={() => this.deleteHandler(section_index)}
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

                            <div className="pi-editor">
                                <Editor
                                    key={section_index}
                                    value={section_single.content}
                                    index={section_index}
                                    changeHandler={this.handleSectionContent}
                                />
                            </div>
                        </div>
                    );
                })}

                <button
                    className="pi-group-btn pi-ml-10"
                    onClick={() => this.addSection()}
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
                    Add New Section
                </button>
            </>
        )
    }
}

Section.propTypes = {
    title: PropTypes.string,
}

export default Section
