import * as yup from 'yup'

const ContactSchema = yup.object().shape({
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
  message: yup.string().required('Veuillez renseigner un message.'),
})

export default ContactSchema
