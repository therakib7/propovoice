import React, { Component } from 'react'
import PropTypes from 'prop-types' 

class Note extends Component {
    constructor(props) {
        super(props);   
    } 
    
    render = () => {

        const { label, text } = this.props.data;

        return ( 
            <div className="pi-note">
                <h4>{label}:</h4>
                <p>{text}</p>
            </div>
        )
    }
} 

export default Note


