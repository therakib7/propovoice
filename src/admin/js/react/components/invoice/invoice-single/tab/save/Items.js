import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import Item from './Item'  

class Items extends Component { 

    render = () => { 
        return ( 
            <div className=''>
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
                 
                <div className=''>
                    {this.props.data.map((item, i) => { 
                        return (
                            <Item data={item} id={i} key={i} />
                        )
                    })} 
                </div>   
            </div> 
        )
    }
} 

export default Items
