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

  const disciplines = await fetchAPIWithToken(
    '/disciplines',
    req.cookies.jwt,
    false
  )

  return { props: { disciplines: disciplines.data.attributes } }
}
const SessionDisciplines = ({ disciplines }) => {
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
          type="filter"
          filterOptions={['Toutes']}
          title="Toutes les disciplines"
        >
          {disciplines.map((discipline) => {
            return (
              <Link
                key={discipline.id}
                href={`${router.route}/${discipline.id}`}
                passHref
              >
                <a>
                  <Card
                    mobile={!isMediumScreen}
                    title={discipline.attributes.name}
                    type="catégorie"
                    bg={
                      process.env.NEXT_PUBLIC_STRAPI_API_URL +
                        discipline.attributes.image.data.attributes.formats
                          .medium.url || '/bg-card.png'
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

SessionDisciplines.Layout = AccountLayout

export default SessionDisciplines
