import * as yup from 'yup'

export const CheckoutSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Veuillez renseigner un nom valide.')
    .max(50, 'Veuillez renseigner un nom valide.')
    .required('Veuillez renseigner un nom.'),
  cardNumber: yup
    .string()
    .matches(
      /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
      'Veuillez renseigner un numéro de carte valide.'
    )
    .required('Veuillez renseigner un numéro de carte.'),
  expires: yup
    .string()
    .matches(
      /[0-1][0-9]\/[0-9][0-9]/gm,
      "Veuillez renseigner une date d'expiration valide."
    )
    .required("Veuillez renseigner une date d'expiration."),
  cvv: yup
    .string()
    .matches(/[0-9][0-9][0-9]/gm, 'Veuillez renseigner un CVV valide.')
    .required('Veuillez renseigner un CVV.'),
})
