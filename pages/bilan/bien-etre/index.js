import CheckupLayout from '@/components/layouts/CheckupLayout'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Cta from '@/components/utils/Cta'
import { useContext } from 'react'
import Link from 'next/link'
import { LinksContext } from '@/contexts/LinksContext'

const WellBeing = () => {
  const { getPage, checkupPages } = useContext(LinksContext)

  return (
    <div>
      <Title type="3">Etape 2 : Bilan bien être</Title>
      <div className="mt-4">
        <Subtitle type="2" html={false}>
          Veuillez indiquer, pour chacune des cinq affirmations, laquelle se
          rapproche le plus de ce que vous avez ressenti au cours des deux
          dernières semaines.
          <br />
          <br />
          Notez que le chiffre est propotionnel au bien-être.
          <br />
          <br />
          Exemple : si vous vous êtes senti(e) bien et de bonne humeur plus de
          la moitié du temps au cours des deux dernières semaines, cochez la
          case 3. Au cours des deux dernières semaines
        </Subtitle>
      </div>
      <div className="mt-12">
        <Link href={getPage(checkupPages, 'pageName', 'Humeur').path} passHref>
          <a>
            <Cta size="xl">Continuer</Cta>
          </a>
        </Link>
      </div>
    </div>
  )
}

WellBeing.Layout = CheckupLayout

export default WellBeing
