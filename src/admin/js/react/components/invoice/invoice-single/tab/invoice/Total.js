import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Total extends Component {

    render = () => {

        const { currencyFormatter, itemsTotal, extra_field, tax, discount, late_fee, changeHandler, focusHandler, taxTotal, discountTotal, lateFeeTotal, grandTotal } = this.props

        return ( 
            <div className="pi-calculation">
                <table>
                    <tbody>
                    <tr>
                        <td>SubTotal</td>
                        <td>{currencyFormatter(itemsTotal())}</td>
                    </tr> 

                    {extra_field.hasOwnProperty('tax') && <tr>
                        <td>
                        Tax 
                        <input 
                            name="tax" 
                            type="number"  
                            step="1" 
                            min="0.00" 
                            value={tax} 
                            onChange={changeHandler} 
                            onFocus={focusHandler} 
                        />
                        {extra_field.tax == 'percent' ? '%' : '$'}
                        </td>
                        <td>{currencyFormatter(taxTotal())}</td>
                    </tr>}

                    {extra_field.hasOwnProperty('discount') &&<tr>
                        <td>
                        Discount 
                        <input 
                            name="discount" 
                            type="number"  
                            step="1" 
                            min="0.00" 
                            value={discount} 
                            onChange={changeHandler} 
                            onFocus={focusHandler} 
                        />
                        {extra_field.discount == 'percent' ? '%' : '$'}
                        </td>
                        <td>{currencyFormatter(discountTotal())}</td>
                    </tr>}

                    {extra_field.hasOwnProperty('late_fee') &&<tr>
                        <td>
                        Late Fee 
                        <input 
                            name="late_fee" 
                            type="number"  
                            step="1" 
                            min="0.00" 
                            value={late_fee} 
                            onChange={changeHandler} 
                            onFocus={focusHandler} 
                        />
                        {extra_field.late_fee == 'percent' ? '%' : '$'}
                        </td>
                        <td>{currencyFormatter(lateFeeTotal())}</td>
                    </tr>}

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


