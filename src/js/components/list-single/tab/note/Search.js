import React, { Component } from 'react';

export default class Form extends Component {

    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            name: '',
            job: '',
            first_name: '',
            last_name: '',
            email: '',
            org_name: '',
            web: '',
            mobile: '',
            zip: '',
            address: '',
            date: false
        };

        this.state = { 
            form: this.initialState
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    } 

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.handleSubmit(this.state.form); 
    }

    render() {
        const i18n = ndpi.i18n;
        return (
            <>
                {this.props.show && (
                    <>
                        <div className="ncpi-search absolute top-0 right-0">   
                            <form onSubmit={this.handleSubmit} className="h-screen border-0 shadow-lg flex flex-col w-full bg-white">
                                <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-xl p-2 font-semibold">Search</h3>
                                    <button className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => this.props.close('search')} >
                                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>

                                <div className="relative px-6 py-5 flex-auto overflow-y-auto">
                                    <div className="w-full max-w-lg">
                                        <div className="-mx-3 mb-2">
                                            <div className="w-full px-3 mb-6 md:mb-0">
                                                <label
                                                    className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="first_name">
                                                    {i18n.first} {i18n.name}
                                                </label>

                                                <input
                                                    className="appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                    id="first_name"
                                                    type="text"
                                                    name="first_name"
                                                    value={this.state.form.first_name}
                                                    onChange={this.handleChange}
                                                />
                                            </div>

                                            <div className="w-full px-3 mb-6 md:mb-0">
                                                <label
                                                    className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="last_name">
                                                    {i18n.last} {i18n.name}
                                                </label>

                                                <input
                                                    className="appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                    id="last_name"
                                                    type="text"
                                                    name="last_name"
                                                    value={this.state.form.last_name}
                                                    onChange={this.handleChange}
                                                />
                                            </div> 

                                            <div className="w-full px-3 mb-6 md:mb-0">
                                                <label
                                                    className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid_email">
                                                    {i18n.email}
                                                </label>

                                                <input
                                                    className="appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                    id="grid_email"
                                                    type="email"
                                                    name="email"
                                                    value={this.state.form.email}
                                                    onChange={this.handleChange}
                                                />
                                            </div>

                                            <div className="w-full px-3 mb-6 md:mb-0">
                                                <label
                                                    className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-mobile">
                                                    {i18n.mob} {i18n.num}
                                                </label>

                                                <input
                                                    className="appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                    id="grid-mobile"
                                                    type="text"
                                                    name="mobile"
                                                    value={this.state.form.mobile}
                                                    onChange={this.handleChange}
                                                />
                                            </div> 

                                            <div className="w-full px-3 mb-6 md:mb-0">
                                                <label
                                                    className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-org_name">
                                                    {i18n.company} {i18n.name}
                                                </label>

                                                <input
                                                    className="appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                    id="grid-org_name"
                                                    type="text"
                                                    name="org_name"
                                                    value={this.state.form.org_name}
                                                    onChange={this.handleChange}
                                                />
                                            </div>

                                            <div className="w-full px-3 mb-6 md:mb-0">
                                                <label
                                                    className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-web">
                                                    {i18n.web}
                                                </label>

                                                <input
                                                    className="appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                    id="grid-web"
                                                    type="url"
                                                    name="web"
                                                    value={this.state.form.web}
                                                    onChange={this.handleChange}
                                                />
                                            </div>   

                                            <div className="w-full px-3 mb-6 md:mb-0">
                                                <label
                                                    className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor="grid-zip">
                                                    Zip Code
                                                </label>

                                                <input
                                                    className="appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
                                        onClick={() => this.props.close('search')} >
                                        {i18n.close}
                                    </button>

                                    <button
                                        className="text-white bg-gray-800 hover:bg-gray-900 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit">
                                        Search
                                    </button>
                                </div>
                            </form> 
                        </div> 
                    </>
                )
                }
            </>
        );
    }
} 