import Image from 'next/image'
import Row from '@/components/pages/account/Row'
import Card from '@/components/pages/account/Card'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AccountLayout from '@/components/layouts/AccountLayout'
import { fetchAPIWithToken } from '@/lib/api'
import { useState, useEffect } from 'react'

export const getServerSideProps = async ({ req }) => {
  if (!req.cookies.jwt) {
    return {
      redirect: {
        destination: '/connexion',
        permanent: true,
      },
    }
  }

  const healthConferences = await fetchAPIWithToken(
    '/health-conferences',
    req.cookies.jwt,
    false,
    ['thumbnail', 'tags']
  )

  const tags = await fetchAPIWithToken('/tags', req.cookies.jwt, false)

  return {
    props: { healthConferences: healthConferences.data, tags: tags.data },
  }
}

const HealthConferences = ({ healthConferences, tags }) => {
  const router = useRouter()
  const [filter, setFilter] = useState()

  useEffect(() => {
    setFilter(router.query.filtre)
  }, [router])

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
          filterOptions={['Toutes', ...tags.map((tag) => tag.attributes.name)]}
          type="filter"
          mobile={true}
        >
          {healthConferences
            .filter((healthConference) => {
              if (filter === 'Toutes') return healthConference

              return (
                healthConference.attributes.tags.data[0]?.attributes.name ===
                filter
              )
            })
            .map((healthConference) => {
              return (
                <Link
                  key={healthConference.id}
                  href={`${router.route}/${healthConference.id}`}
                  passHref
                >
                  <a>
                    <Card
                      title={healthConference.attributes.name}
                      subtitle={healthConference.attributes.description}
                      type="conférence"
                      bg={
                        process.env.NEXT_PUBLIC_STRAPI_API_URL +
                        healthConference.attributes.thumbnail.data.attributes
                          .formats.medium.url
                      }
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
