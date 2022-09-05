export default (props) => { 

    const formatCurrency = (amt) => { 
        const {currency, lang} = props.data.invoice; 
        return (new Intl.NumberFormat(lang, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(amt))
    }

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

    const titleize = (slug) => {
        let words = slug.split("-");
        return words.map(function (word) {
            return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
        }).join(' ');
    }

    const { title, desc, qty, qty_type, tax, tax_type, price } = props.item

    return (
        <tr>
            <td>{props.id + 1}.</td>
            <td>
                {title}<br />
                <span dangerouslySetInnerHTML={{ __html: desc.replaceAll('\n', '<br />') }}></span>
            </td>
            <td>
                {qty} <span>({titleize(qty_type)})</span>
            </td>
            <td>
                {price}
            </td>
            {props.item_tax && <td>{tax}{tax_type == 'percent' ? '%' : ''}</td>}
            <td>{formatCurrency(calcItemTotal(qty, price, tax, tax_type))}</td>
        </tr>
    )
}  