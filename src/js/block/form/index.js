import React, { useCallback, useRef, useState, useEffect } from "react";

export function FormWrapper({ submitHandler, close, children }) {
    return (

        <form onSubmit={submitHandler} >
            {children}
            <FormFooter close={close} />
        </form>
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
