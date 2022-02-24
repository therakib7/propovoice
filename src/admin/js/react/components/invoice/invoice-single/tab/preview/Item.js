import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Item extends Component {

    render = () => {

        const { name, desc, qty, price } = this.props.data 
        const id = this.props.id; 

        return ( 
            <tr>
                <td>{ id + 1 }</td>
                <td>
                    <h6 className="text-gray-800 font-semibold lowercase">{name}</h6>
                    <p className="">{desc}</p> 
                </td>
                <td>{qty}</td>
                <td>{price}</td>
                <td>{qty * price}</td>
            </tr> 
        )
    }
} 

export default Item 