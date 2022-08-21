import { useState, useEffect } from "react";
import pro from 'block/pro-alert'; 
import ProLabel from 'block/pro-alert/label';

export default (props) => {
    const [list, setList] = useState([]);
    useEffect(() => {

        props.getAll('settings', 'tab=estvoice_tax').then(resp => {
            if (resp.data.success) {
                // console.log(resp.data.data);
                // props.handleDefault(resp.data.data);
            }
        }); 
    }, []);
 
    return (
        <>
            SMTP
        </>
    );
} 