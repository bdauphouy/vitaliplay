import * as yup from 'yup'

const MoodSchema = yup.object().shape({
  moodScale: yup.string().required("Veuillez renseigner un niveau d'humeur."),
})

export default MoodSchema
