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

export const Exercice = ({ title, time, image }) => {
  return (
    <div className="flex items-center gap-4 lg:gap-10">
      <div className="min-h-[4.5rem] min-w-[4.5rem] rounded bg-dark-100 lg:h-36 lg:w-36 lg:rounded-lg"></div>
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
    console.log(req.query)
    const exercice = await fetchAPIWithToken(`/exercices`, req.cookies.jwt)
    return { props: { exercice } }
  }

const SessionsNewTrainings1 = ({exercice}) => {
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
          <Title type="1">Exercices intensifs pour le bas du corps</Title>
          <Subtitle type="3">27 min - Intermédiaire - Renforcement</Subtitle>
        </div>
        <iframe
          className="mt-8 aspect-video w-full lg:mt-12"
          src="https://www.youtube.com/embed/yR9Wpyf8gbk"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="mx-auto max-w-6xl px-6 md:px-24">
        <h2 className="mt-10 font-head text-[1.25rem] font-semibold text-dark-900 lg:mb-2 lg:mt-16 lg:text-3xl lg:font-bold">
          Programme de la séance
        </h2>
        <div className="space-y-10 lg:space-y-16">
          <div>
            <Subtitle type="3">Série 1 sur 2</Subtitle>
            <div className="mt-4 space-y-4 lg:mt-6 lg:space-y-8">
              <Exercice
                title="Etirement latéral avec mains au dessus de la tête"
                time="1 minute"
              />
              <Exercice
                title="Exercices intensifs pour le bas du corps"
                time="1 minute"
              />
            </div>
          </div>
          <div>
            <Subtitle type="3">Série 2 sur 2</Subtitle>
            <div className="mt-4 space-y-4 lg:mt-6 lg:space-y-8">
              <Exercice
                title="Etirement latéral avec mains au dessus de la tête"
                time="1 minute"
              />
              <Exercice
                title="Exercices intensifs pour le bas du corps"
                time="1 minute"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 lg:mt-28">
        <Row title="Découvrez d'autres séances" button={false}>
          {[...Array(4)].map((item, i) => {
            return (
              <Link key={i} href={`${router.asPath}`} passHref>
                <a>
                  <Card
                    tagType="1"
                    title="Exercices intensifs pour le bas du corps"
                    type="séances"
                    duration="27"
                    level="Intermédiaire"
                    bg="/bg-card.png"
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

SessionsNewTrainings1.Layout = AccountLayout

export default SessionsNewTrainings1
