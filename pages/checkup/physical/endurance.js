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
import EnduranceSchema from '@/schemas/checkup/physical/Endurance'

const PhysicalEndurance = () => {
  const [store, setStore] = useState()

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
      reps: store?.physical?.endurance?.reps || '15',
    },
    validationSchema: EnduranceSchema,
    onSubmit: values => {
      console.log(values)
      window.localStorage.setItem(
        'vitaliplay.checkup.store',
        JSON.stringify({
          ...store,
          physical: {
            ...store?.physical,
            endurance: {
              reps: values.reps.toString(),
            },
          },
        }),
      )
      router.push(`${prefix}${getPathByIds([1, 4])}`)
    },
  })

  const buttonSize = useButtonSize()

  return (
    <>
      <div>
        <Title>Exercice 5 : Montée genoux</Title>
        <div className="mt-4">
          <Subtitle>
            Nombre de montées de genoux (à mi-distance entre la rotule et la
            crête de l’os iliaque) pendant 2 minutes. on compte le nombre de
            monté de un genou (pas les 2)
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

      <form onSubmit={formik.handleSubmit} className="w-full lg:w-1/3 mt-5">
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
