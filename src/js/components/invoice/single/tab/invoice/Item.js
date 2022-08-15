const Item = props => {
    const calcItemTotal = (qty, price, tax, tax_type) => {
        let tax_total = 0;
        if (props.item_tax && tax) {
            if (tax_type == 'percent') {
                tax_total += price * (tax / 100);
            } else {
                tax_total += parseFloat(tax);
            }
        }
        return (qty * price) + tax_total;
    }

    const { index, title, desc, qty, qty_type, item_tax, tax, tax_type, price } = props
    const i18n = ndpi.i18n;
    return (
        <>
            <td>
                <input
                    name="title"
                    type="text"
                    placeholder={i18n.title}
                    value={title}
                    onChange={props.changeHandler(index)} /> <br />

                <textarea
                    name="desc"
                    type="text"
                    placeholder={i18n.desc}
                    value={desc}
                    onChange={props.changeHandler(index)} />
            </td>
            <td>
                <div className='pi-field-checkbox pi-field-checkbox-input'>
                    <input
                        name="qty"
                        type="number"
                        min="0.00"
                        step="1"
                        max="9999999.99"
                        value={qty}
                        onChange={props.changeHandler(index)}
                        style={{ width: '60px' }}
                        onFocus={props.focusHandler} />

                    <select name="qty_type"
                        value={qty_type}
                        onChange={props.changeHandler(index)} >
                        <option value="unit">Unit</option>
                        <option value="page">Page</option>
                        <option value="hour">Hour</option>
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                    </select>
                </div>
            </td>
            <td>
                <input
                    name="price"
                    type="number"
                    style={{ width: '80px' }}
                    step="0.01"
                    min="0.00"
                    max="9999999.99"
                    value={price}
                    onChange={props.changeHandler(index)}
                    onFocus={props.focusHandler}
                />
            </td>
            {item_tax && <td>
                <div className='pi-field-checkbox pi-field-checkbox-input'>
                    <input
                        name="tax"
                        type="number"
                        min="0.00"
                        step="1"
                        max="9999999.99"
                        value={tax}
                        onChange={props.changeHandler(index)}
                        onFocus={props.focusHandler} />

                    <select name="tax_type"
                        value={tax_type}
                        onChange={props.changeHandler(index)}
                        style={{ width: '37px' }}
                    >
                        <option value="percent">%</option>
                        <option value="fixed">$</option>
                    </select>
                </div>
            </td>}

            <td>
                {props.currencyFormatter(calcItemTotal(qty, price, tax, tax_type))}
            </td>
            <td>
                <span
                    onClick={props.deleteHandler(index)}
                >
                    <svg
                        width={15}
                        height={15}
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.195 1.204a.666.666 0 01.942 0l2.859 2.862 2.859-2.862a.666.666 0 11.942.942l-2.86 2.862 2.86 2.862a.667.667 0 01-.942.943L4.995 5.95 2.138 8.813a.666.666 0 01-.942-.943l2.86-2.862-2.86-2.862a.667.667 0 010-.942z"
                            fill="#4A5568"
                            stroke="#A0AEC0"
                            strokeWidth={0.5}
                        />
                    </svg>
                </span>
            </td>
        </>
    )
}

export default Item


