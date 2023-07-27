import React, { useContext, useEffect, useState } from "react";
import { FormContext } from 'block/form';
import { checkValidation } from "./validations";

export const TextInput = ({ label, type, id, name, value, placeholder, wrapperClassName = "col", validation = {}, onChange }) => {

  const { form, setForm, setErrorFields } = useContext(FormContext);

  const validationConditions = form[name]?.validation || {};
  const inputValue = form[name]?.value;


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
      <label htmlFor={id}>
        {label} {isRequired && (<span style={{ color: "red" }}>*</span>)}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {Object.entries(validationConditions).map(([criteria, { error = "" }]) => (
        <div key={criteria} style={{ color: "red", marginTop: "4px" }}>
          {error.charAt(0).toUpperCase() + error.slice(1)}
        </div>
      ))}
    </div >
  );
}
