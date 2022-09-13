const Total = props => {
    const { currencyFormatter, itemsTotal, extra_field, changeHandler, focusHandler, grandTotal } = props
    const i18n = ndpv.i18n;
    return (
        <table> 
            <tbody>
                <tr>
                    <td>{i18n.subT}</td>
                    <td>{currencyFormatter(itemsTotal())}</td>
                </tr>
                {extra_field.map((item, i) => {
                    let item_total = itemsTotal();
                    let total = item_total;
                    if (item.val_type == 'percent') {
                        total = item_total * (item.val / 100);
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
export default Total