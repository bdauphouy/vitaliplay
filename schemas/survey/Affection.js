import * as yup from 'yup'

const AffectionSchema = yup.object().shape({
  affection: yup
    .string()
    .required(
      "Veuillez indiquez si vous êtes atteint d'une affection longue durée.",
    ),
  affectionList: yup.array().when(['affection'], {
    is: affection => affection === 'yes',
    then: yup
      .array()
      .min(1, 'Veuillez renseigner vos affections longue durée.'),
  }),
})

export default AffectionSchema
