import Image from 'next/image'
import Row from '@/components/pages/account/Row'
import Card from '@/components/pages/account/Card'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AccountLayout from '@/components/layouts/AccountLayout'
import { fetchAPIWithToken } from '@/lib/api'

export const getServerSideProps = async ({ req }) => {
  if (!req.cookies.jwt) {
    return {
      redirect: {
        destination: '/connexion',
        permanent: true,
      },
    }
  }

  const conferences = await fetchAPIWithToken(
    '/health-conferences',
    req.cookies.jwt,
    false,
    ['thumbnail']
  )

  return { props: { conferences: conferences.data } }
}

const HealthConferences = ({ conferences }) => {
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
          filterOptions={tags.map((tag) => tag.name)}
          type={tags.length > 0 ? 'filter' : 'none'}
          mobile={true}
        >
          {conferences.map((conference) => {
            return (
              <Link
                key={conference.id}
                href={`${router.route}/${conference.id}`}
                passHref
              >
                <a>
                  <Card
                    title={conference.attributes.name}
                    subtitle={conference.attributes.description}
                    type="conférence"
                    bg={'/bg-card.png'}
                    mobile={true}
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
