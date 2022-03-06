import React, { Component } from 'react'
import PropTypes from 'prop-types' 

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
        this.setState({ note: { ...this.state.note, [name]: value } });
        this.handlePros();
    }

    componentDidUpdate() {   
        if ( ! this.state.edit && this.props.data ) { 
            this.setState({ edit: true, note: this.props.data });
        }
	}

    handlePros = () => { 
        this.props.changeHandler( this.state.note );
    }; 

    render = () => {

        const { label, text } = this.state.note;

        return (  
            <div className="pi-group-input">
                <label>
                    <input type="hidden" id={'note-label'} onChange={ this.handleChange } name="label" value={label}  />
                    {label}
                    <span>
                        <svg
                            width={23}
                            height={12}
                            viewBox="0 0 13 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12.5241 0.47579C12.2193 0.171142 11.8061 0 11.3752 0C10.9443 0 10.531 0.171142 10.2263 0.47579L4.0625 6.63957V8.93738H6.36031L12.5241 2.7736C12.8287 2.46886 12.9999 2.0556 12.9999 1.62469C12.9999 1.19379 12.8287 0.78053 12.5241 0.47579Z"
                                fill="#A0AEC0"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 3.24978C0 2.81879 0.171209 2.40546 0.475963 2.1007C0.780718 1.79595 1.19405 1.62474 1.62504 1.62474H4.87512C5.09062 1.62474 5.29728 1.71034 5.44966 1.86272C5.60204 2.0151 5.68764 2.22177 5.68764 2.43726C5.68764 2.65275 5.60204 2.85942 5.44966 3.0118C5.29728 3.16417 5.09062 3.24978 4.87512 3.24978H1.62504V11.375H9.75024V8.1249C9.75024 7.90941 9.83585 7.70274 9.98823 7.55036C10.1406 7.39799 10.3473 7.31238 10.5628 7.31238C10.7783 7.31238 10.9849 7.39799 11.1373 7.55036C11.2897 7.70274 11.3753 7.90941 11.3753 8.1249V11.375C11.3753 11.806 11.2041 12.2193 10.8993 12.5241C10.5946 12.8288 10.1812 13 9.75024 13H1.62504C1.19405 13 0.780718 12.8288 0.475963 12.5241C0.171209 12.2193 0 11.806 0 11.375V3.24978Z"
                                fill="#A0AEC0"
                            />
                        </svg>
                    </span>
                </label> 
                <input 
                    name="text" 
                    type="text" 
                    value={text}
                    onChange={ this.handleChange }
                    className="appearance-none block bg-slate-50 w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    />
            </div>
        )
    }
}

Note.propTypes = { 
    title: PropTypes.string, 
}

export default Note


