import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import CheckupLayout from '@/components/layouts/CheckupLayout'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import { useContext, useEffect } from 'react'
import Link from 'next/link'
import { LinksContext } from '@/contexts/LinksContext'

const SurveySuccess = () => {
  const { getPathByPage } = useContext(LinksContext)

  useEffect(() => {
    console.log(
      JSON.parse(window.localStorage.getItem('vitaliplay.checkup.store')),
    )
  }, [])

  const buttonSize = useButtonSize()

  return (
    <div className="flex flex-col h-full justify-center items-center">
      <Title center={true} type="3">
        Bilan fini ! Votre score est de : 66
      </Title>
      <div className="mt-4">
        <Subtitle center={true} type="2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida eget
          varius a diam faucibus nec sodales fermentum eget.
        </Subtitle>
      </div>
      <div className="mt-12">
        <Link href={getPathByPage('Accueil')} passHref>
          <a>
            <Cta size={buttonSize} type="primary">
              Voir mon bilan
            </Cta>
          </a>
        </Link>
      </div>
    </div>
  )
}

SurveySuccess.Layout = CheckupLayout

export default SurveySuccess
