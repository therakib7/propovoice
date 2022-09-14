export default (props) => {

    const formatCurrency = (amount) => {
        const { currency, lang } = props.data;
        return (new Intl.NumberFormat(lang, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(amount))
    }

    const calcItemsTotal = () => {
        return props.data.items.reduce((prev, cur) => {
			let tax_total = 0; 
			if (props.data.item_tax && cur.tax) {
				if (cur.tax_type == 'percent') {
					tax_total += cur.price * (cur.tax / 100);
				} else {
					tax_total += parseFloat(cur.tax);
				} 
			}
			
			return prev + (cur.qty * cur.price) + tax_total;
		}, 0)
    }

    const calcGrandTotal = () => {
        let item_total = calcItemsTotal();
        let total = item_total;
        let extra_field = props.data.extra_field;
        extra_field.map((item, i) => {
            if (item.val_type == 'percent') {
                if (item.type == 'tax' || item.type == 'fee') {
                    total += item_total * (item.val / 100);
                } else {
                    total -= item_total * (item.val / 100);
                }
            } else {
                if (item.type == 'tax' || item.type == 'fee') {
                    total += parseFloat(item.val);
                } else {
                    total -= parseFloat(item.val);
                }
            }
        });
        return total;
    }

    const extra_field = props.data.extra_field;
    const i18n = ndpv.i18n;
    return (
        <div className="pv-inv-total">
            <table>
                <tbody>
                    <tr className='pv-inv-e-bold'>
                        <th>{i18n.subT}</th>
                        <td>{formatCurrency(calcItemsTotal())}</td>
                    </tr>

                    {extra_field.map((item, i) => {
                        let item_total = calcItemsTotal();
                        let total = item_total;
                        if (item.val_type == 'percent') {
                            total = item_total * (item.val / 100);
                        } else {
                            total = parseFloat(item.val);
                        }

                        return (<tr key={i}>
                            <th>
                                {item.name} {item.val}{item.val_type == 'percent' ? '%' : ''}
                            </th>
                            <td>{formatCurrency(total)}</td>
                        </tr>)
                    })}

                    <tr className="pv-inv-table-bg">
                        <th>{i18n.total}</th>
                        <td>{formatCurrency(calcGrandTotal())}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
} 