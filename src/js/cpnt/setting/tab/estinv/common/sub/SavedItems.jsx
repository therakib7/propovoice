import EditIcon from "./icons/EditIcon"
import DeleteIcon from "./icons/DeleteIcon"
import api from 'api';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SavedItemsSettings() {

    const [checkedAll, setCheckedAll] = useState(false);
    const [checkedRows, setCheckedRows] = useState([]);
    const [qtyTypes, setQtyTypes] = useState([]);

    let allRowId = []

    const handleSelectAll = (event) => {
        const { checked } = event.target;
        setCheckedAll(checked);
        setCheckedRows(checked ? allRowId : []);
    };

    const handleSelectRow = (event, rowId) => {
        const { checked } = event.target;
        if (checked) {
            setCheckedRows([...checkedRows, rowId]);
        } else {
            setCheckedRows(checkedRows.filter((id) => id !== rowId));
        }
        setCheckedAll(false);
    };

    const deleteRow = (rowId) => {
        api.del('savefornext', rowId).then((res) => {
            setCheckedRows(checkedRows.filter((id) => id !== rowId));
            toast.success('Item Deleted !')
        }).catch(err => {
            toast.error('Unable to delete item');
        })
    }

    const deleteRows = () => {
        let jobs = []
        checkedRows.map((rowId, index) => {

            jobs.push(new Promise((resolve, reject) => {
                api.del('savefornext', rowId).then((res) => {
                    setCheckedRows(checkedRows.filter((id) => id !== rowId));
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            }))

        })

        Promise.all(jobs).then((e) => {
            toast.success('Items deleted');
        });
    }

    const getData = () => {

        useEffect(() => {
            async function getQtyTypes() {
                await api.get('taxonomies', 'taxonomy=estinv_qty_type').then(resp => {
                    if (resp.data.success) {
                        setQtyTypes(resp.data.data.estinv_qty_type)
                    }
                });
            }
            getQtyTypes();
        }, [])
    }

    getData();

    let Row = (props) => {
        let row = props.row;
        const [hidden, setHidden] = useState(true);

        const [data, setData] = useState({
            index: row.index,
            title: row.title,
            desc: row.desc,
            qty: row.qty,
            qty_type: row.qty_type,
            tax: row.tax,
            price: row.price,
        })

        const updateRow = () => {
            row.title = data.title
            setHidden(!hidden)
            api.edit('savefornext', data.index, data).then(res => {
                toast.success('Item updated');
            }).catch(err => console.log(err))
        }

        return (
            <tr key={row.index}>
                <td>
                    <input
                        type="checkbox"
                        checked={checkedRows.includes(row.index)}
                        onChange={(event) => handleSelectRow(event, row.index)}
                    />
                </td>
                <td>
                    <div>
                        <div>{hidden ? <div style={{ fontWeight: '500', fontSize: '14px' }}>{row.title}</div> : <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />}</div>
                        <div>
                            {hidden ? <div style={{ fontWeight: '400px', fontSize: '12px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '150px' }}>{row.desc}</div> : <input style={{ marginTop: '5px' }} type="text" value={data.desc} onChange={(e) => setData({ ...data, desc: e.target.value })} />}
                        </div>
                    </div>
                </td>
                <td>
                    {hidden ? row.qty : <input type="number" style={{ width: '50px' }} value={data.qty} onChange={(e) => setData({ ...data, qty: e.target.value })} />}
                </td>
                <td>
                    {hidden ? data.qty_type :
                        <select value={data.qty_type} onChange={(e) => setData({ ...data, qty_type: e.target.value })}>
                            <option>Select</option>
                            {
                                qtyTypes.map((t, k) => {
                                    return <option key={k} value={t.label}>{t.label}</option>
                                })
                            }
                        </select>
                    }
                </td>
                <td>
                    {hidden ? row.price : <input type="number" style={{ width: '50px' }} value={data.price} onChange={(e) => setData({ ...data, price: e.target.value })} />}
                </td>
                <td>
                    {hidden ? row.tax : <input type="number" style={{ width: '50px' }} value={data.tax} onChange={(e) => setData({ ...data, tax: e.target.value })} />}
                </td>
                <td>${hidden ? row.price * row.qty : data.price * data.qty}</td>
                <td>
                    {!hidden ? <div style={{ width: '100%', display: 'block' }}>
                        <button style={{ border: 'none', cursor: 'pointer', marginLeft: '10px', background: 'none' }} onClick={() => updateRow()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CBD5E0" style={{ width: '16px', height: '16px' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </button>
                        <button style={{ border: 'none', cursor: 'pointer', marginLeft: '10px', background: 'none' }} onClick={() => setHidden(!hidden)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CBD5E0" style={{ width: '16px', height: '16px' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>

                        </button>
                    </div>
                        :
                        <div>
                            <button style={{ border: 'none', cursor: 'pointer', marginLeft: '10px', background: 'none' }} onClick={() => setHidden(!hidden)}><EditIcon /></button>
                            <button style={{ border: 'none', cursor: 'pointer', marginLeft: '10px', background: 'none' }} onClick={() => deleteRow(row.index)}><DeleteIcon /></button>
                        </div>
                    }

                </td>
            </tr>
        )
    }

    let TableRows = () => {
        const [rows, setRows] = useState(null)
        useEffect(() => {
            async function getRows() {
                await api.get('savefornext', '').then(data => {
                    let rows = data.data.map((row, index) => {
                        allRowId.push(row.index)
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

        {checkedRows.length > 0 &&
            <div className="pv-table-action pv-mb-10">
                <div className="pv-checkbox-field pv-mt-6">
                    <span>{checkedRows.length}  Items Selected </span>
                </div>
                <div className="pv-small-button-group">
                    <button onClick={deleteRows} className="pv-btn pv-btn-small pv-bg-stroke pv-bg-shadow pv-bg-hover-shadow">Delete</button>
                </div>
            </div>
        }
        <table className='pv-table'>
            <thead>
                <tr>
                    <th>
                        <input type="checkbox" checked={checkedAll}
                            onChange={handleSelectAll} />
                    </th>
                    <th>Item & Description</th>
                    <th>QTY</th>
                    <th>QTY Type</th>
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