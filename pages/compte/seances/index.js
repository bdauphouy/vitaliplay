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

  const recommended = await fetchAPIWithToken(
    '/users/me/workouts/recommended',
    req.cookies.jwt,
    false,
    ['tags', 'image']
  )

  const disciplines = await fetchAPIWithToken(
    '/disciplines',
    req.cookies.jwt,
    false
  )

  const programs = await fetchAPIWithToken(
    '/programs',
    req.cookies.jwt,
    false,
    ['image']
  )

  return {
    props: {
      workouts: workouts.data,
      recommended: recommended.data,
      disciplines: disciplines.data.attributes,
      programs: programs.data,
    },
  }
}

const Sessions = ({ workouts, recommended, disciplines, programs }) => {
  const router = useRouter()

  console.log(programs)

  // return <></>

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
        <Row
          title="Sélectionnées pour vous"
          path={`${router.asPath}/selectionnees-pour-vous`}
        >
          {recommended.map((workout) => {
            return (
              <Link
                key={workout.id}
                href={`${router.asPath}/selectionnees-pour-vous/${workout.id}`}
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
                        .url
                    }
                  />
                </a>
              </Link>
            )
          })}
        </Row>
        <Row title="Disciplines" path={`${router.asPath}/disciplines`}>
          {disciplines.map((discipline) => {
            return (
              <Link
                key={discipline.id}
                href={`${router.asPath}/disciplines/${discipline.id}`}
                passHref
              >
                <a>
                  <Card
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
        <Row title="Programmes" path={`${router.asPath}/programmes`}>
          {programs.map((program) => {
            return (
              <Link
                key={program.id}
                href={`${router.asPath}/programmes/${program.id}`}
                passHref
              >
                <a>
                  <Card
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

Sessions.Layout = AccountLayout

export default Sessions
