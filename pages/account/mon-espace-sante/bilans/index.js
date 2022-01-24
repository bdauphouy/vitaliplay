import Cta from '@/components/utils/Cta'
import { useMediaQuery } from '@mui/material'
import Row from '@/components/pages/account/Row'
import { useRouter } from 'next/router'
import CheckupPreview from '@/components/pages/account/CheckupPreview'
import Link from 'next/link'
import { LinksContext } from '@/contexts/LinksContext'
import { useContext } from 'react'

const MyHealthSpaceCheckups = () => {
  const router = useRouter()

  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  const { getRewriteByPage } = useContext(LinksContext)

  return (
    <div className="mt-20 py-5 md:py-16 min-h-[calc(100vh_-_165px)]">
      <div className="px-6 md:px-24" onClick={() => router.back()}>
        <Cta arrow="left" type="secondary" size={isMediumScreen ? 'l' : 'm'}>
          Retour
        </Cta>
      </div>
      <div className="mt-10 md:mt-6">
        <Row title="Mes bilans" type="grid" button={false}>
          <div className="mt-2 grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <div className="flex-wrap md:flex-nowrap bg-blue-50 h-auto md:h-64 rounded-lg py-6 px-4 md:py-16 md:px-10 flex gap-4 md:flex-col flex-row justify-between md:justify-center items-center shadow-level1">
              <h3
                className={`font-head font-bold text-lg md:text-xl text-blue-900 ${
                  isMediumScreen ? 'text-center' : ''
                }`}>
                Réaliser un nouveau bilan
              </h3>

              <Link href={getRewriteByPage('Bilan')} passHref>
                <a>
                  <div className="mt-0 md:mt-6">
                    <Cta arrow="right" size={isMediumScreen ? 'l' : 'm'}>
                      Nouveau bilan
                    </Cta>
                  </div>
                </a>
              </Link>
            </div>
            {[...Array(11)].map((_, i) => {
              return (
                <Link
                  key={i}
                  href={`${getRewriteByPage('Mon espace santé')}/bilans/1`}
                  passHref>
                  <a>
                    <div className="flex h-auto md:h-64">
                      <CheckupPreview
                        mobile={true}
                        date="01/02/2020"
                        score="65"
                      />
                    </div>
                  </a>
                </Link>
              )
            })}
          </div>
        </Row>
      </div>
    </div>
  )
}

export default MyHealthSpaceCheckups
