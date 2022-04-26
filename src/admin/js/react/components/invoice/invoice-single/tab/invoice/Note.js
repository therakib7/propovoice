import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Editable from './Editable';
import { Editor } from "@tinymce/tinymce-react";

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

    handleEditorChange(content, editor) { 
        let name = 'text';
        this.setState({ note: { ...this.state.note, [name]: content } }, () => {
            this.handlePros();
        });
      }

    handleChangeLabel = (value) => {
        this.setState({ note: { ...this.state.note, ['label']: value } }, () => {
            this.handlePros();
        });
    }

    componentDidMount() {
        if (!this.state.edit && this.props.data) {
            this.setState({ edit: true, note: this.props.data });
        }
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

                    {/* <Editor
                        apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
                        value={text}
                        init={{
                            height: 200,
                            menubar: false,
                            // plugins: [
                            //     'advlist autolink lists link image charmap print preview anchor',
                            //     'searchreplace visualblocks code fullscreen',
                            //     'insertdatetime media table paste code help wordcount'
                            // ],
                            // toolbar:'undo redo | formatselect | bold italic backcolor | \
                            //      alignleft aligncenter alignright alignjustify | \
                            //      bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={this.handleEditorChange}
                    /> */}
                </div>
            </>
        )
    }
}

Note.propTypes = {
    title: PropTypes.string,
}

export default Note
