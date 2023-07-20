import React, { useState, useEffect } from "react";

export default function Input({ label, type, id, name, value, placeholder, wrapperClassName = "col", validation, handleChange }) {
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
        required={validation.required}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}
