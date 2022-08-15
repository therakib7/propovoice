import Item from './Item' 
export default (props) => {
    const label = props.item_label;
    return (
        <div className="pi-inv-items">
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '35px' }}>{label.id}</th>
                        <th style={{ width: 'auto' }}>{label.desc}</th>
                        <th style={{ width: '125px' }}>{label.qty}</th>
                        <th style={{ width: '135px' }}>{label.price} (USD)</th>
                        {props.item_tax && <th style={{ width: '125px' }}>{label.tax}</th>}
                        <th style={{ width: '90px' }}>{label.amount}</th>
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
