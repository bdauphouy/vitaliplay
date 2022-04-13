import * as yup from 'yup'

const InvitationSchema = yup.object().shape({
  code: yup.string().required("Veuillez renseigner un code d'invitation."),
})

export default InvitationSchema
