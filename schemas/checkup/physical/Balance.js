import * as yup from 'yup'

const BalanceSchema = yup.object().shape({
  leftLegTime: yup.string().required('Veuillez renseigner une distance.'),
  rightLegTime: yup.string().required('Veuillez renseigner une distance.'),
})

export default BalanceSchema
