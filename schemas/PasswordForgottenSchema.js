import * as yup from 'yup'

const PasswordForgottenSchema = yup.object().shape({
  email: yup
    .string()
    .email('Veuillez rentrer un email valide.')
    .required('Veuillez renseigner un email.'),
})

export default PasswordForgottenSchema
