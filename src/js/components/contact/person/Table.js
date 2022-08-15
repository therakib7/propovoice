import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import Action from 'block/action/row';

const TableHeader = props => {
    const i18n = ndpi.i18n;
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
                    {i18n.contact} {i18n.person}
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
        navigate(`/contact/single/${id}`);
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
                <td onClick={() => handleOverview(row.id)} className='pi-cursor-pointer'>
                    <div className="pi-avater">
                        <img src={row.img ? row.img.src : ndpi.assetImgUri + 'avatar.png'} alt="avatar" />
                        <span>{row.first_name}</span>
                    </div>
                </td>
                <td onClick={() => handleOverview(row.id)} className='pi-cursor-pointer'>{row.email}</td>
                <td onClick={() => handleOverview(row.id)} className='pi-cursor-pointer'>{row.org_name}</td>
                {/* <td><span className='pi-badge'>Client</span></td>  */}
                <td onClick={() => handleOverview(row.id)} className='pi-cursor-pointer'><Moment format="YYYY-MM-DD">{row.date}</Moment></td>
                <td className="pi-action">
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
            {tableData.length > 0 && <div className='pi-table-wrap pi-mt-15'>
                <table className='pi-table'>
                    <TableHeader checkedBoxes={checkedBoxes} />
                    <TableBody tableData={tableData} editEntry={editEntry} checkedBoxes={checkedBoxes} deleteEntry={deleteEntry} />
                </table>
            </div>}
        </>
    );
}

export default Table;