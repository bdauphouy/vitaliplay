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
import Error from '@/components/utils/Error'
import PainSchema from '@/schemas/survey/Pain'
import { useRouter } from 'next/router'

const SurveyPain = () => {
  const { getPathByStep, prefix } = useContext(SurveyContext)

  const [store, setStore] = useState()

  useEffect(() => {
    const localStore = JSON.parse(
      window.localStorage.getItem('vitaliplay.survey.store'),
    )

    setStore(localStore)
  }, [])

  const [painList] = useState([
    'Cervicales',
    'Epaules',
    'Coude / Poignet / Main',
    'Dorso-lombaire',
    'Hanches',
    'Genou',
    'Cheville / Pied',
  ])

  const router = useRouter()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      pain: store?.pain || '',
      painList: store?.painList || [],
      painScale: store?.painScale || '',
    },
    validationSchema: PainSchema,
    onSubmit: values => {
      window.localStorage.setItem(
        'vitaliplay.survey.store',
        JSON.stringify({ ...store, ...values }),
      )
      router.push(`${prefix}${getPathByStep('Affection longue durée')}`)
    },
  })

  const buttonSize = useButtonSize()

  return (
    <div>
      <div className="xl:max-w-3xl">
        <Title>
          Souffrez-vous de douleurs chroniques ? (Depuis plus de 3 mois)
        </Title>
        <div className="mt-4">
          <Subtitle>Si oui, où sont localisées vos douleurs ?</Subtitle>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Radio
              id="yes"
              name="pain"
              checked={formik.values.pain === 'yes'}
              onChange={formik.handleChange}>
              Oui
            </Radio>
            <Radio
              id="no"
              name="pain"
              checked={formik.values.pain === 'no'}
              onChange={formik.handleChange}>
              Non
            </Radio>
            {formik.touched.pain && (
              <div className="md:col-span-2">
                <Error>{formik.errors.pain}</Error>
              </div>
            )}
            <div
              style={{ transitionProperty: 'opacity' }}
              className={`${
                formik.values.pain === 'yes'
                  ? 'opacity-100 h-auto'
                  : 'opacity-0 h-0 overflow-hidden'
              } transition duration-300 ease-linear md:col-span-2 grid grid-cols-2 gap-6`}>
              {painList.map((pain, i) => {
                return (
                  <Checkbox
                    key={i}
                    id={pain}
                    name="painList"
                    checked={formik.values.painList.includes(pain)}
                    onChange={formik.handleChange}>
                    {pain}
                  </Checkbox>
                )
              })}
            </div>
          </div>
          {formik.touched.painList && (
            <div className="mt-6">
              <Error>{formik.errors.painList}</Error>
            </div>
          )}
          <div
            style={{ transitionProperty: 'opacity' }}
            className={`${
              formik.values.pain === 'yes'
                ? 'opacity-100 h-auto mt-14'
                : 'opacity-0 h-0 overflow-hidden'
            } transition duration-300 ease-linear col-span-2`}>
            <Title>
              Pouvez-vous évaluer ces douleurs sur une échelle de 0 à 10 ?
            </Title>
            <div className="mt-4">
              <Subtitle>
                0 étant pas de douleur et 10 une douleur extrême.
              </Subtitle>
            </div>
            <div className="flex flex-wrap gap-3 md:gap-4 mt-8">
              {Array.from({ length: 11 }, (_, i) => i + 0).map((scale, i) => {
                return (
                  <div key={i}>
                    <Radio
                      id={scale.toString()}
                      name="painScale"
                      checked={formik.values.painScale === scale.toString()}
                      onChange={formik.handleChange}
                      number={true}>
                      {scale}
                    </Radio>
                  </div>
                )
              })}
            </div>
          </div>
          {formik.touched.painScale && (
            <div className="mt-6">
              <Error>{formik.errors.painScale}</Error>
            </div>
          )}
          <div className="mt-12 flex flex-wrap gap-4 lg:gap-6">
            <Cta buttonType="submit" type="primary" size={buttonSize}>
              Valider
            </Cta>
            <div
              onClick={() =>
                router.push(
                  `${prefix}${getPathByStep('Affection longue durée')}`,
                )
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

SurveyPain.Layout = SurveyLayout

export default SurveyPain
