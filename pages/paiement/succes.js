import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import { useMediaQuery } from '@mui/material'
import { Congrats } from '@/components/utils/Icons'
import useCongratsSize from '@/hooks/useCongratsSize'
import orangeGreen from '@/public/decoration-icons/orange-green.svg'
import greenBlue from '@/public/decoration-icons/green-blue.svg'
import blueOrange from '@/public/decoration-icons/blue-orange.svg'
import yellowOrange from '@/public/decoration-icons/yellow-orange.svg'
import Image from 'next/image'
import { LinksContext } from '@/contexts/LinksContext'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import useConfetti from '@/hooks/useConfetti'

export const getServerSideProps = async ({ req }) => {
  if (!req.cookies.jwt) {
    return {
      redirect: {
        destination: '/paiement/compte',
        permanent: true,
      },
    }
  }

  return {
    props: {},
  }
}

const CheckoutSuccess = () => {
  const buttonSize = useButtonSize()
  const congratsSize = useCongratsSize()

  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  const { getPage, accountPages } = useContext(LinksContext)
  const confetti = useConfetti()

  useEffect(() => {
    confetti()
  }, [confetti])

  const router = useRouter()

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 md:px-24">
      <div className="absolute top-40 left-20 hidden lg:block">
        <Image src={orangeGreen} alt="orange-green" />
      </div>
      <div className="absolute bottom-96 right-20 hidden lg:block">
        <Image src={orangeGreen} alt="orange-green" />
      </div>
      <div className="absolute top-60 right-32 hidden lg:block xl:right-48">
        <Image src={blueOrange} alt="blue-orange" />
      </div>
      <div className="absolute -bottom-8 left-20 hidden lg:block xl:right-48">
        <Image src={blueOrange} alt="blue-orange" />
      </div>
      <div className="absolute bottom-60 left-52 hidden lg:block">
        <Image src={greenBlue} alt="green-blue" />
      </div>
      <div className="absolute bottom-10 left-2/3 hidden lg:block">
        <Image src={greenBlue} alt="green-blue" />
      </div>
      <div className="absolute bottom-20 right-40 hidden lg:block">
        <Image src={yellowOrange} alt="yellow-orange" />
      </div>
      <div className="flex max-w-2xl flex-col items-center py-24">
        <div className="mb-6 lg:mb-10">
          <Congrats size={congratsSize} />
        </div>
        <Title type="3" center={true} html={false}>
          Félicitation, votre paiement a été effectué avec succès.
          {isMediumScreen ? ' Profitez dès à présent de Vitaliplay' : ''}
        </Title>
        <div className="mt-6">
          <Subtitle type="2" center={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fringilla
            viverra tellus adipiscing mi, nunc. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </Subtitle>
        </div>
        <div
          className="mt-10 md:mt-12"
          onClick={() =>
            router.push(getPage(accountPages, 'pageName', 'Accueil').path)
          }
        >
          <Cta size={buttonSize}>Découvrir Vitaliplay</Cta>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSuccess
