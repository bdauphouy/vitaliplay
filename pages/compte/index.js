import Title from '@/components/utils/Title'
import Cta from '@/components/utils/Cta'
import Card from '@/components/pages/account/Card'
import CardPreview from '@/components/pages/account/CardPreview'
import { useMediaQuery } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { LinksContext } from '@/contexts/LinksContext'
import AccountLayout from '@/components/layouts/AccountLayout'
import { fetchAPIWithToken } from '@/lib/api'

export const getServerSideProps = async ({ req }) => {
  if (!req.cookies.jwt) {
    return {
      redirect: {
        destination: '/connexion',
        permanent: true,
      },
    }
  }

  const home = await fetchAPIWithToken('/pwa/home', req.cookies.jwt, false)
  console.log(home)

  const user = await fetchAPIWithToken('/users/me', req.cookies.jwt, false)

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
  const [linkSize, setLinkSize] = useState('m')

  const [cardType] = useState('Le live du jour')

  const { getPage, checkupPages, accountPages } = useContext(LinksContext)

  const isSmallScreen = useMediaQuery('(max-width: 640px)')

  useEffect(() => {
    setLinkSize(isSmallScreen ? 's' : 'm')
  }, [isSmallScreen])

  return (
    <div className="mt-44 px-6 pb-12 md:px-24">
      <div className="flex-row-reverse justify-between lg:flex">
        <div className="fixed top-20 left-0 flex w-full items-center justify-center bg-blue-50 py-4 px-6 text-center font-body text-md font-bold text-blue-900 lg:relative lg:top-0 lg:w-auto lg:rounded-lg lg:shadow-level1">
          Accès offert par : AG2R LA MONDIALE
        </div>
        <Title type="1" html={false}>
          Bonjour, <strong className="type-1">{user.firstname}</strong>
        </Title>
      </div>
      <div className="mt-14 flex flex-wrap gap-8">
        <div className="flex-[2] xsm:min-w-[320px] sm:min-w-[400px]">
          <Title type="5">Votre récapitulatif</Title>
          <div className="mt-6 rounded-lg px-6 py-8 shadow-level1">
            <div className="flex items-center gap-6">
              <div className="min-h-[72px] min-w-[72px] rounded-full bg-gray-100 bg-[url(https://thispersondoesnotexist.com/image)] bg-cover sm:min-h-[96px] sm:min-w-[96px]"></div>
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
                <Link
                  href={`${
                    getPage(accountPages, 'pageName', 'Mon espace santé').path
                  }/bilans/1`}
                  passHref
                >
                  <a className="flex-1">
                    <CheckupBox date="23/08/21" score="65" />
                  </a>
                </Link>
                <Link
                  href={`${
                    getPage(accountPages, 'pageName', 'Mon espace santé').path
                  }/bilans/1`}
                  passHref
                >
                  <a className="flex-1">
                    <CheckupBox date="23/07/21" score="85" />
                  </a>
                </Link>
                <Link
                  href={`${
                    getPage(accountPages, 'pageName', 'Mon espace santé').path
                  }/bilans/1`}
                  passHref
                >
                  <a className="flex-1">
                    <CheckupBox date="23/06/21" score="43" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex min-w-[224px] flex-1 flex-col md:min-w-[288px]">
          <Title type="5">{cardType}</Title>
          <div className="mt-6 h-full">
            {cardType === 'Votre séance du jour' ? (
              <Card
                tagType="1"
                title="Exercices intensifs pour le bas du corps"
                type="séances"
                duration="27"
                level="Intermédiaire"
                bg="/bg-card.png"
                height="h-full"
              />
            ) : cardType === 'Compléter votre profil' ? (
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
            ) : (
              <div
                style={{
                  backgroundImage: `url('http://vitaliplay.eltha.fr/bg-card.png')`,
                }}
                className="flex h-full flex-col items-center justify-end rounded-lg bg-cover bg-center p-6"
              >
                <h3 className="text-center font-head text-lg font-bold leading-6 text-light-100">
                  Live Yoga:
                  <br />
                  Sophie Martinez
                </h3>
                <span className="mt-2 mb-4 font-body text-sm font-bold text-light-100">
                  16:00 - 17:00
                </span>
                <Cta size="m" type="primary">
                  Mettre un rappel
                </Cta>
              </div>
            )}
          </div>
        </div>
        <div className="flex-[1.5] self-end">
          <Title type="5">Vos dernières séances</Title>
          <div className="mt-6 flex flex-col gap-3 xsm:min-w-[300px]">
            <Link
              href={`${
                getPage(accountPages, 'pageName', 'Séances').path
              }/toutes-les-seances/1`}
              passHref
            >
              <a>
                <CardPreview
                  title="Exercices intensifs pour le bas du corps"
                  duration="27"
                  level="Intermédiaire"
                  type="4"
                />
              </a>
            </Link>
            <Link
              href={`${
                getPage(accountPages, 'pageName', 'Séances').path
              }/toutes-les-seances/1`}
              passHref
            >
              <a>
                <CardPreview
                  title="Exercices intensifs pour le bas du corps"
                  duration="27"
                  level="Intermédiaire"
                  type="2"
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

Account.Layout = AccountLayout

export default Account
