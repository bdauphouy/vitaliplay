import Row from '@/components/pages/account/Row'
import Card from '@/components/pages/account/Card'
import Title from '@/components/utils/Title'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import AccountLayout from '@/components/layouts/AccountLayout'
import { fetchAPIWithToken, getToken } from '@/lib/api'
import Subtitle from '@/components/utils/Subtitle'

const ProfileHistory = () => {
  const { getPage, accountPages } = useContext(LinksContext)

  const [history, setHistory] = useState({})

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetchAPIWithToken(
        '/users/me/workouts/history',
        getToken(),
        false,
        ['workout']
      )

      if (res.data) {
        const historyIds = []

        const filteredHistory = res.data.filter((workout) => {
          if (!historyIds.includes(workout.attributes.workout.data.id)) {
            historyIds.push(workout.attributes.workout.data.id)
            return workout.attributes.workout
          }
        })

        const sortedHistory = {}

        const months = [
          'Janvier',
          'Février',
          'Mars',
          'Avril',
          'Mai',
          'Juin',
          'Juillet',
          'Août',
          'Septembre',
          'Octobre',
          'Novembre',
          'Décembre',
        ]

        filteredHistory.map((workout) => {
          const historyCreatedAt = new Date(workout.attributes.createdAt)
          const historyCreatedAtMonth = months[historyCreatedAt.getMonth()]
          const historyCreatedAtYear = historyCreatedAt.getFullYear()

          sortedHistory[`${historyCreatedAtMonth} ${historyCreatedAtYear}`] =
            filteredHistory.filter((workout) => {
              const workoutCreatedAt = new Date(
                workout.attributes.workout.data.attributes.createdAt
              )
              const workoutCreatedAtMonth = months[workoutCreatedAt.getMonth()]
              const workoutCreatedAtYear = workoutCreatedAt.getFullYear()

              if (
                workoutCreatedAtMonth === historyCreatedAtMonth &&
                workoutCreatedAtYear === historyCreatedAtYear
              ) {
                return workout
              }
            })
        })

        setHistory(sortedHistory)
      }
    }

    fetchHistory()
  }, [])

  return (
    <div className="mt-20 py-10 lg:py-20">
      <Title type="1" center={true}>
        Historique
      </Title>
      <div className="mt-12 space-y-12 lg:mt-20 lg:space-y-16">
        {Object.keys(history).length > 0 ? (
          <>
            {Object.entries(history)
              .reverse()
              .map(([period, workouts]) => {
                return (
                  <Row key={period} title={period} button={false} mobile={true}>
                    {workouts.reverse().map((workout) => {
                      return (
                        <Link
                          key={workout.id}
                          href={`${
                            getPage(accountPages, 'pageName', 'Séances').path
                          }/toutes-les-seances/${
                            workout.attributes.workout.data.id
                          }`}
                          passHref
                        >
                          <a>
                            <Card
                              tag={
                                workout.attributes.workout.data.attributes.tags
                                  .data[0]
                              }
                              title={
                                workout.attributes.workout.data.attributes.name
                              }
                              type="séances"
                              duration={
                                workout.attributes.workout.data.attributes
                                  .duration
                              }
                              level={
                                workout.attributes.workout.data.attributes.level
                              }
                              bg={
                                process.env.NEXT_PUBLIC_STRAPI_API_URL +
                                workout.attributes.workout.data.attributes.image
                                  .data.attributes.formats.medium.url
                              }
                            />
                          </a>
                        </Link>
                      )
                    })}
                  </Row>
                )
              })}
          </>
        ) : (
          <Subtitle center>Vous n'avez pas d'historique.</Subtitle>
        )}
      </div>
    </div>
  )
}

ProfileHistory.Layout = AccountLayout

export default ProfileHistory
