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
import StrengthSchema from '@/schemas/checkup/physical/Strength'
import { LinksContext } from '@/contexts/LinksContext'
import { CheckupContext } from '@/contexts/CheckupContext'

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

  if (paid.status !== 'finalized') {
    return {
      redirect: {
        destination: '/abonnements',
        permanent: true,
      },
    }
  }

  return { props: {} }
}

const PhysicalStrength = () => {
  const [store, setStore] = useState()
  const [currentExercise, setCurrentExercise] = useState(1)
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
      firstReps: store?.physical?.strength.arm || '15',
      secondReps: store?.physical?.strength.leg || '15',
    },
    validationSchema: StrengthSchema,
    onSubmit: (values) => {
      window.scrollTo(0, 0)
      window.localStorage.setItem(
        'vitaliplay.checkup.store',
        JSON.stringify({
          ...store,
          physical: {
            ...store?.physical,
            strength: {
              arm: parseInt(values.firstReps),
              leg: parseInt(values.secondReps),
            },
          },
        })
      )
      currentExercise === 1
        ? setCurrentExercise(2)
        : router.push(getPage(checkupPages, 'pageName', 'Souplesse').path)
    },
  })

  const buttonSize = useButtonSize()

  return (
    <>
      {currentExercise === 1 ? (
        <div>
          <Title type="3">
            {checkup.checkupExercises?.[0].checkupExerciseName}
          </Title>
          <div className="mt-4">
            <Subtitle type="2">
              {checkup.checkupExercises?.[0].checkupExerciseDescription}
            </Subtitle>
          </div>
          <iframe
            className="mt-6 aspect-video w-full"
            src={checkup.checkupExercises?.[0].checkupExerciseVideoLink}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div>
          <Title type="3">
            {checkup.checkupExercises?.[1].checkupExerciseName}
          </Title>
          <div className="mt-4">
            <Subtitle type="2">
              {checkup.checkupExercises?.[1].checkupExerciseDescription}
            </Subtitle>
          </div>
          <iframe
            className="mt-6 aspect-video w-full"
            src={checkup.checkupExercises?.[1].checkupExerciseVideoLink}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <form onSubmit={formik.handleSubmit} className="mt-5 w-full lg:w-1/3">
        <Input
          label="Nombre de répétitions"
          name={currentExercise === 1 ? 'firstReps' : 'secondReps'}
          type="number"
          onChange={formik.handleChange}
          value={
            currentExercise === 1
              ? formik.values.firstReps
              : formik.values.secondReps
          }
          error={
            currentExercise === 1
              ? formik.touched.firstReps && formik.errors.firstReps
              : formik.touched.secondReps && formik.errors.secondReps
          }
        />
        <div className="mt-10">
          <Cta buttonType="submit" type="primary" size={buttonSize}>
            Valider
          </Cta>
        </div>
      </form>
    </>
  )
}

PhysicalStrength.Layout = CheckupLayout

export default PhysicalStrength
