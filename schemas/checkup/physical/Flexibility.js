import * as yup from 'yup'

const FlexibilitySchema = yup.object().shape({
  firstDistance: yup.string().required('Veuillez renseigner une distance.'),
  secondDistance: yup.string().required('Veuillez renseigner une distance.'),
})

export default FlexibilitySchema
