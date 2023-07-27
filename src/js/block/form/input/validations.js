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
