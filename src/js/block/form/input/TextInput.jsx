import { useContext, useEffect } from "react";
import { FormContext } from 'block/form';
import { checkValidation, groupProcessing } from "./validations";

const TextInput = ({ label, wrapperClassName = "col", validation = {}, onChange, ...attrs }) => {

  const { form, setForm, setErrorFields, setGroupFields } = useContext(FormContext);
  const { name, value = "" } = attrs;
  const validationConditions = form[name]?.validation || {};


  useEffect(() => {
    if (!(name in form)) {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: { ...prevForm[name], value, validation },
      }));
    }
  }, []);

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: { ...prevForm[name], value },
    }));
  }, [value]);

  const handleChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: { ...prevForm[name], value: e.target.value },
    }));
    // groupProcessing(form, setGroupFields)
    checkValidation(name, e.target.value, form, setForm, setErrorFields)
    onChange(e);
  }

  const isRequired = form[name]?.validation?.required?.value ?? false

  return (
    <div className={wrapperClassName}>
      <label htmlFor={attrs.id}>
        {label} {isRequired && (<span style={{ color: "red" }} title="This field is required">*</span>)}
      </label>
      <input
        onChange={handleChange}
        {...attrs}
      />
      {Object.entries(validationConditions).map(([criteria, { error = "" }]) => (
        <div key={criteria} style={{ color: "#fd5870", marginTop: "4px" }}>
          {error.charAt(0).toUpperCase() + error.slice(1)}
        </div>
      ))}
    </div >
  );
}

export default TextInput;