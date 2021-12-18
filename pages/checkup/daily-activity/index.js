import CheckupLayout from '@/components/layouts/CheckupLayout'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Cta from '@/components/utils/Cta'
import { useContext } from 'react'
import { CheckupContext } from '@/contexts/CheckupContext'
import Link from 'next/link'

const DailyActivity = () => {
  const { prefix, getPathByIds } = useContext(CheckupContext)

  return (
    <div>
      <Title>Etape 3 : Bilan activité quotidienne</Title>
      <div className="mt-4">
        <Subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus
          pellentesque malesuada pellentesque ultricies leo sit. Ut in sed
          ultricies diam arcu et. Sed lectus feugiat aliquam urna, sed risus
          sed. Integer vestibulum dolor aliquam volutpat lectus.
        </Subtitle>
      </div>
      <div className="mt-12">
        <Link href={`${prefix}${getPathByIds([3, 1])}`} passHref>
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
