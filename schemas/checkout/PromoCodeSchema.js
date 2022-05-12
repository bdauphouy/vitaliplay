import * as yup from 'yup'

const PromoCodeSchema = yup.object().shape({
  promoCode: yup.string().required("Veuillez renseigner un code d'invitation."),
})

export default PromoCodeSchema
