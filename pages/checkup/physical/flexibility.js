import CheckupLayout from '@/components/layouts/CheckupLayout'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import { useContext, useState } from 'react'
import { useFormik } from 'formik'
import Input from '@/components/utils/Input'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import { useEffect } from 'react'
import { CheckupContext } from '@/contexts/CheckupContext'
import { useRouter } from 'next/router'
import FlexibilitySchema from '@/schemas/checkup/physical/Flexibility'

const PhysicalFlexibility = () => {
  const [store, setStore] = useState()
  const [currentExercise, setCurrentExercise] = useState(1)

  const { prefix, getPathByIds } = useContext(CheckupContext)

  const router = useRouter()

  useEffect(() => {
    setStore(
      JSON.parse(window.localStorage.getItem('vitaliplay.checkup.store')),
    )
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstDistance: store?.physical?.flexibility?.firstDistance || '35',
      secondDistance: store?.physical?.flexibility?.secondDistance || '35',
    },
    validationSchema: FlexibilitySchema,
    onSubmit: values => {
      window.scrollTo(0, 0)
      window.localStorage.setItem(
        'vitaliplay.checkup.store',
        JSON.stringify({
          ...store,
          physical: {
            ...store?.physical,
            flexibility: {
              firstDistance: values.firstDistance.toString(),
              secondDistance: values.secondDistance.toString(),
            },
          },
        }),
      )
      currentExercise === 1
        ? setCurrentExercise(2)
        : router.push(`${prefix}${getPathByIds([1, 3])}`)
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
              Assis sur le rebord d’une chaise, une jambe tendue, les mains
              cherchent à atteindre le pied, la distance entre le bout des
              doigts et le pied est mesuré
            </Subtitle>
          </div>
          <iframe
            className="mt-6 w-full aspect-video"
            src="https://www.youtube.com/embed/yR9Wpyf8gbk"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        </div>
      ) : (
        <div>
          <Title>Exercice 4 : Gratte dos (dès 2 côtés)</Title>
          <div className="mt-4">
            <Subtitle>
              Une main au-dessus de l’épaule, paume contre le dos et l’autre
              atteint le milieu du dos, paume vers l’extérieur, mesurer la
              distance entre les majeurs.
            </Subtitle>
          </div>
          <iframe
            className="mt-6 w-full aspect-video"
            src="https://www.youtube.com/embed/yR9Wpyf8gbk"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        </div>
      )}
      <form onSubmit={formik.handleSubmit} className="w-full lg:w-1/3 mt-5">
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
