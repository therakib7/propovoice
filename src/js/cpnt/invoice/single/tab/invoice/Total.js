export default (props) => {
    const { inv, currencyFormatter, changeHandler, focusHandler } = props
    const extra_field = inv.extra_field;
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
        let total = itemsTotal();
        extra_field.map((item, i) => {

            if (item.type == 'tax') {
                let tax_cal = item.hasOwnProperty('tax_cal') ? item.tax_cal : '';  
                if (!tax_cal) {
                    total += itemsTaxTotal();
                }

                if (item.val_type == 'percent') {
                    total *= (item.val / 100);
                } else {
                    total = parseFloat(item.val);
                }
            }
        })

        return total;
    }

    const calcFee = () => {
        let total = itemsTotal();
        extra_field.map((item, i) => {

            if (item.type == 'fee') {
                let tax_cal = item.hasOwnProperty('tax_cal') ? item.tax_cal : '';  
                if (!tax_cal) {
                    total += calcTax('tax');
                }

                if (item.val_type == 'percent') {
                    total *= (item.val / 100);
                } else {
                    total = parseFloat(item.val);
                }
            }
        })

        return total;
    }

    const calcDis = () => {
        let total = itemsTotal();
        extra_field.map((item, i) => {

            if (item.type == 'discount') {
                let tax_cal = item.hasOwnProperty('tax_cal') ? item.tax_cal : '';  
                if (!tax_cal) {
                    total += calcTax();
                }

                let fee_cal = item.hasOwnProperty('fee_cal') ? item.fee_cal : '';  
                if (!fee_cal) {
                    total += calcFee();
                }

                if (item.val_type == 'percent') {
                    total *= (item.val / 100);
                } else {
                    total = parseFloat(item.val);
                }
            }
        })

        return total;
    }

    const grandTotal = () => {
        let item_total = itemsTotal();
        let item_tax_total = itemsTaxTotal();
        let total = item_total;
        console.log(calcTax());
        console.log(calcFee());
        console.log(calcDis());
        extra_field.map((item, i) => {
            if (item.val_type == 'percent') {

                // console.log();
                let tax_cal = item.hasOwnProperty('tax_cal') ? item.tax_cal : '';
                let fee_cal = item.hasOwnProperty('fee_cal') ? item.fee_cal : '';

                if (item.type == 'tax' && !tax_cal) {
                    total += item_tax_total;
                }

                if (item.type == 'fee' && !fee_cal) {
                    total += item_tax_total;
                }

                if (item.type == 'tax' || item.type == 'fee') {
                    total += total * (item.val / 100);
                } else {
                    total -= total * (item.val / 100);
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

    const i18n = ndpv.i18n;
    return (
        <table>
            <tbody>
                <tr>
                    <td>{i18n.subT}</td>
                    <td>{currencyFormatter(itemsTotal())}</td>
                </tr>

                {inv.item_tax && <tr>
                    <td>{i18n.items} {i18n.tax}</td>
                    <td>{currencyFormatter(itemsTaxTotal())}</td>
                </tr>}

                {
                    extra_field.map((item, i) => {
                        let total = itemsTotal();

                        let tax_cal = item.hasOwnProperty('tax_cal') ? item.tax_cal : '';
                        let fee_cal = item.hasOwnProperty('fee_cal') ? item.fee_cal : '';

                        if (item.type == 'tax' && !tax_cal) {
                            total += itemsTaxTotal();
                        }

                        if (item.type == 'fee' && !fee_cal) {
                            total += itemsTaxTotal();
                        }

                        if (item.val_type == 'percent') {
                            total *= (item.val / 100);
                        } else {
                            total = parseFloat(item.val);
                        }

                        return (<tr key={i}>
                            <td>
                                {item.name}
                                <input
                                    name={"extra-item-" + i}
                                    type="number"
                                    step="1"
                                    min="0.00"
                                    value={item.val}
                                    onChange={(e) => changeHandler(e, item)}
                                    onFocus={focusHandler}
                                />
                                {item.val_type == 'percent' ? '%' : ''}
                            </td>
                            <td>{currencyFormatter(total)}</td>
                        </tr>)
                    })}

                <tr>
                    <td>{i18n.total}</td>
                    <td>{currencyFormatter(grandTotal())}</td>
                </tr>
            </tbody>
        </table>
    )
} 