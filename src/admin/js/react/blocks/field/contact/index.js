import React, { useState, useEffect } from "react";
import AsyncSelect from 'react-select/async';
import WithApi from 'hoc/Api';

const Contact = (props) => {
    const [personModal, setPersonModal] = useState(false);
    const [orgModal, setOrgModal] = useState([]);
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

    const handleContactChange = (e, type) => {
        let val = e.target.value;
        props.onChange(val, type);

        if (val.length < 2) {
            setPersonModal(false);
            return;
        }
        setPersonModal(true);
        //search when typing stop
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            //search function
            props.getAll('persons', 'first_name=' + val).then(resp => {
                let persons = resp.data.data.result;
                console.log(persons)
            });
        }, 300);
    }

    const handlePersonSelect = (val) => {
        props.onPersonChange(val, 'person');
    }

    const handleFindOrg = (val, callback) => {
        if (val.length < 2) return;

        //search when typing stop
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            //search function
            props.getAll('organizations', 'name=' + val).then(resp => {
                let toData = resp.data.data.result;
                callback(toData);
            });
        }, 300);
    }

    const handleOrgSelect = (val) => {
        props.onOrgChange(val, 'org');
    }

    return (
        <>
            <div className="row">
                <div className="col-lg">
                    <label htmlFor="first_name">
                        Contact Person
                    </label>
                    {/* <AsyncSelect
						loadOptions={handleFindPerson}
						value={props.data.person}
						defaultOptions={person}
						onChange={handlePersonSelect}
						getOptionValue={data => data.id}
						getOptionLabel={(data) => (data.first_name) ? data.first_name : ''}
					/> */}
                    <div className="pi-field-search">

                        <div className="pi-action-content">
                            <input
                                id="first_name"
                                type="text"
                                name="first_name"
                                value={props.data.first_name}
                                onChange={(e) => handleContactChange(e, 'person')}
                            />

                            {personModal && <div className="pi-dropdown-content pi-show">
                                <button style={{ color: '#4c6fff' }}>+ Add '{props.data.first_name}' as New Contact</button>
                                <a href="#home">Nasir</a>
                            </div>}
                        </div>

                    </div>
                </div>

                <div className="col-lg">
                    <label htmlFor="form-org_name">
                        Organization Name
                    </label>
                    <div className="pi-field-search">
                        <input
                            id="org_name"
                            type="text"
                            name="org_name"
                            value={props.data.org_name}
                            onChange={(e) => handleContactChange(e, 'org')}
                        />
                        {orgModal && <div className="pi-dropdown-content pi-show">
                            <button style={{ color: '#4c6fff' }}>+ Add '{props.data.first_name}' as New Contact</button>
                            <a href="#home">Nurency Digital</a>
                        </div>}
                    </div>
                    {/* <AsyncSelect
						loadOptions={handleFindOrg}
						value={props.data.org}
						defaultOptions={org}
						onChange={handleOrgSelect}
						getOptionValue={data => data.id}
						getOptionLabel={(data) => (data.name) ? data.name : ''}
					/>  */}
                </div>
            </div>
        </>
    );
}

export default WithApi(Contact);  