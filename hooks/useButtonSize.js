import { useState, useEffect } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'

const useButtonSize = () => {
  const [buttonSize, setButtonSize] = useState()

  const isLargeScreen = useMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    setButtonSize(isLargeScreen ? 'xl' : 'l')
  }, [isLargeScreen])

  return buttonSize
}

export default useButtonSize
