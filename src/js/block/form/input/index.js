import React, { useContext, useEffect, useState } from "react";
import { FormContext } from 'block/form';
import { checkValidation } from "./validations";

export const TextInput = ({ label, type, id, name, value, placeholder, wrapperClassName = "col", validation, onChange }) => {

  const { form, setForm } = useContext(FormContext);
  const errorMessage = form[name]?.validation?.required?.error || '';
  const inputValue = form[name]?.value;


  useEffect(() => {
    if (!(name in form)) {
      setForm({ ...form, [name]: { ...form[name], value, validation } });
    }
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [name]: { ...form[name], value: e.target.value } })
    checkValidation(name, e.target.value, form, setForm)
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
      <div style={{ color: "red", marginTop: "4px" }}>{errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)}</div>

    </div >
  );
}
