import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Total extends Component {

    render = () => {

        const { currencyFormatter, itemsTotal, taxTotal, grandTotal } = this.props.totalData;
        const { tax } = this.props.data.invoice; 

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
                        Tax {tax}%
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


