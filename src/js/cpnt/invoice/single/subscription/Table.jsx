import Action from 'block/action/row';
import { Arrow, Email, Tag } from 'block/icon';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';

const TableHeader = props => {
    const i18n = ndpv.i18n;
    return (
        <thead>
            <tr>
                <th>
                    <input type="checkbox"
                        // value={row.id}
                        // checked={ props.checkedBoxes.data.find((p) => p.id === row.id)}
                        onChange={(e) => props.checkedBoxes.handle(e, 'all')}
                    />
                </th>
                <th>
                    Start Date
                </th>
                <th>
                    End Date
                </th>
                <th>
                    Status
                </th>
                <th>
                    {i18n.action}
                </th>
            </tr>
        </thead>
    );
}

const TableBody = props => {
    const navigate = useNavigate();
    const handleOverview = (id) => {
        navigate(`/invoice/${id}`);
    };

    let rows = props.tableData.map((row, index) => {

        let data = props.checkedBoxes.data;
        const checkedCheckbox = (data.indexOf(row.id) !== -1) ? true : false;
        const level = row.level_id;

        let img = ndpv.assetImgUri + 'avatar.png';
        if (row.person && row.person.img) {
            img = row.person.img.src;
        } else if (row.org && row.org.img) {
            img = row.org.img.src;
        }

        return (
            <tr key={index}>
                <td>
                    <input type="checkbox"
                        value={row.id}
                        checked={checkedCheckbox}
                        onChange={(e) => props.checkedBoxes.handle(e, 'single', row.id)}
                    />
                </td>
                <td>
                    <Moment format={ndpv.date_format}>{row.start_date}</Moment>
                </td>
                <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer'>
                    <Moment format={ndpv.date_format}>{row.end_date}</Moment>
                </td>
                <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer'>Paid</td>
                <td className="pv-action">
                    <Action
                        row={row}
                        handleOverview={handleOverview}
                        editEntry={props.editEntry}
                        deleteEntry={props.deleteEntry}
                    />
                </td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}

const Table = (props) => {
    const { tableData, editEntry, checkedBoxes, deleteEntry } = props;
    return (
        <>
            {tableData.length > 0 && <div className='pv-table-wrap'>
                <table className='pv-table'>
                    <TableHeader checkedBoxes={checkedBoxes} />
                    <TableBody tableData={tableData} editEntry={editEntry} checkedBoxes={checkedBoxes} deleteEntry={deleteEntry} />
                </table>
            </div>}
        </>
    );
}

export default Table;