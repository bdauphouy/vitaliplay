import * as yup from 'yup'

export const InformationsSchema = yup.object().shape({
  lastName: yup
    .string()
    .min(2, 'Veuillez renseigner un nom valide.')
    .max(50, 'Veuillez renseigner un nom valide.')
    .required('Veuillez renseigner un nom.'),
  firstName: yup
    .string()
    .min(2, 'Veuillez renseigner un prénom valide.')
    .max(50, 'Veuillez renseigner un prénom valide.')
    .required('Veuillez renseigner un prénom.'),
  address: yup
    .string()
    .min(2, 'Veuillez renseigner une adresse valide.')
    .max(50, 'Veuillez renseigner une adresse valide.')
    .required('Veuillez renseigner une adresse.'),
  city: yup.string().required('Veuillez renseigner une ville.'),
  country: yup.string().required('Veuillez renseigner un pays.'),
  zipCode: yup
    .string()
    .matches(
      /(?:0[1-9]|[13-8][0-9]|2[ab1-9]|9[0-5])(?:[0-9]{3})?|9[78][1-9](?:[0-9]{2})?/,
      'Veuillez renseigner un code postal valide.'
    )
    .required('Veuillez renseigner un code postal.'),
})
