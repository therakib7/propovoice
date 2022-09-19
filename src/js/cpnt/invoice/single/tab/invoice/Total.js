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
                        item_total += itemsTaxTotal();
                        item_total += calcTax();
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
                        item_total += itemsTaxTotal();
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

    let tax_fields = [];
    let fee_fields = [];
    let discount_fields = [];
    let addi_amount = [];
    if (extra_field) {
        extra_field.map((item, i) => {
            if (item.extra_amount_type == 'tax') {
                tax_fields.push(item);
            } else if (item.extra_amount_type == 'fee') {
                fee_fields.push(item);
            } else {
                discount_fields.push(item);
            }
        });
        addi_amount = [...tax_fields, ...fee_fields, ...discount_fields] 
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

                        if (item.type == 'discount' && !tax_cal) {
                            total += itemsTaxTotal();
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