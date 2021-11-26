import Title from '../components/Title'
import Subtitle from '../components/Subtitle'
import Input from '../components/Input'
import { useFormik } from 'formik'
import Cta from '../components/Cta'

const Contact = () => {
  const formik = useFormik({
    initialValues: {
      lastName: '',
      firstName: '',
      email: '',
      phoneNumber: '',
      message: '',
    },
    onSubmit: values => {
      console.log(values)
    },
  })
  return (
    <>
      <div className="px-6 mt-32 md:px-24 lg:mt-36">
        <div className="flex justify-center">
          <div className="max-w-xl">
            <Title type="1" center={true}>
              Contact
            </Title>
            <div className="mt-4">
              <Subtitle center={true}>
                Nous sommes à votre disposition pour répondre à vos questions.
                Nous ferons le nécessaire pour vous apporter satisfaction dans
                les meilleurs délais. Sportivement
              </Subtitle>
            </div>
          </div>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-8 mt-8 lg:mt-12">
          <Input
            label="Nom"
            name="lastName"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
          <Input
            label="Prénom"
            name="firstName"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          <Input
            type="email"
            label="Email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <Input
            type="tel"
            label="Téléphone"
            name="phoneNumber"
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
            prefix="(+ 33)"
          />
          <div className="lg:col-span-2 h-48">
            <Input
              label="Message"
              name="message"
              onChange={formik.handleChange}
              value={formik.values.message}
              textarea={true}
            />
          </div>
          <div className="lg:col-span-2 flex justify-center mt-3 lg:mt-4">
            <Cta buttonType="submit" size="l" type="primary">
              Envoyer
            </Cta>
          </div>
        </form>
      </div>
    </>
  )
}

export default Contact
