export const defaultErrorMessages = {
  required: "field is required"
}

export const checkValidation = (name, value, form, setForm) => {
  for (const [criteria, criteriaValue] of Object.entries(form[name].validation)) {
    switch (criteria) {
      case 'required':
        checkRequired(criteria, criteriaValue, name, value, form, setForm)
    }
  }
}

export const checkAllValidation = (form, setForm) => {
  for (const [name, { value, validation }] of Object.entries(form)) {
    for (const [criteria, criteriaValue] of Object.entries(validation)) {
      switch (criteria) {
        case 'required':
          checkRequired(criteria, criteriaValue, name, value, form, setForm)
      }
    }

  }

}

const checkRequired = (criteria, criteriaValue, name, value, form, setForm) => {
  if (criteriaValue.value && value === "") {
    setForm({ ...form, [name]: { ...form[name], value, validation: { ...form[name].validation, [criteria]: { ...form[name].validation[criteria], error: criteriaValue.message ?? name + " " + defaultErrorMessages[criteria] } } } })
  } else {
    setForm({ ...form, [name]: { ...form[name], value, validation: { ...form[name].validation, [criteria]: { ...form[name].validation[criteria], error: '' } } } })
  }

}
