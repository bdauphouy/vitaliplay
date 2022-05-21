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
import Image from 'next/image'
import yellowOrange from '@/public/decoration-icons/yellow-orange.svg'
import orangeGreen from '@/public/decoration-icons/orange-green.svg'

export const getServerSideProps = async ({ req }) => {
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

  console.log(paid.status)

  if (paid.status !== 'paid') {
    return {
      redirect: {
        destination: '/abonnements',
        permanent: true,
      },
    }
  }

  return {
    props: { offerBy: paid.payer.email },
  }
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

const Account = ({ offerBy }) => {
  const [user, setUser] = useState()

  const [lives, setLives] = useState()

  const [questionnaire, setQuestionnaire] = useState()

  const [checkups, setCheckups] = useState()

  const [recommendedWorkout, setRecommendedWorkout] = useState()

  const [history, setHistory] = useState([])

  const [linkSize, setLinkSize] = useState('m')

  const { getPage, checkupPages, surveyPages, accountPages } =
    useContext(LinksContext)

  const [userImage, setUserImage] = useState()

  const isSmallScreen = useMediaQuery('(max-width: 640px)')

  const [selectedDate, setSelectedDate] = useState(moment().startOf('day'))

  const [events, setEvents] = useState([])

  useEffect(() => {
    setLinkSize(isSmallScreen ? 's' : 'm')
  }, [isSmallScreen])

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const { profilePicture } = await getUserProfilePicture(getToken())

      setUserImage(profilePicture)
    }

    const fetchLives = async () => {
      const lives = await fetchAPIWithToken('/lives', getToken(), false)

      setLives(lives.data)
    }

    const fetchUser = async () => {
      const user = await getUserData(getToken())

      setUser(user)
    }

    const fetchCheckups = async () => {
      const checkups = await fetchAPIWithToken(
        '/checkups/mine',
        getToken(),
        false
      )

      setCheckups(checkups.data?.data)
    }

    const fetchQuestionnaire = async () => {
      const questionnaire = await fetchAPIWithToken(
        '/question-answer/mine',
        getToken(),
        false
      )

      console.log(questionnaire)

      setQuestionnaire(questionnaire.data?.[0]?.attributes?.length < 12)
    }

    const fetchRecommendedWorkout = async () => {
      const recommended = await fetchAPIWithToken(
        '/users/me/workouts/recommended',
        getToken(),
        false,
        ['tags', 'image']
      )

      setRecommendedWorkout(recommended.data?.[0])
    }

    const fetchHistory = async () => {
      const history = await fetchAPIWithToken(
        '/users/me/workouts/history',
        getToken(),
        false,
        ['workout']
      )

      if (history.data) {
        const historyIds = []

        const filteredHistory = history.data.filter((workout) => {
          if (!historyIds.includes(workout.attributes.workout.data.id)) {
            historyIds.push(workout.attributes.workout.data.id)
            return workout.attributes.workout
          }
        })
        setHistory(filteredHistory.reverse())
      }
    }

    fetchRecommendedWorkout()
    fetchHistory()
    fetchQuestionnaire()
    fetchProfilePicture()
    fetchLives()
    fetchUser()
    fetchCheckups()
  }, [])

  useEffect(() => {
    if (lives?.current) {
      setEvents((events) => [
        ...events,
        {
          startDate: moment(
            new Date(lives.current?.attributes.attributes.startTime)
          ),
          endDate: moment(
            new Date(lives.current?.attributes.attributes.endTime)
          ),
          name: lives.current?.attributes.attributes.name,
        },
      ])
    }

    if (lives?.next) {
      setEvents((events) => [
        ...events,
        {
          startDate: moment(
            new Date(lives.next?.attributes.attributes.startTime)
          ),
          endDate: moment(new Date(lives.next?.attributes.attributes.endTime)),
          name: lives.next?.attributes.attributes.name,
        },
      ])
    }

    if (lives?.prev) {
      setEvents((events) => [
        ...events,
        {
          startDate: moment(
            new Date(lives.prev?.attributes.attributes.startTime)
          ),
          endDate: moment(new Date(lives.prev?.attributes.attributes.endTime)),
          name: lives.prev?.attributes.attributes.name,
        },
      ])
    }
  }, [lives])

  return (
    <div className="mt-44 px-6 pb-12 md:px-24">
      <div
        className={`flex cursor-pointer select-none flex-col items-center p-3 first:rounded-tl-lg last:rounded-tr-lg`}
      ></div>

      <div className="flex-row justify-between lg:flex">
        <Title type="1" html={false}>
          Bonjour, <strong className="type-1">{user?.firstname}</strong>
        </Title>
        {offerBy !== user?.email && user ? (
          <div className="fixed top-20 left-0 flex w-full items-center justify-center bg-blue-50 py-4 px-6 text-center font-body text-md font-bold text-blue-900 lg:relative lg:top-0 lg:w-auto lg:rounded-lg lg:shadow-level1">
            Accès offert par : {offerBy}
          </div>
        ) : null}
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
                  {user?.firstname} {user?.lastname}
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
                {checkups?.length > 0 ? (
                  checkups.slice(0, 3).map((checkup) => (
                    <Link
                      key={checkup.id}
                      href={`${
                        getPage(accountPages, 'pageName', 'Mon espace santé')
                          .path
                      }/bilans/${checkup.id}`}
                      passHref
                    >
                      <a
                        className="flex-1"
                        style={{
                          maxWidth: checkups.length < 3 ? '30%' : '',
                        }}
                      >
                        <CheckupBox
                          date={moment(checkup.attributes.createdAt).format(
                            'DD/MM/YY'
                          )}
                          score={checkup.attributes.globalScore}
                        />
                      </a>
                    </Link>
                  ))
                ) : (
                  <div className="relative flex flex-col items-start gap-3 overflow-hidden rounded-md bg-blue-50 p-4 font-head text-md font-bold text-blue-900">
                    Vous n'avez pas encore de bilan
                    <Link
                      href={getPage(checkupPages, 'pageName', 'Bilan').path}
                      passHref
                    >
                      <a>
                        <Cta size="m" arrow="right">
                          Réaliser mon premier bilan
                        </Cta>
                      </a>
                    </Link>
                    <div className="absolute -left-8 -top-8 block scale-50 transform">
                      <Image src={orangeGreen} alt="orange-green" />
                    </div>
                    <div className="absolute -bottom-12 -right-6 block scale-50">
                      <Image src={yellowOrange} alt="yellow-orange" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex min-w-[224px] flex-1 flex-col md:min-w-[288px]">
          <Title type="5">
            {questionnaire
              ? 'Compléter mon profil'
              : recommendedWorkout
              ? 'Votre séance du jour'
              : 'Prochain live'}
          </Title>
          <div className="mt-6 h-full min-h-[288px]">
            {questionnaire ? (
              <div className="flex h-full flex-col items-start justify-end rounded-lg bg-blue-50 p-6">
                <h3 className="font-head text-[1.25rem] font-bold leading-6 text-dark-900">
                  Votre profil n’est pas totalement complété
                </h3>
                <p className="mt-3 mb-6 font-body text-md text-dark-700">
                  Pensez a bien compléter votre profil afin nous puissions nous
                  adapter un maximum à vos capacités physiques
                </p>
                <Link
                  href={getPage(surveyPages, 'pageName', 'Questionnaire').path}
                  passHref
                >
                  <a>
                    <Cta type="primary" size="m">
                      Compléter mon profil
                    </Cta>
                  </a>
                </Link>
              </div>
            ) : recommendedWorkout ? (
              <Link
                href={
                  getPage(accountPages, 'pageName', 'Séances').path +
                  `/toutes-les-seances/${recommendedWorkout.id}`
                }
                passHref
              >
                <a>
                  <Card
                    tag={recommendedWorkout.attributes.tags?.data[0]}
                    height="h-full md:h-full"
                    title={recommendedWorkout.attributes.name}
                    type="séances"
                    duration={recommendedWorkout.attributes.duration}
                    level={recommendedWorkout.attributes.level}
                    bg={
                      process.env.NEXT_PUBLIC_STRAPI_API_URL +
                      recommendedWorkout.attributes.image.data.attributes
                        .formats.medium.url
                    }
                  />
                </a>
              </Link>
            ) : lives?.next ? (
              <div
                style={{
                  backgroundImage: `url('http://vitaliplay.eltha.fr/bg-card.png')`,
                }}
                className="flex h-80 flex-col items-center justify-end rounded-lg bg-cover bg-center p-6 sm:h-full"
              >
                <h3 className="text-center font-head text-lg font-bold leading-6 text-light-100">
                  {lives.next.attributes.attributes.name}
                </h3>
                <span className="mt-2 mb-4 font-body text-sm font-bold text-light-100">
                  {moment(lives.next.attributes.attributes.startTime).format(
                    'HH-mm'
                  )}{' '}
                  -{' '}
                  {moment(lives.next.attributes.attributes.endTime).format(
                    'HH-mm'
                  )}
                </span>
                <Cta size="m" type="primary">
                  Mettre un rappel
                </Cta>
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex-[1.5] self-end">
          <Title type="5">Vos dernières séances</Title>
          <div className="mt-6 flex flex-col gap-3 xsm:min-w-[300px]">
            {history.length > 0 ? (
              history.slice(0, 3).map((workout) => (
                <Link
                  key={workout.id}
                  href={`${
                    getPage(accountPages, 'pageName', 'Séances').path
                  }/toutes-les-seances/${workout.attributes.workout.data.id}`}
                  passHref
                >
                  <a>
                    <CardPreview
                      title={workout.attributes.workout.data.attributes.name}
                      duration={
                        workout.attributes.workout.data.attributes.duration
                      }
                      level={workout.attributes.workout.data.attributes.level}
                      color={
                        workout.attributes.workout.data.attributes.tags.data[0]
                          .attributes.color
                      }
                    />
                  </a>
                </Link>
              ))
            ) : (
              <Subtitle type="4">Vous n'avez pas de dernière séance.</Subtitle>
            )}
          </div>
        </div>
      </div>
      <div className="mt-20">
        <header className="mb-4 flex flex-col flex-wrap justify-between gap-8 lg:mb-8 lg:flex-row">
          <Title type="5">Nos prochains lives :</Title>
          <div className="flex items-center gap-10 self-end lg:self-auto">
            <Title type="5" html={false}>
              <span className="capitalize">
                {moment(selectedDate).format('dddd Do, YYYY')}
              </span>
            </Title>

            <div>
              <div className="flex gap-3">
                <div
                  className="rotate-180 transform cursor-pointer"
                  onClick={() =>
                    setSelectedDate((selectedDate) =>
                      moment(selectedDate).subtract(1, 'days')
                    )
                  }
                >
                  <ChevronRight color="#1778F2" size={24} />
                </div>

                <div
                  className="cursor-pointer"
                  onClick={() =>
                    setSelectedDate((selectedDate) =>
                      moment(selectedDate).add(1, 'days')
                    )
                  }
                >
                  <ChevronRight color="#1778F2" size={24} />
                </div>
              </div>
            </div>
          </div>
        </header>
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          events={events}
        />
      </div>
    </div>
  )
}

Account.Layout = AccountLayout

export default Account
