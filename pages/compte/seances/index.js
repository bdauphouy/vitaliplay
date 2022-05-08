import Image from 'next/image'
import Card from '@/components/pages/account/Card'
import Row from '@/components/pages/account/Row'
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

  const workouts = await fetchAPIWithToken(
    '/workouts',
    req.cookies.jwt,
    false,
    ['tags', 'image']
  )

  return { props: { workouts: workouts.data } }
}

const Sessions = ({ workouts }) => {
  const router = useRouter()

  console.log(workouts)

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
        <Row
          title="Toutes les séances"
          path={`${router.asPath}/toutes-les-seances`}
        >
          {workouts.map((workout) => {
            return (
              <Link
                key={workout.id}
                href={`${router.asPath}/toutes-les-seances/${workout.id}`}
                passHref
              >
                <a>
                  <Card
                    tag={workout.attributes.tags?.data[0]}
                    title={workout.attributes.name}
                    type="séances"
                    duration={workout.attributes.duration}
                    level={workout.attributes.level}
                    subtitle={workout.attributes.description}
                    bg={
                      process.env.NEXT_PUBLIC_STRAPI_API_URL +
                        workout.attributes.image.data.attributes.formats.medium
                          .url || '/bg-card.png'
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

Sessions.Layout = AccountLayout

export default Sessions
