import ModalImage from "react-modal-image";
import Action from 'block/action/row';

const TableHeader = props => {
    const i18n = ndpv.i18n;
    return (
        <thead>
            <tr>
                <th>
                    <input type="checkbox"
                        onChange={(e) => props.checkedBoxes.handle(e, 'all')}
                    />
                </th>
                <th>{i18n.file} {i18n.name} {i18n.nd} {i18n.desc}</th>
                <th>
                    <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                    >
                        <path
                            d="M8 10C10.2091 10 12 8.20914 12 6C12 3.79086 10.2091 2 8 2C5.79086 2 4 3.79086 4 6C4 8.20914 5.79086 10 8 10Z"
                            stroke="#718096"
                            strokeMiterlimit={10}
                        />
                        <path
                            d="M1.9375 13.5001C2.55184 12.4358 3.43552 11.552 4.49972 10.9375C5.56392 10.323 6.77113 9.99951 8 9.99951C9.22887 9.99951 10.4361 10.323 11.5003 10.9375C12.5645 11.552 13.4482 12.4358 14.0625 13.5001"
                            stroke="#718096"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    {i18n.upBy}
                </th>
                <th>
                    <svg
                        width={12}
                        height={12}
                        viewBox="0 0 12 12"
                        fill="none"
                    >
                        <path
                            d="M6 10.5C8.48528 10.5 10.5 8.48528 10.5 6C10.5 3.51472 8.48528 1.5 6 1.5C3.51472 1.5 1.5 3.51472 1.5 6C1.5 8.48528 3.51472 10.5 6 10.5Z"
                            stroke="#718096"
                            strokeMiterlimit={10}
                        />
                        <path
                            d="M6 3.375V6H8.625"
                            stroke="#718096"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    {i18n.time}
                </th>
                <th>
                    {i18n.action}
                </th>
            </tr>
        </thead>
    );
}

const TableBody = props => {
    const i18n = ndpv.i18n;
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
                <td>
                    {row.file && !row.url && <div style={{ width: 40, display: 'inline-block' }}>
                        <ModalImage
                            small={row.file.src}
                            large={row.file.src}
                            alt=""
                        />
                    </div>}

                    {row.type == 'google-drive' && <a target='_blank' href={row.url}><img src={row.url} alt="file" width="40" /></a>}
                    {!row.file && <img src={ndpv.assetImgUri + 'file.png'} alt="file" />}
                    <span>{row.type == 'link' || row.type == 'google-drive' || row.type == 'pdf' ? <a target='_blank' href={row.url}>{row.title}</a> : row.title}</span>
                </td>
                <td>
                    <div className="pv-avater">
                        <img src={row.upload_by} alt="avatar" />
                    </div>
                </td>
                <td>{row.date}</td>
                <td className="pv-action">
                    <Action
                        row={row}
                        editEntry={row.type == 'link' ? props.editEntry : false}
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
            {tableData.length > 0 && <div className='pv-table-wrap'>
                <table className='pv-table pv-table-three'>
                    <TableHeader checkedBoxes={checkedBoxes} />
                    <TableBody tableData={tableData} editEntry={editEntry} checkedBoxes={checkedBoxes} deleteEntry={deleteEntry} />
                </table>
            </div>}
        </>
    );
}
