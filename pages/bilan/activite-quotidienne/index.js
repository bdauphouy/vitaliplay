import CheckupLayout from '@/components/layouts/CheckupLayout'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Cta from '@/components/utils/Cta'
import { useContext } from 'react'
import Link from 'next/link'
import { LinksContext } from '@/contexts/LinksContext'
import { CheckupContext } from '@/contexts/CheckupContext'

const DailyActivity = () => {
  const { getPage, checkupPages } = useContext(LinksContext)
  const { checkup } = useContext(CheckupContext)

  return (
    <div>
      <Title type="3">Etape 3 : Bilan activité quotidienne</Title>
      <div className="mt-4">
        <Subtitle type="2">{checkup.etape3_description}</Subtitle>
      </div>
      <div className="mt-12">
        <Link
          href={getPage(checkupPages, 'pageName', 'Activité intense').path}
          passHref
        >
          <a>
            <Cta size="xl">Continuer</Cta>
          </a>
        </Link>
      </div>
    </div>
  )
}

DailyActivity.Layout = CheckupLayout

export default DailyActivity
