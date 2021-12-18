import * as yup from 'yup'

const EnduranceSchema = yup.object().shape({
  reps: yup.string().required('Veuillez renseigner un nombre de répétitions.'),
})

export default EnduranceSchema
