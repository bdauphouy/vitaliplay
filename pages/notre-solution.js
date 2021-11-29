import Image from 'next/image'
import Title from '../components/Title'
import Subtitle from '../components/Subtitle'
import { useEffect, useState, useRef } from 'react'
import useResponsiveState from '../hooks/useResponsiveState'
import { fetchAPI } from '../lib/api'

export const getStaticProps = async () => {
  const ourSolution = await fetchAPI('/home-solution')

  return { props: { ourSolution } }
}

const OurSolution = ({ ourSolution }) => {
  const [sections] = useState(
    ourSolution.solutions.map((solution, i) => {
      return {
        id: i,
        keyword: solution.name,
        title: solution.title,
        subtitle: solution.description,
        image: i % 2 === 0 ? '/our-solution.jpg' : '/cat.jpg',
      }
    }),
  )

  const imageRef = useRef()

  const marker = useRef()

  const slideSection = useRef()

  const [currentSection, setCurrentSection] = useState()
  const [tempCurrentSection, setTempCurrentSection] = useState()

  const [sliding, setSliding] = useState(false)

  const isExtraLargeDevice = useResponsiveState(1280, { from: true, to: false })

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
    if (
      isExtraLargeDevice === undefined ||
      !isExtraLargeDevice ||
      sliding ||
      id === tempCurrentSection
    )
      return

    console.log(imageRef.current)

    setSliding(true)

    setTempCurrentSection(id)

    slideSection.current.style.transform = 'translate3d(0, 3rem, 0)'
    slideSection.current.style.opacity = 0
    imageRef.current.style.opacity = 0

    const timer = setTimeout(() => {
      slideSection.current.style.transform = 'translate3d(0, 0, 0)'
      slideSection.current.style.opacity = 1
      imageRef.current.style.opacity = 1
      setCurrentSection(id)
      setSliding(false)
    }, 300)

    const sectionItems = document.querySelectorAll('.section-item')

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
  }, [isExtraLargeDevice])

  return (
    <div className="mt-32 px-6 lg:px-0">
      <div className="flex flex-col">
        <div className="lg:max-w-2xl self-center lg:py-16 lg:px-6 lg:h-96">
          <Title type="1" center={true}>
            {ourSolution.title}
          </Title>
          <div className="mt-10">
            <Subtitle center={true}>{ourSolution.description}</Subtitle>
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
                className="transition duration-300"
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
          <div
            className="2xl:w-2/5 w-1/3 relative opacity-0 transition duration-300"
            ref={imageRef}
            style={{ transitionProperty: 'opacity' }}>
            <Image
              src={
                getSectionById(currentSection).image
                  ? getSectionById(currentSection).image
                  : '/our-solution.jpg'
              }
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
                    src={section.image}
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
