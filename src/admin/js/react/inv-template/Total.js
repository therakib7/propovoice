import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Total extends Component {

    render = () => {

        const { currencyFormatter, itemsTotal, taxTotal, grandTotal } = this.props.totalData;
        const { tax } = this.props.data.invoice; 

        return ( 
            <div className="pi-amounting">
                <table>
                    <tbody>
                        <tr>
                            <th>Total:</th>
                            <td>{currencyFormatter(itemsTotal())}</td>
                        </tr>
                        <tr className="pi-before-total">
                            <th>Tax {tax}%</th>
                            <td>{currencyFormatter(taxTotal())}</td>
                        </tr>
                        <tr className="pi-table-bg">
                            <th>Sub Total:</th>
                            <td>{currencyFormatter(grandTotal())}</td>
                        </tr>
                    </tbody>
                </table>
            </div> 
        )
    }
} 

export default Total


