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

  const programs = await fetchAPIWithToken(
    '/programs',
    req.cookies.jwt,
    false,
    ['image']
  )

  return { props: { programs: programs.data } }
}
const SessionsPrograms = ({ programs }) => {
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
          filterOptions={['Tous']}
          title="Tous les programmes"
          path={`${router.asPath}/programmes`}
        >
          {programs.map((program) => {
            return (
              <Link
                key={program.id}
                href={`${router.route}/${program.id}`}
                passHref
              >
                <a>
                  <Card
                    mobile={!isMediumScreen}
                    type="programme"
                    title={program.attributes.name}
                    subtitle={program.attributes.description}
                    bg={
                      process.env.NEXT_PUBLIC_STRAPI_API_URL +
                      program.attributes.image.data.attributes.formats.medium
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

SessionsPrograms.Layout = AccountLayout

export default SessionsPrograms
