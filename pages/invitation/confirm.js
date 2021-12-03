import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import LoginLayout from '@/components/layouts/LoginLayout'
import Cta from '@/components/utils/Cta'
import { useState, useEffect } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'

const InvitationConfirm = () => {
  const [buttonSize, setButtonSize] = useState()

  const isLargeScreen = useMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    setButtonSize(isLargeScreen ? 'xl' : 'l')
  }, [isLargeScreen])

  return (
    <div className="flex flex-col items-center lg:w-4/5">
      <Title center={true}>Bienvenue parmis nous !</Title>
      <div className="mt-4">
        <Subtitle center={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida eget
          varius a diam faucibus nec sodales fermentum eget.
        </Subtitle>
      </div>
      <div className="mt-12">
        <Cta size={buttonSize} type="primary">
          Compléter mon profil
        </Cta>
      </div>
    </div>
  )
}

InvitationConfirm.Layout = LoginLayout

export default InvitationConfirm
