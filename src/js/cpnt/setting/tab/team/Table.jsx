import Action from 'block/action/row';
import { Arrow, Email, Tag } from 'block/icon';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';
const { caps } = ndpv;
const isStaff = caps.includes("ndpv_staff");

const TableHeader = props => {
    const i18n = ndpv.i18n;
    return (
        <thead>
            <tr>
                {!isStaff && <th>
                    <input type="checkbox" onChange={(e) => props.checkedBoxes.handle(e, 'all')} />
                </th>}
                <th>
                    {i18n.name}
                </th>
                <th>
                    <Email />
                    {i18n.email}
                </th>
                <th>
                    <Arrow />
                    Role
                </th>
                {!isStaff && <th>
                    {i18n.action}
                </th>}
            </tr>
        </thead>
    );
}

const TableBody = props => {
    const navigate = useNavigate();
    const handleOverview = (id) => {
        navigate(`/lead/${id}`);
    };

    let rows = props.tableData.map((row, index) => {

        let data = props.checkedBoxes.data;
        const checkedCheckbox = (data.indexOf(row.id) !== -1) ? true : false;
        const level = row.level_id;

        let img = ndpv.assetImgUri + 'avatar.png';
        if (row.img) {
            img = row.img;
        }

        return (
            <tr key={index}>
                {!isStaff && <td>
                    {row.role != 'administrator' && <input type="checkbox"
                        value={row.id}
                        checked={checkedCheckbox}
                        onChange={(e) => props.checkedBoxes.handle(e, 'single', row.id)}
                    />}
                </td>}
                <td>
                    <div className="pv-avater">
                        <img src={img} alt="avatar" />
                        <span>{row.name}</span>
                    </div>
                </td>
                <td>{row.email}</td>
                <td>
                    {row.role_title}
                </td>
                {!isStaff && <td className="pv-action">
                    {row.role != 'administrator' && <Action
                        row={row}
                        editEntry={props.editEntry}
                        deleteEntry={props.deleteEntry}
                        resendPassword={
                            {
                                show: true,
                                from: 'team'
                            }
                        }
                    />}
                </td>}
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
