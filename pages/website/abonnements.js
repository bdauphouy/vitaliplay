import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import SubscriptionCard from '@/components/pages/website/SubscriptionCard'
import Cta from '@/components/utils/Cta'
import Faq from '@/components/pages/website/Faq'
import { fetchAPI } from '@/lib/api'
import { useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import Link from 'next/link'

export const getStaticProps = async () => {
  const subscriptions = await fetchAPI('/home-about')
  const home = await fetchAPI('/home-landing')

  return { props: { subscriptions, home }, revalidate: 10 }
}

const Subscription = ({ subscriptions, home }) => {
  const { getPathByPage } = useContext(LinksContext)

  return (
    <>
      <div className="mt-32 overflow-x-hidden px-6 md:px-24 lg:mt-36 lg:overflow-x-visible">
        <Title type="1" center={true}>
          {subscriptions.title}
        </Title>
        <div className="mt-4">
          <Subtitle center={true}>{subscriptions.description}</Subtitle>
        </div>
        <div className="mt-10 flex flex-col gap-6 lg:mt-16 lg:flex-row lg:justify-center lg:gap-0">
          <div className="w-full lg:order-2 lg:w-96">
            <SubscriptionCard
              title="Annuel"
              price={home.prices.data[0].attributes.price}
              suffix="/par an"
              description={home.prices.data[0].attributes.description}
              variant="blue"
              size="big"
              stamp={true}
              subPage={true}
              // program={subscriptions.prices[1].price_points}
            />
          </div>

          <div className="w-full lg:order-1 lg:w-96 lg:py-8">
            <SubscriptionCard
              title="Mensuel"
              price={home.prices.data[1].attributes.price}
              suffix="/par mois"
              description={home.prices.data[1].attributes.description}
              size="small"
              subPage={true}
              // program={subscriptions.prices[0].price_points}
            />
          </div>
          <div className="w-full self-stretch lg:order-3 lg:w-96 lg:py-8">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-blue-50 px-6 py-10">
              <h3 className="text-center font-head text-2xl font-bold">
                {subscriptions.code_reduc_title}
              </h3>
              <div className="mt-4">
                <Subtitle center={true} type="2">
                  {subscriptions.code_reduc_description}
                </Subtitle>
              </div>
              <div className="mt-6 lg:mt-8">
                <Link href={getPathByPage('Invitation')} passHref>
                  <a>
                    <Cta size="l" type="primary">
                      J’ai un code d’invitation
                    </Cta>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-screen-xl">
          <div className="flex w-full flex-col rounded-lg bg-blue-50 py-10 px-4 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:py-10">
            <div className="lg:w-1/2 xl:w-3/5">
              <h3
                style={{ fontSize: 20 }}
                className="font-head font-bold text-blue-900 lg:text-xl"
              >
                {subscriptions.offer_sub_title}
              </h3>
              <div className="mt-3">
                <Subtitle type="3">
                  {subscriptions.offer_sub_decription}
                </Subtitle>
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
              {subscriptions.faq?.map((item) => {
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
