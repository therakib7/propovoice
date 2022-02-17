import React, { Component } from 'react'
import PropTypes from 'prop-types' 

class Note extends Component {
    constructor(props) {
        super(props);         

         
    } 
    render = () => {

        const { label, text } = this.props.data;

        return (
            <div className=''> 
                <div className=''>
                    {label}
                </div>

                <div>
                    {text}
                </div>
            </div>
        )
    }
} 

export default Note


