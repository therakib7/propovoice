import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Editable from './Editable';

class Note extends Component {
    state = {
        edit: false,
        note: {
            label: 'Note',
            text: ''
        },
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ note: { ...this.state.note, [name]: value } }, () => {
            this.handlePros();
        });
    }

    handleChangeLabel = (value) => {
        this.setState({ note: { ...this.state.note, ['label']: value } }, () => {
            this.handlePros();
        });
    }

    componentDidUpdate() {
        if (!this.state.edit && this.props.data) {
            this.setState({ edit: true, note: this.props.data });
        }
    }

    handlePros = () => {
        this.props.changeHandler(this.state.note);
    };

    render = () => {

        const { label, text } = this.state.note;

        return (
            <>
                <Editable
                    key={'note'}
                    value={label}
                    changeHandler={this.handleChangeLabel}
                />
                <div className="pi-group-input">
                    <textarea
                        name="text" 
                        value={text}
                        onChange={this.handleChange}
                    />
                </div>
            </>
        )
    }
}

Note.propTypes = {
    title: PropTypes.string,
}

export default Note
