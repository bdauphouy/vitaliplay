import CheckupLayout from '@/components/layouts/CheckupLayout'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Cta from '@/components/utils/Cta'
import { useContext } from 'react'
import { CheckupContext } from '@/contexts/CheckupContext'
import Link from 'next/link'

const Physical = () => {
  const { prefix, getPathByIds } = useContext(CheckupContext)

  return (
    <div>
      <Title type="3">Etape 1 : Bilan physique</Title>
      <div className="mt-4">
        <Subtitle type="2">
          Le bilan physique a pour objectif d'évaluer votre condition physique
          globale à travers différents exercices. Le bilan est personnel car il
          dépend de votre âge et votre sexe.
        </Subtitle>
      </div>
      <div className="mt-12">
        <Link href={`${prefix}${getPathByIds([1, 1])}`} passHref>
          <a>
            <Cta size="xl">Continuer</Cta>
          </a>
        </Link>
      </div>
    </div>
  )
}

Physical.Layout = CheckupLayout

export default Physical
