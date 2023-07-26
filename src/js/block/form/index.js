import React, { useState, createContext } from "react";
import { toast } from 'react-toastify';

export const FormContext = createContext({});

export function FormWrapper({ submitHandler, close, children }) {
    // const [errors, setErrors] = useState({});

    // const form = {
    //     email: {
    //         value: '',
    //         validation: {
    //             required: {
    //                 value: true,
    //                 message: "Email required",
    //                 error: "Email required"
    //             },
    //         }
    //     }
    // }
    const [form, setForm] = useState({});

    const onSubmit = (e) => {
        e.preventDefault();
        submitHandler(e)
    }
    return (
        <FormContext.Provider value={{ form, setForm }}>
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
