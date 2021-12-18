import * as yup from 'yup'

const AwakeningSchema = yup.object().shape({
  awakeningScale: yup
    .string()
    .required('Veuillez renseigner un niveau de réveil.'),
})

export default AwakeningSchema
