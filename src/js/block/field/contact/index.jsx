import React, { useCallback, useEffect, useRef, useState, useContext } from "react";
import api from 'api';
import useClickOutside from 'block/outside-click';

import { FormContext } from 'block/form';
import { Text } from 'block/form/input';

const Contact = (props) => {
    const { nameLabel = ndpv.i18n.name } = props;

    const personRef = useRef();
    const orgRef = useRef();

    const { form, setForm, setErrorFields } = useContext(FormContext);
    const [personList, setPersonList] = useState([]);
    const [orgList, setOrgList] = useState([]);
    const [personModal, setPersonModal] = useState(false);
    const [orgModal, setOrgModal] = useState(false);

    const personClose = useCallback(() => setPersonModal(false), []);
    useClickOutside(personRef, personClose);

    const orgClose = useCallback(() => setOrgModal(false), []);
    useClickOutside(orgRef, orgClose);

    let timeout = 0;

    const contactFields = ["first_name", "org_name"]

    useEffect(() => {
    }, [])

    const handleChange = e => {
        const { name, value } = e.target;
        // alterValidation(name, value, contactFields, "required", setForm, setErrorFields)

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

    const personValidation = {
        required: {
            value: true,
            message: "Name field is required"
        }
    }
    const orgValidation = {
        // required: {
        //     value: false,
        //     group: "contact"
        // }
    }
    const person = (
        <>
            <div style={{ position: "relative" }} className="col-lg">

                <Text id="first_name"
                    wrapperClassName=''
                    label={nameLabel}
                    type="text"
                    name="first_name"
                    autoComplete='off'
                    disabled={props.fromClient}
                    value={props.first_name}
                    onChange={handleChange}
                    validation={personValidation}
                />


                <div style={{ position: "absolute", bottom: 0, left: "15px", zIndex: 9999 }} className="pv-field-search" ref={personRef}>
                    <div className="pv-action-content">

                        {personModal && <div className="pv-dropdown-content pv-show">
                            <button style={{ color: '#4c6fff' }} onClick={(e) => handleSelect(e, null, 'person')}>+ {i18n.add} '{props.first_name}' {i18n.as} {i18n.new} {i18n.ct}</button>
                            {personList.map((item, i) => (
                                <a key={i} onClick={(e) => handleSelect(e, item, 'person')}>{item.first_name}</a>
                            ))}
                        </div>}
                    </div>
                </div>
            </div>
        </>
    );

    const org = (
        <>
            <div style={{ position: "relative" }} className="col-lg">
                <Text
                    wrapperClassName=''
                    label={i18n.org}
                    id="org_name"
                    type="text"
                    name="org_name"
                    autoComplete='off'
                    disabled={props.fromClient}
                    value={props.org_name}
                    onChange={handleChange}
                    validation={orgValidation}
                    group="contact"
                />

                <div style={{ position: "absolute", bottom: 0, left: "15px", zIndex: 9999 }} className="pv-field-search" ref={orgRef}>

                    <div className="pv-action-content">

                        {orgModal && <div className="pv-dropdown-content pv-show">
                            <button style={{ color: '#4c6fff' }} onClick={(e) => handleSelect(e, null, 'org')}>+ {i18n.add} '{props.org_name}' {i18n.as} {i18n.new} {i18n.org}</button>
                            {orgList.map((item, i) => (
                                <a key={i} onClick={(e) => handleSelect(e, item, 'org')}>{item.name}</a>
                            ))}
                        </div>}
                    </div>
                </div>

            </div>

        </>
    );

    return (
        <div className="row">
            {!props.personLast && person}
            {org}
            {props.personLast && person}
        </div>
    );
}
export default Contact;
