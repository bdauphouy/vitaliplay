import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import SurveyLayout from '@/components/layouts/SurveyLayout'
import { useFormik } from 'formik'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import Radio from '@/components/utils/Radio'
import DropDown from '@/components/utils/Dropdown'
import { useState, useContext } from 'react'
import { SurveyContext } from '@/contexts/SurveyContext'
import SmokerSchema from '@/schemas/survey/Smoker'
import Error from '@/components/utils/Error'
import { useRouter } from 'next/router'

const SurveySmoker = () => {
  const { store, setStore, getPathByStep, prefix } = useContext(SurveyContext)

  const [number, setNumber] = useState(5)
  const [forDate, setForDate] = useState('20 ans')

  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      smoker: '',
    },
    validationSchema: SmokerSchema,
    onSubmit: values => {
      setStore({ ...store, ...values, number, forDate })
      router.push(`${prefix}${getPathByStep('Douleurs chroniques')}`)
    },
  })

  const buttonSize = useButtonSize()

  return (
    <div>
      <Title>Êtes-vous fumeur ?</Title>
      <div className="mt-4">
        <Subtitle>
          Si oui, combien de paquets fumez-vous par semaine ? Et depuis combien
          de temps ?
        </Subtitle>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-3">
        <Radio
          id="non-smoker"
          name="smoker"
          checked={formik.values.smoker === 'non-smoker'}
          onChange={formik.handleChange}>
          Non fumeur
        </Radio>
        <Radio
          id="smoker"
          name="smoker"
          checked={formik.values.smoker === 'smoker'}
          onChange={formik.handleChange}>
          Fumeur
        </Radio>
        {formik.touched.smoker && (
          <div className="md:col-span-2">
            <Error>{formik.errors.smoker}</Error>
          </div>
        )}
        <div className="col-span-1 md:col-span-2 gap-4 md:gap-8 flex mt-5 md:mt-7">
          <DropDown
            options={Array.from({ length: 10 }, (_, i) => i + 1)}
            label="Nombre"
            defaultOption={number}
            getOption={setNumber}
          />
          <DropDown
            options={Array.from({ length: 10 }, (_, i) => (i + 1) * 2 + ' ans')}
            label="Depuis"
            defaultOption={forDate}
            getOption={setForDate}
          />
        </div>
        <div className="md:col-span-2 mt-10 flex flex-wrap items-start gap-4 lg:gap-6">
          <Cta buttonType="submit" type="primary" size={buttonSize}>
            Valider
          </Cta>
          <div
            onClick={() =>
              router.push(`${prefix}${getPathByStep('Douleurs chroniques')}`)
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
  )
}

SurveySmoker.Layout = SurveyLayout

export default SurveySmoker
