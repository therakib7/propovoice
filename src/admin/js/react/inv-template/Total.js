import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Total extends Component {

    locale = 'en-US'
	currency = 'USD'

    constructor(props) {
		super(props);

		this.state = { 
			invoice: { 
				items: [
					{
						id: null, 
						name: '',
						desc: '',
						qty: 0,
						price: 0.00,
					},
				],
				tax: 0.00,
				paid: 0.00, 
			},
		};
	}

    componentDidMount() {  
		this.setState({
            invoice: this.props.data.invoice
        });
	}

    formatCurrency = (amount) => {
		return (new Intl.NumberFormat(this.locale, {
			style: 'currency',
			currency: this.currency,
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		}).format(amount))
	}

    calcItemsTotal = () => {
		return this.state.invoice.items.reduce((prev, cur) => (prev + (cur.qty * cur.price)), 0)
	}

	calcTaxTotal = () => {
		return this.calcItemsTotal() * (this.state.invoice.tax / 100)
	}

	calcGrandTotal = () => {
		let total = this.calcItemsTotal() + this.calcTaxTotal();
		return total;
	}

    render = () => { 
        return ( 
            <div className="pi-amounting">
                <table>
                    <tbody>
                        <tr>
                            <th>Total:</th>
                            <td>{this.formatCurrency(this.calcItemsTotal())}</td>
                        </tr>
                        <tr className="pi-before-total">
                            <th>Tax {this.state.invoice.tax}%</th>
                            <td>{this.formatCurrency(this.calcTaxTotal())}</td>
                        </tr>
                        <tr className="pi-table-bg">
                            <th>Subtotal:</th>
                            <td>{this.formatCurrency(this.calcGrandTotal())}</td>
                        </tr>
                    </tbody>
                </table>
            </div> 
        )
    }
} 

export default Total


