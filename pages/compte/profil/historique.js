import Row from '@/components/pages/account/Row'
import Card from '@/components/pages/account/Card'
import Title from '@/components/utils/Title'
import Link from 'next/link'
import { useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import AccountLayout from '@/components/layouts/AccountLayout'

const ProfileHistory = () => {
  const { getPage, accountPages } = useContext(LinksContext)

  return (
    <div className="mt-20 py-10 lg:py-20">
      <Title type="1" center={true}>
        Historique
      </Title>
      <div className="mt-12 space-y-12 lg:mt-20 lg:space-y-16">
        <Row title="Août 2021" button={false} mobile={true}>
          {[...Array(4)].map((_, i) => {
            return (
              <Link
                key={i}
                href={`${
                  getPage(accountPages, 'pageName', 'Séances').path
                }/toutes-les-seances/1`}
                passHref
              >
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

ProfileHistory.Layout = AccountLayout

export default ProfileHistory
