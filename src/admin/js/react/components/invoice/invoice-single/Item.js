import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Item extends Component {

    render = () => {

        const { index, name, desc, quantity, price } = this.props

        return (
            <div className='flex -mx-1 gap-3 py-2 border-b'>
                <div className="px-1 w-5 ">
                    <p className="text-gray-800 font-semibold">{index + 1}</p>
                </div>
                <div className="flex-1 px-1">
                    <input 
                        name="name" 
                        type="text" 
                        className='w-full border px-2 rounded'
                        value={name} 
                        onChange={this.props.changeHandler(index)} /> <br />

                    <textarea 
                        name="desc" 
                        type="text" 
                        className='w-full border mt-3 px-2 rounded'
                        value={desc} 
                        onChange={this.props.changeHandler(index)} />
                </div>
                <div className="px-1 w-20">
                    <input 
                        name="quantity" 
                        type="number" 
                        className='w-20 border pl-2 rounded'
                        step="1" 
                        value={quantity} 
                        onChange={this.props.changeHandler(index)} 
                        onFocus={this.props.focusHandler} />
                </div>
                <div className="px-1 w-32">
                    <input 
                        name="price" 
                        type="number" 
                        className='w-24 border pl-2 rounded'
                        step="0.01" 
                        min="0.00" 
                        max="9999999.99" 
                        value={price} 
                        onChange={this.props.changeHandler(index)} 
                        onFocus={this.props.focusHandler} />
                </div>
                <div className="px-1 w-32">
                    <p className="text-gray-800">{this.props.currencyFormatter(quantity * price)}</p>
                </div>
                <div className="px-1 w-10"> 
                    <button type="button"
                        className="text-red-500 hover:text-red-600 font-semibold"
                        onClick={this.props.deleteHandler(index)}
                    >x</button>
                </div>
            </div>
        )
    }
}

Item.propTypes = {
    index: PropTypes.number.isRequired,
    name: PropTypes.string,
    desc: PropTypes.string,
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Item


