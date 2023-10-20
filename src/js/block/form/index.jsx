import React, { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import Preloader from "block/preloader/spinner";
import ProLabel from "block/pro-alert/label";
import { checkAllValidation } from "./input/validations";

export const FormContext = createContext({});

export function FormWrapper({
  submitHandler,
  submitPreloader = false,
  close,
  submitLabel,
  children,
  formTag = true,
  isPro = false,
}) {
  const [form, setForm] = useState({});
  const [errorFields, setErrorFields] = useState({});
  const [groupFields, setGroupFields] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitEvent, setSubmitEvent] = useState();

  useEffect(() => {
    if (isSubmitted && submitEvent) {
      const count = countErrors(errorFields);
      if (count === 0) {
        submitHandler(submitEvent);
      } else {
        toast.error("Invalid submission!!!");
      }
      setIsSubmitted(false);
    }
  }, [isSubmitted, errorFields]);

  const countErrors = (errorFields) => {
    if (!errorFields || typeof errorFields !== "object") {
      return 0;
    }
    return Object.values(errorFields).reduce(function (acc, criteria) {
      return acc + criteria.length;
    }, 0);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    checkAllValidation(form, setForm, setErrorFields);
    setIsSubmitted(true);
    setSubmitEvent(e);
  };

  const formContent = (
    <>
      {children}
      <FormFooter
        close={close}
        submitPreloader={submitPreloader}
        submitLabel={submitLabel}
        formTag={formTag}
        onSubmit={onSubmit}
        isPro={isPro}
      />
    </>
  );

  return (
    <FormContext.Provider
      value={{ form, setForm, setErrorFields, groupFields, setGroupFields }}
    >
      {formTag ? (
        <form onSubmit={onSubmit}>{formContent}</form>
      ) : (
        <div>{formContent}</div>
      )}
    </FormContext.Provider>
  );
}

export function FormContent({ formStyleClass, children }) {
  return (
    <div className="pv-content">
      <div className={formStyleClass}>{children}</div>
    </div>
  );
}

export function FormFooter({
  close,
  submitPreloader,
  submitLabel,
  formTag,
  onSubmit,
  isPro,
}) {
  const i18n = ndpv.i18n;
  return (
    <div className="pv-modal-footer">
      <div className="row">
        <div className="col">
          {close && (
            <button
              type="reset"
              className="pv-btn pv-text-hover-blue"
              onClick={() => close()}
            >
              {i18n.cancel}
            </button>
          )}
        </div>
        <div className="col">
          <button
            type="submit"
            disabled={submitPreloader}
            {...(!formTag ? { onClick: onSubmit } : {})}
            className="pv-btn pv-bg-blue pv-bg-hover-blue  pv-float-right pv-color-white"
          >
            {submitPreloader && <Preloader submit />}{" "}
            {submitLabel ? submitLabel : i18n.save}
            {isPro && <ProLabel blueBtn />}
          </button>
        </div>
      </div>
    </div>
  );
}
