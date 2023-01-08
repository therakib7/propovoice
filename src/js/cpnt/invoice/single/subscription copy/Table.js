import Action from 'block/action/row';
import { Arrow, Email, Tag } from 'block/icon';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';

const TableHeader = props => {
    const i18n = ndpv.i18n;
    return (
        <thead>
            <tr> 
                <th style={{width: 'auto'}}>
                    {i18n.inv} {i18n.id}
                </th>
                <th>
                    Start Date
                </th>
                <th>
                    End Date
                </th>
                <th>
                    Status
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
        // navigate(`/lead/single/${id}`);
    };

    let rows = props.tableData.map((row, index) => {

        return (
            <tr key={index}> 
                <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer' style={{width: 'auto'}}>ID</td>
                <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer'>10-11-20</td>
                <td onClick={() => handleOverview(row.id)} className='pv-cursor-pointer'>10-12-20</td>
                <td>Unpaid</td>
                <td className="pv-action">
                    {/* <Action
                        row={row}
                        handleOverview={handleOverview}
                        editEntry={props.editEntry}
                        deleteEntry={props.deleteEntry}
                    /> */}
                </td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}

const Table = (props) => {
    const { tableData } = props;
    return (
        <div className='pv-table-wrap'>
            <table className='pv-table'>
                <TableHeader />
                <TableBody tableData={tableData} />
            </table>
        </div>
    );
}

export default Table;