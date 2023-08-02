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
    removeError(criteria, name, setForm, setErrorFields, true)
  }
}

const setErrorMessage = (setForm, name, criteria, errorMessage, criteriaValue = "default") => {

  setForm((prevForm) => {

    criteriaValue = criteriaValue !== "default" ? criteriaValue : prevForm[name].validation[criteria].value

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

export const removeError = (criteria, name, setForm, setErrorFields, criteriaValue = false) => {
  setErrorMessage(setForm, name, criteria, "", criteriaValue);
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

export const alterValidation = (current_name, current_value, fields, criteria, setForm, setErrorFields) => {
  fields.map((field) => {
    if (field === current_name && current_value.length === 0) return;
    removeError(criteria, field, setForm, setErrorFields)
  })
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

export const setGroupValidation = (fields, form, setForm) => {
  const groupDataFields = []
  const groupEmptyFields = []

  for (const [name, value] of Object.entries(fields)) {
    if (value?.length > 0) {
      groupDataFields.push(name)
    }
    else {
      groupEmptyFields.push(name)
    }
  }

  console.log("data: ", groupDataFields)
  console.log("empty: ", groupEmptyFields)

  if (groupDataFields.length > 0) {
    groupDataFields.map((field) => {
      addRequired(field, setForm)
    })

    groupEmptyFields.map((field) => {
      removeRequired(field, setForm)
    })

  }

}

const addRequired = (field, setForm) => {
  setForm((prevForm) => (
    { ...prevForm, [field]: { ...prevForm[field], validation: { ...prevForm[field].validation, required: { ...prevForm[field].validation.required, value: true } } } }
  ))
}
const removeRequired = (field, setForm) => {
  setForm((prevForm) => (
    { ...prevForm, [field]: { ...prevForm[field], validation: { ...prevForm[field].validation, required: { ...prevForm[field].validation.required, value: false, error: "" } } } }
  ))
}
