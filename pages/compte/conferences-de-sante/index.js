import Image from 'next/image'
import Row from '@/components/pages/account/Row'
import Card from '@/components/pages/account/Card'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AccountLayout from '@/components/layouts/AccountLayout'

const HealthConferences = () => {
  const router = useRouter()

  return (
    <div className="mt-20">
      <header className="relative h-60 lg:h-96">
        <Image
          src="/session-header.png"
          alt="sessions-header"
          layout="fill"
          placeholder="blur"
          blurDataURL="/session-header.png"
          objectFit="cover"
        />
      </header>
      <div className="py-12">
        <Row
          title="Conférences de santé"
          filterOptions={[
            'Par pertinence',
            'Popularité',
            'Recommandé',
            'Mes favoris',
          ]}
          type="filter"
          mobile={true}
        >
          {[...Array(4)].map((_, i) => {
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

HealthConferences.Layout = AccountLayout

export default HealthConferences
