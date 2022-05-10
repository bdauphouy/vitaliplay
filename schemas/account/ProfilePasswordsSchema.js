import * as yup from 'yup'

const ProfilePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Veuillez renseigner un mot de passe d'au moins 6 caractères.")
    .required('Veuillez renseigner un mot de passe.'),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'Les deux mots de passe ne correspondent pas.'
    )
    .required('Veuillez confirmer votre mot de passe.'),
})

export default ProfilePasswordSchema
