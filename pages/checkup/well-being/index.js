import CheckupLayout from '@/components/layouts/CheckupLayout'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Cta from '@/components/utils/Cta'
import { useContext } from 'react'
import { CheckupContext } from '@/contexts/CheckupContext'
import Link from 'next/link'

const WellBeing = () => {
  const { prefix, getPathByIds } = useContext(CheckupContext)

  return (
    <div>
      <Title>Etape 2 : Bilan bien être</Title>
      <div className="mt-4">
        <Subtitle>
          Veuillez indiquer, pour chacune des cinq affirmations, laquelle se
          rapproche le plus de ce que vous avez ressenti au cours des deux
          dernières semaines. Notez que le chiffre est propotionnel au
          bien-être. Exemple : si vous vous êtes senti(e) bien et de bonne
          humeur plus de la moitié du temps au cours des deux dernières
          semaines, cochez la case 3. Au cours des deux dernières semaines
        </Subtitle>
      </div>
      <div className="mt-12">
        <Link href={`${prefix}${getPathByIds([2, 1])}`} passHref>
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
