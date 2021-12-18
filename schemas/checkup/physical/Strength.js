import * as yup from 'yup'

const StrengthSchema = yup.object().shape({
  firstReps: yup
    .string()
    .required('Veuillez renseigner un nombre de répétitions'),
  secondReps: yup
    .string()
    .required('Veuillez renseigner un nombre de répétitions'),
})

export default StrengthSchema
