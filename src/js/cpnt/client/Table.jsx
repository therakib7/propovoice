import { useNavigate } from 'react-router-dom';
import Action from 'block/action/row';

const TableHeader = props => {
    const i18n = ndpv.i18n;
    return (
        <thead>
            <tr>
                <th>
                    <input type="checkbox" onChange={(e) => props.checkedBoxes.handle(e, 'all')} />
                </th>
                <th>
                    {i18n.ct}
                </th>
                <th>
                    {i18n.email}
                </th>
                <th>
                    {i18n.mob}
                </th>
                <th>
                    {i18n.type}
                </th>
                {!wage.length && <th>
                    {i18n.portal_access}
                </th>}
                <th>
                    {i18n.aut}
                </th>
                <th>
                    {i18n.date}
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
        navigate(`/client/${id}`);
    };

    let rows = props.tableData.map((row, index) => {
        let data = props.checkedBoxes.data;
        const checkedCheckbox = (data.indexOf(row.id) !== -1) ? true : false;

        let img = ndpv.assetImgUri + 'avatar.png';
        if (row.img) {
            img = row.img.src;
        }
        const i18n = ndpv.i18n;
        return (
            <tr key={index}>
                <td>
                    <input type="checkbox"
                        value={row.id}
                        checked={checkedCheckbox}
                        onChange={(e) => props.checkedBoxes.handle(e, 'single', row.id)}
                    />
                </td>
                <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer'>
                    <div className="pv-avater">
                        <img src={img} alt="avatar" />
                        <span>{row.type == 'person' ? row.first_name : row.org_name}</span>
                    </div>
                </td>
                <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer'>{row.email}</td>
                <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer'>{row.mobile}</td>
                <td>{row.type == 'person' ? i18n.prsn : i18n.org}</td>
                {!wage.length && <td>{row.client_portal ? 'Yes' : 'No'}</td>}
                <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer'>{row.author}</td>
                <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer'>{row.date}</td>
                <td className="pv-action">
                    <Action
                        row={row}
                        handleOverview={handleOverview}
                        editEntry={props.editEntry}
                        deleteEntry={props.deleteEntry}
                        resendPassword={
                            {
                                show: (row.client_portal),
                                from: 'client_portal'
                            }
                        }
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