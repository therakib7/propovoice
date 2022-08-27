import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Editable from 'block/editable';
import Editor from 'block/editor';

class Section extends Component {

    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            sections: props.default,
        };
    }

    componentDidMount() {
        if ( !this.state.edit && this.props.data ) { 
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
        this.props.changeHandler(this.state.sections, this.props.top);
    };

    deleteHandler = (index) => {
        let array = [...this.state.sections];
        array.splice(index, 1);
        this.setState({ sections: array }, () => {
            this.handlePros();
        });
    }

    render = () => {
        const { sections } = this.state;
        const i18n = ndpv.i18n;
        return (
            <div className='pv-inv-sections pv-form-style-one' style={ { margin: ( this.props.top ? '35px 0 45px' : '') }}>
                {sections.map((section_single, index) => {
                    return (
                        <div className="pv-group-input" key={index}>

                            <div className='pv-field-label'>
                                <Editable
                                    key={index}
                                    value={section_single.label}
                                    index={index}
                                    changeHandler={this.handleSectionLabel}
                                />
                                <span
                                    className="pv-close-icon"
                                    onClick={() => this.deleteHandler(index)}
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
                                </span>
                            </div>

                            <div className="pv-editor" style={{ marginBottom: '25px' }}>
                                <Editor
                                    key={index}
                                    value={section_single.content}
                                    index={index}
                                    changeHandler={this.handleSectionContent}
                                />
                            </div>
                        </div>
                    );
                })}

                <button
                    className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-hover-stroke pv-bg-shadow"
                    onClick={() => this.addSection()}
                    style={{ width: "100%", justifyContent: "center" }}
                >
                    <svg
                        width={16}
                        height={16}
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
                    {i18n.add} {i18n.new} {i18n.section}
                </button>
            </div>
        )
    }
}

Section.propTypes = {
    title: PropTypes.string,
}

export default Section 