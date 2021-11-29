import CardSolution from '../components/CardSolution'
import Image from 'next/image'
import SubscriptionPreview from '../components/SubscriptionPreview'
import Cta from '../components/Cta'
import Title from '../components/Title'
import Subtitle from '../components/Subtitle'
import { fetchAPI } from '../lib/api'
import useResponsiveState from '../hooks/useResponsiveState'
import { getStrapiMedia } from '../lib/media'

export const getStaticProps = async () => {
  const home = await fetchAPI('/home-landing')

  return { props: { home } }
}

const Home = ({ home }) => {
  const toBinary = int => {
    if (int % 2 === 0) {
      return toBinary(int + 1)
    }

    return (int >>> 0).toString(2)
  }

  const isLargeScreen = useResponsiveState(1024, { from: true, to: false })

  return (
    <div className="mt-32 lg:mt-0">
      <div className="flex flex-col lg:flex-row lg:h-screen lg:justify-between lg:gap-20">
        <div className="px-6 flex flex-col justify-center md:px-24 lg:w-2/3 xl:w-1/2">
          <Title type="1">{home.moto}</Title>
          <div className="mt-4 md:mt-6">
            <Subtitle>{home.moto_description}</Subtitle>
          </div>
        </div>

        <div className="relative self-end mt-6 w-72 h-96 shadow-image-sm lg:self-stretch lg:mt-20 lg:shadow-image-lg lg:h-4/5 lg:w-2/5">
          <Image
            src={getStrapiMedia(home.main_image.formats.medium)}
            alt="homepage"
            layout="fill"
            placeholder="blur"
            blurDataURL={getStrapiMedia(home.main_image.formats.thumbnail)}
            objectFit="cover"
          />
        </div>
      </div>
      <div className="px-6 mt-24 md:px-24">
        <Title center={true}>
          Découvrez notre <span className="text-blue-900">solution</span>
        </Title>
        <div className="mt-4">
          <Subtitle center={true}>
            Conçu pour vous par des professionnels de santé
          </Subtitle>
        </div>
      </div>
      <div className="flex justify-center px-6 mt-10 md:px-24 lg:mt-20">
        <div className="grid grid-cols-1 gap-x-8 w-full lg:grid-cols-2 lg:w-auto gap-y-8 lg:gap-y-0">
          {home.solutions.map((solution, i) => {
            return (
              <div
                key={solution.id}
                className={`lg:max-w-lg ${
                  (i + 2) % 2 !== 0 ? 'lg:mt-16' : ''
                }`}>
                <CardSolution
                  icon={getStrapiMedia(solution.icon)}
                  title={solution.title}
                  description={solution.description}
                  variant={
                    isLargeScreen
                      ? toBinary(i + 3).slice(-2, -1) === '0' && 'blue'
                      : i % 2 === 0 && 'blue'
                  }
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className="mt-16 relative md:flex md:flex-row-reverse items-center justify-center lg:mt-36 lg:h-4/5-screen lg:justify-between lg:pl-24">
        <div className="w-full h-96 absolute bg-blue-50 bottom-16 -z-1 lg:bottom-0 lg:top-0 lg:h-5/6"></div>
        <div className="px-6 md:w-1/2 mb-8 md:pl-10 md:px-0 lg:pl-0 lg:pr-24 lg:mb-24">
          <Title>{home.video.tilte}</Title>
          <div className="mt-4">
            <Subtitle>{home.video.description}</Subtitle>
          </div>
        </div>
        <div className="relative self-end mt-10 w-80 h-112 lg:self-stretch lg:mt-0 lg:h-full lg:w-2/5">
          <Image
            src={getStrapiMedia(home.video.video.formats.medium)}
            alt="homepage"
            layout="fill"
            placeholder="blur"
            blurDataURL={getStrapiMedia(home.video.video.formats.thumbnail)}
            objectFit="cover"
          />
        </div>
      </div>
      <div className="px-6 mt-16 md:px-24 lg:mt-36">
        <Title center={true}>
          Ils nous font <span className="text-blue-900">confiance</span>
          <br />
          dans notre <span className="text-blue-900">aventure</span>
        </Title>
        <div className="grid mt-16 place-items-center grid-cols-2 xl:grid-cols-4 gap-9">
          {home.parteners.map((partner, i) => {
            return (
              <div key={i} className="w-36 h-20 sm:h-28 sm:w-56 relative">
                <Image
                  src={getStrapiMedia(partner)}
                  alt="cocacola"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )
          })}
          {home.parteners.map((partner, i) => {
            return (
              <div key={i} className="w-36 h-20 sm:h-28 sm:w-56 relative">
                <Image
                  src={getStrapiMedia(partner)}
                  alt="cocacola"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className="px-6 mt-16 md:px-24 lg:mt-36 overflow-x-hidden lg:overflow-x-visible">
        <Title center={true}>{home.subscription_title}</Title>
        <div className="mt-4">
          <Subtitle center={true}>{home.subscription_description}</Subtitle>
        </div>
        <div className=" mt-10 gap-4 flex flex-col lg:mt-16 lg:flex-row lg:gap-0 lg:justify-center">
          <div className="w-full lg:w-96 lg:order-2">
            <SubscriptionPreview
              title="Annuel"
              price={home.subscription[1].prices[0].price}
              suffix="/par an"
              description={home.subscription[1].prices[0].description}
              variant="blue"
              size="big"
              stamp={true}
            />
          </div>
          <div className="lg:py-8 w-full lg:w-96 lg:order-1">
            <SubscriptionPreview
              title="Mensuel"
              price={home.subscription[0].prices[0].price}
              suffix="/par mois"
              description={home.subscription[0].prices[0].description}
              size="small"
            />
          </div>
          <div className="lg:order-3 w-full lg:w-96 lg:py-8">
            <div className="flex flex-col justify-center items-center h-full bg-blue-50 px-6 py-10 rounded-lg">
              <h3 className="font-bold font-head text-xl text-center">
                Vous possédez déjà un code d’invitation ?
              </h3>
              <div className="mt-6 lg:mt-10">
                <Cta size="l" type="primary">
                  J’ai un code d’invitation
                </Cta>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
