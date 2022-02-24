import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Total extends Component {

    render = () => {

        const { currencyFormatter, itemsTotal, tax, changeHandler, focusHandler, taxTotal, grandTotal } = this.props

        return (
            <div className="py-2 ml-auto mt-5 w-full w-2/6">
                <div className="flex justify-between mb-3">
                    <div className="text-gray-800 flex-1">Total</div>
                    <div className="text-gray-800 font-medium">
                        {currencyFormatter(itemsTotal())}
                    </div>
                </div>
                <div className="flex justify-between mb-3">
                    <div className="text-gray-800 flex-1">
                        Tax 
                        <input 
                            name="tax" 
                            type="number" 
                            className='w-20 border mx-3 pl-2 rounded'
                            step="0.01" 
                            value={tax} 
                            onChange={changeHandler} 
                            onFocus={focusHandler} 
                        />
                        %
                    </div>
                    <div className="text-gray-800 font-medium">
                        {currencyFormatter(taxTotal())}
                    </div>
                </div>

                <div className="py-2 border-t border-b">
                    <div className="flex justify-between">
                        <div className="text-xl text-gray-600 flex-1">Sub Total</div>
                        <div className="text-xl text-gray-800 font-bold">
                            {currencyFormatter(grandTotal())}
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
} 

export default Total


