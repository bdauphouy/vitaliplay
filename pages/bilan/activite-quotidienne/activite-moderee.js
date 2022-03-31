import CheckupLayout from '@/components/layouts/CheckupLayout'
import Title from '@/components/utils/Title'
import { useContext, useState } from 'react'
import { useFormik } from 'formik'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Radio from '@/components/utils/Radio'
import ActivitySchema from '@/schemas/checkup/daily-activity/ActivitySchema'
import Error from '@/components/utils/Error'
import Subtitle from '@/components/utils/Subtitle'
import { LinksContext } from '@/contexts/LinksContext'
import { CheckupContext } from '@/contexts/CheckupContext'
import { getToken, postAPIWithToken } from '@/lib/api'

const DailyActivityModerateActivity = () => {
  const [store, setStore] = useState()
  const { getPage, checkupPages } = useContext(LinksContext)
  const { checkup } = useContext(CheckupContext)

  const router = useRouter()

  const [radios] = useState([
    'Plus de 5 fois par semaine',
    '3 à 4 fois par semaine',
    '1 à 2 fois par semaine',
    'Jamais',
  ])

  useEffect(() => {
    setStore(
      JSON.parse(window.localStorage.getItem('vitaliplay.checkup.store'))
    )
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      frequency: store?.dailyActivity?.moderateActivity || '',
    },
    validationSchema: ActivitySchema,
    onSubmit: (values) => {
      window.localStorage.setItem(
        'vitaliplay.checkup.store',
        JSON.stringify({
          ...store,
          dailyActivity: {
            ...store?.dailyActivity,
            moderateActivity: values.frequency,
          },
        })
      )

      const checkupData = window.localStorage.getItem(
        'vitaliplay.checkup.store'
      )

      const fetchCheckup = async () => {
        const data = await postAPIWithToken(
          '/bilan-reponses',
          {
            data: JSON.parse(checkupData),
          },
          getToken()
        )

        if (data) {
          router.push(getPage(checkupPages, 'pageName', 'Succès').path)
        } else {
          router.push(getPage(checkupPages, 'pageName', 'Bilan').path)
        }
      }

      if (checkupData) {
        fetchCheckup()
      }
    },
  })

  const buttonSize = useButtonSize()

  return (
    <div>
      <Title type="3">{checkup.etape3_content?.moderate_activity.title}</Title>
      <div className="mt-4">
        <Subtitle type="2">
          {checkup.etape3_content?.moderate_activity.description}
        </Subtitle>
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-12">
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 xl:grid-cols-4">
          {radios.map((radio, i) => {
            return (
              <div key={i}>
                <Radio
                  id={radio.toString()}
                  name="frequency"
                  checked={formik.values.frequency === radio.toString()}
                  onChange={formik.handleChange}
                  center={true}
                >
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
