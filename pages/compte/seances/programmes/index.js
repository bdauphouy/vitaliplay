import Cta from '@/components/utils/Cta'
import { useMediaQuery } from '@mui/material'
import Card from '@/components/pages/account/Card'
import Row from '@/components/pages/account/Row'
import { useRouter } from 'next/router'
import Link from 'next/link'
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
  
    const programmes = await fetchAPIWithToken('/programmes', req.cookies.jwt, false)
    console.log(programmes)
    return { props: { programmes: programmes.data } }
  }

const SessionsNewTrainings = ({programmes}) => {
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
        type="none"
          title="Tous les programmes"
          mobile={true}
        >
          {programmes.map((item ) => {
            return (
              <Link 
              key={item.id} 
              href={`${router.route}/[programme]`} 
              as={`${router.route}/${item.id}`} 
              passHref
              >
                <a>
                  <Card
                    title={item?.attributes?.name}
                    subtitle={item?.attributes?.description}
                    type="programme"
                    bg={
                        item?.attributes?.image?.data?.attributes.url
                          ? process.env.NEXT_PUBLIC_STRAPI_API_URL +
                          item?.attributes?.image?.data?.attributes.url
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
