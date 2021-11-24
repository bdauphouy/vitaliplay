import Title from '../components/Title'
import Subtitle from '../components/Subtitle'
import SubscriptionPreview from '../components/SubscriptionPreview'
import Cta from '../components/Cta'
import Faq from '../components/Faq'

const Subscription = () => {
  return (
    <>
      <div className="px-6 mt-32 md:px-24 lg:mt-36 overflow-x-hidden lg:overflow-x-visible">
        <Title type="1" center={true}>
          Nos abonnements
        </Title>
        <div className="mt-4">
          <Subtitle center={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida
            eget varius a diam faucibus nec sodales fermentum eget.
          </Subtitle>
        </div>
        <div className="mt-10 gap-4 flex flex-col lg:mt-16 lg:flex-row lg:gap-0 lg:justify-center">
          <div className="w-full lg:w-96 lg:order-2">
            <SubscriptionPreview
              title="Annuel"
              price="99"
              suffix="/par an"
              description="Avec l’abonnement annuel profitez de 1 mois offert et économisez 31% sur l’année"
              variant="blue"
              size="big"
              stamp={true}
              subPage={true}
              program={[
                "des bilans afin d'évaluer votre état de santé et de vous accompagner au mieux sur les futures séances",
                'des séances en streaming variées et adaptées à vos besoins: Yoga, Pilates, Boxe, Danse, Taïso, stretching ...',
                'des conférences débat en direct avec des professionnels de santé.',
                "des séances d'activité physique adaptées en direct.",
              ]}
            />
          </div>

          <div className="w-full lg:py-8 lg:w-96 lg:order-1">
            <SubscriptionPreview
              title="Mensuel"
              price="12"
              suffix="/par mois"
              description="Gravida eget varius a diam faucibus nec sodales fermentum eget."
              size="small"
              subPage={true}
              program={[
                "des bilans afin d'évaluer votre état de santé et de vous accompagner au mieux sur les futures séances",
                'des séances en streaming variées et adaptées à vos besoins: Yoga, Pilates, Boxe, Danse, Taïso, stretching ...',
                'des conférences débat en direct avec des professionnels de santé.',
                "des séances d'activité physique adaptées en direct.",
              ]}
            />
          </div>
          <div className="self-stretch lg:order-3 w-full lg:w-96 py-8">
            <div className="flex flex-col justify-center items-center w-full bg-blue-50 px-6 py-10 rounded-lg h-full">
              <h3 className="font-bold font-head text-xl text-center">
                Vous possédez déjà un code d’invitation ?
              </h3>
              <div className="mt-4">
                <Subtitle center={true}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Gravida eget varius a diam faucibus nec sodales fermentum
                  eget.
                </Subtitle>
              </div>
              <div className="mt-6 lg:mt-8">
                <Cta size="l" type="primary">
                  J’ai un code d’invitation
                </Cta>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:px-28 mt-4 lg:mt-16">
          <div className="flex flex-col lg:items-center lg:justify-between lg:flex-row w-full bg-blue-50 py-10 px-4 md:px-8 rounded-lg lg:py-16">
            <div className="lg:w-1/2 xl:w-3/5">
              <h3
                style={{ fontSize: 20 }}
                className="font-bold font-head text-blue-900 lg:text-xl">
                Offrir un abonnement annuel ?
              </h3>
              <div className="mt-4">
                <Subtitle>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Gravida eget varius a diam faucibus nec sodales fermentum eget
                  consectetur adipiscing elit. Gravida eget varius a diam
                  faucibus nec sodales fermentum eget.
                </Subtitle>
              </div>
            </div>
            <div className="mt-6 lg:mt-0">
              <Cta size="l" type="primary" arrow="right">
                Offrir un Abonnement
              </Cta>
            </div>
          </div>
          <div className="mt-4 lg:mt-20">
            <Title center={true} type="1">
              FAQ
            </Title>
            <div className="mt-12">
              <Faq
                question="Lorem ipsum dolor sit amet, consectetur adipiscing elit travida eget varius ?"
                answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit travida eget varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit travida eget varius."
              />
            </div>
            <Faq
              question="Lorem ipsum dolor sit amet, consectetur adipiscing elit travida eget varius ?"
              answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit travida eget varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit travida eget varius."
            />
            <Faq
              question="Lorem ipsum dolor sit amet, consectetur adipiscing elit travida eget varius ?"
              answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit travida eget varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit travida eget varius."
            />
            <Faq
              question="Lorem ipsum dolor sit amet, consectetur adipiscing elit travida eget varius ?"
              answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit travida eget varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit travida eget varius."
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Subscription
