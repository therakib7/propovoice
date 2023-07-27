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
  if (criteriaValue.value && value.length === 0) {
    addError(criteria, criteriaValue, name, value, setForm, setErrorFields)
  } else {
    removeError(criteria, name, value, setForm, setErrorFields)
  }
}

const setErrorMessage = (setForm, name, value, criteria, errorMessage) => {
  setForm((prevForm) => (
    { ...prevForm, [name]: { ...prevForm[name], value, validation: { ...prevForm[name].validation, [criteria]: { ...prevForm[name].validation[criteria], error: errorMessage } } } }
  ))
}

const addError = (criteria, criteriaValue, name, value, setForm, setErrorFields) => {
  const message = criteriaValue.message ?? name + " " + defaultErrorMessages[criteria]
  setErrorMessage(setForm, name, value, criteria, message)

  setErrorFields((prev) => {
    const updatedValue = Array.isArray(prev[name]) ? [...prev[name], criteria] : [criteria];
    return { ...prev, [name]: [...new Set(updatedValue)] };
  })
}

const removeError = (criteria, name, value, setForm, setErrorFields) => {


  setErrorMessage(setForm, name, value, criteria, "");

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

export const alterValidation = (current_name, current_value, field1, field2, setForm) => {

  const alt_name =
    current_name !== field1
      ? field1
      : field2;

  if (current_value.length > 0) {
    setForm((prevForm) => (
      { ...prevForm, [alt_name]: { ...prevForm[alt_name], validation: { ...prevForm[alt_name].validation, required: { ...prevForm[alt_name].validation.required, value: false, error: "" } } } }
    )
    )

    setForm((prevForm) => (
      { ...prevForm, [current_name]: { ...prevForm[current_name], validation: { ...prevForm[current_name].validation, required: { ...prevForm[current_name].validation.required, value: true } } } }
    )
    )

  }
}
