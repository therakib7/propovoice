import React, { useContext, useEffect, useState } from "react";
import { FormContext } from 'block/form';
import { checkValidation } from "./validations";

export const TextInput = ({ label, wrapperClassName = "col", validation = {}, onChange, ...attrs }) => {

  const { form, setForm, setErrorFields } = useContext(FormContext);
  const name = attrs.name;
  const value = attrs.value;
  const validationConditions = form[name]?.validation || {};

  console.log(attrs);

  useEffect(() => {
    if (!(name in form)) {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: { ...prevForm[name], value, validation },
      }));
    }
  }, []);

  const handleChange = (e) => {

    setForm((prevForm) => ({
      ...prevForm,
      [name]: { ...prevForm[name], value: e.target.value },
    }));

    checkValidation(name, e.target.value, form, setForm, setErrorFields)
    onChange(e);
  }

  const isRequired = validation.required?.value ?? false

  return (
    <div className={wrapperClassName}>
      <label htmlFor={attrs.id}>
        {label} {isRequired && (<span style={{ color: "red" }}>*</span>)}
      </label>
      <input
        onChange={handleChange}
        {...attrs}
      />
      {Object.entries(validationConditions).map(([criteria, { error = "" }]) => (
        <div key={criteria} style={{ color: "red", marginTop: "4px" }}>
          {error.charAt(0).toUpperCase() + error.slice(1)}
        </div>
      ))}
    </div >
  );
}
