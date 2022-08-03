import Item from './Item' 
const Items = props => {
    return (
        <div className="pi-inv-items">
            <table>
                <thead>
                    <tr>
                        <th>SL</th>
                        <th style={{ width: 'auto' }}>Title &amp; Description</th>
                        <th style={{ width: '125px' }}>Quantity</th>
                        <th style={{ width: '135px' }}>Rate (USD)</th>
                        {props.item_tax && <th style={{ width: '125px' }}>Tax</th>}
                        <th style={{ width: '90px' }}>Amount</th>
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
export default Items;
