import * as yup from 'yup'

const ActivitySchema = yup.object().shape({
  frequency: yup.string().required('Veuillez renseigner une fréquence.'),
})

export default ActivitySchema
