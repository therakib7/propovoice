export default (props) => {
    const locale = 'en-US'
	const currency = 'USD'

    const formatCurrency = (amount) => {
		return (new Intl.NumberFormat(locale, {
			style: 'currency',
			currency: currency,
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		}).format(amount))
	}

    const calcItemTotal = ( qty, price, tax, tax_type ) => {
		let tax_total = 0;
        if ( props.item_tax && tax ) {
            if ( tax_type == 'percent') {
                tax_total += price * (tax / 100);
            } else { 
                tax_total += parseFloat(tax);
            }
        } 
        return (qty * price) + tax_total;
	} 

    const { title, desc, qty, qty_type, tax, tax_type, price } = props.data

    return (
        <tr> 
            <td>{props.id + 1}.</td>
            <td>
                {title}<br />
                <span dangerouslySetInnerHTML={{ __html: desc.replaceAll('\n', '<br />') }}></span>
            </td>
            <td>
                {qty} <span>({qty_type})</span>
            </td>
            <td>
                {price}
            </td>
            {props.item_tax && <td>{tax}{tax_type == 'percent' ? '%' : '$'}</td>}
            <td>{formatCurrency( calcItemTotal( qty, price, tax, tax_type ) )}</td>
        </tr>
    )
}  