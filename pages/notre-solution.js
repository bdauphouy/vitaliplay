import Image from 'next/image'
import Title from '../components/Title'
import Subtitle from '../components/Subtitle'
import { useEffect, useState, useRef } from 'react'
import useResponsiveState from '../hooks/useResponsiveState'

const OurSolution = () => {
  const [sections] = useState([
    {
      id: 0,
      keyword: 'Bilan',
      title: 'Bilan de santé personnalisé',
      subtitle: `Le bilan a été élaboré par des professionnels de santé et basé sur
      des tests validés scientifiquement. Il permet d'évaluer votre
      condition physique globale (force, souplesse, endurance et
      équilibre), votre bien être subjectif et votre niveau d'activité
      quotidien. Il permet de vous indiquer vos points forts et vos axes
      d’amélioration. Vous pourrez ainsi suivre l'évolution de vos
      résultats régulièrement.`,
    },
    {
      id: 1,
      keyword: 'Séances',
      title: 'Des séances variées',
      subtitle: `DIFFÉRENTES DISCIPLINES
      <br />
      Les séanes sont variées et originales afin que vous puissiez
      découvrir de nouvelles disciplines : Taïso, Danse, stretching,
      Yoga, Relaxation, Boxe.
      <br />
      <br />
      DES SÉANCES ADAPTÉES À VOS CAPACITÉS
      <br />
      L'enseignant, spécialiste de sa discipline, propose différents
      niveaux de difficultés pour chaque exercice afin qu'il soit adapté
      à chacun.`,
    },
    {
      id: 2,
      keyword: 'Conférences santé',
      title: 'Conseils de professionels de santé',
      subtitle: `Les conférences étant en live, vous pouvez poser vos questions aux
      professionnels. Les vidéos sont accessibles en permanence sur le
      site à la suite du direct.
      <br />
      <br />
      DIFFÉRENTS THÈMES ABORDÉS
      <br />
      Les thèmes abordés sont tous axés autour de la santé et du
      bien-être. L’objectif est de s’appuyer sur les recommandations
      scientifiques actuelles et de laisser de côté certaines croyances
      qui ne sont plus d’actualité.
      <br />
      <br />
      DE NOMBREUX PROFESSIONNELS
      <br />
      Médecin, kinésithérapeute, enseignant en activité physique
      adaptée, infirmier. Ces différents spécialistes mènent les
      conférences en fonction des thèmes abordés.`,
    },
    {
      id: 3,
      keyword: 'Direct',
      title: 'Séances en direct',
      subtitle: `Elles sont réalisées, en direct, toutes les semaines par des enseignants en activité physique adaptée. Un calendrier et un système d'alerte vous permet de ne pas les manquer.
      Si vous n’êtes pas disponibles à l’heure prévue, pas de panique, les vidéos sont accessibles en rediffusion à la suite du direct.`,
    },
    {
      id: 4,
      keyword: 'Conseils',
      title: 'Conseils personnalisés',
      subtitle: `A la suite du bilan, nous vous conseillons les axes à travailler davantage afin de progresser. Des séances vous sont automatiquement sélectionnées afin de privilégier les domaines dans lesquels vous avez le plus de difficultés.`,
    },
  ])

  const marker = useRef()

  const slideSection = useRef()

  const [currentSection, setCurrentSection] = useState()
  const [tempCurrentSection, setTempCurrentSection] = useState()

  const [sliding, setSliding] = useState(false)

  const extraLargeDevice = useResponsiveState(1280, { from: true, to: false })

  const getSectionById = id => {
    for (let section of sections) {
      if (section.id === id) {
        return section
      }
    }

    return {
      title: '',
      subtitle: '',
    }
  }

  const triggerSlide = id => {
    if (id === currentSection || sliding) return

    setSliding(true)
    setTempCurrentSection(id)

    const sectionItems = document.querySelectorAll('.section-item')

    slideSection.current.style.transform = 'translate3d(0, 3rem, 0)'
    slideSection.current.style.opacity = 0

    const timer = setTimeout(() => {
      slideSection.current.style.transform = 'translate3d(0, 0, 0)'
      slideSection.current.style.opacity = 1
      setCurrentSection(id)
      setSliding(false)
    }, 500)

    sectionItems.forEach(sectionItem => {
      const updateMarker = () => {
        if (!marker) return
        marker.current.style.left = `${sectionItem.offsetLeft}px`
        marker.current.style.width = `${sectionItem.offsetWidth}px`
        marker.current.style.height = `${sectionItem.offsetHeight}px`
      }

      if (sectionItem.id.slice(-1) === id.toString()) {
        updateMarker()
      }
    })

    return timer
  }

  useEffect(() => {
    const timer = triggerSlide(0)

    return () => clearTimeout(timer)
  }, [extraLargeDevice])

  return (
    <div className="mt-32 px-6 lg:px-0">
      <div className="flex flex-col">
        <div className="lg:max-w-2xl self-center lg:py-16 lg:px-6 lg:h-96">
          <Title type="1" center={true}>
            Un ensemble de services à votre disposition
          </Title>
          <div className="mt-10">
            <Subtitle center={true}>
              Dans le but de vous accompagner au mieux afin de rester en pleine
              forme et plein de vitalité.
            </Subtitle>
          </div>
        </div>
        <div className="hidden min-h-4/5-screen xl:flex justify-between pl-24">
          <div className="2xl:w-1/2 w-3/5">
            <ul className="inline-flex items-center bg-blue-50 rounded-full px-4 py-3 relative">
              <div
                ref={marker}
                className="h-8 rounded-full bg-blue-900 absolute transition"
                style={{
                  transitionProperty: 'left, width, height',
                }}></div>
              {sections.map((section, i) => {
                return (
                  <li
                    key={i}
                    id={`section-${i}`}
                    className={`${
                      tempCurrentSection === i
                        ? 'text-light-100'
                        : 'text-blue-500'
                    } section-item
                    } py-1.25 px-6 rounded-full font-bold font-body uppercase cursor-pointer text-md transition z-10`}
                    onClick={() => triggerSlide(i)}
                    style={{ transitionProperty: 'color' }}>
                    {section.keyword}
                  </li>
                )
              })}
            </ul>
            <div className="w-full">
              <div
                ref={slideSection}
                className="transition duration-500"
                style={{
                  transform: 'translate3d(0, 100%, 0)',
                  transitionProperty: 'transform, opacity',
                }}>
                <div className="mt-36">
                  <Title>{getSectionById(currentSection).title}</Title>
                </div>
                <div className="mt-8">
                  <Subtitle>{getSectionById(currentSection).subtitle}</Subtitle>
                </div>
              </div>
            </div>
          </div>
          <div className="2xl:w-2/5 w-1/3 relative">
            <Image
              src="/our-solution.jpg"
              alt="notre solution"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="xl:hidden">
          {sections.map((section, i) => {
            return (
              <div
                key={i}
                className={`lg:flex justify-between items-center mt-16 lg:min-h-1/2-screen ${
                  i % 2 === 0 ? 'flex-row-reverse lg:pl-24' : 'lg:pr-24'
                }`}>
                <div className="xl:h-96 lg:h-auto h-96 lg:self-stretch lg:w-2/5 relative mt-16 xl:mt-16 lg:mt-0">
                  <Image
                    src="/our-solution.jpg"
                    alt="notre solution"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="lg:w-1/2">
                  <div className="mt-8 xl:mt-8 lg:mt-0">
                    <Title>{section.title}</Title>
                  </div>
                  <div className="mt-4">
                    <Subtitle>{section.subtitle}</Subtitle>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default OurSolution
