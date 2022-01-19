import Image from 'next/image'
import Row from '@/components/pages/account/Row'
import Card from '@/components/pages/account/Card'
import Link from 'next/link'
import { useRouter } from 'next/router'

const HealthConferences = () => {
  const router = useRouter()

  return (
    <div className="mt-20">
      <header className="h-60 lg:h-96 relative">
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
          mobile={true}>
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
        </Row>
      </div>
    </div>
  )
}

export default HealthConferences
