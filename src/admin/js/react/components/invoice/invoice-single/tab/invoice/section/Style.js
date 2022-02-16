import React, { Component } from 'react';

class Style extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            name: '', 
            web: '',
            email: '', 
            mobile: '',
            zip: '',
            address: '',
            date: false
        };

        this.state = {
            show: false,
            form: this.initialState
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    toggle = () => {
        let show = ! this.state.show;
        this.setState({ show });
    };

    componentDidUpdate() {
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // this.props.handleSubmit(this.state.form);
        // this.setState({ form: this.initialState });
    }

    render() {
        return (
            <div className='mb-6'>
                <div 
                    className={'flex items-center cursor-pointer justify-between rounded-t p-3 w-full font-medium text-left border border-gray-200 text-gray-900 rounded-t ' + ( this.state.show ? '' : 'rounded-b' )} 
                    onClick={() => this.toggle()} 
                    >
                    <span>Edit Style</span>  
                    <svg 
                        className={'w-6 h-6 shrink-0 ' + ( this.state.show ? 'rotate-180' : '' )}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                        />
                    </svg> 
                </div> 
 
                <div className={'border border-t-0 border-gray-200 rounded-b ' + ( this.state.show ? '' : 'hidden' )}>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="relative px-6 py-5 flex-auto">  
                            Color selection
                        </div>

                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                onClick={() => this.toggle()}
                            >
                                Close
                            </button>

                            <button
                                className="text-white bg-gray-800 hover:bg-gray-900 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="submit">
                                Save
                            </button>
                        </div>
                    </form> 
                </div> 
            </div>
        );
    }
}

export default Style;
