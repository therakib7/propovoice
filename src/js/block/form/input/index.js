import React, { useContext, useEffect, useState } from "react";
import { FormContext } from 'block/form';
import { checkValidation, defaultErrorMessages } from "./validations";

export const TextInput = ({ label, type, id, name, value, placeholder, wrapperClassName = "col", validation, onChange }) => {
  const { form, setForm } = useContext(FormContext);

  useEffect(() => {
    if (!([name] in form)) {
      console.log(form)
      setForm({ [name]: { value, validation } });
    }
    // checkValidation(name, value, validation, form, setForm)
  }, [])

  const handleChange = (e) => {
    console.log(form)
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
      {/* {[name]?.message} */}
    </div>
  );
}
