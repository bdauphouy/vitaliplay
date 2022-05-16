import Cta from '@/components/utils/Cta'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import AccountLayout from '@/components/layouts/AccountLayout'
import { fetchAPIWithToken, getToken } from '@/lib/api'
import moment from 'moment'
import { ChevronRight } from '@/components/utils/Icons'
import Calendar from '@/components/pages/account/Calendar'
import { useState, useEffect } from 'react'

export const getServerSideProps = async ({ req }) => {
  const lives = await fetchAPIWithToken('/lives', req.cookies.jwt, false)

  const paid = await fetchAPIWithToken(
    '/users/me/subscription',
    req.cookies.jwt,
    false
  )

  if (paid.status !== 'finalized') {
    return {
      redirect: {
        destination: '/abonnements',
        permanent: true,
      },
    }
  }

  return { props: {} }
}

const TheLive = () => {
  const [selectedDate, setSelectedDate] = useState(moment().startOf('day'))

  const [events, setEvents] = useState([])

  const [lives, setLives] = useState()

  useEffect(() => {
    const fetchLives = async () => {
      const lives = await fetchAPIWithToken('/lives', getToken(), false)

      setLives(lives.data)
    }

    fetchLives()
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
    <div>
      {lives?.current ? (
        <div className="mt-20 py-10 px-6 md:py-20 md:px-24">
          <div className="flex flex-col-reverse xl:flex-row xl:items-center xl:justify-between">
            <div className="mt-10 xl:mt-0 xl:mr-24 xl:max-w-xl">
              <Title type="1" html={false}>
                Live : {lives.current?.attributes.attributes.name}
              </Title>
              <div className="mt-4">
                <Subtitle html={false}>
                  {lives.current?.attributes.attributes.description}
                </Subtitle>
              </div>
            </div>
            <div
              style={{ backgroundImage: "url('/bg-card.png')" }}
              className="flex h-36 w-full items-center rounded-lg bg-cover p-4 md:items-end lg:h-32 xl:w-auto xl:min-w-[500px] xl:flex-[.8]"
            >
              <div className="flex flex-1 flex-col items-start justify-between md:flex-row md:items-center">
                <div>
                  <h3 className="font-head text-lg font-bold leading-6 text-light-100">
                    {lives.current?.attributes.attributes.name}
                  </h3>
                  <span className="mt-2 text-sm text-light-100">
                    {moment(
                      lives.current.attributes.attributes.startTime
                    ).format('HH:mm')}{' '}
                    -{' '}
                    {moment(lives.current.attributes.attributes.endTime).format(
                      'HH:mm'
                    )}
                  </span>
                </div>
                <div className="mt-6 md:mt-0">
                  <Cta size="m">Mettre un rappel</Cta>
                </div>
              </div>
            </div>
          </div>
          <iframe
            className="mt-12 aspect-video w-full bg-dark-900"
            src={lives.current?.attributes.attributes.link}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="mt-20 py-10 px-6 md:py-20 md:px-24">
          <Subtitle>Aucun live n'est actuellement en cours.</Subtitle>
        </div>
      )}
      <div className="px-6 pb-12 md:px-24">
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

TheLive.Layout = AccountLayout

export default TheLive
