import React, { Component } from 'react'
import PropTypes from 'prop-types' 

class Note extends Component {
    state = {
		label: '', 
		title: '', 
	}

    render = () => {

        // const { index, name, description, title, price } = this.props
        // this.props.changeHandler(index)

        return (
            <div className=''> 
                <div>
                    Add Note <span onClick={() => props.editEntry('edit', row)}><i className="dashicons dashicons-edit-page pt-1"></i></span>
                </div>

                <div>
                    <input 
                    name="title" 
                    type="text" 
                    // value={this.state.title} 
                    className="appearance-none block bg-slate-100 w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    />
                </div>
            </div>
        )
    }
}

Note.propTypes = { 
    title: PropTypes.string, 
}

export default Note


