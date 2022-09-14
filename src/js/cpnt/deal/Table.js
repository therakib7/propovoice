import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import Action from 'block/action/row';

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
                    {i18n.title}
                </th>
                <th>
                    <svg
                        className='pv-mt-4'
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none" 
                    >
                        <path
                            d="M2 3.5h12V12a.5.5 0 01-.5.5h-11A.5.5 0 012 12V3.5z"
                            stroke="#718096"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M14 3.5L8 9 2 3.5"
                            stroke="#718096"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    {i18n.client}
                </th> 
                <th>
                    <svg
                        style={{ top: 2 }}
                        width={15}
                        height={10}
                        viewBox="0 0 15 10"
                        fill="none" 
                    >
                        <path
                            d="M11.15 9.275L14 5 11.15.725A.493.493 0 0010.731.5H1.5A.5.5 0 001 1v8a.5.5 0 00.5.5h9.231a.494.494 0 00.419-.225v0z"
                            stroke="#718096"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    {i18n.budget}
                </th>
                <th>
                    <svg
                        style={{ top: 2 }}
                        width={15}
                        height={10}
                        viewBox="0 0 15 10"
                        fill="none" 
                    >
                        <path
                            d="M11.15 9.275L14 5 11.15.725A.493.493 0 0010.731.5H1.5A.5.5 0 001 1v8a.5.5 0 00.5.5h9.231a.494.494 0 00.419-.225v0z"
                            stroke="#718096"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    {i18n.proba}
                </th>
                <th>
                    <svg
                        className='pv-mt-4'
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none" 
                    >
                        <path
                            d="M7.669 1.619L2.625 2.625 1.619 7.669a.5.5 0 00.137.45l6.525 6.525a.496.496 0 00.706 0l5.657-5.657a.496.496 0 000-.706L8.119 1.756a.5.5 0 00-.45-.137v0z"
                            stroke="#718096"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path d="M5.25 6a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="#718096" />
                    </svg>
                    {i18n.stage}
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
        navigate(`/deal/single/${id}`);
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
                <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer'>{row.title}</td>
                <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer'>{(row.person) ? row.person.email : row.org.email}</td> 
                <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer'>${row.budget}</td>
                <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer'>{row.probability}%</td>
                <td><span className="pv-badge">{row.stage_id && row.stage_id.label}</span></td>
                <td>{row.date}</td>
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

export default (props) => {
    const { tableData, editEntry, checkedBoxes, deleteEntry } = props;
    return (
        <>
            {tableData.length > 0 && <div className='pv-table-wrap' style={{marginTop: '20px'}}>
                <table className='pv-table'>
                    <TableHeader checkedBoxes={checkedBoxes} />
                    <TableBody tableData={tableData} editEntry={editEntry} checkedBoxes={checkedBoxes} deleteEntry={deleteEntry} />
                </table>
            </div>}
        </>
    );
}