import Item from './Item' 
export default (props) => {
    const {id, desc, qty, price, tax, amount} = props.item_label;
    return (
        <div className="pv-inv-items">
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '35px' }}>{id}</th>
                        <th style={{ width: 'auto' }}>{desc}</th>
                        <th style={{ width: '125px' }}>{qty}</th>
                        <th style={{ width: '135px' }}>{price} (USD)</th>
                        {props.item_tax && <th style={{ width: '125px' }}>{tax}</th>}
                        <th style={{ width: '90px' }}>{amount}</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((item, i) => {
                        return (
                            <Item data={item} item_tax={props.item_tax} id={i} key={i} />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}  
