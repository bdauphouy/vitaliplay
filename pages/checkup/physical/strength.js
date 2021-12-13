import CheckupLayout from '@/components/layouts/CheckupLayout'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import { useState } from 'react'

const PhysicalStrength = () => {
  const [currentExercise, setCurrentExercise] = useState(1)

  return (
    <>
      {currentExercise === 1 ? (
        <div onClick={() => setCurrentExercise(2)}>
          <Title>Exercice 1 : Assis-debout</Title>
          <div className="mt-4">
            <Subtitle>
              Le but est de se lever et s’assoir sur une chaise le plus de fois
              possibles en 30 secondes.
            </Subtitle>
          </div>
          <iframe
            className="mt-6 w-full aspect-video"
            src="https://www.youtube.com/embed/yR9Wpyf8gbk"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        </div>
      ) : (
        <div onClick={() => setCurrentExercise(1)}>
          <Title>Exercice 2 : Flexion de bras</Title>
          <div className="mt-4">
            <Subtitle>
              Assis sur une chaise le but est de réaliser un maximum de
              flexion-extension de bras avec un poids d’environ 2kg en 30
              secondes.
            </Subtitle>
          </div>
          <iframe
            className="mt-6 w-full aspect-video"
            src="https://www.youtube.com/embed/yR9Wpyf8gbk"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        </div>
      )}
    </>
  )
}

PhysicalStrength.Layout = CheckupLayout

export default PhysicalStrength
