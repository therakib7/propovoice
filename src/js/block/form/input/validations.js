export const defaultErrorMessages = {
  required: "This field is required"
}

export const checkValidation = (name, value, form, setForm) => {
  for (const [criteria, criteriaValue] of Object.entries(form[name].validation)) {
    switch (criteria) {
      case 'required':
        checkRequired(criteria, criteriaValue, name, value, form, setForm)
    }
  }

}

const checkRequired = (criteria, criteriaValue, name, value, form, setForm) => {
  if (criteriaValue.value && value === "") {
    setForm({ ...form, [name]: { ...form[name], validation: { ...form[name].validation, [criteria]: { ...form[name].validation[criteria], error: criteriaValue.message ?? defaultErrorMessages[criteria] } } } })
  } else {
    delete form[name].validation.required.error;
    setForm(form);
  }

}
