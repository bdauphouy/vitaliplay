import SolutionCard from '@/components/pages/site/SolutionCard'
import Image from 'next/image'
import SubscriptionCard from '@/components/pages/site/SubscriptionCard'
import Cta from '@/components/utils/Cta'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import { fetchAPI } from '@/lib/api'
import { getStrapiMedia } from '@/lib/media'
import useMediaQuery from '@mui/material/useMediaQuery'
import Link from 'next/link'
import { useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import { useEffect } from 'react'
import orangeGreen from '@/public/decoration-icons/orange-green.svg'
import greenBlue from '@/public/decoration-icons/green-blue.svg'
import blueOrange from '@/public/decoration-icons/blue-orange.svg'
import yellowOrange from '@/public/decoration-icons/yellow-orange.svg'
import SiteLayout from '@/components/layouts/SiteLayout'

export const getStaticProps = async () => {
  const home = await fetchAPI('/content/home', [
    'image',
    'partners',
    'solutionBoxes',
    'video',
  ])

  const subscriptions = await fetchAPI('/content/subscriptions', [
    'subscriptions',
  ])

  return {
    props: { home, subscriptions: subscriptions.subscriptions },
    revalidate: 10,
  }
}

const Home = ({ home, subscriptions }) => {
  const toBinary = (int) => {
    if (int % 2 === 0) {
      return toBinary(int + 1)
    }

    return int.toString(2)
  }

  useEffect(() => {
    window.localStorage.removeItem('vitaliplay.checkout.activeStep')
    window.localStorage.removeItem('vitaliplay.checkout.subscription')
  }, [])

  const { otherPages, getPage } = useContext(LinksContext)

  const isLargeScreen = useMediaQuery('(min-width: 1024px)')

  return (
    <div className="mt-32 lg:mt-0">
      <div className="mx-auto flex max-w-screen-3xl flex-col md:gap-20 lg:h-screen lg:flex-row lg:justify-between">
        <div className="flex items-center justify-center px-6 md:px-24 lg:w-2/3 xl:w-[55%] 2xl:max-w-3xl">
          <div className="relative">
            <Title type="1">{home.sloganTitle}</Title>
            <div className="mt-4 md:mt-6">
              <Subtitle>{home.sloganDescription}</Subtitle>
            </div>
            <div className="absolute -top-32 -left-8 hidden lg:block">
              <Image src={orangeGreen} alt="orange-green" />
            </div>
            <div className="absolute -bottom-20 right-20 hidden scale-50 transform lg:block 2xl:right-0">
              <Image src={blueOrange} alt="blue-orange" />
            </div>
            <div className="absolute -bottom-40 -left-10 hidden lg:block">
              <Image src={greenBlue} alt="green-blue" />
            </div>
            <div className="absolute right-20 -top-28 hidden lg:block 2xl:right-0">
              <Image src={yellowOrange} alt="yellow-orange" />
            </div>
          </div>
        </div>

        <div className="relative mt-6 h-96 max-h-[1080px] w-72 self-end shadow-image-sm md:w-full lg:mt-20 lg:h-4/5 lg:w-2/5 lg:self-stretch lg:shadow-image-lg">
          <Image
            src={getStrapiMedia(home.image?.data.attributes)}
            alt="homepage"
            layout="fill"
            placeholder="blur"
            blurDataURL={getStrapiMedia(
              home.image?.data.attributes.formats.thumbnail
            )}
            objectFit="cover"
          />
        </div>
      </div>

      <div className="mt-24 px-6 md:px-24">
        <Title center={true}>{home.solutionTitle}</Title>
        <div className="mt-4">
          <Subtitle center={true}>{home.solutionDescription}</Subtitle>
        </div>
      </div>

      <div className="mt-10 flex justify-center px-6 md:px-24 lg:mt-20">
        <div className="relative grid w-full grid-cols-1 gap-x-8 gap-y-8 lg:w-auto lg:grid-cols-2 lg:gap-y-0">
          <div className="absolute -left-32 -top-20 hidden lg:block">
            <Image src={orangeGreen} alt="orange-green" />
          </div>
          <div className="absolute -right-20  top-60 hidden scale-50 transform lg:block 2xl:-right-32">
            <Image src={blueOrange} alt="blue-orange" />
          </div>
          <div className="absolute -bottom-10 -left-20 hidden lg:block">
            <Image src={greenBlue} alt="green-blue" />
          </div>
          <div className="absolute right-10 bottom-10 hidden lg:block 2xl:right-36">
            <Image src={yellowOrange} alt="yellow-orange" />
          </div>
          {home.solutionBoxes?.map((solution, i) => {
            return (
              <div
                key={solution.id}
                className={`lg:max-w-lg ${(i + 2) % 2 !== 0 ? 'lg:mt-16' : ''}`}
              >
                <SolutionCard
                  sectionId={i + 1}
                  icon={getStrapiMedia(
                    solution?.solutionBoxIcon.data.attributes
                  )}
                  title={solution.solutionBoxTitle}
                  description={solution.solutionBoxDescription}
                  variant={
                    isLargeScreen
                      ? toBinary(i + 3).slice(-2, -1) !== '0' && 'blue'
                      : i % 2 !== 0 && 'blue'
                  }
                />
              </div>
            )
          })}
        </div>
      </div>

      <div className="relative mt-16 items-center justify-center self-stretch overflow-hidden md:flex md:flex-row-reverse lg:mt-36 lg:h-4/5-screen lg:justify-between lg:pl-24">
        <div className="absolute bottom-16 -z-1 h-96 w-full bg-blue-50 lg:bottom-0 lg:top-0 lg:h-5/6"></div>
        <div className="mb-8 px-6 md:w-1/2 md:px-0 md:pl-10 lg:mb-24 lg:pl-0 lg:pr-24">
          <Title>{home.videoTitle}</Title>
          <div className="mt-4">
            <Subtitle>{home.videoDescription}</Subtitle>
          </div>
        </div>
        <div className="relative mt-10 h-112 w-80 self-end lg:mt-0 lg:h-full lg:w-2/5 lg:self-stretch">
          <video controls className="h-full object-cover">
            <source src={getStrapiMedia(home.video?.data.attributes)}></source>
          </video>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-screen-3xl px-6 md:px-24 lg:mt-36">
        <Title center={true} html={false}>
          Ils nous font <strong className="type-2">confiance</strong>
          <br />
          dans notre <strong className="type-2">aventure</strong>
        </Title>
        <div className="mt-16 grid grid-cols-2 place-items-center gap-9 xl:grid-cols-4">
          {home.partners?.map((partner, i) => {
            return (
              <div key={i} className="relative h-20 w-36 sm:h-28 sm:w-56">
                <Image
                  src={getStrapiMedia(partner.partnerImage.data.attributes)}
                  alt={partner.partnerImage.data.attributes.alternativeText}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-16 overflow-x-hidden px-6 md:px-24 lg:mt-36 lg:overflow-x-visible">
        <Title center={true}>{home.subscriptionsTitle}</Title>
        <div className="mt-4">
          <Subtitle center={true}>{home.subscriptionsDescription}</Subtitle>
        </div>
        <div className="mx-auto mt-10 flex max-w-screen-3xl flex-col gap-4 lg:mt-16 lg:flex-row lg:justify-center lg:gap-0">
          <div className="absolute left-9 -top-60 hidden lg:block">
            <Image src={orangeGreen} alt="orange-green" />
          </div>
          <div className="absolute right-8 -top-20 hidden scale-50 transform lg:block">
            <Image src={blueOrange} alt="blue-orange" />
          </div>
          <div className="z-10 w-full lg:order-2 lg:w-96">
            <SubscriptionCard
              title={subscriptions?.[1].subscriptionType}
              price={subscriptions?.[1].subscriptionPrice}
              suffix="/par an"
              description={subscriptions?.[1].subscriptionDescription}
              variant="blue"
              stamp={subscriptions?.[1]?.subscriptionReduction ? true : false}
              stampValue={subscriptions?.[1].subscriptionReduction}
            />
          </div>
          <div className="w-full lg:order-1 lg:w-96 lg:py-8">
            <SubscriptionCard
              title={subscriptions?.[0].subscriptionType}
              price={subscriptions?.[0].subscriptionPrice}
              suffix="/par mois"
              description={subscriptions?.[0].subscriptionDescription}
              stamp={subscriptions?.[0]?.subscriptionReduction ? true : false}
              stampValue={subscriptions?.[0]?.subscriptionReduction}
            />
          </div>
          <div className="lg:order-3 lg:w-96 lg:py-8">
            <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-lg bg-blue-50 px-6 py-10">
              <div className="absolute -left-4 -top-4 block scale-75 transform">
                <Image src={orangeGreen} alt="orange-green" />
              </div>
              <div className="absolute -right-4 -bottom-8 block">
                <Image src={blueOrange} alt="blue-orange" />
              </div>
              <div className="absolute -bottom-4 -left-2 block scale-125 transform">
                <Image src={greenBlue} alt="green-blue" />
              </div>
              <h3 className="text-center font-head text-xl font-bold">
                Vous possédez déjà un code d’invitation ?
              </h3>
              <div className="mt-6 lg:mt-10">
                <Link
                  href={getPage(otherPages, 'pageName', 'Invitation').path}
                  passHref
                >
                  <a>
                    <Cta size="l" type="primary">
                      J'ai un VitaliPass
                    </Cta>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Home.Layout = SiteLayout

export default Home
