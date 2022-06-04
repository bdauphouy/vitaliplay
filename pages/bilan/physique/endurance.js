import CheckupLayout from '@/components/layouts/CheckupLayout'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import { useContext, useState } from 'react'
import { useFormik } from 'formik'
import Input from '@/components/utils/Input'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import EnduranceSchema from '@/schemas/checkup/physical/Endurance'
import { LinksContext } from '@/contexts/LinksContext'
import { CheckupContext } from '@/contexts/CheckupContext'
import { fetchAPIWithToken } from '@/lib/api'

export const getServerSideProps = async ({ req, query }) => {
  if (!req.cookies.jwt) {
    return {
      redirect: {
        destination: '/connexion',
        permanent: true,
      },
    }
  }

  const paid = await fetchAPIWithToken(
    '/users/me/subscription',
    req.cookies.jwt,
    false
  )

  if (paid.status !== 'paid') {
    return {
      redirect: {
        destination: '/abonnements',
        permanent: true,
      },
    }
  }

  return { props: {} }
}

const PhysicalEndurance = () => {
  const [store, setStore] = useState()
  const { getPage, checkupPages } = useContext(LinksContext)
  const { checkup } = useContext(CheckupContext)

  const router = useRouter()

  useEffect(() => {
    setStore(
      JSON.parse(window.localStorage.getItem('vitaliplay.checkup.store'))
    )
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      reps: store?.physical?.endurance?.reps || '15',
    },
    validationSchema: EnduranceSchema,
    onSubmit: (values) => {
      window.scrollTo(0, 0)
      window.localStorage.setItem(
        'vitaliplay.checkup.store',
        JSON.stringify({
          ...store,
          physical: {
            ...store?.physical,
            endurance: { endurance: parseInt(values.reps) },
          },
        })
      )
      router.push(getPage(checkupPages, 'pageName', 'Equilibre').path)
    },
  })

  const buttonSize = useButtonSize()

  return (
    <>
      <div>
        <Title type="3">
          {checkup.checkupExercises?.[4].checkupExerciseName}
        </Title>
        <div className="mt-4">
          <Subtitle type="2">
            {checkup.checkupExercises?.[4].checkupExerciseDescription}
          </Subtitle>
        </div>
        <iframe
          className="mt-6 aspect-video w-full"
          src={checkup.checkupExercises?.[4].checkupExerciseVideoLink}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <form onSubmit={formik.handleSubmit} className="mt-5 w-full lg:w-1/3">
        <div className="mt-4">
          <Input
            label="Nombre de répétitions"
            name="reps"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.reps}
            errors={formik.touched.reps && formik.errors.reps}
          />
        </div>

        <div className="mt-10">
          <Cta buttonType="submit" type="primary" size={buttonSize}>
            Valider
          </Cta>
        </div>
      </form>
    </>
  )
}

PhysicalEndurance.Layout = CheckupLayout

export default PhysicalEndurance
