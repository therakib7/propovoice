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
                    {i18n.ct} {i18n.name}
                </th>
                <th>
                    <Email />
                    {i18n.email}
                </th>
                <th>
                    <Arrow />
                    {i18n.lead} {i18n.level}
                </th>
                <th>
                    <Tag />
                    {i18n.tag}
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
        navigate(`/lead/single/${id}`);
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
                <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer'>
                    <div className="pv-avater">
                        <img src={img} alt="avatar" />
                        <span>{(row.person) ? row.person.first_name : row.org.name}</span>
                    </div>
                </td>
                <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer'>{(row.person) ? row.person.email : row.org.email}</td>
                <td>
                    {level && <>
                        {(level.color && level.bg_color) && <span className="pv-badge"
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
                            >
                                <circle cx={3} cy={3} r={3} fill={level.color} />
                            </svg>
                            {level.label}
                        </span>}

                        {(!level.color || !level.bg_color) && <span className="pv-badge">
                            {level.label}
                        </span>}
                    </>}
                </td>
                <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer'>
                    {row.tags && row.tags.map((tag, tagIndex) => {
                        return (
                            <span key={tagIndex} className="pv-badge pv-mr-5">{tag.label}</span>
                        )
                    })}
                </td>
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