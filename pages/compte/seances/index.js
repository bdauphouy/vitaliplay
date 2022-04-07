import Image from 'next/image'
import Card from '@/components/pages/account/Card'
import Row from '@/components/pages/account/Row'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AccountLayout from '@/components/layouts/AccountLayout'
import { fetchAPIWithToken } from '@/lib/api'

function getRowTitle(entryName) {
  switch (entryName) {
    case 'disciplines':
      return 'Disciplines'
    case 'exercices':
      return 'Nouveaux entraînements'
    case 'programmes':
      return 'Programmes'
    case 'recommandedExercices':
      return 'Sélectionnés pour vous'
  }
}

function getCardType(entryName) {
  switch (entryName) {
    case 'disciplines':
      return 'disciplines'
    case 'programmes':
      return 'programme'
    case 'exercices':
    case 'recommandedExercices':
      return 'séances'
  }
}

export const getServerSideProps = async ({ req }) => {
  if (!req.cookies.jwt) {
    return {
      redirect: {
        destination: '/connexion',
        permanent: true,
      },
    }
  }

  const seanceData = await fetchAPIWithToken('/pwa/seance', req.cookies.jwt)
  console.log(seanceData)
  return { props: { seanceData } }
}

const Sessions = ({ seanceData }) => {
  console.log('seance  data', seanceData)
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
      <div className="flex flex-col gap-12 py-12">
        {Object.entries(seanceData).map(([entryName, data]) => {
          if (data.length === 0) return <></>
          return (
            <Row
              title={getRowTitle(entryName)}
              path={`${router.asPath}/toutes-les-seances`}
            >
              {data.map((exo) => {
                return (
                  <Link
                    key={exo.id}
                    href={`${router.asPath}/toutes-les-seances/${exo.id}`}
                    passHref
                  >
                    <a>
                      <Card
                        tagType={exo.tags ? exo?.tags[0]?.id || '' : ''}
                        title={exo.name}
                        type={getCardType(entryName)}
                        duration={exo?.duration || ''}
                        level={exo?.level || ''}
                        bg={
                          exo?.image?.url
                            ? process.env.NEXT_PUBLIC_STRAPI_API_URL +
                              exo?.image?.url
                            : '/bg-card.png'
                        }
                      />
                    </a>
                  </Link>
                )
              })}
            </Row>
          )
        })}
      </div>
    </div>
  )
}

Sessions.Layout = AccountLayout

export default Sessions
