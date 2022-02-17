import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Item extends Component {

    render = () => {

        const { name, desc, qty, price } = this.props.data 
        const id = this.props.id;
        const className = ( id % 2 ) ? 'ncpi-row-even' : 'ncpi-row-odd';

        return (
            <div className={'flex gap-3 py-2 border-b ' + className}>
                <div className="px-1 w-5 ">
                    <p className="text-gray-800 font-semibold">{ id + 1 }</p>
                </div>

                <div className="flex-1 px-1">
                    <h6 className="text-gray-800 font-semibold lowercase">{name}</h6>
                    <p className="">{desc}</p>  
                </div>

                <div className="px-1 w-20">
                    {qty}
                </div>

                <div className="px-1 w-32">
                    {price}
                </div>

                <div className="px-1 w-32">
                    <p className="text-gray-800">{qty * price}</p>
                </div> 
            </div>
        )
    }
} 

export default Item


