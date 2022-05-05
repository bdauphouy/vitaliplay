import Cta from '@/components/utils/Cta'
import { useMediaQuery } from '@mui/material'
import Row from '@/components/pages/account/Row'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import Advices from '@/components/pages/account/Advices'
import AccountLayout from '@/components/layouts/AccountLayout'
import { fetchAPIWithToken } from '@/lib/api'

export const getServerSideProps = async ({ req, query }) => {
  if (!req.cookies.jwt) {
    return {
      redirect: {
        destination: '/connexion',
        permanent: true,
      },
    }
  }

  const bilan = await fetchAPIWithToken(
    `/checkups/${query.id}`,
    req.cookies.jwt,
    true,
    ['physical']
  )
  return { props: { bilan: {} } }
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

const MyHealthSpaceCheckups1 = ({ bilan }) => {
  console.log(bilan)
  const router = useRouter()

  const { getPathByPage } = useContext(LinksContext)

  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  return (
    <div className="mt-20 min-h-[calc(100vh_-_165px)] py-5 md:py-16">
      <div className="px-6 md:px-24" onClick={() => router.back()}>
        <Cta arrow="left" type="secondary" size={isMediumScreen ? 'l' : 'm'}>
          Retour
        </Cta>
      </div>
      <div className="mt-10 md:mt-6">
        <Row
          title={`Bilan ${bilan.createdAt.toLocaleDateString('fr-FR')}`}
          type="grid"
          button={false}
        >
          <Advices
            button={false}
            note={bilan.globalNote}
            advice={bilan.conseil}
          />
          <CheckupSectionBar
            score={bilan.note_physique}
            type="1"
            section="Bilan Physique"
            checkup={[
              {
                title: 'Force',
                values: [
                  `Nbr de répétitions : ${bilan.physical.strength.exo1}`,
                  `Nbr de répétitions : ${bilan.physical.strength.exo2}`,
                ],
              },
              {
                title: 'Souplesse',
                values: [
                  `Distance (cm) : ${bilan.physical.flexibility.exo3} cm`,
                  `Distance (cm) : ${bilan.physical.flexibility.exo4} cm`,
                ],
              },
              {
                title: 'Endurance',
                values: [
                  `Nbr de répétitions : ${bilan.physical.endurance.exo5}`,
                ],
              },
              {
                title: 'Equilibre',
                values: [
                  `Jambe droite : ${bilan.physical.balance.rightLegTime} sec`,
                  `Jambe gauche : ${bilan.physical.balance.leftLegTime} sec`,
                ],
              },
            ]}
          />
          <CheckupSectionBar
            score={bilan.note_bien_etre}
            type="2"
            section="Bilan Bien Être"
            checkup={[
              {
                title: 'Humeur',
                values: [`Note (0/5) : ${bilan.wellBeing.mood}`],
              },
              {
                title: 'Tranquilité',
                values: [`Note (0/5) : ${bilan.wellBeing.tranquility}`],
              },
              {
                title: 'Energie',
                values: [`Note (0/5) : ${bilan.wellBeing.energy}`],
              },
              {
                title: 'Réveil',
                values: [`Note (0/5) : ${bilan.wellBeing.awakening}`],
              },
              {
                title: 'Vie quotidienne',
                values: [`Note (0/5) : ${bilan.wellBeing.everydayLife}`],
              },
            ]}
          />
          <CheckupSectionBar
            score={bilan.note_activite_quotidienne}
            type="3"
            section="Activité quotidienne"
            checkup={[
              {
                title: 'Activité intense',
                values: [bilan.dailyActivity.intenseActivity],
              },
              {
                title: 'Activité modérée',
                values: [bilan.dailyActivity.moderateActivity],
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
