import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import Item from './Item'  

class Items extends Component { 

    render = () => { 
        return (   
            <div className="pi-items-table">
                <table>
                    <thead>
                        <tr>
                        <th>SL</th>
                        <th>Item Description</th>
                        <th>Unit</th>
                        <th>Rate</th>
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
            </div>
        )
    }
} 

export default Items
