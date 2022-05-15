import Title from '@/components/utils/Title'
import Cta from '@/components/utils/Cta'
import { useMediaQuery } from '@mui/material'
import Card from '@/components/pages/account/Card'
import Row from '@/components/pages/account/Row'
import { useRouter } from 'next/router'
import Subtitle from '@/components/utils/Subtitle'
import Link from 'next/link'
import AccountLayout from '@/components/layouts/AccountLayout'
import { fetchAPIWithToken, getToken } from '@/lib/api'
import Image from 'next/image'
import { useState, useEffect, useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'

export const Exercice = ({ title, time, image }) => {
  return (
    <div className="flex items-center gap-4 lg:gap-10">
      <div className="relative min-h-[4.5rem] min-w-[4.5rem] overflow-hidden rounded bg-dark-100 lg:h-36 lg:w-36 lg:rounded-lg">
        <Image src={image} layout="fill" alt="banner" />
      </div>
      <div className="flex flex-col gap-1 lg:gap-3">
        <h2 className="font-head text-md font-semibold text-dark-900 lg:text-xl lg:font-bold">
          {title}
        </h2>
        <span className="font-body text-xs text-dark-500 lg:text-lg">
          {time}
        </span>
      </div>
    </div>
  )
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

  return { props: {} }
}

const SessionsDisciplines1 = () => {
  const router = useRouter()

  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  const [discipline, setDiscipline] = useState([])

  const { getPage, accountPages } = useContext(LinksContext)

  useEffect(() => {
    const fetchDiscipline = async () => {
      const res = await fetchAPIWithToken(
        `/disciplines/${router.query.id}`,
        getToken(),
        false
      )

      if (res.data) {
        setDiscipline(res.data.attributes)
      }
    }

    fetchDiscipline()
  }, [])

  // return <></>

  return (
    <div className="mt-20 min-h-[calc(100vh_-_165px)] py-5 pb-10 md:py-16">
      <div className="px-6 md:px-24" onClick={() => router.back()}>
        <Cta arrow="left" type="secondary" size={isMediumScreen ? 'l' : 'm'}>
          Retour
        </Cta>
      </div>
      <div className="mt-6 flex flex-col gap-12">
        {discipline.exercices?.length > 0 && (
          <Row type="none" title={discipline.name} mobile={true}>
            {discipline.exercices?.map((exercise) => {
              return (
                <Link
                  key={exercise.id}
                  href={`${
                    getPage(accountPages, 'pageName', 'Séances').path
                  }/toutes-les-seances/${exercise.id}`}
                  passHref
                >
                  <a>
                    <Card
                      tag={{ attributes: exercise.tags[0] }}
                      title={exercise.name}
                      type="séances"
                      mobile={!isMediumScreen}
                      duration={exercise.duration}
                      level={exercise.level}
                      bg={
                        process.env.NEXT_PUBLIC_STRAPI_API_URL +
                        exercise.image.formats.medium.url
                      }
                    />
                  </a>
                </Link>
              )
            })}
          </Row>
        )}
      </div>

      {/* {otherExercices.length > 0 ? (
        <div className="mt-12 lg:mt-28">
          <Row title="Découvrez d'autres séances" button={false}>
            {otherExercices.map((item) => {
              console.log(item)
              return (
                <Link
                  key={item.id}
                  href={`/compte/seances/toutes-les-seances/[id]`}
                  as={`/compte/seances/toutes-les-seances/${item.id}`}
                  passHref
                >
                  <a>
                    <Card
                      tagType={item.tags.name}
                      title={item.name}
                      type="séances"
                      duration={item.duration}
                      level={item.level}
                      bg={
                        item.image?.url
                          ? process.env.NEXT_PUBLIC_STRAPI_API_URL +
                            item.image?.url
                          : '/bg-card.png'
                      }
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

SessionsDisciplines1.Layout = AccountLayout

export default SessionsDisciplines1
