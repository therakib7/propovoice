import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Note extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        const { label, text } = this.props.data;
        return (
            <>
                {text && <div className="pi-note">
                    <h4>{label}:</h4>
                    <p dangerouslySetInnerHTML={{__html: text.replaceAll('\n', '<br />')}}></p>
                </div>}
            </>
        )
    }
}

export default Note
