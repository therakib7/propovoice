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
                    {i18n.org}
                </th>
                {/* <th>
                    Status
                </th>  */}
                <th>
                    {i18n.created_at}
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
        navigate(`/contact/${id}`);
    };

    let rows = props.tableData.map((row, index) => {

        let data = props.checkedBoxes.data;
        const checkedCheckbox = (data.indexOf(row.id) !== -1) ? true : false;
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
                        <img src={row.img ? row.img.src : ndpv.assetImgUri + 'avatar.png'} alt="avatar" />
                        <span>{row.first_name}</span>
                    </div>
                </td>
                <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer'>{row.email}</td>
                <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer'>{row.org_name}</td>
                {/* <td><span className='pv-badge'>Client</span></td>  */}
                <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer'>{row.date}</td>
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
            {tableData.length > 0 && <div className='pv-table-wrap pv-mt-15'>
                <table className='pv-table'>
                    <TableHeader checkedBoxes={checkedBoxes} />
                    <TableBody tableData={tableData} editEntry={editEntry} checkedBoxes={checkedBoxes} deleteEntry={deleteEntry} />
                </table>
            </div>}
        </>
    );
}

export default Table;