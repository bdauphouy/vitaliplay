import CheckupLayout from '@/components/layouts/CheckupLayout'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import { useContext, useState } from 'react'
import { useFormik } from 'formik'
import Input from '@/components/utils/Input'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import BalanceSchema from '@/schemas/checkup/physical/Balance'
import { LinksContext } from '@/contexts/LinksContext'
import { CheckupContext } from '@/contexts/CheckupContext'

const PhysicalBalance = () => {
  const [store, setStore] = useState()
  const { getPage, checkupPages } = useContext(LinksContext)
  const { checkup } = useContext(CheckupContext)

  const router = useRouter()

  useEffect(() => {
    setStore(
      JSON.parse(window.localStorage.getItem('vitaliplay.checkup.store'))
    )
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      leftLegTime: store?.physical?.balance?.leftLegTime || '20',
      rightLegTime: store?.physical?.balance?.rightLegTime || '15',
    },
    validationSchema: BalanceSchema,
    onSubmit: (values) => {
      window.scrollTo(0, 0)
      window.localStorage.setItem(
        'vitaliplay.checkup.store',
        JSON.stringify({
          ...store,
          physical: {
            ...store?.physical,
            balance: {
              leftLegTime: values.leftLegTime.toString(),
              rightLegTime: values.rightLegTime.toString(),
            },
          },
        })
      )
      router.push(getPage(checkupPages, 'pageName', 'Bilan Bien-être').path)
    },
  })

  const buttonSize = useButtonSize()

  return (
    <>
      <div>
        <Title type="3">
          Exercice 6 : Equilibre sur une jambe (deux cotés)
        </Title>
        <div className="mt-4">
          <Subtitle type="2">
            {checkup.etape1_exercices?.exercice6.description}
          </Subtitle>
        </div>
        <iframe
          className="mt-6 aspect-video w-full"
          src={checkup.etape1_exercices?.exercice6.video}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <form onSubmit={formik.handleSubmit} className="mt-5 w-full lg:max-w-xl">
        <div className="flex w-full flex-col gap-3 lg:flex-row lg:gap-4 xl:gap-8">
          <div className="mt-4 flex-1">
            <Input
              label="Temps (jambe droite) (secondes)"
              name="rightLegTime"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.rightLegTime}
              errors={formik.touched.rightLegTime && formik.errors.rightLegTime}
            />
          </div>
          <div className="mt-4 flex-1">
            <Input
              label="Temps (jambe gauche) (secondes)"
              name="leftLegTime"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.leftLegTime}
              errors={formik.touched.leftLegTime && formik.errors.leftLegTime}
            />
          </div>
        </div>
        <div className="mt-10">
          <Cta buttonType="submit" type="primary" size={buttonSize}>
            Valider
          </Cta>
        </div>
      </form>
    </>
  )
}

PhysicalBalance.Layout = CheckupLayout

export default PhysicalBalance
