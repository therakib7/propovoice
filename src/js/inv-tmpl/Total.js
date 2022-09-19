export default (props) => {

    const { inv } = props;
    const extra_field = inv.extra_field;

    const formatCurrency = (amount) => {
        const { currency, lang } = inv;
        return (new Intl.NumberFormat(lang, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(amount))
    }

    const itemsTotal = () => {
        return inv.items.reduce((prev, cur) => {
            return prev + (cur.qty * cur.price);
        }, 0)
    }

    const itemsTaxTotal = () => {
        return inv.items.reduce((prev, cur) => {
            let tax_total = 0;
            if (inv.item_tax && cur.tax) {
                if (cur.tax_type == 'percent') {
                    tax_total += (cur.qty * cur.price) * (cur.tax / 100);
                } else {
                    tax_total += parseFloat(cur.tax);
                }
            }

            return prev + tax_total;
        }, 0)
    }

    const calcTax = () => {
        let total = 0;
        let item_total = itemsTotal();
        extra_field.map((item, i) => {

            if (item.type == 'tax') {

                if (item.val_type == 'percent') {
                    let tax_cal = item.hasOwnProperty('tax_cal') ? item.tax_cal : '';
                    if (!tax_cal) {
                        item_total += itemsTaxTotal();
                    }
                    total = item_total * (item.val / 100);
                } else {
                    total = parseFloat(item.val);
                }
            }
        })

        return total;
    }

    const calcFee = () => {
        let total = 0;
        let item_total = itemsTotal();
        extra_field.map((item, i) => {

            if (item.type == 'fee') {

                if (item.val_type == 'percent') {
                    let tax_cal = item.hasOwnProperty('tax_cal') ? item.tax_cal : '';
                    if (!tax_cal) {
                        item_total += calcTax('tax');
                    }
                    total = item_total * (item.val / 100);
                } else {
                    total = parseFloat(item.val);
                }
            }
        })

        return total;
    }

    const calcDisc = () => {
        let total = 0;
        let item_total = itemsTotal();
        extra_field.map((item, i) => {

            if (item.type == 'discount') {

                if (item.val_type == 'percent') {
                    let tax_cal = item.hasOwnProperty('tax_cal') ? item.tax_cal : '';
                    if (!tax_cal) {
                        item_total += calcTax();
                    }

                    let fee_cal = item.hasOwnProperty('fee_cal') ? item.fee_cal : '';
                    if (!fee_cal) {
                        item_total += calcFee();
                    }

                    total = item_total * (item.val / 100);
                } else {
                    total = parseFloat(item.val);
                }
            }
        })

        return total;
    }

    const grandTotal = () => {
        let total = itemsTotal();
        if ( inv.item_tax ) {
            total += itemsTaxTotal();
        }
        total += calcTax();
        total += calcFee();
        total -= calcDisc();
        return total;
    }

    const i18n = ndpv.i18n;
    return (
        <div className="pv-inv-total">
            <table>
                <tbody>
                    <tr className='pv-inv-e-bold'>
                        <th>{i18n.subT}</th>
                        <td>{formatCurrency(itemsTotal())}</td>
                    </tr>

                    {inv.item_tax && <tr className='pv-inv-e-bold'>
                        <th>{i18n.items} {i18n.tax}</th>
                        <td>{formatCurrency(itemsTaxTotal())}</td>
                    </tr>} 

                    {extra_field.map((item, i) => {
                        let total = itemsTotal();

                        if (item.val_type == 'percent') {
                            let tax_cal = item.hasOwnProperty('tax_cal') ? item.tax_cal : '';
                            let fee_cal = item.hasOwnProperty('fee_cal') ? item.fee_cal : '';

                            if (item.type == 'tax' && !tax_cal) {
                                total += itemsTaxTotal();
                            }

                            if (item.type == 'fee' && !tax_cal) {
                                total += calcTax();
                            }

                            if (item.type == 'discount' && !tax_cal) {
                                total += calcTax();
                            }

                            if (item.type == 'discount' && !fee_cal) {
                                total += calcFee();
                            }

                            total *= (item.val / 100);
                        } else {
                            total = parseFloat(item.val);
                        }

                        return (<tr key={i}>
                            <th>
                                {item.name}
                            </th>
                            <td>{formatCurrency(total)}</td>
                        </tr>)
                    })}

                    <tr className="pv-inv-table-bg">
                        <th>{i18n.total}</th>
                        <td>{formatCurrency(grandTotal())}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
} 