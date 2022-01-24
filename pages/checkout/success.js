import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import { useMediaQuery } from '@mui/material'

const CheckoutSuccess = () => {
  const buttonSize = useButtonSize()

  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  return (
    <div className="px-6 md:px-24 flex justify-center items-center min-h-screen">
      <div className="max-w-2xl flex flex-col items-center">
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
        <div className="mt-10 md:mt-12">
          <Cta size={buttonSize}>Découvrir Vitaliplay</Cta>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSuccess
