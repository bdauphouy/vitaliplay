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
  
    const {conferences, tags} = await fetchAPIWithToken('/conference-santes', req.cookies.jwt)
    return { props: { conferences, tags } }
  }

const HealthConferences = ({ conferences, tags }) => {
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
          type={tags.length > 0 ? "filter": "none"}
          mobile={true}
        >
          {conferences.map((item) => {
            return (
              <Link key={item.id} href={`${router.route}/${item.id}`} passHref>
                <a>
                  <Card
                    title={item.attributes.name}
                    subtitle={item.attributes.description}
                    type="conference"
                    bg={
                        item.attributes?.image?.data?.attributes?.url
                          ? process.env.NEXT_PUBLIC_STRAPI_API_URL +
                          item.attributes?.image?.data?.attributes?.url
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
    </div>
  )
}

HealthConferences.Layout = AccountLayout

export default HealthConferences
