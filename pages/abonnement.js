import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import SubscriptionCard from '@/components/pages/website/SubscriptionCard'
import Cta from '@/components/utils/Cta'
import Faq from '@/components/pages/website/Faq'
import { fetchAPI } from '@/lib/api'

export const getStaticProps = async () => {
  const subscriptions = await fetchAPI('/home-about')

  return { props: { subscriptions }, revalidate: 10 }
}

const Subscription = ({ subscriptions }) => {
  return (
    <>
      <div className="px-6 mt-32 md:px-24 lg:mt-36 overflow-x-hidden lg:overflow-x-visible">
        <Title type="1" center={true}>
          {subscriptions.title}
        </Title>
        <div className="mt-4">
          <Subtitle center={true}>{subscriptions.description}</Subtitle>
        </div>
        <div className="mt-10 gap-4 flex flex-col lg:mt-16 lg:flex-row lg:gap-0 lg:justify-center">
          <div className="w-full lg:w-96 lg:order-2">
            <SubscriptionCard
              title="Annuel"
              price={subscriptions.prices[1].price.prices[0].price}
              suffix="/par an"
              description={subscriptions.prices[1].price.prices[0].description}
              variant="blue"
              size="big"
              stamp={true}
              subPage={true}
              program={subscriptions.prices[1].price_points}
            />
          </div>

          <div className="w-full lg:py-8 lg:w-96 lg:order-1">
            <SubscriptionCard
              title="Mensuel"
              price={subscriptions.prices[0].price.prices[0].price}
              suffix="/par mois"
              description={subscriptions.prices[0].price.prices[0].description}
              size="small"
              subPage={true}
              program={subscriptions.prices[0].price_points}
            />
          </div>
          <div className="self-stretch lg:order-3 w-full lg:w-96 py-8">
            <div className="flex flex-col justify-center items-center w-full bg-blue-50 px-6 py-10 rounded-lg h-full">
              <h3 className="font-bold font-head text-xl text-center">
                {subscriptions.code_reduc_title}
              </h3>
              <div className="mt-4">
                <Subtitle center={true}>
                  {subscriptions.code_reduc_description}
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
                {subscriptions.offer_sub_title}
              </h3>
              <div className="mt-4">
                <Subtitle>{subscriptions.offer_sub_decription}</Subtitle>
              </div>
            </div>
            <div className="mt-6 lg:mt-0">
              <Cta size="l" type="primary" arrow="right">
                Offrir un Abonnement
              </Cta>
            </div>
          </div>
          <div className="mt-10 lg:mt-20">
            <Title center={true} type="1">
              FAQ
            </Title>
            <div className="mt-12">
              {subscriptions.faq.map(item => {
                return (
                  <Faq
                    key={item.id}
                    question={item.question}
                    answer={item.answer}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Subscription
