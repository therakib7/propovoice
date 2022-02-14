import React, { Component } from 'react'
import PropTypes from 'prop-types' 

class Note extends Component {
    state = {
		note: {
            label: 'Note', 
            text: ''
        }, 
	}

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ note: { ...this.state.note, [name]: value } });
        this.handlePros();
    }

    /* componentDidUpdate() {  
        if ( this.props.data ) {
            console.log(this.props.data);
            // this.setState({ note: this.props.data });
        }
	} */

    handlePros = () => { 
        this.props.changeHandler( this.state.note );
    }; 

    render = () => {

        const { label, text } = this.state.note;

        return (
            <div className=''> 
                <div className=''>
                    <input type="text" id={'note-label'} onChange={ this.handleChange } name="label" value={label} className='w-auto border-none focus:border' />

                    <label htmlFor={'note-label'}>
                        <span><i className="dashicons dashicons-edit-page pt-1"></i></span>
                    </label>
                </div>

                <div>
                    <input 
                    name="text" 
                    type="text" 
                    value={text}
                    onChange={ this.handleChange }
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


