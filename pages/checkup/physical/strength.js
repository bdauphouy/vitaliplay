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
import StrengthSchema from '@/schemas/checkup/physical/Strength'

const PhysicalStrength = () => {
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
      firstReps: store?.physical?.strength[0] || '15',
      secondReps: store?.physical?.strength[1] || '15',
    },
    validationSchema: StrengthSchema,
    onSubmit: values => {
      window.localStorage.setItem(
        'vitaliplay.checkup.store',
        JSON.stringify({
          ...store,
          physical: {
            ...store?.physical,
            strength: {
              firstReps: values.firstReps.toString(),
              secondReps: values.secondReps.toString(),
            },
          },
        }),
      )
      currentExercise === 1
        ? setCurrentExercise(2)
        : router.push(`${prefix}${getPathByIds([1, 2])}`)
    },
  })

  const buttonSize = useButtonSize()

  return (
    <>
      {currentExercise === 1 ? (
        <div>
          <Title>Exercice 1 : Assis-debout</Title>
          <div className="mt-4">
            <Subtitle>
              Le but est de se lever et s’assoir sur une chaise le plus de fois
              possibles en 30 secondes.
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
          <Title>Exercice 2 : Flexion de bras</Title>
          <div className="mt-4">
            <Subtitle>
              Assis sur une chaise le but est de réaliser un maximum de
              flexion-extension de bras avec un poids d’environ 2kg en 30
              secondes.
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
