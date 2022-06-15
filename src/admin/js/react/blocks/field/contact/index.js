import React, { useState, useEffect } from "react";
import AsyncSelect from 'react-select/async'; 
import WithApi from 'hoc/Api'; 
 
const Contact = (props) => {
	const [person, setPerson] = useState([]);
	const [org, setOrg] = useState([]);

	let timeout = 0;

	useEffect(() => {
        //TODO: stop multiple rendering if loaded
        let args = {
            page: 1,
            per_page: 10
        }
        let params = new URLSearchParams(args).toString();

        props.getAll('persons', params).then(resp => { 
            if (resp.data.success) {
                let personList = resp.data.data.result;
                setPerson(personList);
            }
        });

        props.getAll('organizations', params).then(resp => {  
            if (resp.data.success) {
                let orgList = resp.data.data.result;
                setOrg(orgList);
            }
        });

    }, []);

	const handleFindPerson = (val, callback) => {
        if (val.length < 2) return;

        //search when typing stop
        if ( timeout ) clearTimeout(timeout);
        timeout = setTimeout(() => {
            //search function
            props.getAll('persons', 'first_name=' + val + '&last_name=' + val).then(resp => {   
                    let toData = resp.data.data.result;
                    callback(toData);
                });
        }, 300);
    }

    const handlePersonSelect = ( val ) => { 
        props.onPersonChange(val);
    }

    const handleFindOrg = (val, callback) => {
        if (val.length < 2) return;

        //search when typing stop
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            //search function
            props.getAll('organizations', 'first_name=' + val + '&last_name=' + val).then(resp => { 
                    let toData = resp.data.data.result;
                    callback(toData);
                });
        }, 300);
    }

    const handleOrgSelect = ( val ) => {
        props.onOrgChange(val);
    }
	 
	return ( 
		<>
			<div className="row">
				<div className="col-lg">
					<label htmlFor="first_name">
						Contact Person
					</label> 
					<AsyncSelect
						loadOptions={handleFindPerson}
						value={props.data.person}
						defaultOptions={person}
						onChange={handlePersonSelect}
						getOptionValue={data => data.id}
						getOptionLabel={(data) => (data.first_name) ? data.first_name : ''}
					/>
				</div>
			</div>

			<div className="row">
				<div className="col-lg">
					<label htmlFor="form-org_name">
						Organization Name
					</label>

					<AsyncSelect
						loadOptions={handleFindOrg}
						value={props.data.org}
						defaultOptions={org}
						onChange={handleOrgSelect}
						getOptionValue={data => data.id}
						getOptionLabel={(data) => (data.name) ? data.name : ''}
					/> 
				</div>
			</div>
		</>
	);
}

export default WithApi(Contact);  