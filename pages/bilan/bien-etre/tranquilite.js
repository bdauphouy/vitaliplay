import CheckupLayout from '@/components/layouts/CheckupLayout'
import Title from '@/components/utils/Title'
import { useContext, useState } from 'react'
import { useFormik } from 'formik'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Radio from '@/components/utils/Radio'
import TranquilitySchema from '@/schemas/checkup/well-being/Tranquility'
import Error from '@/components/utils/Error'
import { LinksContext } from '@/contexts/LinksContext'
import { CheckupContext } from '@/contexts/CheckupContext'

const WellBeingTranquility = () => {
  const [store, setStore] = useState()
  const { getPage, checkupPages } = useContext(LinksContext)
  const { checkup } = useContext(CheckupContext)

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
      JSON.parse(window.localStorage.getItem('vitaliplay.checkup.store'))
    )
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tranquilityScale: store?.wellBeing?.tranquility?.tranquilityScale || '',
    },
    validationSchema: TranquilitySchema,
    onSubmit: (values) => {
      window.localStorage.setItem(
        'vitaliplay.checkup.store',
        JSON.stringify({
          ...store,
          wellBeing: {
            ...store?.wellBeing,
            tranquility: values.tranquilityScale,
          },
        })
      )
      router.push(getPage(checkupPages, 'pageName', 'Energie').path)
    },
  })

  const buttonSize = useButtonSize()

  return (
    <div>
      <Title type="3">{checkup.etape2_content?.tranquility_title}</Title>
      <form onSubmit={formik.handleSubmit} className="mt-12">
        <div className="grid grid-cols-3 gap-x-4 gap-y-6 xl:grid-cols-6">
          {Array.from({ length: 6 }, (_, i) => i + 0).map((scale, i) => {
            return (
              <div key={i}>
                <Radio
                  label={labels[5 - i]}
                  id={scale.toString()}
                  name="tranquilityScale"
                  checked={formik.values.tranquilityScale === scale.toString()}
                  onChange={formik.handleChange}
                  number={true}
                >
                  {scale}
                </Radio>
              </div>
            )
          })}
        </div>
        {formik.touched.tranquilityScale && (
          <div className="mt-8">
            <Error>{formik.errors.tranquilityScale}</Error>
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

WellBeingTranquility.Layout = CheckupLayout

export default WellBeingTranquility
