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
                <h4>{label}:</h4>
                <p>{text}</p>
            </>
        )
    }
} 

export default Note


