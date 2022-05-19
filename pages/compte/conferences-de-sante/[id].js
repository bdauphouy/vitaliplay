import Title from '@/components/utils/Title'
import Cta from '@/components/utils/Cta'
import { useMediaQuery } from '@mui/material'
import Card from '@/components/pages/account/Card'
import Row from '@/components/pages/account/Row'
import { useRouter } from 'next/router'
import Subtitle from '@/components/utils/Subtitle'
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

  const paid = await fetchAPIWithToken(
    '/users/me/subscription',
    req.cookies.jwt,
    false
  )

  if (paid.status !== 'paid') {
    return {
      redirect: {
        destination: '/abonnements',
        permanent: true,
      },
    }
  }

  const healthConference = await fetchAPIWithToken(
    `/health-conferences/${query.id}`,
    req.cookies.jwt,
    false,
    ['thumbnail', 'tags']
  )

  if (!healthConference.data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { healthConference: healthConference.data.attributes },
  }
}

const HealthConferences1 = ({ healthConference }) => {
  const router = useRouter()

  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  return (
    <div className="mt-20 min-h-[calc(100vh_-_165px)] py-5 pb-10 md:py-16">
      <div className="px-6 md:px-24" onClick={() => router.back()}>
        <Cta arrow="left" type="secondary" size={isMediumScreen ? 'l' : 'm'}>
          Retour
        </Cta>
      </div>
      <div className="px-6 md:px-24">
        <div className="mt-6 flex max-w-3xl flex-col gap-3 lg:gap-4">
          <Title type="1">{healthConference.name}</Title>
          <Subtitle type="3">{healthConference.description}</Subtitle>
        </div>
        <iframe
          className="mt-8 aspect-video w-full lg:mt-12"
          src={healthConference.videoLink}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      {/* {linkedConference.length > 0 ? (
        <div className="mt-10 lg:mt-20">
          <Row title="Conférences en lien" button={false}>
            {linkedConference.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={`/compte/conferences-de-sante/[id]`}
                  as={`/compte/conferences-de-sante/${item.id}`}
                  passHref
                >
                  <a>
                    <Card
                      title={item.name}
                      subtitle={item.description}
                      type="conference"
                      bg={
                        item?.image?.data?.url
                          ? process.env.NEXT_PUBLIC_STRAPI_API_URL +
                            item?.image?.data?.url
                          : '/bg-card.png'
                      }
                      mobile={true}
                    />
                  </a>
                </Link>
              )
            })}
          </Row>
        </div>
      ) : null} */}
    </div>
  )
}

HealthConferences1.Layout = AccountLayout

export default HealthConferences1
