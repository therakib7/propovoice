import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import Action from 'block/action/row';
import { Arrow, Email, Tag } from 'block/icon';
import { currency } from 'helper';

const { i18n, caps } = ndpv;
const isClient = caps.includes("ndpv_client_role");

const TableHeader = props => {
    return (
        <thead>
            <tr>
                <th>
                    {!isClient && <input type="checkbox"
                        // value={row.id}
                        // checked={ props.checkedBoxes.data.find((p) => p.id === row.id)} 
                        onChange={(e) => props.checkedBoxes.handle(e, 'all')}
                    />}
                </th>
                <th>
                    {i18n.project} {i18n.title}
                </th>
                {!isClient && <th>
                    <Email />
                    {i18n.client}
                </th>}
                <th>
                    <Arrow />
                    {i18n.start} {i18n.date}
                </th>
                <th>
                    <Arrow />
                    {i18n.dueDate}
                </th>
                <th>
                    <Arrow />
                    {i18n.budget}
                </th>
                <th>
                    <Tag />
                    {i18n.status}
                </th>
                {/* <th>
                    {i18n.date}
                </th> */}
                <th>
                    {i18n.aut}
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

        if (isClient && !props.boardView) {
            return;
        }
        navigate(`/project/${id}`);
    };

    let rows = props.tableData.map((row, index) => {

        let data = props.checkedBoxes.data;
        const checkedCheckbox = (data.indexOf(row.id) !== -1) ? true : false;
        return (
            <tr key={index}>
                <td>
                    {!isClient && <input type="checkbox"
                        value={row.id}
                        checked={checkedCheckbox}
                        onChange={(e) => props.checkedBoxes.handle(e, 'single', row.id)}
                    />}
                </td>
                <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer'><span className='pv-list-title'>{row.title}</span></td>
                {!isClient && <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer'>{(row.person) ? row.person.email : row.org.email}</td>}
                <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer'>{row.start_date && <Moment format="YYYY-MM-DD">{row.start_date}</Moment>}</td>
                <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer'>{row.due_date && <Moment format="YYYY-MM-DD">{row.due_date}</Moment>}</td>
                <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer'>{row.budget && row.currency ? currency(row.budget, row.currency) : ''}</td>
                <td>{row.status_id && <span className="pv-badge">{row.status_id.label}</span>}</td>
                <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer'>{row.author}</td>
                <td className="pv-action">
                    <Action
                        project
                        boardView={props.boardView}
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
    const { tableData, editEntry, checkedBoxes, deleteEntry, boardView } = props;
    return (
        <>
            {tableData.length > 0 && <div className='pv-table-wrap'>
                <table className='pv-table pv-table-four'>
                    <TableHeader checkedBoxes={checkedBoxes} />
                    <TableBody tableData={tableData} editEntry={editEntry} checkedBoxes={checkedBoxes} deleteEntry={deleteEntry} boardView={boardView} />
                </table>
            </div>}
        </>
    );
}

export default Table;