import * as yup from 'yup'

const EverydayLifeSchema = yup.object().shape({
  everydayLifeScale: yup
    .string()
    .required('Veuillez renseigner un niveau de vie quotidienne.'),
})

export default EverydayLifeSchema
