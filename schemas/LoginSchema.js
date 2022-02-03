import * as yup from 'yup'

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Veuillez rentrer un email valide.')
    .required('Veuillez renseigner un email.'),
  password: yup.string().required('Veuillez renseigner un mot de passe.'),
})

export default LoginSchema
