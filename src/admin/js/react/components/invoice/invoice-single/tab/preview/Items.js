import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import Item from './Item'  

class Items extends Component { 

    render = () => { 
        return (  
            <table className='ncpi-invoice-items'>
                <thead>
                    <tr>
                        <th>SL</th>
                        <th>Description</th>
                        <th>Units</th>
                        <th>Unit Price (USD $)</th>
                        <th>Amount</th> 
                    </tr>
                </thead>
                <tbody> 
                    {this.props.data.map((item, i) => { 
                        return (
                            <Item data={item} id={i} key={i} />
                        )
                    })} 
                </tbody> 
            </table>  
        )
    }
} 

export default Items
