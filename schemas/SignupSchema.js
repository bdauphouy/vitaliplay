import * as yup from 'yup'

const SignupSchema = yup.object().shape({
  lastName: yup
    .string()
    .min(2, 'Veuillez renseigner un nom valide.')
    .max(50, 'Veuillez renseigner un nom valide.')
    .required('Veuillez renseigner un nom.'),
  firstName: yup
    .string()
    .min(2, 'Veuillez renseigner un nom valide.')
    .max(50, 'Veuillez renseigner un nom valide.')
    .required('Veuillez renseigner un prénom.'),
  address: yup
    .string()
    .min(2, 'Veuillez renseigner une adresse valide.')
    .max(50, 'Veuillez renseigner une adresse valide.')
    .required('Veuillez renseigner une adresse.'),
  zipCode: yup
    .string()
    .matches(
      /(?:0[1-9]|[13-8][0-9]|2[ab1-9]|9[0-5])(?:[0-9]{3})?|9[78][1-9](?:[0-9]{2})?/,
      'Veuillez renseigner un code postal valide.',
    )
    .required('Veuillez renseigner un code postal.'),

  birthday: yup.date().required('Veuillez renseigner une date de naissance.'),
  email: yup
    .string()
    .email('Veuillez rentrer un email valide.')
    .required('Veuillez renseigner un email.'),
  phoneNumber: yup
    .string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Veuillez renseigner un numéro de téléphone valide.',
    )
    .required('Veuillez renseigner un numéro de téléphone.'),
  password: yup
    .string()
    .min(6, "Veuillez renseigner un mot de passe d'au moins 6 caractères.")
    .required('Veuillez renseigner un mot de passe.'),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'Les deux mots de passe ne correspondent pas.',
    )
    .required('Veuillez confirmer votre mot de passe.'),
})

export default SignupSchema
