import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import Action from 'block/action/row';
import { Arrow, Email, Tag } from '../../blocks/icon';

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
                    Project Title
                </th>
                <th>
                <Email/>
                    Client
                </th>
                <th>
                <Arrow/>
                {i18n.start} {i18n.date}
                </th>
                <th>
                    <Arrow/>
                    {i18n.due} {i18n.date}
                </th>
                <th>
                <Arrow/>
                    Budget
                </th>
                <th>
                <Tag/>
                    Status
                </th>
                {/* <th>
                    Date
                </th> */}
                <th>
                    Action
                </th>
            </tr>
        </thead>
    );
}

const TableBody = props => {

    const navigate = useNavigate();
    const handleOverview = (id) => {
        navigate(`/project/single/${id}`);
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
                <td onClick={() => handleOverview(row.id)} className='pi-cursor-pointer'>{row.title}</td>
                <td onClick={() => handleOverview(row.id)} className='pi-cursor-pointer'>{(row.person) ? row.person.email : row.org.email}</td>
                <td onClick={() => handleOverview(row.id)} className='pi-cursor-pointer'>{row.start_date && <Moment format="YYYY-MM-DD">{row.start_date}</Moment>}</td>
                <td onClick={() => handleOverview(row.id)} className='pi-cursor-pointer'>{row.due_date && <Moment format="YYYY-MM-DD">{row.due_date}</Moment>}</td>
                <td onClick={() => handleOverview(row.id)} className='pi-cursor-pointer'>${row.budget}</td>
                <td><span className="pi-badge">{row.status_id && row.status_id.label}</span></td>
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
            {tableData.length > 0 && <div className='pi-table-wrap'>
                <table className='pi-table'>
                    <TableHeader checkedBoxes={checkedBoxes} />
                    <TableBody tableData={tableData} editEntry={editEntry} checkedBoxes={checkedBoxes} deleteEntry={deleteEntry} />
                </table>
            </div>}
        </>
    );
}

export default Table;