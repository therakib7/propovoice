import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { sprintf, _n, __ } from '@wordpress/i18n';

class Item extends Component {

    render = () => {

        const { name, desc, qty, qty_type, price } = this.props.data
        const id = this.props.id;

        return (
            <tr>
                {/* {__('hat test', 'propovoice')}{sprintf(_n('%d hat', '%d hats', 4, 'propovoice'), 4)} */}
                <td>{id + 1}.</td>
                <td>
                    {name}<br />
                    <span dangerouslySetInnerHTML={{__html: desc.replaceAll('\n', '<br />')}}></span>
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