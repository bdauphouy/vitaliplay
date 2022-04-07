import Cta from '@/components/utils/Cta'
import { useMediaQuery } from '@mui/material'
import Card from '@/components/pages/account/Card'
import Row from '@/components/pages/account/Row'
import { useRouter } from 'next/router'
import Link from 'next/link'
import AccountLayout from '@/components/layouts/AccountLayout'

const SessionsNewTrainings = () => {
  const router = useRouter()

  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  return (
    <div className="mt-20 min-h-[calc(100vh_-_165px)] py-5 md:py-16">
      <div className="px-6 md:px-24" onClick={() => router.back()}>
        <Cta arrow="left" type="secondary" size={isMediumScreen ? 'l' : 'm'}>
          Retour
        </Cta>
      </div>
      <div className="mt-6 flex flex-col gap-12">
        <Row
          title="Toutes les séances"
          type="filter"
          mobile={true}
          filterOptions={['Par pertinence', 'Type 1', 'Type 2', 'Type 3']}
        >
          {[...Array(4)].map((item, i) => {
            return (
              <Link key={i} href={`${router.route}/1`} passHref>
                <a>
                  <Card
                    tagType="1"
                    title="Exercices intensifs pour le bas du corps"
                    type="séances"
                    duration="27"
                    level="Intermédiaire"
                    bg="/bg-card.png"
                  />
                </a>
              </Link>
            )
          })}
        </Row>
      </div>
    </div>
  )
}

SessionsNewTrainings.Layout = AccountLayout

export default SessionsNewTrainings
