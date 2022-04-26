import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Total extends Component {

    locale = 'en-US'
	currency = 'USD'

    constructor(props) {
		super(props); 
	}

    componentDidMount() {  
		/* this.setState({
            invoice: this.props.data.invoice
        }); */
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
		return this.props.data.invoice.items.reduce((prev, cur) => (prev + (cur.qty * cur.price)), 0)
	}

	calcTaxTotal = () => {
		let extra_field = this.props.data.invoice.extra_field;
		if ( extra_field.hasOwnProperty('tax') && extra_field.tax == 'percent' ) {
			return this.calcItemsTotal() * (this.props.data.invoice.tax / 100)
		} else {
			return this.props.data.invoice.tax;
		} 
	}

	calcDiscountTotal = () => {
		let extra_field = this.props.data.invoice.extra_field;
		if ( extra_field.hasOwnProperty('discount') && extra_field.discount == 'percent' ) {
			return this.calcItemsTotal() * (this.props.data.invoice.discount / 100)
		} else {
			return this.props.data.invoice.discount;
		} 
	}

	calcGrandTotal = () => { 
		let total = this.calcItemsTotal();
		let extra_field = this.props.data.invoice.extra_field;
		if ( extra_field.hasOwnProperty('tax') ) {
			total += this.calcTaxTotal();
		}
		if ( extra_field.hasOwnProperty('discount') ) {
			total -= this.calcDiscountTotal();
		} 
		return total;
	}

    render = () => { 
		const extra_field = this.props.data.invoice.extra_field;
        return ( 
            <div className="pi-amounting">
                <table>
                    <tbody>
                        <tr>
                            <th>Total:</th>
                            <td>{this.formatCurrency(this.calcItemsTotal())}</td>
                        </tr>

                        {extra_field.hasOwnProperty('tax') && <tr>
                            <th>Tax {this.props.data.invoice.tax}{extra_field.tax == 'percent' ? '%' : '$'}</th>
                            <td>{this.formatCurrency(this.calcTaxTotal())}</td>
                        </tr>}

						{extra_field.hasOwnProperty('discount') && <tr className="pi-before-total">
                            <th>Discount {this.props.data.invoice.discount}{extra_field.discount == 'percent' ? '%' : '$'}</th>
                            <td>{this.formatCurrency(this.calcDiscountTotal())}</td>
                        </tr>}

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


