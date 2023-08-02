import React, { useState, createContext, useEffect } from "react";
import { toast } from 'react-toastify';
import { checkAllValidation, groupProcessing, removeError } from "./input/validations";

export const FormContext = createContext({});

export function FormWrapper({ submitHandler, close, children }) {

    // const form = {
    //     email: {
    //         value: '',
    //         validation: {
    //             required: {
    //                 value: true,
    //                 message: "Email required",
    //                 group : "contact"
    //                 error: "Email required"
    //             },
    //         }
    //     }
    // }
    //
    // groupFields = {contact: {first_name: "", org_name: "something"}}
    //
    // errorFields = {
    //     email: [required, email]
    // }
    //
    //
    const [form, setForm] = useState({});
    const [errorFields, setErrorFields] = useState({});
    const [groupFields, setGroupFields] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitEvent, setSubmitEvent] = useState();

    useEffect(() => {
        if (isSubmitted && submitEvent) {
            const count = countErrors(errorFields)
            if (count === 0) {
                submitHandler(submitEvent)
            } else {
                toast.error("Invalid submission!!!")
            }
            setIsSubmitted(false)
        }
    }, [isSubmitted, errorFields])

    useEffect(() => {

        console.log(form);
        console.log(groupFields);
        checkAllValidation(form, setForm, setErrorFields)
        setIsSubmitted(true)
        // for (const [groupName, fieldObj] of Object.entries(groupFields)) {
        //     for (const [field, value] of Object.entries(fieldObj)) {
        //         if (value.length > 0) {
        //             for (const [name, { value, validation }] of Object.entries(form)) {
        //                 for (const [criteria, criteriaValue] of Object.entries(validation)) {
        //                     if (criteria === "required" && criteriaValue?.group === groupName && name !== field) {
        //                         removeError(criteria, name, setForm, setErrorFields)
        //                     }
        //                 }
        //             }
        //             return;
        //         }
        //     }
        // }
    }, [groupFields])

    const countErrors = (errorFields) => {
        if (!errorFields || typeof errorFields !== 'object') {
            return 0;
        }
        return Object.values(errorFields).reduce(function (acc, criteria) {
            return acc + criteria.length;
        }, 0);
    }


    const onSubmit = (e) => {
        e.preventDefault();
        // generateGroupObj
        // if there is any field value(search index), then make required false to all other fields

        groupProcessing(form, setGroupFields)
        setSubmitEvent(e)
    }

    console.log(form);
    console.log(groupFields);

    return (
        <FormContext.Provider value={{ form, setForm, setErrorFields, groupFields, setGroupFields }}>
            <form onSubmit={onSubmit} >
                {children}
                <FormFooter close={close} />
            </form>
        </FormContext.Provider>
    );
}

export function FormContent({ formStyleClass, children }) {
    return (
        <div className="pv-content">
            <div className={formStyleClass}>
                {children}
            </div>
        </div>
    );

}

export function FormFooter({ close }) {
    const i18n = ndpv.i18n;
    return (
        <div className="pv-modal-footer">
            <div className="row">
                <div className="col">
                    <button type='reset' className="pv-btn pv-text-hover-blue" onClick={() => close()}>{i18n.cancel}</button>
                </div>
                <div className="col">
                    <button type='submit' className="pv-btn pv-bg-blue pv-bg-hover-blue pv-btn-big pv-float-right pv-color-white">
                        {i18n.save}
                    </button>
                </div>
            </div>
        </div>

    );
}
