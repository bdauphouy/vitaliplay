import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Input from '@/components/utils/Input'
import { useFormik } from 'formik'
import Cta from '@/components/utils/Cta'
import ContactSchema from '@/schemas/ContactSchema'
import orangeGreen from '@/public/decoration-icons/orange-green.svg'
import greenBlue from '@/public/decoration-icons/green-blue.svg'
import blueOrange from '@/public/decoration-icons/blue-orange.svg'
import yellowOrange from '@/public/decoration-icons/yellow-orange.svg'
import Image from 'next/image'
import SiteLayout from '@/components/layouts/SiteLayout'

const Contact = () => {
  const formik = useFormik({
    initialValues: {
      lastName: '',
      firstName: '',
      email: '',
      phoneNumber: '',
      message: '',
    },
    validationSchema: ContactSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <>
      <div className="relative mx-auto mt-32 max-w-screen-3xl px-6 md:px-24 lg:mt-36">
        <div className="absolute top-0 left-20 hidden lg:block">
          <Image src={orangeGreen} alt="orange-green" />
        </div>
        <div className="absolute top-12 right-20 hidden lg:block xl:right-48">
          <Image src={blueOrange} alt="blue-orange" />
        </div>
        <div className="absolute bottom-0 left-36 hidden lg:block">
          <Image src={greenBlue} alt="green-blue" />
        </div>
        <div className="absolute -bottom-10 right-40 hidden lg:block">
          <Image src={yellowOrange} alt="yellow-orange" />
        </div>
        <div className="flex justify-center">
          <div className="max-w-xl">
            <Title type="1" center={true}>
              Contact
            </Title>
            <div className="mt-4">
              <Subtitle center={true}>
                Nous sommes à votre disposition pour répondre à vos questions.
                Nous ferons le nécessaire pour vous apporter satisfaction dans
                les meilleurs délais.
              </Subtitle>
            </div>
          </div>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-3 lg:mt-12 lg:grid-cols-2 lg:gap-8"
        >
          <Input
            label="Nom"
            name="lastName"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            error={formik.touched.lastName && formik.errors.lastName}
          />

          <Input
            label="Prénom"
            name="firstName"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            error={formik.touched.firstName && formik.errors.firstName}
          />
          <Input
            label="Email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
          />
          <Input
            label="Téléphone"
            name="phoneNumber"
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
            prefix="(+ 33)"
            error={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          <div className="h-48 lg:col-span-2">
            <Input
              label="Message"
              name="message"
              onChange={formik.handleChange}
              value={formik.values.message}
              textarea={true}
              error={formik.touched.message && formik.errors.message}
            />
          </div>
          <div className="mt-3 flex justify-center lg:col-span-2 lg:mt-4">
            <Cta buttonType="submit" size="l" type="primary">
              Envoyer
            </Cta>
          </div>
        </form>
      </div>
    </>
  )
}

Contact.Layout = SiteLayout

export default Contact
