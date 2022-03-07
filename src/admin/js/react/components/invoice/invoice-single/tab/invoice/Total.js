import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Total extends Component {

    render = () => {

        const { currencyFormatter, itemsTotal, tax, changeHandler, focusHandler, taxTotal, grandTotal } = this.props

        return ( 
            <div className="pi-calculation">
                <table>
                    <tbody>
                    <tr>
                        <td>SubTotal</td>
                        <td>{currencyFormatter(itemsTotal())}</td>
                    </tr>
                    <tr>
                        <td>
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
                        </td>
                        <td>{currencyFormatter(taxTotal())}</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td>{currencyFormatter(grandTotal())}</td>
                    </tr>
                    </tbody>
                </table>
            </div> 
        )
    }
} 

export default Total


