import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Api from 'api/email';

class Send extends Component {
    constructor(props) {
        super(props); 

        this.state = {
            form: {
                invoice_id: null, 
                fromData: {
                    id: '',
                    email: ''
                }, 
                toData: {
                    id: '',
                    email: ''
                },
                subject: '',
                msg: '',
            }, 
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    componentDidMount() {  
        let data = this.props.data; 
        let formState = {...this.state.form}

        formState.invoice_id = data.invoice.id;

        formState.fromData = {
            id: data.fromData.id,
            email: data.fromData.email,
        };

        formState.toData = {
            id: data.toData.id,
            email: data.toData.email,
        }; 
        
        formState.subject = '{company_name} sent you a Invoice #{invoice_id}';

        this.setState({ form: formState }); 
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // this.props.handleSubmit(this.state.form);
        Api.create(this.state.form)
                .then(resp => {
                    if (resp.data.success) {  
						//this.props.routeChange(resp.data.data);  

                        toast.success('Mail sucessfully sent'); 
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                }) 
    }

    subjectLook = () => {
        let data = this.props.data; 
        let company_name = data.fromData.name;
        let invoice_id = data.invoice.id;
        return `${company_name} sent you a Invoice #${invoice_id}`;
    }

    render() {
        return (
            <>
                {this.props.show && (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative my-6 mx-auto w-1/4">
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                                    <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                                        <h3 className="text-xl p-2 font-semibold">Send To</h3>
                                        <button className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => this.props.close()} >
                                            <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>

                                    <form onSubmit={this.handleSubmit}>
                                        <div className="relative px-6 py-5 flex-auto">
                                            <div className="w-full max-w-lg"> 

                                                <div className="flex flex-wrap -mx-3 mb-2">

                                                    <div className="w-full px-3 mb-6 md:mb-0">
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
                                                            readOnly
                                                            name="email"
                                                            value={this.state.form.toData.email}
                                                            onChange={this.handleChange}
                                                        />
                                                    </div> 

                                                </div>

                                                <div className="flex flex-wrap -mx-3 mb-2">
                                                    <div className="w-full px-3 mb-6 md:mb-0">
                                                        <label
                                                            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                            htmlFor="grid-company_name">
                                                            Subject
                                                        </label>

                                                        <input
                                                            className="appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                            id="grid-company_name"
                                                            type="text"
                                                            required
                                                            name="company_name"
                                                            value={this.state.form.subject}
                                                            onChange={this.handleChange}
                                                        /> 
                                                    </div> 
                                                </div> 

                                                <div className="flex flex-wrap -mx-3 mb-2">
                                                    <div className="w-full px-3 mb-6 md:mb-0">
                                                        <label
                                                            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                            htmlFor="grid-company_name">
                                                            Subject Preview
                                                        </label> 
                                                        {this.subjectLook()}
                                                    </div> 
                                                </div> 

                                                <div className="flex flex-wrap -mx-3 mb-2">
                                                    <div className="w-full px-3 mb-6 md:mb-0">
                                                        <label
                                                            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                            htmlFor="grid-company_name">
                                                            Private Message
                                                        </label>

                                                        <textarea
                                                            className="appearance-none block w-full text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                            id="grid-company_name"
                                                            type="text" 
                                                            name="company_name"
                                                            value={this.state.form.msg}
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
                                                className="text-white bg-gray-800 hover:bg-gray-900 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="submit">
                                                Send
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

export default Send;
