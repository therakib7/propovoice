import React, { useCallback, useEffect, useRef, useState } from "react";
import api from 'api';
import useClickOutside from 'block/outside-click';

export default (props) => {

    const personRef = useRef();
    const orgRef = useRef();

    const [personList, setPersonList] = useState([]);
    const [orgList, setOrgList] = useState([]);
    const [personModal, setPersonModal] = useState(false);
    const [orgModal, setOrgModal] = useState(false);

    const personClose = useCallback(() => setPersonModal(false), []);
    useClickOutside(personRef, personClose);

    const orgClose = useCallback(() => setOrgModal(false), []);
    useClickOutside(orgRef, orgClose);

    let timeout = 0;

    const handleChange = e => {
        const { name, value } = e.target;

        if (value.length < 1) {
            setPersonModal(false);
            setPersonList([]);
            if (name == 'first_name') {
                props.onChange('', 'person');
            } else {
                props.onChange('', 'org');
            }
            return;
        }

        if (name == 'first_name') {
            props.onChange(value, 'person');
        } else {
            props.onChange(value, 'org');
        }
        //search when typing stop
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (name == 'first_name') {
                api.get('persons', 'first_name=' + value).then(resp => {
                    let persons = resp.data.data.result;
                    setPersonModal(true);
                    setPersonList(persons);
                });
            } else {
                api.get('organizations', 'name=' + value).then(resp => {
                    let orgs = resp.data.data.result;
                    setOrgModal(true);
                    setOrgList(orgs);
                });
            }

        }, 300);
    }

    const handleSelect = (e, val, type) => {
        e.preventDefault();
        props.onSelect(val, type);
        if (type == 'person') {
            setPersonModal(false);
            setPersonList([]);
        } else {
            setOrgModal(false);
            setOrgList([]);
        }
    }

    const i18n = ndpv.i18n;
    const person = (
        <div className="col-lg">
            <label htmlFor="first_name">
                {i18n.prsn}
            </label>
            <div className="pv-field-search" ref={personRef}>
                <div className="pv-action-content">
                    <input
                        id="first_name"
                        type="text"
                        name="first_name"
                        autoComplete='off'
                        disabled={props.fromClient}
                        value={props.first_name}
                        onChange={handleChange}
                    />

                    {personModal && <div className="pv-dropdown-content pv-show">
                        <button style={{ color: '#4c6fff' }} onClick={(e) => handleSelect(e, null, 'person')}>+ {i18n.add} '{props.first_name}' {i18n.as} {i18n.new} {i18n.ct}</button>
                        {personList.map((item, i) => (
                            <a key={i} onClick={(e) => handleSelect(e, item, 'person')}>{item.first_name}</a>
                        ))}
                    </div>}
                </div>
            </div>
        </div>
    );

    const org = (
        <div className="col-lg">
            <label htmlFor="org_name">
                {i18n.org}
            </label>
            <div className="pv-field-search" ref={orgRef}>
                <div className="pv-action-content">
                    <input
                        id="org_name"
                        type="text"
                        name="org_name"
                        autoComplete='off'
                        disabled={props.fromClient}
                        value={props.org_name}
                        onChange={handleChange}
                    />

                    {orgModal && <div className="pv-dropdown-content pv-show">
                        <button style={{ color: '#4c6fff' }} onClick={(e) => handleSelect(e, null, 'org')}>+ {i18n.add} '{props.org_name}' {i18n.as} {i18n.new} {i18n.org}</button>
                        {orgList.map((item, i) => (
                            <a key={i} onClick={(e) => handleSelect(e, item, 'org')}>{item.name}</a>
                        ))}
                    </div>}
                </div>
            </div>
        </div>
    );

    return (
        <div className="row">
            {!props.personLast && person}
            {org}
            {props.personLast && person}
        </div>
    );
}