import Cta from '@/components/utils/Cta'
import { useMediaQuery } from '@mui/material'
import Card from '@/components/pages/account/Card'
import Row from '@/components/pages/account/Row'
import { useRouter } from 'next/router'
import Link from 'next/link'
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

  const paid = await fetchAPIWithToken(
    '/users/me/subscription',
    req.cookies.jwt,
    false
  )

  if (paid.status !== 'finalized') {
    return {
      redirect: {
        destination: '/abonnements',
        permanent: true,
      },
    }
  }

  const workouts = await fetchAPIWithToken(
    '/workouts',
    req.cookies.jwt,
    false,
    ['tags', 'image']
  )

  const tags = []

  workouts.data.map((workout) => {
    workout.attributes.tags.data.map((tag) => {
      const tagName = tag.attributes.name
      if (!tags.includes(tagName)) {
        tags.push(tagName)
      }
    })
  })

  return { props: { workouts: workouts.data, tags: tags } }
}
const SessionAll = ({ workouts, tags }) => {
  const router = useRouter()
  const [filter, setFilter] = useState()

  useEffect(() => {
    setFilter(router.query.filtre)
  }, [router])

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
          filterOptions={['Tous', ...tags]}
        >
          {workouts
            .filter((workout) => {
              if (filter === 'Tous') return workout

              return workout.attributes.tags.data[0]?.attributes.name === filter
            })
            .map((workout) => {
              return (
                <Link
                  key={workout.id}
                  href={`${router.route}/${workout.id}`}
                  passHref
                >
                  <a>
                    <Card
                      tag={workout.attributes.tags.data[0]}
                      title={workout.attributes.name}
                      type="séances"
                      mobile={!isMediumScreen}
                      duration={workout.attributes.duration}
                      level={workout.attributes.level}
                      bg={
                        process.env.NEXT_PUBLIC_STRAPI_API_URL +
                        workout.attributes.image.data.attributes.formats.medium
                          .url
                      }
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

SessionAll.Layout = AccountLayout

export default SessionAll
