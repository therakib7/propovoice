import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';  
import Action from 'block/action/row'; 

const TableHeader = props => {
    return (
        <thead>
            <tr>
                <th>
                    <input type="checkbox" 
                        //value={row.id}
                        //checked={ props.checkedBoxes.data.find((p) => p.id === row.id)} 
                        onChange={(e) => props.checkedBoxes.handle(e, 'all')}
                    />
                </th>
                <th>
                    Organization
                </th>
                <th>
                    Location
                </th>
                <th>
                    Contact Person
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
        navigate(`/contact/single/${id}`, { replace: true });
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
                <td>{row.name}</td>
                <td>{row.address}</td> 
                <td>{row.first_name}</td>
                <td><Moment format="YYYY-MM-DD">{row.date}</Moment></td>
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