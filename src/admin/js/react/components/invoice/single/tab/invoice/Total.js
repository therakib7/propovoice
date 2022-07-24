import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Total extends Component {

    render = () => {

        const { currencyFormatter, itemsTotal, extra_field, changeHandler, focusHandler, grandTotal } = this.props

        return (
            <div className="pi-calculation">
                <table>
                    <tbody>
                        <tr>
                            <td>SubTotal</td>
                            <td>{currencyFormatter(itemsTotal())}</td>
                        </tr> 
                        {extra_field.map((item, i) => {
                            let item_total = itemsTotal();
                            let total = item_total;
                            if (item.val_type == 'percent') {
                                total = item_total * (item.val / 100);
                            } else {
                                total = parseFloat(item.val);
                            }

                            return (<tr key={i}>
                                <td>
                                    {item.name}
                                    <input
                                        name={"extra-item-" + i}
                                        type="number"
                                        step="1"
                                        min="0.00"
                                        value={item.val}
                                        onChange={(e) => changeHandler(e, item)}
                                        onFocus={focusHandler}
                                    />
                                    {item.val_type == 'percent' ? '%' : '$'}
                                </td>
                                <td>{currencyFormatter(total)}</td> 
                            </tr>)
                        })} 

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


