import React, { useState, createContext, useEffect } from "react";
import { toast } from 'react-toastify';
import { checkAllValidation, groupProcessing, removeError, setGroupValidation } from "./input/validations";

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
        // groupProcessing(form, setGroupFields)

        // for (const [_group, fields] of Object.entries(groupFields)) {
        //     setGroupValidation(fields, form, setForm)
        // }
        checkAllValidation(form, setForm, setErrorFields)
        setIsSubmitted(true)
        setSubmitEvent(e)
    }


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
