import React, { useContext, useEffect, useState } from "react";
import { FormContext } from 'block/form';
import { checkValidation, defaultErrorMessages } from "./validations";

export const TextInput = ({ label, type, id, name, value, placeholder, wrapperClassName = "col", validation, onChange }) => {
  const { form, setForm } = useContext(FormContext);
  const errorMessage = form[name]?.validation?.required?.error || '';

  useEffect(() => {
    if (!([name] in form)) {
      setForm({ [name]: { value, validation } });
    }
  }, [])

  const handleChange = (e) => {
    checkValidation(name, e.target.value, form, setForm)
    onChange(e);
  }

  return (
    <div className={wrapperClassName}>
      <label htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {errorMessage}
    </div>
  );
}
