import CheckupLayout from '@/components/layouts/CheckupLayout'
import Title from '@/components/utils/Title'
import { useContext, useState } from 'react'
import { useFormik } from 'formik'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import { useEffect } from 'react'
import { CheckupContext } from '@/contexts/CheckupContext'
import { useRouter } from 'next/router'
import Radio from '@/components/utils/Radio'
import AwakeningSchema from '@/schemas/checkup/well-being/Awakening'
import Error from '@/components/utils/Error'

const WellBeingAwakening = () => {
  const [store, setStore] = useState()

  const { prefix, getPathByIds } = useContext(CheckupContext)

  const [labels] = useState([
    'Tout le temps',
    'La plupart du temps',
    'Plus de la moitié du temps',
    'Moins de la moitié du temps',
    'De temps en temps',
    'Jamais',
  ])

  const router = useRouter()

  useEffect(() => {
    setStore(
      JSON.parse(window.localStorage.getItem('vitaliplay.checkup.store')),
    )
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      awakeningScale: store?.wellBeing?.awakening?.awakeningScale || '',
    },
    validationSchema: AwakeningSchema,
    onSubmit: values => {
      window.localStorage.setItem(
        'vitaliplay.checkup.store',
        JSON.stringify({
          ...store,
          wellBeing: {
            ...store?.wellBeing,
            awakening: {
              awakeningScale: values.awakeningScale,
            },
          },
        }),
      )
      router.push(`${prefix}${getPathByIds([2, 5])}`)
    },
  })

  const buttonSize = useButtonSize()

  return (
    <div>
      <Title type="3">
        Je me suis réveillé(e) en me sentant frais(che) et dispos(e)
      </Title>
      <form onSubmit={formik.handleSubmit} className="mt-12">
        <div className="grid grid-cols-3 lg:flex lg:flex-wrap gap-x-4 gap-y-6">
          {Array.from({ length: 6 }, (_, i) => i + 0).map((scale, i) => {
            return (
              <div key={i}>
                <Radio
                  label={labels[5 - i]}
                  id={scale.toString()}
                  name="awakeningScale"
                  checked={formik.values.awakeningScale === scale.toString()}
                  onChange={formik.handleChange}
                  number={true}>
                  {scale}
                </Radio>
              </div>
            )
          })}
        </div>
        {formik.touched.awakeningScale && (
          <div className="mt-8">
            <Error>{formik.errors.awakeningScale}</Error>
          </div>
        )}
        <div className="mt-10">
          <Cta buttonType="submit" type="primary" size={buttonSize}>
            Valider
          </Cta>
        </div>
      </form>
    </div>
  )
}

WellBeingAwakening.Layout = CheckupLayout

export default WellBeingAwakening
