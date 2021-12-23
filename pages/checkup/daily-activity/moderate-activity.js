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
import ActivitySchema from '@/schemas/checkup/daily-activity/ActivitySchema'
import Error from '@/components/utils/Error'
import Subtitle from '@/components/utils/Subtitle'

const DailyActivityModerateActivity = () => {
  const [store, setStore] = useState()

  const { prefix, getPathByIds } = useContext(CheckupContext)

  const router = useRouter()

  const [radios] = useState([
    'Plus de 5 fois par semaine',
    '3 à 4 fois par semaine',
    '1 à 2 fois par semaine',
    'Jamais',
  ])

  useEffect(() => {
    setStore(
      JSON.parse(window.localStorage.getItem('vitaliplay.checkup.store')),
    )
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      frequency: store?.dailyActivity?.moderateActivity?.frequency || '',
    },
    validationSchema: ActivitySchema,
    onSubmit: values => {
      window.localStorage.setItem(
        'vitaliplay.checkup.store',
        JSON.stringify({
          ...store,
          dailyActivity: {
            ...store?.dailyActivity,
            moderateActivity: {
              frequency: values.frequency,
            },
          },
        }),
      )
      router.push(`${prefix}${getPathByIds([4, 0])}`)
    },
  })

  const buttonSize = useButtonSize()

  return (
    <div>
      <Title type="3">
        Combien de fois par semaine faites-vous 30 minutes d’activité physique
        modérée ou de la marche, qui augmente votre fréquence cardiaque ou qui
        vous font respirer plus fort que normalement ?
      </Title>
      <div className="mt-4">
        <Subtitle type="2">
          Par exemple : jogging, port de charge lourde, aérobic ou cyclisme à
          allure rapide
        </Subtitle>
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-12">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-x-4 gap-y-6">
          {radios.map((radio, i) => {
            return (
              <div key={i}>
                <Radio
                  id={radio.toString()}
                  name="frequency"
                  checked={formik.values.frequency === radio.toString()}
                  onChange={formik.handleChange}
                  center={true}
                  padding="2">
                  {radio}
                </Radio>
              </div>
            )
          })}
        </div>
        {formik.touched.frequency && (
          <div className="mt-8">
            <Error>{formik.errors.frequency}</Error>
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

DailyActivityModerateActivity.Layout = CheckupLayout

export default DailyActivityModerateActivity
