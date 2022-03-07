import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Item extends Component {

    render = () => {

        const { index, name, desc, qty, price } = this.props

        return (
            <> 
            <td>
                <input 
                    name="name" 
                    type="text"  
                    value={name} 
                    onChange={this.props.changeHandler(index)} /> <br />

                <textarea 
                    name="desc" 
                    type="text"  
                    value={desc} 
                    onChange={this.props.changeHandler(index)} />
            </td>
            <td>
                <input 
                    name="qty" 
                    type="number"  
                    step="1" 
                    value={qty} 
                    onChange={this.props.changeHandler(index)} 
                    onFocus={this.props.focusHandler} />
                <select name="qty_type">
                    <option value="unit">Unit</option> 
                    <option value="hour">Hour</option>
                    <option value="week">Week</option>
                    <option value="page">Page</option>
                </select>
            </td>
            <td>
                <input 
                    name="price" 
                    type="number"  
                    step="0.01" 
                    min="0.00" 
                    max="9999999.99" 
                    value={price} 
                    onChange={this.props.changeHandler(index)} 
                    onFocus={this.props.focusHandler} 
                /> 
            </td>

            <td>
                {this.props.currencyFormatter(qty * price)} 
            </td>  

            <td>
                <span
                onClick={this.props.deleteHandler(index)}
                >
                    <svg
                    width={15}
                    height={15}
                    viewBox="0 0 9 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg" 
                    >
                    <path
                        d="M8.073 2.387a.39.39 0 01-.345.388l-.045.003h-.33l-.48 4.886a1.073 1.073 0 01-1.069.967H2.927a1.073 1.073 0 01-1.068-.967l-.48-4.886h-.33a.39.39 0 010-.78h1.95a1.366 1.366 0 112.732 0h1.952a.39.39 0 01.39.39zm-2.83 1.269a.293.293 0 00-.29.253l-.002.04V6.68l.003.04a.293.293 0 00.58 0l.002-.04V3.948l-.002-.04a.293.293 0 00-.29-.252zm-1.756 0a.293.293 0 00-.29.253l-.002.04V6.68l.003.04a.293.293 0 00.58 0l.002-.04V3.948l-.003-.04a.293.293 0 00-.29-.252zm.879-2.244a.585.585 0 00-.586.585h1.17a.585.585 0 00-.584-.585z"
                        fill="#718096"
                    />
                    </svg>
                </span>
            </td>
            </>
        )
    }
}

Item.propTypes = {
    index: PropTypes.number.isRequired,
    name: PropTypes.string,
    desc: PropTypes.string,
    qty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Item


