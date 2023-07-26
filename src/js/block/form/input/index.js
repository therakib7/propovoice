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
    console.log(e.target.value)
    setForm({ ...form, [name]: { ...form[name], value: e.target.value } })
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
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {inputValue}<br />
      {errorMessage}
    </div>
  );
}
