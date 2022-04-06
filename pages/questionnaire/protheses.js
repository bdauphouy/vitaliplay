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
import { postAPIWithToken, getToken } from '@/lib/api'

const SurveyProsthesis = () => {
  const { getPage, surveyPages } = useContext(LinksContext)
  const { survey } = useContext(SurveyContext)

  const [store, setStore] = useState()

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
        height: parseInt(height),
        weight: parseInt(weight),
        smoker: smoker === 'smoker',
        smokerNumber: parseInt(number),
        smokerDate: parseInt(forDate),
        pain: pain === 'yes',
        painList: painList.map((pain) => parseInt(pain.slice(-1))),
        painScale: parseInt(painScale),
        affection: affection === 'yes',
        affectionList: affectionList.map((affection) =>
          parseInt(affection.slice(-1))
        ),
        prosthesis: prosthesis === 'yes',
        prosthesisLocations: prosthesisLocations.map((prosthesisLocation) =>
          parseInt(prosthesisLocation.slice(-1))
        ),
      }

      const fetchSurvey = async () => {
        const data = await postAPIWithToken(
          '/questionnaire-reponses',
          {
            data: sortedData,
          },
          getToken()
        )

        if (data) {
          router.push(getPage(surveyPages, 'pageName', 'Succès').path)
        } else {
          router.push(getPage(surveyPages, 'pageName', 'Questionnaire').path)
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
        <Title type="3">Avez-vous une prothèse articulaire ?</Title>
        <div className="mt-4">
          <Subtitle type="2">{survey.prothese_description}</Subtitle>
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
            {formik.touched.prosthesis && (
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
              {survey.prothese_list?.map((prosthesisLocation, i) => {
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
                    {prosthesisLocation.name}
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
          <div className="mt-12 flex flex-wrap gap-4 lg:gap-6">
            <Cta buttonType="submit" type="primary" size={buttonSize}>
              Valider
            </Cta>
            <div
              onClick={() =>
                router.push(getPage(surveyPages, 'pageName', 'Succès').path)
              }
            >
              <Cta type="secondary" size={buttonSize}>
                Passer
              </Cta>
            </div>
          </div>
        </form>
        <p className="mt-6 font-body text-sm font-bold text-dark-300 underline">
          Je ne souhaite pas répondre
        </p>
      </div>
    </div>
  )
}

SurveyProsthesis.Layout = SurveyLayout

export default SurveyProsthesis
