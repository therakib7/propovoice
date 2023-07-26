export const defaultErrorMessages = {
  required: "field is required"
}

export const checkValidation = (name, value, form, setForm, setErrorFields) => {
  for (const [criteria, criteriaValue] of Object.entries(form[name].validation)) {
    switch (criteria) {
      case 'required':
        checkRequired(criteria, criteriaValue, name, value, form, setForm, setErrorFields)
    }
  }
}

export const checkAllValidation = (form, setForm, setErrorFields) => {
  for (const [name, { value, validation }] of Object.entries(form)) {
    for (const [criteria, criteriaValue] of Object.entries(validation)) {
      switch (criteria) {
        case 'required':
          checkRequired(criteria, criteriaValue, name, value, form, setForm, setErrorFields)
      }
    }
  }
}

const checkRequired = (criteria, criteriaValue, name, value, form, setForm, setErrorFields) => {
  if (criteriaValue.value && value === "") {
    const message = criteriaValue.message ?? name + " " + defaultErrorMessages[criteria]
    setErrorMessage(form, setForm, name, value, criteria, message)

    setErrorFields((prev) => {
      const updatedValue = Array.isArray(prev[name]) ? [...prev[name], criteria] : [criteria];
      return { ...prev, [name]: [...new Set(updatedValue)] };
    })

  } else {
    setErrorMessage(form, setForm, name, value, criteria, "");

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
}

const setErrorMessage = (form, setForm, name, value, criteria, errorMessage) => {
  setForm({ ...form, [name]: { ...form[name], value, validation: { ...form[name].validation, [criteria]: { ...form[name].validation[criteria], error: errorMessage } } } })

}
