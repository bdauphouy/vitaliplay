import JSConfetti from 'js-confetti'
import { useEffect, useState } from 'react'

const useConfetti = () => {
  const [jsConfetti, setJsConfetti] = useState()

  useEffect(() => {
    setJsConfetti(new JSConfetti())
  }, [])

  return () => jsConfetti?.addConfetti()
}

export default useConfetti
