import Title from '@/components/utils/Title'
import Image from 'next/image'
import Cta from '@/components/utils/Cta'
import { useMediaQuery } from '@mui/material'
import Card from '@/components/pages/account/Card'
import Row from '@/components/pages/account/Row'
import { useRouter } from 'next/router'
import Link from 'next/link'

const SessionsNewTrainings = () => {
  const router = useRouter()

  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  return (
    <div className="mt-20 py-5 md:py-16 min-h-[calc(100vh_-_165px)]">
      <div className="px-6 md:px-24" onClick={() => router.back()}>
        <Cta arrow="left" type="secondary" size={isMediumScreen ? 'l' : 'm'}>
          Retour
        </Cta>
      </div>
      <div className="flex flex-col mt-6 gap-12">
        <Row
          title="Nouveaux entraînements"
          type="filter"
          mobile={true}
          filterOptions={['Par pertinence', 'Type 1', 'Type 2', 'Type 3']}>
          <Link
            href={`/${router.route.split('/').slice(2).join('/')}/1`}
            passHref>
            <a>
              <Card
                tagType="1"
                title="Exercices intensifs pour le bas du corps"
                type="séances"
                duration="27"
                level="Intermédiaire"
                bg="/bg-card.png"
                mobile={true}
              />
            </a>
          </Link>
          <Card
            tagType="1"
            title="Exercices intensifs pour le bas du corps"
            type="séances"
            duration="27"
            level="Intermédiaire"
            bg="/bg-card.png"
            mobile={true}
          />
          <Card
            tagType="1"
            title="Exercices intensifs pour le bas du corps"
            type="séances"
            duration="27"
            level="Intermédiaire"
            bg="/bg-card.png"
            mobile={true}
          />
          <Card
            tagType="1"
            title="Exercices intensifs pour le bas du corps"
            type="séances"
            duration="27"
            level="Intermédiaire"
            bg="/bg-card.png"
            mobile={true}
          />
        </Row>
      </div>
    </div>
  )
}

export default SessionsNewTrainings
