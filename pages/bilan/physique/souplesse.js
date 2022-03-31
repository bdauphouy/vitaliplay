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
import FlexibilitySchema from '@/schemas/checkup/physical/Flexibility'
import { LinksContext } from '@/contexts/LinksContext'
import { CheckupContext } from '@/contexts/CheckupContext'

const PhysicalFlexibility = () => {
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
      firstDistance: store?.physical?.flexibility?.exo3 || '35',
      secondDistance: store?.physical?.flexibility?.exo4 || '35',
    },
    validationSchema: FlexibilitySchema,
    onSubmit: (values) => {
      window.scrollTo(0, 0)
      window.localStorage.setItem(
        'vitaliplay.checkup.store',
        JSON.stringify({
          ...store,
          physical: {
            ...store?.physical,
            flexibility: {
              exo3: values.firstDistance.toString(),
              exo4: values.secondDistance.toString(),
            },
          },
        })
      )
      currentExercise === 1
        ? setCurrentExercise(2)
        : router.push(getPage(checkupPages, 'pageName', 'Endurance').path)
    },
  })

  const buttonSize = useButtonSize()

  return (
    <>
      {currentExercise === 1 ? (
        <div>
          <Title type="3">Exercice 3 : Souplesse de tronc</Title>
          <div className="mt-4">
            <Subtitle type="2">
              {checkup.etape1_exercices?.exercice3.description}
            </Subtitle>
          </div>
          <iframe
            className="mt-6 aspect-video w-full"
            src={checkup.etape1_exercices?.exercice3.video}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div>
          <Title type="3">Exercice 4 : Gratte dos (dès 2 côtés)</Title>
          <div className="mt-4">
            <Subtitle>
              {checkup.etape1_exercices?.exercice4.description}
            </Subtitle>
          </div>
          <iframe
            className="mt-6 aspect-video w-full"
            src={checkup.etape1_exercices?.exercice4.video}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <form onSubmit={formik.handleSubmit} className="mt-5 w-full lg:w-1/3">
        <Input
          label="Distance (cm)"
          name={currentExercise === 1 ? 'firstDistance' : 'secondDistance'}
          type="number"
          onChange={formik.handleChange}
          value={
            currentExercise === 1
              ? formik.values.firstDistance
              : formik.values.secondDistance
          }
          error={
            currentExercise === 1
              ? formik.touched.firstDistance && formik.errors.firstDistance
              : formik.touched.secondDistance && formik.errors.secondDistance
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

PhysicalFlexibility.Layout = CheckupLayout

export default PhysicalFlexibility
