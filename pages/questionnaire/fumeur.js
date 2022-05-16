import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import SurveyLayout from '@/components/layouts/SurveyLayout'
import { useFormik } from 'formik'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import Radio from '@/components/utils/Radio'
import Dropdown from '@/components/utils/Dropdown'
import { useState, useContext, useEffect } from 'react'
import SmokerSchema from '@/schemas/survey/Smoker'
import Error from '@/components/utils/Error'
import { useRouter } from 'next/router'
import { LinksContext } from '@/contexts/LinksContext'
import { SurveyContext } from '@/contexts/SurveyContext'
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

const SurveySmoker = () => {
  const { getPage, surveyPages } = useContext(LinksContext)

  const { survey } = useContext(SurveyContext)

  const [store, setStore] = useState()

  const [number, setNumber] = useState('5')
  const [forDate, setForDate] = useState('20 ans')

  useEffect(() => {
    const localStore = JSON.parse(
      window.localStorage.getItem('vitaliplay.survey.store')
    )

    setStore(localStore)
    if (localStore.number && localStore.forDate) {
      setNumber(localStore.number)
      setForDate(localStore.forDate)
    }
  }, [])

  const router = useRouter()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      smoker: store?.smoker || '',
    },
    validationSchema: SmokerSchema,
    onSubmit: (values) => {
      window.localStorage.setItem(
        'vitaliplay.survey.store',
        JSON.stringify({ ...store, ...values, number, forDate })
      )
      router.push(getPage(surveyPages, 'pageName', 'Douleurs').path)
    },
  })

  const buttonSize = useButtonSize()

  return (
    <div>
      <div className="xl:max-w-3xl">
        <Title type="3">{survey.isSmokerTitle}</Title>
        <div className="mt-4">
          <Subtitle type="2">{survey.isSmokerDescription}</Subtitle>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="mt-6 grid grid-cols-1 gap-3 md:mt-8 md:grid-cols-2 md:gap-4"
        >
          <Radio
            id="non-smoker"
            name="smoker"
            checked={formik.values.smoker === 'non-smoker'}
            onChange={formik.handleChange}
          >
            Non fumeur
          </Radio>
          <Radio
            id="smoker"
            name="smoker"
            checked={formik.values.smoker === 'smoker'}
            onChange={formik.handleChange}
          >
            Fumeur
          </Radio>
          {formik.touched.smoker && (
            <div className="md:col-span-2">
              <Error>{formik.errors.smoker}</Error>
            </div>
          )}

          <div
            style={{ transitionProperty: 'opacity' }}
            className={`${
              formik.values.smoker === 'smoker'
                ? 'mt-5 h-auto opacity-100 md:mt-7'
                : 'h-0 overflow-hidden opacity-0'
            } col-span-1 flex gap-4 transition duration-300 ease-linear md:col-span-2 md:gap-8`}
          >
            <Dropdown
              options={Array.from({ length: 10 }, (_, i) => i + 1)}
              label="Nombre"
              defaultOption={number}
              getOption={setNumber}
            />
            <Dropdown
              options={Array.from(
                { length: 10 },
                (_, i) => (i + 1) * 2 + ' ans'
              )}
              label="Depuis"
              defaultOption={forDate}
              getOption={setForDate}
            />
          </div>

          <div className="mt-10 flex flex-wrap items-start gap-4 md:col-span-2 lg:gap-6">
            <Cta buttonType="submit" type="primary" size={buttonSize}>
              Valider
            </Cta>
            <div
              onClick={() => getPage(surveyPages, 'pageName', 'Douleurs').path}
            >
              <Cta type="secondary" size={buttonSize}>
                Passer
              </Cta>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

SurveySmoker.Layout = SurveyLayout

export default SurveySmoker
