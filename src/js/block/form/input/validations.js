export const defaultErrorMessages = {
  required: "field is required"
}

export const checkValidation = (name, value, form, setForm, setErrorFields) => {
  for (const [criteria, criteriaValue] of Object.entries(form[name].validation)) {
    switch (criteria) {
      case 'required':
        checkRequired(criteria, criteriaValue, name, value, setForm, setErrorFields)
    }
  }

}

export const checkAllValidation = (form, setForm, setErrorFields) => {
  for (const [name, { value, validation }] of Object.entries(form)) {
    for (const [criteria, criteriaValue] of Object.entries(validation)) {
      switch (criteria) {
        case 'required':
          checkRequired(criteria, criteriaValue, name, value, setForm, setErrorFields)
      }
    }
  }

}

const checkRequired = (criteria, criteriaValue, name, value, setForm, setErrorFields) => {

  if (criteriaValue?.value && value?.length === 0) {
    addError(criteria, criteriaValue, name, setForm, setErrorFields)
  } else {
    removeError(criteria, name, setForm, setErrorFields)
  }
}

const setErrorMessage = (setForm, name, criteria, errorMessage, criteriaValue = "default") => {

  setForm((prevForm) => {

    criteriaValue = criteriaValue !== "default" ? criteriaValue : prevForm[name].validation[criteria].value

    console.log(name, prevForm[name].validation[criteria].value)
    return { ...prevForm, [name]: { ...prevForm[name], validation: { ...prevForm[name].validation, [criteria]: { ...prevForm[name].validation[criteria], value: criteriaValue, error: errorMessage } } } }
  })
}

const addError = (criteria, criteriaValue, name, setForm, setErrorFields) => {

  const message = criteriaValue.message ?? name + " " + defaultErrorMessages[criteria]
  setErrorMessage(setForm, name, criteria, message)

  setErrorFields((prev) => {
    const updatedValue = Array.isArray(prev[name]) ? [...prev[name], criteria] : [criteria];
    return { ...prev, [name]: [...new Set(updatedValue)] };
  })
}

export const removeError = (criteria, name, setForm, setErrorFields) => {


  setErrorMessage(setForm, name, criteria, "", false);

  setErrorFields((prev) => {
    if (prev[name] && Array.isArray(prev[name])) {
      const index = prev[name].indexOf(criteria);
      if (index !== -1) {
        prev[name].splice(index, 1);
      }
    }
    return prev
  })
}

export const alterValidation = (current_name, current_value, field1, field2, criteria, setForm, setErrorFields) => {

  const alt_name =
    current_name !== field1
      ? field1
      : field2;

  if (current_value.length > 0) {
    removeError(criteria, alt_name, setForm, setErrorFields)
    // setForm((prevForm) => (
    //   { ...prevForm, [alt_name]: { ...prevForm[alt_name], validation: { ...prevForm[alt_name].validation, required: { ...prevForm[alt_name].validation.required, value: false, error: "" } } } }
    // )
    // )
    addError(criteria, true, current_name, setForm, setErrorFields)
    // setForm((prevForm) => (
    //   { ...prevForm, [current_name]: { ...prevForm[current_name], validation: { ...prevForm[current_name].validation, required: { ...prevForm[current_name].validation.required, value: true } } } }
    // )
    // )
  }
}

export const groupProcessing = (form, setGroupFields) => {
  generateGroup(form, setGroupFields)
}

const generateGroup = (form, setGroupFields) => {

  for (const [name, { value, validation }] of Object.entries(form)) {
    for (const [criteria, criteriaValue] of Object.entries(validation)) {
      if (criteria === "required" && criteriaValue?.group?.length > 0) {
        setGroupFields((prev) => {
          return { ...prev, [criteriaValue.group]: { ...prev[criteriaValue.group], [name]: value } }
        })
      }
    }
  }
}
