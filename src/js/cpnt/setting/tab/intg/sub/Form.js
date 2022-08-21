import { useState, useEffect } from "react";
import pro from 'block/pro-alert';
import ProLabel from 'block/pro-alert/label';

export default (props) => {
    const [list, setList] = useState([]);
    useEffect(() => {
        props.getAll('intg-form').then(resp => {
            if (resp.data.success) {
                setList(resp.data.data)
            }
        });
    }, []);

    return (
        <div className="pi-intg-form-list">
            {list.map((item, i) => (
                <div className="pi-intg-form" key={i}>
                    <h4>{item.name}</h4>
                </div>
            ))}
        </div>
    );
} 