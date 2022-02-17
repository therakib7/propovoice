import React, { Component } from 'react'; 

export default class One extends Component {
    constructor(props) {
        super(props);         

        this.state = { 
            preloader: true, 
        }; 
    }   

    componentDidMount() { 
    } 

    render() { 
        return (
            <>
                <div className="flex gap-3 border-b py-2 items-start">
                    <div className="px-1 w-5">
                        <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">
                        SL
                        </p>
                    </div>
                    <div className="flex-1 px-1">
                        <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">
                        Description
                        </p>
                    </div>
                    <div className="px-1 w-20">
                        <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">
                        Units
                        </p>
                    </div>
                    <div className="px-1 w-32">
                        <p className="leading-none">
                        <span className="block uppercase tracking-wide text-sm font-bold text-gray-800">
                            Unit Price
                        </span>
                        <span className="font-medium text-xs text-gray-500">USD ($)</span>
                        </p>
                    </div>
                    <div className="px-1 w-32">
                        <p className="leading-none">
                        <span className="block uppercase tracking-wide text-sm font-bold text-gray-800">
                            Amount
                        </span>
                        <span className="font-medium text-xs text-gray-500"></span>
                        </p>
                    </div> 
                </div>

                <div className="flex gap-3 py-2 border-b">
                    <div className="px-1 w-5 ">
                        <p className="text-gray-800 font-semibold">1</p>
                    </div>
                    <div className="flex-1 px-1"> 
                        <h5 className="text-gray-800 font-semibold lowercase">Title</h5> 
                        <p className="">Description</p>  
                    </div>
                    <div className="px-1 w-20">
                        10
                    </div>
                    <div className="px-1 w-32">
                        100
                    </div>
                    <div className="px-1 w-32">
                        <p className="text-gray-800 font-semibold">$200.00</p>
                    </div> 
                </div> 

                <div className="py-2 ml-auto mt-5 w-full w-2/6">
                    <div className="flex justify-between mb-3">
                        <div className="text-gray-800 flex-1">Subtotal</div>
                        <div className="text-gray-800 font-medium">$200.00</div>
                    </div>
                    <div className="flex justify-between mb-3">
                        <div className="text-gray-800 flex-1">
                        Tax
                        20%
                        </div>
                        <div className="text-gray-800 font-medium">$0.00</div>
                    </div>
                    <div className="py-2 border-t border-b">
                        <div className="flex justify-between">
                        <div className="text-xl text-gray-600 flex-1">Total Amount</div>
                        <div className="text-xl text-gray-800 font-bold">$200.00</div>
                        </div>
                    </div>
                </div>

                <div className="">
                    <div className="">
                        Note
                    </div>
                    <div>
                        This is the note text
                    </div>
                </div>

                <div className="mb-5"></div>

                <div className="ncpi-invoice-groups">
                    <div className="ncpi-invoice-group">
                        <div className="flex justify-between my-3">
                            <div className="">
                                Add Terms
                            </div> 
                        </div>
                        <div className="ncpi-invoice-group-items p-3 rounded border bg-slate-100">
                            <ul className="list-decimal px-5">
                                <li>
                                    Items
                                </li>
                            </ul> 
                        </div>
                    </div> 
                </div>
            </>
        );
    }
} 