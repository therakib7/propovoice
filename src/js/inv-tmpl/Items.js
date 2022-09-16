import Item from './Item' 
export default (props) => {
    
    const {id, desc, qty, price, tax, amount} = props.item_label;
    const {currency} = props.data.invoice; 
    return (
        <div className="pv-inv-items">
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '35px' }}>{id}</th>
                        <th style={{ width: 'auto' }}>{desc}</th>
                        <th style={{ width: '125px' }}>{qty}</th>
                        <th style={{ width: '135px' }}>{price} ({currency})</th>
                        {props.item_tax && <th style={{ width: '125px' }}>{tax}</th>}
                        <th style={{ width: '90px' }}>{amount}</th>
                    </tr>
                </thead>
                <tbody>
                    {props.items.map((item, i) => {
                        return (
                            <Item {...props} item={item} item_tax={props.item_tax} id={i} key={i} />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}  
