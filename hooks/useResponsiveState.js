import { useEffect, useState } from 'react'

const useResponsiveState = (breakpoint, states) => {
  const [responsiveState, setReponsiveState] = useState(states.from)

  useEffect(() => {
    const updateResponsiveState = () => {
      if (window.innerWidth >= breakpoint) {
        setReponsiveState(states.from)
      } else {
        setReponsiveState(states.to)
      }
    }

    updateResponsiveState()

    window.addEventListener('resize', updateResponsiveState)
  }, [])

  return responsiveState
}

export default useResponsiveState
