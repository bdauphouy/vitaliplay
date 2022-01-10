import Subtitle from '@/components/utils/Subtitle'
import Title from '@/components/utils/Title'
import Link from 'next/link'
import { ChevronRight } from '@/components/utils/Icons'
import { useRouter } from 'next/router'

export const Section = ({ id, icon, title, path = '/' }) => {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(router.asPath + path)}
      className={`cursor-pointer flex justify-between items-center px-7 py-4 border-solid ${
        id === '0' ? '' : 'border-t-1'
      } border-dark-100`}>
      <Subtitle color="text-dark-900" type="4" html={false}>
        {title}
      </Subtitle>
      <ChevronRight color="#A1A1A1" size="24" />
    </div>
  )
}

const Profile = () => {
  return (
    <div className="mt-20 py-10 lg:py-20 md:px-24 max-w-4xl mx-auto h-[calc(100vh_-_165px)]">
      <div className="flex flex-col items-center">
        <div className="w-36 h-36 bg-dark-100 rounded-full mb-6 lg:mb-8"></div>
        <Title type="12" center={true}>
          Guillaume Clerisseau
        </Title>
        <div className="mt-2 lg:mt-3">
          <Subtitle type="4" center={true}>
            Abonné jusqu’au 12 juillet 2022
          </Subtitle>
        </div>
      </div>
      <div className="border-1 border-dark-100 md:rounded-lg mt-10">
        <Section
          id="0"
          title="Informations personnelles"
          path="/informations-personnelles"
        />
        <Section id="1" title="Mot de passe" path="/mot-de-passe" />
        <Section
          id="2"
          title="Informations de santé"
          path="/informations-de-sante"
        />
        <Section id="3" title="Mes factures" path="/mes-factures" />
        <Section id="4" title="Historique" path="/historique" />
      </div>
    </div>
  )
}

export default Profile
