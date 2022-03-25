import { useState, useEffect } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'

const useButtonSize = (sizes = ['xl', 'l'], breakpoint = 1024) => {
  const [buttonSize, setButtonSize] = useState()

  const isLargeScreen = useMediaQuery(`(min-width: ${breakpoint}px)`)

  useEffect(() => {
    setButtonSize(isLargeScreen ? sizes[0] : sizes[1])
  }, [isLargeScreen])

  return buttonSize
}

export default useButtonSize
