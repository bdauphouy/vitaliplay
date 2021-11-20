import CardSolution from '../components/CardSolution'
import Image from 'next/image'
import SubscriptionPreview from '../components/SubscriptionPreview'
import Cta from '../components/Cta'

const Home = () => {
  return (
    <div className="mt-32 lg:mt-0">
      <div className="flex flex-col lg:flex-row lg:h-screen lg:justify-between lg:gap-20">
        <div className="px-6 md:px-24 lg:w-2/3 xl:w-1/2 flex flex-col justify-center">
          <h2 className="font-bold lg:font-extrabold font-head text-3xl md:text-5xl">
            Votre <span className="text-blue-900">bonne santé</span> de demain
            commence dès <span className="text-blue-900">aujourd'hui</span>
          </h2>
          <p className="subtitle mt-4 md:mt-6">
            Vitaliplay est une plateforme numérique de santé et d'activité
            physique dédiée aux plus de 55 ans
          </p>
        </div>

        <div className="relative self-end lg:self-stretch mt-6 lg:mt-20 drop-shadow-image-sm lg:drop-shadow-image-lg w-72 h-96 lg:h-4/5 lg:w-2/5">
          <Image
            src="/homepage.jpg"
            alt="homepage"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="px-6 md:px-24 mt-24">
        <h2 className="font-bold font-head text-2xl text-center md:text-4xl">
          Découvrez notre <span className="text-blue-900">solution</span>
        </h2>
        <p className="subtitle mt-4 text-center">
          Conçu pour vous par des professionnels de santé
        </p>
      </div>
      <div className="flex justify-center px-6 md:px-24 mt-10 lg:mt-20">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 w-full lg:w-auto">
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
      <div className="mt-16 relative lg:mt-36 lg:h-4/5-screen md:flex md:flex-row-reverse items-center justify-center lg:justify-between lg:pl-24">
        <div className="w-full h-96 absolute bg-blue-50 bottom-16 -z-1 lg:bottom-0 lg:top-0 lg:h-5/6"></div>
        <div className="px-6 md:pl-10 md:px-0 lg:pl-0 lg:pr-24 md:w-1/2 mb-8 lg:mb-24">
          <h2 className="font-bold font-head text-2xl md:text-4xl">
            Gravida eget varius a diam faucibus nec sodales
          </h2>
          <p className="subtitle mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida
            eget varius a diam faucibus nec sodales fermentum eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Gravida eget varius a
            diam faucibus nec sodales fermentum eget.
          </p>
        </div>
        <div className="relative self-end lg:self-stretch mt-10 lg:mt-0 w-80 h-112 lg:h-full lg:w-2/5">
          <Image
            src="/homepage.jpg"
            alt="homepage"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="px-6 md:px-24 mt-16 lg:mt-36">
        <h2 className="font-bold font-head text-2xl text-center md:text-4xl">
          Ils nous font <span className="text-blue-900">confiance</span>
          <br />
          dans notre <span className="text-blue-900">aventure</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 mt-16 place-items-center">
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
      <div className="px-6 md:px-24 pt-16 lg:pt-36">
        <h2 className="font-bold font-head text-2xl text-center md:text-4xl">
          Découvrez nos abonnements
        </h2>
        <p className="subtitle mt-4 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida eget
          varius a diam faucibus nec sodales fermentum eget.
        </p>
        <div className="mt-10 lg:mt-16 flex flex-col lg:flex-row gap-4 lg:gap-0 items-center lg:justify-center">
          <div className="lg:w-96 lg:order-2 w-full">
            <SubscriptionPreview
              title="Annuel"
              price="99"
              suffix="/par an"
              description="Avec l’abonnement annuel profitez de 1 mois offert et économisez 31% sur l’année"
              variant="blue"
              responsive="big"
              stamp={true}
            />
          </div>
          <div className="lg:w-96 lg:order-1 w-full">
            <SubscriptionPreview
              title="Mensuel"
              price="12"
              suffix="/par mois"
              description="Gravida eget varius a diam faucibus nec sodales fermentum eget."
              responsive="small"
            />
          </div>
          <div className="bg-blue-50 py-20 px-6 lg:py-16 rounded-lg lg:w-96 lg:order-3 flex flex-col justify-center items-center w-full">
            <h3 className="font-bold font-head text-xl text-center">
              Vous possédez déjà un code d’invitation ?
            </h3>
            <div className="mt-6 lg:mt-8">
              <Cta size="l" type="primary">
                J’ai un code d’invitation
              </Cta>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
