import Cta from '@/components/utils/Cta'
import { useMediaQuery } from '@mui/material'
import Row from '@/components/pages/account/Row'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import Advices from '@/components/pages/account/Advices'
import AccountLayout from '@/components/layouts/AccountLayout'
import { fetchAPIWithToken } from '@/lib/api'
import moment from 'moment'

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

  const checkups = await fetchAPIWithToken(
    `/checkups/mine`,
    req.cookies.jwt,
    false,
    ['physical', 'wellBeing', 'dailyActivity']
  )

  const checkup =
    checkups.data.data.find((checkup) => checkup.id === parseInt(query.id))
      ?.attributes || null

  if (!checkup) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      checkup,
    },
  }
}

const CheckupSectionBar = ({ score, type, section, checkup }) => {
  return (
    <div className="mt-6 overflow-hidden rounded-lg shadow-level1 xl:flex">
      <div
        className={`${
          type === '1'
            ? 'bg-blue-900'
            : type === '2'
            ? 'bg-green-900'
            : type === '3'
            ? 'bg-orange-900'
            : 'bg-dark-900'
        } flex flex-row-reverse items-center justify-between p-6 xl:max-w-[12rem] xl:flex-col xl:justify-start xl:py-8`}
      >
        <h2 className="font-head text-[4rem] font-extrabold leading-[4rem] text-light-100">
          {score}
        </h2>
        <h3 className="text-center font-body text-base font-semibold text-light-100 lg:text-[1.25rem] xl:mt-4">
          {section}
        </h3>
      </div>
      <div className="flex flex-col gap-6 px-4 py-6 md:gap-20 xl:flex-row xl:justify-between xl:py-10 xl:px-12">
        {checkup.map((category) => {
          return (
            <div key={category.title}>
              <h3
                className={`font-head text-[1.25rem] font-bold ${
                  type === '1'
                    ? 'text-blue-900'
                    : type === '2'
                    ? 'text-green-900'
                    : type === '3'
                    ? 'text-orange-900'
                    : 'text-dark-900'
                }`}
              >
                {category.title}
              </h3>
              <ul className="mt-3">
                {category.values.map((value, i) => {
                  return (
                    <li key={i} className="font-body text-md text-dark-500">
                      {value}
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const MyHealthSpaceCheckups1 = ({ checkup }) => {
  const router = useRouter()

  const { getPage, accountPages } = useContext(LinksContext)

  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  const activityToSentence = (activity) => {
    switch (activity) {
      case 'fiveOrMoreAWeek':
        return 'Plus de 5 fois par semaine'
      case 'threeOrFourAWeek':
        return '3 à 4 fois par semaine'
      case 'threeOrMoreAWeek':
        return 'Plus de 3 fois par semaine'
      case 'oneOrTwoAWeek':
        return '1 à 2 fois par semaine'
      case 'never':
        return 'Jamais'
    }
  }

  return (
    <div className="mt-20 min-h-[calc(100vh_-_165px)] py-5 md:py-16">
      <div
        className="px-6 md:px-24"
        onClick={() =>
          router.push(
            getPage(accountPages, 'pageName', 'Mon espace santé').path
          )
        }
      >
        <Cta arrow="left" type="secondary" size={isMediumScreen ? 'l' : 'm'}>
          Retour
        </Cta>
      </div>
      <div className="mt-10 md:mt-6">
        <Row
          title={`Bilan ${moment(checkup.createdAt).format('DD/MM/YY')}`}
          type="grid"
          button={false}
        >
          <Advices
            button={false}
            note={checkup.globalScore}
            advice={checkup.advice}
          />
          <CheckupSectionBar
            score={checkup.physicalScore}
            type="1"
            section="Bilan Physique"
            checkup={[
              {
                title: 'Force',
                values: [
                  `Nbr de répétitions : ${
                    checkup.physical[0].scores[0]?.score || 'Non renseigné'
                  }`,
                  `Nbr de répétitions : ${
                    checkup.physical[0].scores[1]?.score || 'Non renseigné'
                  }`,
                ],
              },
              {
                title: 'Souplesse',
                values: [
                  `Distance (cm) : ${
                    checkup.physical[1].scores[0]?.score || 'Non renseigné'
                  } cm`,
                  `Distance (cm) : ${
                    checkup.physical[1].scores[1]?.score || 'Non renseigné'
                  } cm`,
                ],
              },
              {
                title: 'Endurance',
                values: [
                  `Nbr de répétitions : ${
                    checkup.physical[2].scores[0]?.score || 'Non renseigné'
                  }`,
                ],
              },
              {
                title: 'Equilibre',
                values: [
                  `Jambe droite : ${
                    checkup.physical[3].scores[0]?.score || 'Non renseigné'
                  } sec`,
                  `Jambe gauche : ${
                    checkup.physical[3].scores[1]?.score || 'Non renseigné'
                  } sec`,
                ],
              },
            ]}
          />
          <CheckupSectionBar
            score={checkup.wellBeingScore}
            type="2"
            section="Bilan Bien Être"
            checkup={[
              {
                title: 'Humeur',
                values: [`Note (0/5) : ${checkup.wellBeing.mood}`],
              },
              {
                title: 'Tranquilité',
                values: [`Note (0/5) : ${checkup.wellBeing.tranquility}`],
              },
              {
                title: 'Energie',
                values: [`Note (0/5) : ${checkup.wellBeing.energy}`],
              },
              {
                title: 'Réveil',
                values: [`Note (0/5) : ${checkup.wellBeing.awakening}`],
              },
              {
                title: 'Vie quotidienne',
                values: [`Note (0/5) : ${checkup.wellBeing.everydayLife}`],
              },
            ]}
          />
          <CheckupSectionBar
            score={checkup.dailyActivityScore}
            type="3"
            section="Activité quotidienne"
            checkup={[
              {
                title: 'Activité intense',
                values: [
                  activityToSentence(checkup.dailyActivity.intenseActivity),
                ],
              },
              {
                title: 'Activité modérée',
                values: [
                  activityToSentence(checkup.dailyActivity.moderateActivity),
                ],
              },
            ]}
          />
        </Row>
      </div>
    </div>
  )
}

MyHealthSpaceCheckups1.Layout = AccountLayout

export default MyHealthSpaceCheckups1
