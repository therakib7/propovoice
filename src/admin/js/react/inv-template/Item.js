import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Item extends Component {

    render = () => {

        const { name, desc, qty, qty_type, price } = this.props.data
        const id = this.props.id;

        return (
            <tr>
                <td>0{id + 1}.</td>
                <td>
                    {name}<br />
                    <span>{desc}</span>
                </td>
                <td>
                    {qty} <span>({qty_type})</span>
                </td>
                <td>
                    {price}
                </td>
                <td>{qty * price}</td>
            </tr>
        )
    }
}

export default Item 