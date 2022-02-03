import { useState, useEffect } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'

const useCongratsSize = () => {
  const [congratsSize, setCongratsSize] = useState()

  const isLargeScreen = useMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    setCongratsSize(isLargeScreen ? '80' : '64')
  }, [isLargeScreen])

  return congratsSize
}

export default useCongratsSize
