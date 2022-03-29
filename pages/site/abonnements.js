import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import SubscriptionCard from '@/components/pages/site/SubscriptionCard'
import Cta from '@/components/utils/Cta'
import Faq from '@/components/pages/site/Faq'
import { fetchAPI } from '@/lib/api'
import { useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import Link from 'next/link'
import orangeGreen from '@/public/decoration-icons/orange-green.svg'
import greenBlue from '@/public/decoration-icons/green-blue.svg'
import blueOrange from '@/public/decoration-icons/blue-orange.svg'
import yellowOrange from '@/public/decoration-icons/yellow-orange.svg'
import Image from 'next/image'
import SiteLayout from '@/components/layouts/SiteLayout'

export const getStaticProps = async () => {
  const subscriptions = await fetchAPI('/home-about')
  const home = await fetchAPI('/home-landing')

  return { props: { subscriptions, home }, revalidate: 10 }
}

const Subscription = ({ subscriptions, home }) => {
  const { otherPages, getPage } = useContext(LinksContext)

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
          <div className="z-10 w-full lg:order-2 lg:w-96">
            <SubscriptionCard
              title="Annuel"
              price={home.prices.data[0].attributes.price}
              suffix="/par an"
              description={home.prices.data[0].attributes.description}
              variant="blue"
              size="big"
              stamp={true}
              subPage={true}
              program={subscriptions.prices[1].price_points}
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
              program={subscriptions.prices[0].price_points}
            />
          </div>
          <div className="w-full self-stretch lg:order-3 lg:w-96 lg:py-8">
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-blue-50 py-32 px-6 lg:py-10">
              <div className="absolute top-10 -left-6 block">
                <Image src={orangeGreen} alt="orange-green" />
              </div>
              <div className="absolute top-4 -right-4 block">
                <Image src={blueOrange} alt="blue-orange" />
              </div>
              <div className="absolute bottom-4 -left-2 block scale-150 transform">
                <Image src={greenBlue} alt="green-blue" />
              </div>
              <div className="absolute -right-8 bottom-10 block">
                <Image src={yellowOrange} alt="yellow-orange" />
              </div>
              <h3 className="text-center font-head text-2xl font-bold">
                {subscriptions.code_reduc_title}
              </h3>
              <div className="mt-4">
                <Subtitle center={true} type="2">
                  {subscriptions.code_reduc_description}
                </Subtitle>
              </div>
              <div className="mt-6 lg:mt-8">
                <Link
                  href={getPage(otherPages, 'pageName', 'Invitation').path}
                  passHref
                >
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
          <div className="relative flex w-full flex-col overflow-hidden rounded-lg bg-blue-50 py-10 px-4 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:py-10">
            <div className="absolute -top-6 -left-6 block scale-75 transform">
              <Image src={orangeGreen} alt="orange-green" />
            </div>
            <div className="absolute -right-6 -top-6 block scale-75 transform lg:-top-4 lg:-right-4 lg:scale-100">
              <Image src={blueOrange} alt="blue-orange" />
            </div>
            <div className="absolute -right-2 -bottom-4 block transform lg:right-auto lg:left-2/3 lg:scale-150">
              <Image src={greenBlue} alt="green-blue" />
            </div>
            <div className="absolute -left-2 -bottom-16 block lg:hidden">
              <Image src={yellowOrange} alt="yellow-orange" />
            </div>
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
              {subscriptions.faqs?.data.map((item) => {
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

Subscription.Layout = SiteLayout

export default Subscription
