import React, { Component } from 'react' 

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
	
	calcGrandTotal = () => { 
		let item_total = this.calcItemsTotal();
		let total = item_total;
		let extra_field = this.props.data.invoice.extra_field;
		extra_field.map( ( item, i ) => {
			if ( item.val_type == 'percent') {
				if ( item.type == 'tax' || item.type == 'fee' ) {
					total += item_total * (item.val / 100);
				} else {
					total -= item_total * (item.val / 100);
				} 
			} else { 
				if ( item.type == 'tax' || item.type == 'fee' ) {
					total += parseFloat(item.val);
				} else {
					total -= parseFloat(item.val);
				}
			}
		}); 
		return total;
	}

    render = () => { 
		const extra_field = this.props.data.invoice.extra_field;
        return ( 
            <div className="pi-inv-total">
                <table>
                    <tbody>
                        <tr className='pi-inv-e-bold'>
                            <th>Total</th>
                            <td>{this.formatCurrency(this.calcItemsTotal())}</td>
                        </tr>

						{extra_field.map((item, i) => {
                            let item_total = this.calcItemsTotal();
                            let total = item_total;
                            if (item.val_type == 'percent') {
                                total = item_total * (item.val / 100);
                            } else {
                                total = parseFloat(item.val);
                            }

                            return (<tr key={i}>
                                <th>
                                    {item.name} {item.val_type == 'percent' ? '%' : '$'}
                                </th>
                                <td>{this.formatCurrency(total)}</td> 
                            </tr>)
                        })} 

                        <tr className="pi-inv-table-bg">
                            <th>Subtotal</th>
                            <td>{this.formatCurrency(this.calcGrandTotal())}</td>
                        </tr>
                    </tbody>
                </table>
            </div> 
        )
    }
}  
export default Total


