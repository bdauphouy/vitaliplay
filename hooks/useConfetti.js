import JSConfetti from 'js-confetti'
import { useEffect, useState } from 'react'

const useConfetti = () => {
  const [jsConfetti, setJsConfetti] = useState()

  useEffect(() => {
    setJsConfetti(new JSConfetti())
  }, [])

  return () =>
    jsConfetti?.addConfetti({
      confettiColors: ['#1778f2', '#26c196', '#ff917f', '#f9f871'],
    })
}

export default useConfetti
