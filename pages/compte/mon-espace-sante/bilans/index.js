import Cta from '@/components/utils/Cta'
import { useMediaQuery } from '@mui/material'
import Row from '@/components/pages/account/Row'
import { useRouter } from 'next/router'
import CheckupPreview from '@/components/pages/account/CheckupPreview'
import Link from 'next/link'
import { LinksContext } from '@/contexts/LinksContext'
import { useContext } from 'react'
import orangeGreen from '@/public/decoration-icons/orange-green.svg'
import greenBlue from '@/public/decoration-icons/green-blue.svg'
import blueOrange from '@/public/decoration-icons/blue-orange.svg'
import yellowOrange from '@/public/decoration-icons/yellow-orange.svg'
import Image from 'next/image'
import AccountLayout from '@/components/layouts/AccountLayout'
import { fetchAPIWithToken } from '@/lib/api'
import { Subtitle } from '@/components/utils/Subtitle'
import moment from 'moment'

export const getServerSideProps = async ({ req }) => {
  if (!req.cookies.jwt) {
    return {
      redirect: {
        destination: '/connexion',
        permanent: true,
      },
    }
  }

  const checkups = await fetchAPIWithToken(
    '/checkups/mine',
    req.cookies.jwt,
    false
  )

  return { props: { checkups: checkups.data } }
}

const MyHealthSpaceCheckups = ({ checkups }) => {
  const router = useRouter()

  console.log(checkups)

  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  const { getPage, checkupPages } = useContext(LinksContext)

  return (
    <div className="mt-20 min-h-[calc(100vh_-_165px)] py-5 md:py-16">
      <div className="px-6 md:px-24" onClick={() => router.back()}>
        <Cta arrow="left" type="secondary" size={isMediumScreen ? 'l' : 'm'}>
          Retour
        </Cta>
      </div>
      <div className="mt-10 md:mt-6">
        <Row title="Mes bilans" type="grid" button={false}>
          <div className="mt-2 grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="relative flex h-auto flex-row flex-wrap items-center justify-between gap-4 overflow-hidden rounded-lg bg-blue-50 py-6 px-4 shadow-level1 md:h-64 md:flex-col md:flex-nowrap md:justify-center md:py-16 md:px-10">
              <div className="absolute top-0 -left-8 hidden scale-50 transform lg:block">
                <Image src={orangeGreen} alt="orange-green" />
              </div>
              <div className="absolute -top-8 -right-6 block scale-50 transform lg:right-0 lg:top-0 lg:scale-75">
                <Image src={blueOrange} alt="blue-orange" />
              </div>
              <div className="absolute -bottom-6 left-2 block lg:bottom-4">
                <Image src={greenBlue} alt="green-blue" />
              </div>
              <div className="absolute -bottom-12 right-2 hidden lg:block">
                <Image src={yellowOrange} alt="yellow-orange" />
              </div>
              <h3
                className={`font-head text-lg font-bold text-blue-900 md:text-xl ${
                  isMediumScreen ? 'text-center' : ''
                }`}
              >
                Réaliser un nouveau bilan
              </h3>

              <Link
                href={getPage(checkupPages, 'pageName', 'Bilan').path}
                passHref
              >
                <a>
                  <div className="mt-0 md:mt-6">
                    <Cta arrow="right" size={isMediumScreen ? 'l' : 'm'}>
                      Nouveau bilan
                    </Cta>
                  </div>
                </a>
              </Link>
            </div>
            {checkups.length > 0 ? (
              checkups.map((checkup) => {
                return (
                  <Link
                    key={checkup.id}
                    href={`${router.route}/${checkup.id}`}
                    passHref
                  >
                    <a>
                      <div className="flex h-auto md:h-64">
                        <CheckupPreview
                          mobile={true}
                          date={moment(checkup.createdAt).format('0d/MM/YY')}
                          score={checkup.globalScore}
                        />
                      </div>
                    </a>
                  </Link>
                )
              })
            ) : (
              <Subtitle>Aucun live n'est actuellement en cours.</Subtitle>
            )}
          </div>
        </Row>
      </div>
    </div>
  )
}

MyHealthSpaceCheckups.Layout = AccountLayout

export default MyHealthSpaceCheckups
