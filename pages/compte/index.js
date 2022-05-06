import Title from '@/components/utils/Title'
import Cta from '@/components/utils/Cta'
import Card from '@/components/pages/account/Card'
import CardPreview from '@/components/pages/account/CardPreview'
import { useMediaQuery } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { LinksContext } from '@/contexts/LinksContext'
import AccountLayout from '@/components/layouts/AccountLayout'
import {
  fetchAPIWithToken,
  getUserData,
  getUserProfilePicture,
  getToken,
} from '@/lib/api'
import Subtitle from '@/components/utils/Subtitle'
import Calendar from '@/components/pages/account/Calendar'
import moment from 'moment'
import { ChevronRight } from '@/components/utils/Icons'

export const getServerSideProps = async ({ req }) => {
  if (!req.cookies.jwt) {
    return {
      redirect: {
        destination: '/connexion',
        permanent: true,
      },
    }
  }

  const user = await getUserData(req.cookies.jwt)

  return { props: { user } }
}

export const CheckupBox = ({ date, score }) => {
  return (
    <div className="flex flex-col items-center rounded bg-blue-50 p-4 transition-[background-color] duration-300 hover:bg-blue-100 sm:items-start">
      <span className="font-body text-xs font-normal text-dark-700">
        <span className="hidden sm:inline">Bilan : </span>
        {date}
      </span>
      <h4 className="mt-2 font-head text-[1.25rem] font-bold text-blue-900 sm:text-2xl">
        {score}
        <span className="text-xs font-normal text-dark-700">/100</span>
      </h4>
    </div>
  )
}

const Account = ({ user }) => {
  console.log(user)

  const [linkSize, setLinkSize] = useState('m')

  const { getPage, checkupPages } = useContext(LinksContext)

  const [userImage, setUserImage] = useState()

  const isSmallScreen = useMediaQuery('(max-width: 640px)')

  const events = [
    {
      startDate: moment(new Date('05-03-22 10:00')),
      endDate: moment(new Date('05-03-22 12:00')),
      name: 'Test',
    },
    {
      startDate: moment(new Date('05-05-22 14:00')),
      endDate: moment(new Date('05-05-22 16:00')),
      name: 'Test',
    },
    {
      startDate: moment(new Date('05-07-22 16:00')),
      endDate: moment(new Date('05-07-22 20:00')),
      name: 'Test',
    },
  ]

  useEffect(() => {
    setLinkSize(isSmallScreen ? 's' : 'm')
  }, [isSmallScreen])

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const { profilePicture } = await getUserProfilePicture(getToken())

      setUserImage(profilePicture)
    }

    fetchProfilePicture()
  })

  return (
    <div className="mt-44 px-6 pb-12 md:px-24">
      <div
        className={`
  flex
  cursor-pointer
  select-none
  flex-col
  items-center
  p-3

  first:rounded-tl-lg
  last:rounded-tr-lg
`}
      ></div>

      <div className="flex-row justify-between lg:flex">
        <Title type="1" html={false}>
          Bonjour, <strong className="type-1">{user.firstname}</strong>
        </Title>
        {/* {homeData.offer?.id ? (
          <div className="fixed top-20 left-0 flex w-full items-center justify-center bg-blue-50 py-4 px-6 text-center font-body text-md font-bold text-blue-900 lg:relative lg:top-0 lg:w-auto lg:rounded-lg lg:shadow-level1">
            Accès offert par : {homeData.offer?.offerBy}
          </div>
        ) : null} */}
      </div>
      <div className="mt-14 flex flex-wrap gap-8">
        <div className="flex-[2] xsm:min-w-[320px] sm:min-w-[400px]">
          <Title type="5">Votre récapitulatif</Title>
          <div className="mt-6 rounded-lg px-6 py-8 shadow-level1">
            <div className="flex items-center gap-6">
              <div
                className={`min-h-[72px] min-w-[72px] rounded-full bg-gray-100 bg-cover bg-center sm:min-h-[96px] sm:min-w-[96px]`}
                style={{
                  backgroundImage: `url(${userImage})`,
                }}
              ></div>
              <div>
                <Title type="5" html={false}>
                  {user.firstname} {user.lastname}
                </Title>
                <Link
                  href={getPage(checkupPages, 'pageName', 'Bilan').path}
                  passHref
                >
                  <a>
                    <Cta
                      size={linkSize}
                      type="link"
                      arrow="right"
                      textColor="text-blue-900"
                    >
                      Faire un nouveau bilan
                    </Cta>
                  </a>
                </Link>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="font-head text-lg font-bold leading-6 text-dark-900">
                Mes derniers bilans
              </h3>

              <div className="mt-4 flex flex-wrap gap-4">
                {/* {homeData.bilan_reponses.length > 0 ? (
                  homeData.bilan_reponses.map((bilan) => (
                    <Link
                      key={bilan.id}
                      href={`${
                        getPage(accountPages, 'pageName', 'Mon espace santé')
                          .path
                      }/bilans/[id]`}
                      as={`${
                        getPage(accountPages, 'pageName', 'Mon espace santé')
                          .path
                      }/bilans/${bilan.id}`}
                      passHref
                    >
                      <a
                        className="flex-1"
                        style={{
                          maxWidth:
                            homeData.bilan_reponses.length < 3 ? '30%' : '',
                        }}
                      >
                        <CheckupBox
                          date={formatDate(bilan.createdAt)}
                          score={bilan.note_global}
                        />
                      </a>
                    </Link>
                  ))
                ) : (
                  <Subtitle type="4">Vous n'avez pas de bilan.</Subtitle>
                )} */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex min-w-[224px] flex-1 flex-col md:min-w-[288px]">
          {/* <Title type="5">{getMidleCardTitle(homeData)}</Title> */}
          <div className="mt-6 h-full">
            {/* {!homeData.isQuestionnaireCompleted ? (
              <div className="flex h-full flex-col items-start justify-end rounded-lg bg-blue-50 p-6">
                <h3 className="font-head text-[1.25rem] font-bold leading-6 text-dark-900">
                  Votre profil n’est pas totalement complété
                </h3>
                <p className="mt-3 mb-6 font-body text-md text-dark-700">
                  Pensez a bien compléter votre profil afin nous puissions nous
                  adapter un maximum à vos capacités physiques
                </p>
                <Cta type="primary" size="m">
                  Compléter mon profil
                </Cta>
              </div>
            ) : homeData.todayExercice?.id ? (
              <Card
                tagType={homeData.todayExercice.tags?.id}
                title={homeData.todayExercice.name}
                type="séances"
                duration={homeData.todayExercice.duration}
                level={homeData.todayExercice.level}
                bg="/bg-card.png"
                height="h-full"
              />
            ) : homeData.todayLive.id ? (
              <div
                style={{
                  backgroundImage: `url('http://vitaliplay.eltha.fr/bg-card.png')`,
                }}
                className="flex h-full flex-col items-center justify-end rounded-lg bg-cover bg-center p-6"
              >
                <h3 className="text-center font-head text-lg font-bold leading-6 text-light-100">
                  {homeData.todayLive?.name}
                </h3>
                <span className="mt-2 mb-4 font-body text-sm font-bold text-light-100">
                  {formatTime(homeData.todayLive.startTime)} -{' '}
                  {formatTime(homeData.todayLive.endTime)}
                </span>
                <Cta size="m" type="primary">
                  Mettre un rappel
                </Cta>
              </div>
            ) : null} */}
          </div>
        </div>
        <div className="flex-[1.5] self-end">
          <Title type="5">Vos dernières séances</Title>
          <div className="mt-6 flex flex-col gap-3 xsm:min-w-[300px]">
            {/* {homeData.exerciceHistory ? (
              homeData.exerciceHistory.map((exercice) => (
                <Link
                  key={exercice.id}
                  href={`${
                    getPage(accountPages, 'pageName', 'Séances').path
                  }/toutes-les-seances/[id]`}
                  as={`${
                    getPage(accountPages, 'pageName', 'Séances').path
                  }/toutes-les-seances/${exercice.id}`}
                  passHref
                >
                  <a>
                    <CardPreview
                      title={exercice.name}
                      duration={exercice.duration}
                      level={exercice.level}
                      type={exercice.tags?.id}
                    />
                  </a>
                </Link>
              ))
            ) : (
              <Subtitle type="4">Vous n'avez pas de séance.</Subtitle>
            )} */}
          </div>
        </div>
      </div>
      <div className="mt-20">
        <header className="mb-4 flex flex-col flex-wrap justify-between gap-8 lg:mb-8 lg:flex-row">
          <Title type="5">Nos prochains lives :</Title>
          <div className="flex items-center gap-10 self-end lg:self-auto">
            <Title type="5">Septembre 20-21, 2021</Title>

            <div>
              <div className="flex gap-3">
                <div className="rotate-180 transform">
                  <ChevronRight color="#1778F2" size={24} />
                </div>

                <div>
                  <ChevronRight color="#1778F2" size={24} />
                </div>
              </div>
            </div>
          </div>
        </header>
        <Calendar events={events} />
      </div>
    </div>
  )
}

Account.Layout = AccountLayout

export default Account
