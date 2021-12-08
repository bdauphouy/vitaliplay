import * as yup from 'yup'

const ProsthesisSchema = yup.object().shape({
  prosthesis: yup
    .string()
    .required('Veuillez indiquez si vous avez une prothèse ou non.'),
  prosthesisLocations: yup.array().when(['prosthesis'], {
    is: prosthesis => prosthesis === 'yes',
    then: yup
      .array()
      .min(1, 'Veuillez indiquer où sont localisées vos prothèses.'),
  }),
})

export default ProsthesisSchema
