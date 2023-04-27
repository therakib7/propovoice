import EditIcon from "./icons/EditIcon"
import DeleteIcon from "./icons/DeleteIcon"
import api from 'api';
import { useEffect, useState } from "react";

export default function SavedItemsSettings() {
    let Row = (props) => {
        let row = props.row;
        return (
            <tr key={props.index}>
                <td><input type="checkbox" /></td>
                <td>
                    {row.title}

                </td>
                <td>{row.qty}</td>
                <td>{row.qty_type}</td>
                <td>{row.tax}</td>
                <td>${row.price}</td>
                <td><EditIcon /><DeleteIcon /></td>
            </tr>
        )
    }

    let TableRows = () => {
        const [rows, setRows] = useState(null)
        useEffect(() => {
            async function getRows() {
                 await api.get('savefornext', '').then(data => {
                    let rows = data.data.map((row, index) => {
                        return <Row key={index} row={row} />
                    });
                    setRows(rows)
                });

            }
            getRows();
        }, [])

        return <tbody>{rows}</tbody>
    }
    return <div>
        <h3>Saved Items</h3>
        <table className='pv-table'>
            <thead>
                <tr>
                    <th>
                        <input type="checkbox" />
                    </th>
                    <th>Item & DESCRIPTION</th>
                    <th>QTY</th>
                    <th>RATE</th>
                    <th>TAX</th>
                    <th>AMOUNT</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <TableRows />
        </table>
    </div>
}