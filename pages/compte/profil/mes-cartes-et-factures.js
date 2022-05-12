import Title from '@/components/utils/Title'
import Cta from '@/components/utils/Cta'
import AccountDecorationLayout from '@/components/layouts/AccountDecorationLayout'
import CreditCardInfo from '@/components/pages/account/CreditCardInfo'
import { useFormik } from 'formik'
import { useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import Link from 'next/link'
import { fetchAPIWithToken } from '@/lib/api'

export const getServerSideProps = async ({ req }) => {
  const savedCards = await fetchAPIWithToken(
    '/users/me/saved-cards',
    req.cookies.jwt,
    false
  )

  console.log(savedCards)

  return {
    props: {
      savedCards: savedCards.paymentMethods,
    },
  }
}

const Invoice = ({ id, period, title }) => {
  return (
    <div
      className={`flex justify-between ${
        id === '0' ? '' : 'border-t-1'
      } border-solid border-dark-100 p-4`}
    >
      <div className="flex flex-col gap-1">
        <span className="font-body text-xs font-bold text-dark-500">
          {period.join(' / ')}
        </span>
        <h3 className="font-body text-md font-bold text-dark-900 lg:text-lg">
          {title}
        </h3>
      </div>
      <Cta arrow="right" textColor="text-blue-900" type="link">
        Télécharger
      </Cta>
    </div>
  )
}

const ProfileMyCardsAndInvoices = ({ savedCards }) => {
  const formik = useFormik({
    initialValues: {
      defaultCard: '1',
    },
  })

  const { getPage, accountPages } = useContext(LinksContext)

  return (
    <div className="mt-20 min-h-[calc(100vh_-_165px)] py-10 px-6 md:px-24 lg:py-20">
      <Title type="1" center={true}>
        Mes cartes
      </Title>
      <div className="mx-auto  mt-12 flex max-w-4xl flex-col rounded-lg lg:mt-16">
        <div className="flex flex-col flex-wrap justify-between sm:flex-row sm:items-center">
          <h3 className="font-body text-sm font-bold text-dark-900">
            Informations de paiement
          </h3>
          <Link
            href={
              getPage(accountPages, 'pageName', 'Ajouter un moyen de paiement')
                .path
            }
            passHref
          >
            <a>
              <Cta type="link" size="s" arrow="right">
                Ajouter un moyen de paiement
              </Cta>
            </a>
          </Link>
        </div>
        <div className="mt-3 space-y-4 md:mt-2">
          {savedCards.map((savedCard) => {
            console.log(savedCard)
            return (
              <CreditCardInfo
                key={savedCard.id}
                id="1"
                name="defaultCard"
                cardType={savedCard.card.brand}
                last4={savedCard.card.last4}
                cardName={savedCard.customer}
                expMonth={savedCard.card.exp_month}
                expYear={savedCard.card.exp_year}
                checked={formik.values.defaultCard === '1'}
                onChange={formik.handleChange}
              />
            )
          })}
        </div>
      </div>
      <div className="mt-10 md:mt-20">
        <Title type="1" center={true}>
          Mes factures
        </Title>
        <div className="mx-auto mt-12 max-w-4xl rounded-lg border-1 border-solid border-dark-100 lg:mt-16">
          {/* <Invoice
            id="0"
            period={['17/09/2020', '16/09/2021']}
            title="Abonnement annuel"
          />
          <Invoice
            id="1"
            period={['17/09/2019', '16/09/2020']}
            title="Abonnement annuel"
          /> */}
        </div>
      </div>
    </div>
  )
}

ProfileMyCardsAndInvoices.Layout = AccountDecorationLayout

export default ProfileMyCardsAndInvoices
