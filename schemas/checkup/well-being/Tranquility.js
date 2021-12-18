import * as yup from 'yup'

const TranquilitySchema = yup.object().shape({
  tranquilityScale: yup
    .string()
    .required('Veuillez renseigner un niveau de tranquilité.'),
})

export default TranquilitySchema
