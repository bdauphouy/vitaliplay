import Image from 'next/image'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import { useEffect, useState, useRef } from 'react'
import { fetchAPI } from '@/lib/api'
import { getStrapiMedia } from '@/lib/media'
import useMediaQuery from '@mui/material/useMediaQuery'
import SiteLayout from '@/components/layouts/SiteLayout'

export const getStaticProps = async () => {
  const ourSolution = await fetchAPI('/content/our-solution', ['solutions'])

  return { props: { ourSolution }, revalidate: 10 }
}

const OurSolution = ({ ourSolution }) => {
  const [sections] = useState(
    ourSolution.solutions.map((solution, i) => {
      return {
        id: i,
        keyword: solution.solutionTab,
        title: solution.solutionTitle,
        subtitle: solution.solutionDescription,
        image: solution.solutionImage.data.attributes,
      }
    })
  )

  const imageRef = useRef()

  const marker = useRef()

  const slideSection = useRef()

  const [currentSection, setCurrentSection] = useState()
  const [tempCurrentSection, setTempCurrentSection] = useState()

  const [sliding, setSliding] = useState(false)

  const isExtraLargeScreen = useMediaQuery('(min-width: 1280px)')

  const getSectionById = (id) => {
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

  const triggerSlide = (id) => {
    if (!isExtraLargeScreen || sliding || id === tempCurrentSection) return

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

    sectionItems.forEach((sectionItem) => {
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
  }, [isExtraLargeScreen])

  return (
    <div className="mt-32 px-6 lg:px-0">
      <div className="mx-auto flex max-w-screen-3xl flex-col">
        <div className="self-center lg:h-96 lg:max-w-2xl lg:py-16 lg:px-6">
          <Title type="1" center={true}>
            {ourSolution.ourSolutionTitle}
          </Title>
          <div className="mt-10">
            <Subtitle center={true}>
              {ourSolution.ourSolutionDescription}
            </Subtitle>
          </div>
        </div>
        <div className="hidden min-h-4/5-screen justify-between pl-24 xl:flex">
          <div className="w-3/5 2xl:w-1/2">
            <ul className="relative inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-3">
              <div
                ref={marker}
                className="absolute h-8 rounded-full bg-blue-900 transition"
                style={{
                  transitionProperty: 'left, width, height',
                }}
              ></div>
              {sections?.map((section, i) => {
                return (
                  <li
                    key={i}
                    id={`section-${i}`}
                    className={`${
                      tempCurrentSection === i
                        ? 'text-light-100'
                        : 'text-blue-500 hover:bg-blue-100'
                    } section-item z-10 cursor-pointer rounded-full py-1.25 px-5 font-body text-md font-bold uppercase transition-[background-color,color] duration-300`}
                    onClick={() => triggerSlide(i)}
                  >
                    {section.keyword}
                  </li>
                )
              })}
            </ul>
            <div className="lg:max-w-xl">
              <div
                ref={slideSection}
                className="transition duration-300"
                style={{
                  transform: 'translate3d(0, 100%, 0)',
                  transitionProperty: 'transform, opacity',
                }}
              >
                <div className="mt-36">
                  <Title>{getSectionById(currentSection).title}</Title>
                </div>
                <div className="mt-8">
                  <Subtitle type="2">
                    {getSectionById(currentSection).subtitle}
                  </Subtitle>
                </div>
              </div>
            </div>
          </div>
          <div
            className="relative w-2/5 opacity-0 transition duration-300 2xl:w-1/2"
            ref={imageRef}
            style={{ transitionProperty: 'opacity' }}
          >
            <Image
              src={getStrapiMedia(getSectionById(currentSection).image)}
              alt="notre solution"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="xl:hidden">
          {sections?.map((section, i) => {
            return (
              <div
                key={i}
                className={`mt-16 items-center justify-between lg:flex lg:min-h-1/2-screen ${
                  i % 2 === 0 ? 'flex-row-reverse lg:pl-24' : 'lg:pr-24'
                }`}
              >
                <div className="relative mt-16 h-48 lg:mt-0 lg:h-auto lg:w-2/5 lg:self-stretch xl:mt-16 xl:h-96">
                  <Image
                    src={getStrapiMedia(section.image)}
                    alt="notre solution"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="lg:w-1/2">
                  <div className="mt-8 lg:mt-0 xl:mt-8">
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

OurSolution.Layout = SiteLayout

export default OurSolution
