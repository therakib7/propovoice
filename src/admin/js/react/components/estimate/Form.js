import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            name: '',
            job: '',
            first_name: '',
            last_name: '',
            email: '',
            company_name: '',
            web: '',
            mobile: '',
            zip: '',
            address: '',
            date: false
        };

        this.state = {
            // new: true,
            form: this.initialState
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    componentDidUpdate() {
        //TODO: check it later or multiple rendering
        
        if ( this.props.modalType == 'edit' ) {
            if (this.state.form.id != this.props.data.id) {
                this.setState({ form: this.props.data });
            }
        } else {
            /* console.log(this.state.form.id)
            console.log(this.props.data.id)
            if (this.state.form.id != this.props.data.id) {
                console.log(this.props.modalType)
                this.setState({ form: this.initialState });
            } */
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        this.props.handleSubmit(this.state.form);
        this.setState({ form: this.initialState });
    }

    render() {
        return (
            <>
                {this.props.show && (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                                    <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                                        <h3 className="text-xl p-2 font-semibold">{this.props.modalType == 'new' ? 'New' : 'Edit'} Client</h3>
                                        <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => this.props.close()} >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>

                                    <form onSubmit={this.onFormSubmit}>
                                        <div className="relative px-6 py-5 flex-auto">
                                            <div className="w-full max-w-lg">

                                                <div className="flex flex-wrap -mx-3 mb-2">

                                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                        <label
                                                            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                            htmlFor="first_name">
                                                            First Name
                                                        </label>

                                                        <input
                                                            className="appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                            id="first_name"
                                                            type="text"
                                                            required
                                                            name="first_name"
                                                            value={this.state.form.first_name}
                                                            onChange={this.handleChange}
                                                        />
                                                    </div>

                                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                        <label
                                                            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                            htmlFor="last_name">
                                                            Last Name
                                                        </label>

                                                        <input
                                                            className="appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                            id="last_name"
                                                            type="text"
                                                            required
                                                            name="last_name"
                                                            value={this.state.form.last_name}
                                                            onChange={this.handleChange}
                                                        />
                                                    </div>

                                                </div>

                                                <div className="flex flex-wrap -mx-3 mb-2">

                                                    <div className="w-full md:w-1/2 px-3">
                                                        <label
                                                            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                            htmlFor="grid-email">
                                                            Email
                                                        </label>

                                                        <input
                                                            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            id="grid-email"
                                                            type="email"
                                                            required
                                                            name="email"
                                                            value={this.state.form.email}
                                                            onChange={this.handleChange}
                                                        />
                                                    </div>

                                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                        <label
                                                            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                            htmlFor="grid-mobile">
                                                            Mobile Number
                                                        </label>

                                                        <input
                                                            className="appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                            id="grid-mobile"
                                                            type="text"
                                                            required
                                                            name="mobile"
                                                            value={this.state.form.mobile}
                                                            onChange={this.handleChange}
                                                        />
                                                    </div>

                                                </div>

                                                <div className="flex flex-wrap -mx-3 mb-2">
                                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                        <label
                                                            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                            htmlFor="grid-company_name">
                                                            Company Name
                                                        </label>

                                                        <input
                                                            className="appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                            id="grid-company_name"
                                                            type="text"
                                                            required
                                                            name="company_name"
                                                            value={this.state.form.company_name}
                                                            onChange={this.handleChange}
                                                        />
                                                    </div>

                                                    <div className="w-full md:w-1/2 px-3">
                                                        <label
                                                            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                            htmlFor="grid-web">
                                                            Website
                                                        </label>

                                                        <input
                                                            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            id="grid-web"
                                                            type="url"
                                                            name="web"
                                                            value={this.state.form.web}
                                                            onChange={this.handleChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap -mx-3 mb-2">


                                                    <div className="w-full md:w-1/2 px-3">
                                                        <label
                                                            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                            htmlFor="grid-zip">
                                                            Zip Code
                                                        </label>

                                                        <input
                                                            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            id="grid-zip"
                                                            type="number"
                                                            name="zip"
                                                            value={this.state.form.zip}
                                                            onChange={this.handleChange}
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                onClick={() => this.props.close()}
                                            >
                                                Close
                                            </button>

                                            <button
                                                className="text-white bg-blue-700 hover:bg-blue-800 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="submit">
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                )
                }
            </>
        );
    }
}

export default Form;
