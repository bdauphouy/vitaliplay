import * as yup from 'yup'

const PainSchema = yup.object().shape({
  pain: yup
    .string()
    .required(
      'Veuillez indiquer si vous êtes sujet ou non à des douleurs chroniques.',
    ),
  painList: yup.array().when(['pain'], {
    is: pain => pain === 'yes',
    then: () =>
      yup
        .array()
        .min(
          1,
          'Veuillez indiquer où sont localisées vos douleurs chroniques.',
        ),
  }),
  painScale: yup.string().when(['pain'], {
    is: pain => pain === 'yes',
    then: () =>
      yup.string().required('Veuillez sélectionner une échelle de douleur.'),
  }),
})

export default PainSchema
