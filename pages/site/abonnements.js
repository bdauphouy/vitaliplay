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
  const subscriptions = await fetchAPI('/content/subscriptions', [
    'subscriptions',
    'faq',
  ])

  return { props: { subscriptions }, revalidate: 10 }
}

const Subscription = ({ subscriptions }) => {
  const { otherPages, getPage } = useContext(LinksContext)

  return (
    <>
      <div className="mt-32 overflow-x-hidden px-6 md:px-24 lg:mt-36 lg:overflow-x-visible">
        <Title type="1" center={true}>
          {subscriptions.subscriptionsTitle}
        </Title>
        <div className="mt-4">
          <Subtitle center={true}>
            {subscriptions.subscriptionsDescription}
          </Subtitle>
        </div>
        <div className="mt-10 flex flex-col gap-6 lg:mt-16 lg:flex-row lg:justify-center lg:gap-0">
          <div className="z-10 w-full lg:order-2 lg:w-96">
            <SubscriptionCard
              title={subscriptions.subscriptions?.[1].subscriptionType}
              price={subscriptions.subscriptions?.[1].subscriptionPrice}
              suffix="/par an"
              description={
                subscriptions.subscriptions?.[1].subscriptionDescription
              }
              variant="blue"
              stamp={
                subscriptions.subscriptions?.[1]?.subscriptionReduction
                  ? true
                  : false
              }
              stampValue={
                subscriptions.subscriptions?.[1].subscriptionReduction
              }
              subPage={true}
              program={subscriptions.subscriptions?.[1].subscriptionBenefits}
            />
          </div>

          <div className="w-full lg:order-1 lg:w-96 lg:py-8">
            <SubscriptionCard
              title={subscriptions.subscriptions?.[0].subscriptionType}
              price={subscriptions.subscriptions?.[0].subscriptionPrice}
              suffix="/par mois"
              description={
                subscriptions.subscriptions?.[0].subscriptionDescription
              }
              stamp={
                subscriptions.subscriptions?.[0]?.subscriptionReduction
                  ? true
                  : false
              }
              stampValue={
                subscriptions.subscriptions?.[0]?.subscriptionReduction
              }
              subPage={true}
              program={subscriptions.subscriptions?.[0].subscriptionBenefits}
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
                Vous possédez déjà d'un VitaliPass?
              </h3>
              <div className="mt-4">
                <Subtitle center={true} type="2">
                  Si un VitaliPass vous a été offert, profitez dès aujourd’hui
                  d’un accès gratuit à Vitaliplay
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
                {subscriptions.giftSubscriptionTitle}
              </h3>
              <div className="mt-3">
                <Subtitle type="3">
                  {subscriptions.giftSubscriptionDescription}
                </Subtitle>
              </div>
            </div>
            <div className="mt-6 lg:mt-0">
              <Cta size="l" type="primary" arrow="right">
                {subscriptions.giftSubscriptionButtonText}
              </Cta>
            </div>
          </div>
          <div className="mt-10 lg:mt-20">
            <Title center={true} type="1">
              FAQ
            </Title>
            <div className="mt-12">
              {subscriptions.faq
                .sort((i1, i2) => (i1.question < i2.question ? -1 : 1))
                .map((item) => {
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
