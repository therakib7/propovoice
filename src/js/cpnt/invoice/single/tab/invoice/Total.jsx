const Total = ({ inv, currencyFormatter, changeHandler, focusHandler }) => {

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
        let total = 0;
        let item_total = itemsTotal();
        let item_tax_total = itemsTaxTotal();
        extra_field.map((item) => {

            if (item.type == 'tax') {
                let val = item.val ? item.val : 0;
                if (item.val_type == 'percent') {
                    let tax_cal = item.hasOwnProperty('tax_cal') ? item.tax_cal : '';
                    let item_tax = 0;
                    if (!tax_cal) {
                        item_tax = item_tax_total;
                    }
                    total += (item_total + item_tax) * (val / 100);
                } else {
                    total += parseFloat(val);
                }
            }
        })

        return total;
    }

    const calcFee = () => {
        let total = 0;
        let item_total = itemsTotal();
        let item_tax_total = itemsTaxTotal() + calcTax();
        extra_field.map((item, i) => {
            if (item.type == 'fee') {
                let val = item.val ? item.val : 0;
                if (item.val_type == 'percent') {
                    let tax_cal = item.hasOwnProperty('tax_cal') ? item.tax_cal : '';
                    let item_tax = 0;
                    if (!tax_cal) {
                        item_tax = item_tax_total;
                    }
                    total += (item_total + item_tax) * (val / 100);
                } else {
                    total += parseFloat(val);
                }
            }
        })

        return total;
    }

    const calcDisc = () => {
        let total = 0;
        let item_total = itemsTotal();
        let item_tax_total = itemsTaxTotal() + calcTax();
        let item_fee_total = calcFee();
        extra_field.map((item, i) => {

            if (item.type == 'discount') {
                let val = item.val ? item.val : 0;
                if (item.val_type == 'percent') {
                    let tax_cal = item.hasOwnProperty('tax_cal') ? item.tax_cal : '';
                    let item_tax = 0;
                    if (!tax_cal) {
                        item_tax = item_tax_total;
                    }

                    let fee_cal = item.hasOwnProperty('fee_cal') ? item.fee_cal : '';
                    let item_fee = 0;
                    if (!fee_cal) {
                        item_fee = item_fee_total;
                    }
                    total += (item_total + item_tax + item_fee) * (val / 100);
                } else {
                    total += parseFloat(val);
                }
            }
        })

        return total;
    }

    const grandTotal = () => {
        let total = itemsTotal();
        if (inv.item_tax) {
            total += itemsTaxTotal();
        }
        total += calcTax();
        total += calcFee();
        total -= calcDisc();
        return total;
    }

    const i18n = ndpv.i18n;

    let tax_fields = [];
    let fee_fields = [];
    let discount_fields = [];
    let addi_amount = [];
    if (extra_field) {
        extra_field.map((item, i) => {
            if (item.extra_amount_type == 'tax' || item.type == 'tax') {
                tax_fields.push(item);
            } else if (item.extra_amount_type == 'fee' || item.type == 'fee') {
                fee_fields.push(item);
            } else {
                discount_fields.push(item);
            }
        });
        addi_amount = [...discount_fields, ...fee_fields, ...tax_fields]
    }
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

                {addi_amount.map((item, i) => {
                    let total = itemsTotal();
                    let val = item.val ? item.val : 0;
                    if (item.val_type == 'percent') {
                        let tax_cal = item.hasOwnProperty('tax_cal') ? item.tax_cal : '';
                        let fee_cal = item.hasOwnProperty('fee_cal') ? item.fee_cal : '';

                        if (item.type == 'tax' && !tax_cal) {
                            total += itemsTaxTotal();
                        }

                        if (item.type == 'fee' && !tax_cal) {
                            total += itemsTaxTotal();
                            total += calcTax();
                        }

                        if (item.type == 'discount') {

                            if (!tax_cal) {
                                total += itemsTaxTotal();
                                total += calcTax();
                            }

                            if (!fee_cal) {
                                total += calcFee();
                            }
                        }

                        total *= (val / 100);
                    } else {
                        total = parseFloat(val);
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
export default Total;