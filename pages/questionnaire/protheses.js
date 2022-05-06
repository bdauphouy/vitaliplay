import { useContext, useState, useEffect } from 'react'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import SurveyLayout from '@/components/layouts/SurveyLayout'
import Radio from '@/components/utils/Radio'
import { useFormik } from 'formik'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import Checkbox from '@/components/utils/Checkbox'
import { useRouter } from 'next/router'
import Error from '@/components/utils/Error'
import ProsthesisSchema from '@/schemas/survey/Prosthesis'
import { LinksContext } from '@/contexts/LinksContext'
import { SurveyContext } from '@/contexts/SurveyContext'
import { postAPIWithToken, getToken, fetchAPIWithToken } from '@/lib/api'

export const getServerSideProps = async ({ req }) => {
  if (!req.cookies.jwt) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    }
  }

  const prosthesis = await fetchAPIWithToken(
    '/prostheses',
    req.cookies.jwt,
    false
  )

  return { props: { prosthesis: prosthesis.data } }
}

const SurveyProsthesis = ({ prosthesis }) => {
  const { getPage, surveyPages, accountPages } = useContext(LinksContext)
  const { survey } = useContext(SurveyContext)

  const [loading, setLoading] = useState(false)

  const [store, setStore] = useState()

  const [serverSideErrors] = useState({
    'The user already has a questionAnswer field.':
      'Vous avez déjà répondu à votre questionnaire.',
  })

  const [serverSideError, setServerSideError] = useState()

  useEffect(() => {
    setStore(JSON.parse(window.localStorage.getItem('vitaliplay.survey.store')))
  }, [])

  const router = useRouter()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      prosthesis: store?.prosthesis || '',
      prosthesisLocations: store?.prosthesisLocations || [],
    },
    validationSchema: ProsthesisSchema,
    onSubmit: (values) => {
      setLoading(true)

      window.localStorage.setItem(
        'vitaliplay.survey.store',
        JSON.stringify({ ...store, ...values })
      )

      const surveyData = window.localStorage.getItem('vitaliplay.survey.store')

      const {
        height,
        weight,
        smoker,
        number,
        forDate,
        pain,
        painList,
        painScale,
        affection,
        affectionList,
        prosthesis,
        prosthesisLocations,
      } = JSON.parse(surveyData)

      const sortedData = {
        size: parseInt(height),
        weight: parseInt(weight),
        isSmoker: smoker === 'smoker',
        dailyPacksOfCigarettes: parseInt(number),
        smokerForYears: parseInt(forDate),
        hasPain: pain === 'yes',
        pains: painList.map((pain) => parseInt(pain.slice(-1))),
        painScale: parseInt(painScale),
        hasLongTermCondition: affection === 'yes',
        longTermConditions: affectionList.map((affection) =>
          parseInt(affection.slice(-1))
        ),
        hasProthesis: prosthesis === 'yes',
        protheses: prosthesisLocations.map((prosthesisLocation) =>
          parseInt(prosthesisLocation.slice(-1))
        ),
      }

      const fetchSurvey = async () => {
        const data = await postAPIWithToken(
          '/questions-answers',
          { data: sortedData },
          getToken()
        )
        setLoading(false)

        if (data.data) {
          router.push(getPage(surveyPages, 'pageName', 'Succès').path)
        }

        if (data.error) {
          setServerSideError(
            serverSideErrors[data.error.message] ||
              'Erreur lors de la soumission du questionnaire.'
          )

          if (
            data.error.message ===
            'The user already has a questionAnswer field.'
          ) {
            router.push(getPage(accountPages, 'pageName', 'Accueil').path)
          }
        }
      }

      if (surveyData) {
        fetchSurvey()
      }
    },
  })

  const buttonSize = useButtonSize()

  return (
    <div>
      <div className="xl:max-w-3xl">
        <Title type="3">{survey.hasProthesisTitle}</Title>
        <div className="mt-4">
          <Subtitle type="2">{survey.hasProthesisDescription}</Subtitle>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Radio
              id="yes"
              name="prosthesis"
              checked={formik.values.prosthesis === 'yes'}
              onChange={formik.handleChange}
            >
              Oui
            </Radio>
            <Radio
              id="no"
              name="prosthesis"
              checked={formik.values.prosthesis === 'no'}
              onChange={formik.handleChange}
            >
              Non
            </Radio>
            {formik.touched.prosthesis && formik.errors.prosthesis && (
              <div className="md:col-span-2">
                <Error>{formik.errors.prosthesis}</Error>
              </div>
            )}
            <div
              style={{ transitionProperty: 'opacity' }}
              className={`${
                formik.values.prosthesis === 'yes'
                  ? 'h-auto opacity-100'
                  : 'h-0 overflow-hidden opacity-0'
              } grid grid-cols-1 gap-4 transition duration-300 ease-linear md:col-span-2 md:grid-cols-2`}
            >
              {prosthesis?.map((prosthesisLocation, i) => {
                return (
                  <Checkbox
                    key={i}
                    id={`prosthesis-${prosthesisLocation.id}`}
                    name="prosthesisLocations"
                    checked={formik.values.prosthesisLocations.includes(
                      `prosthesis-${prosthesisLocation.id}`
                    )}
                    onChange={formik.handleChange}
                  >
                    {prosthesisLocation.attributes.name}
                  </Checkbox>
                )
              })}
            </div>
          </div>
          {formik.touched.prosthesisLocations && (
            <div className="mt-6">
              <Error>{formik.errors.prosthesisLocations}</Error>
            </div>
          )}
          {serverSideError && <Error>{serverSideError}</Error>}
          <div className="mt-12 flex flex-wrap gap-4 lg:gap-6">
            <Cta
              loading={loading}
              buttonType="submit"
              type="primary"
              size={buttonSize}
            >
              Valider
            </Cta>
            <div>
              <Cta buttonType="submit" type="secondary" size={buttonSize}>
                Passer et valider
              </Cta>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

SurveyProsthesis.Layout = SurveyLayout

export default SurveyProsthesis
