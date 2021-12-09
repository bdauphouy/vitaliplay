import { SurveyContext } from '@/contexts/SurveyContext'
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

const SurveyProsthesis = () => {
  const { getPathByStep, prefix } = useContext(SurveyContext)

  const [store, setStore] = useState()

  useEffect(() => {
    const localStore = JSON.parse(
      window.localStorage.getItem('vitaliplay.survey.store'),
    )

    setStore(localStore)
  }, [])

  const [prosthesisLocations] = useState(['Epaule', 'Hanche', 'Genou', 'Autre'])

  const router = useRouter()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      prosthesis: store?.prosthesis || '',
      prosthesisLocations: store?.prosthesisLocations || [],
    },
    validationSchema: ProsthesisSchema,
    onSubmit: values => {
      window.localStorage.setItem(
        'vitaliplay.survey.store',
        JSON.stringify({ ...store, ...values }),
      )
      router.push(`${prefix}${getPathByStep('Succès')}`)
    },
  })

  const buttonSize = useButtonSize()

  return (
    <div>
      <div className="xl:max-w-3xl">
        <Title>Avez-vous une prothèse articulaire?</Title>
        <div className="mt-4">
          <Subtitle>Si oui, à quel(s) endroit ?</Subtitle>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Radio
              id="yes"
              name="prosthesis"
              checked={formik.values.prosthesis === 'yes'}
              onChange={formik.handleChange}>
              Oui
            </Radio>
            <Radio
              id="no"
              name="prosthesis"
              checked={formik.values.prosthesis === 'no'}
              onChange={formik.handleChange}>
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
                  ? 'opacity-100 h-auto'
                  : 'opacity-0 h-0 overflow-hidden'
              } transition duration-300 ease-linear md:col-span-2 flex flex-col gap-4`}>
              {prosthesisLocations.map((prosthesisLocation, i) => {
                return (
                  <Checkbox
                    key={i}
                    id={prosthesisLocation}
                    name="prosthesisLocations"
                    checked={formik.values.prosthesisLocations.includes(
                      prosthesisLocation,
                    )}
                    onChange={formik.handleChange}>
                    {prosthesisLocation}
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
                router.push(`${prefix}${getPathByStep('Succès')}`)
              }>
              <Cta type="secondary" size={buttonSize}>
                Passer
              </Cta>
            </div>
          </div>
        </form>
        <p className="mt-6 underline text-sm font-bold font-body text-dark-300">
          Je ne souhaite pas répondre
        </p>
      </div>
    </div>
  )
}

SurveyProsthesis.Layout = SurveyLayout

export default SurveyProsthesis
