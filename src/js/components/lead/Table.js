import Action from 'block/action/row';
import { Arrow, Email, Tag } from 'block/icon';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';

const TableHeader = props => {
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
                    Contact Name
                </th>
                <th>
                    <Email />
                    Email
                </th>
                <th>
                    <Arrow />
                    Lead Level
                </th>
                <th>
                    <Tag/>
                    Tag
                </th>
                <th>
                    Date
                </th>
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
        navigate(`/lead/single/${id}`);
    };

    let rows = props.tableData.map((row, index) => {

        let data = props.checkedBoxes.data;
        const checkedCheckbox = (data.indexOf(row.id) !== -1) ? true : false;
        const level = row.level_id;

        let img = ncpi.assetImgUri + 'avatar.png';
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
                <td onClick={() => handleOverview(row.id)} className='pi-cursor-pointer'>
                    <div className="pi-avater">
                        <img src={img} alt="avatar" />
                        <span>{(row.person) ? row.person.first_name : row.org.name}</span>
                    </div>
                </td>
                <td onClick={() => handleOverview(row.id)} className='pi-cursor-pointer'>{(row.person) ? row.person.email : row.org.email}</td>
                <td>
                    {(level.color && level.bg_color) && <span className="pi-badge"
                        style={{
                            backgroundColor: level.bg_color,
                            color: level.color
                        }}
                    >
                        <svg
                            width={6}
                            height={6}
                            viewBox="0 0 6 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx={3} cy={3} r={3} fill={level.color} />
                        </svg>
                        {level.label}
                    </span>}

                    {(!level.color || !level.bg_color) && <span className="pi-badge">
                        {level.label}
                    </span>}

                </td>
                <td onClick={() => handleOverview(row.id)} className='pi-cursor-pointer'>
                    {row.tags && row.tags.map((tag, tagIndex) => {
                        return (
                            <span key={tagIndex} className="pi-badge pi-mr-5">{tag.label}</span>
                        )
                    })}
                </td>
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