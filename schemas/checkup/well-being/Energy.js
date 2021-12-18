import * as yup from 'yup'

const EnergySchema = yup.object().shape({
  energyScale: yup
    .string()
    .required("Veuillez renseigner un niveau d'énergie."),
})

export default EnergySchema
