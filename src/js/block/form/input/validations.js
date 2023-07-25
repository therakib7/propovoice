export const defaultErrorMessages = {
  required: "This field is required"
}

export const checkValidation = (name, value, form, setForm) => {
  for (const [criteria, criteriaValue] of Object.entries(form[name].validation)) {
    switch (criteria) {
      case 'required':
        checkRequired(criteriaValue, name, value, form, setForm)
    }
  }

}

const checkRequired = (criteriaValue, name, value, form, setForm) => {
  if (criteriaValue.value && value === "") {
    setForm({ ...form, [name]: { ...form[name], validation: { ...form[name].validation, required: { ...form[name].validation.required, error: criteriaValue.message ?? defaultErrorMessages.required } } } })
    console.log(form)
  } else {
    delete form[name].validation.required.error;
    setForm(form);
  }

}
