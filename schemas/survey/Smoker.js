import * as yup from 'yup'

const SmokerSchema = yup.object().shape({
  smoker: yup
    .string()
    .required('Veuillez indiquez si vous êtes fumeur ou non.'),
})

export default SmokerSchema
