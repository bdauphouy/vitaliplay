import Cta from '@/components/utils/Cta'
import { useMediaQuery } from '@mui/material'
import Card from '@/components/pages/account/Card'
import Row from '@/components/pages/account/Row'
import { useRouter } from 'next/router'
import Link from 'next/link'
import AccountLayout from '@/components/layouts/AccountLayout'
import { fetchAPIWithToken } from '@/lib/api'

export const getServerSideProps = async ({ req, query }) => {
  if (!req.cookies.jwt) {
    return {
      redirect: {
        destination: '/connexion',
        permanent: true,
      },
    }
  }

  const discipline = await fetchAPIWithToken(`/disciplines/${query.discipline}`, req.cookies.jwt)

  return { props: { discipline, id: query.discipline } }
}
const SessionsNewTrainings = ({ discipline, id }) => {
    console.log(discipline)
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
          title={discipline.name}
          type="none"
          mobile={true}
        >
          {discipline.exercices.map((item) => {
              console.log(item)
            return (
              <Link 
                key={item.id} 
                href={`/compte/seances/disciplines/[discipline]/[id]`} 
                as={`/compte/seances/disciplines/${id}/${item.id}`} 
                passHref
              >
                <a>
                  <Card
                    tagType={item?.tags?.data?.id}
                    title={item?.name}
                    type="séances"
                    duration={item?.duration}
                    level={item?.level}
                    bg={
                      item?.image?.url
                        ? process.env.NEXT_PUBLIC_STRAPI_API_URL +
                          item?.image?.url
                        : '/bg-card.png'
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

SessionsNewTrainings.Layout = AccountLayout

export default SessionsNewTrainings
