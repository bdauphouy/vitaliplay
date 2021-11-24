import CardSolution from '../components/CardSolution'
import Image from 'next/image'
import SubscriptionPreview from '../components/SubscriptionPreview'
import Cta from '../components/Cta'
import Title from '../components/Title'
import Subtitle from '../components/Subtitle'
import homepage from '../public/homepage.jpg'

const Home = () => {
  return (
    <div className="mt-32 lg:mt-0">
      <div className="flex flex-col lg:flex-row lg:h-screen lg:justify-between lg:gap-20">
        <div className="px-6 flex flex-col justify-center md:px-24 lg:w-2/3 xl:w-1/2">
          <Title type="1">
            Votre <span className="text-blue-900">bonne santé</span> de demain
            commence dès <span className="text-blue-900">aujourd'hui</span>
          </Title>
          <div className="mt-4 md:mt-6">
            <Subtitle>
              Vitaliplay est une plateforme numérique de santé et d'activité
              physique dédiée aux plus de 55 ans
            </Subtitle>
          </div>
        </div>

        <div className="relative self-end mt-6 w-72 h-96 shadow-image-sm lg:self-stretch lg:mt-20 lg:shadow-image-lg lg:h-4/5 lg:w-2/5">
          <Image
            src={homepage}
            alt="homepage"
            layout="fill"
            placeholder="blur"
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
        <div className="grid grid-cols-1 gap-4 w-full lg:grid-cols-2 lg:w-auto">
          <div className="lg:max-w-lg">
            <CardSolution
              icon="/card-icon.svg"
              title="Bilan de santé personnalisé"
              description="Afin d’évaluer votre état de santé et de vous accompagner au mieux sur les futures séances"
              variant="blue"
            />
          </div>
          <div className="lg:mt-16 lg:max-w-lg">
            <CardSolution
              icon="/card-icon.svg"
              title="Des séances variées "
              description="En streaming et adaptées à vos besoins et capacités : Yoga, Pilates, Boxe, Danse, Taïso, stretching…"
            />
          </div>
          <div className="lg:order-1 lg:max-w-lg">
            <CardSolution
              icon="/card-icon.svg"
              title="Séances en direct"
              description="Une activités physique hebdomadaires et adaptées pour vous"
              variant="blue"
            />
          </div>
          <div className="lg:max-w-lg">
            <CardSolution
              icon="/card-icon.svg"
              title="Conseils de professionels de santé"
              description="Sous forme de conférences débat en direct"
            />
          </div>
          <div className="lg:mt-16 lg:max-w-lg">
            <CardSolution
              icon="/card-icon.svg"
              title="Conseils personnalisés"
              description="A la suite du bilan, nous vous conseillons les séances à privilégier"
              variant="blue"
            />
          </div>
        </div>
      </div>
      <div className="mt-16 relative md:flex md:flex-row-reverse items-center justify-center lg:mt-36 lg:h-4/5-screen lg:justify-between lg:pl-24">
        <div className="w-full h-96 absolute bg-blue-50 bottom-16 -z-1 lg:bottom-0 lg:top-0 lg:h-5/6"></div>
        <div className="px-6 md:w-1/2 mb-8 md:pl-10 md:px-0 lg:pl-0 lg:pr-24 lg:mb-24">
          <Title>Gravida eget varius a diam faucibus nec sodales</Title>
          <div className="mt-4">
            <Subtitle>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida
              eget varius a diam faucibus nec sodales fermentum eget. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Gravida eget
              varius a diam faucibus nec sodales fermentum eget.
            </Subtitle>
          </div>
        </div>
        <div className="relative self-end mt-10 w-80 h-112 lg:self-stretch lg:mt-0 lg:h-full lg:w-2/5">
          <Image
            src={homepage}
            alt="homepage"
            layout="fill"
            placeholder="blur"
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
        <div className="grid mt-16 place-items-center grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          <div className="w-56 h-28 relative">
            <Image src="/cocacola.svg" alt="cocacola" layout="fill" />
          </div>
          <div className="w-72 h-36 relative">
            <Image src="/disneyland.svg" alt="disneyland" layout="fill" />
          </div>
          <div className="w-60 h-32 relative">
            <Image src="/ubisoft.svg" alt="ubisoft" layout="fill" />
          </div>
          <div className="w-72 h-36 relative">
            <Image src="/disneyland.svg" alt="disneyland" layout="fill" />
          </div>
          <div className="w-72 h-36 relative">
            <Image src="/disneyland.svg" alt="disneyland" layout="fill" />
          </div>
          <div className="w-60 h-32 relative">
            <Image src="/ubisoft.svg" alt="ubisoft" layout="fill" />
          </div>
          <div className="w-56 h-28 relative">
            <Image src="/cocacola.svg" alt="cocacola" layout="fill" />
          </div>
          <div className="w-72 h-36 relative">
            <Image src="/disneyland.svg" alt="disneyland" layout="fill" />
          </div>
        </div>
      </div>
      <div className="px-6 mt-16 md:px-24 lg:mt-36 overflow-x-hidden lg:overflow-x-visible">
        <Title center={true}>Découvrez nos abonnements</Title>
        <div className="mt-4">
          <Subtitle center={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida
            eget varius a diam faucibus nec sodales fermentum eget.
          </Subtitle>
        </div>
        <div className=" mt-10 gap-4 flex flex-col lg:mt-16 lg:flex-row lg:gap-0 lg:justify-center">
          <div className="w-full lg:w-96 lg:order-2">
            <SubscriptionPreview
              title="Annuel"
              price="99"
              suffix="/par an"
              description="Avec l’abonnement annuel profitez de 1 mois offert et économisez 31% sur l’année"
              variant="blue"
              size="big"
              stamp={true}
            />
          </div>
          <div className="lg:py-8 w-full lg:w-96 lg:order-1">
            <SubscriptionPreview
              title="Mensuel"
              price="12"
              suffix="/par mois"
              description="Gravida eget varius a diam faucibus nec sodales fermentum eget."
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
