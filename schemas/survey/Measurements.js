import * as yup from 'yup'

const MeasurementsSchema = yup.object().shape({
  height: yup.string().required('Veuillez renseigner une taille.'),
  weight: yup.string().required('Veuillez renseigner un poids.'),
})

export default MeasurementsSchema
