import Title from '@/components/utils/Title'
import Cta from '@/components/utils/Cta'
import AccountDecorationLayout from '@/components/layouts/AccountDecorationLayout'
import CreditCardInfo from '@/components/pages/account/CreditCardInfo'
import { useFormik } from 'formik'
import { useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import Link from 'next/link'
import { fetchAPIWithToken } from '@/lib/api'
import Subtitle from '@/components/utils/Subtitle'
import moment from 'moment'

export const getServerSideProps = async ({ req }) => {
  const savedCards = await fetchAPIWithToken(
    '/users/me/saved-cards',
    req.cookies.jwt,
    false
  )

  const invoices = await fetchAPIWithToken(
    '/users/me/invoices',
    req.cookies.jwt,
    false
  )

  return {
    props: {
      savedCards: savedCards?.paymentMethods
        ? savedCards.paymentMethods
        : savedCards,
      invoices: invoices.data.invoices,
    },
  }
}

const Invoice = ({ id, period, title, downloadUrl, status }) => {
  return (
    <div
      className={`flex justify-between ${
        id === '0' ? '' : 'border-t-1'
      } items-center border-solid border-dark-100 p-4 first:border-t-0`}
    >
      <div className={`flex flex-col gap-1 ${status === 'paid' ? 'opacity-100' : 'opacity-40'}`}>
        <span className="font-body text-xs font-bold text-dark-500">
          {period.join(' / ')}
        </span>
        <h3 className="font-body text-md font-bold text-dark-900 lg:text-lg">
          {title}
        </h3>
      </div>
      {
        status === 'paid' ? <a href={downloadUrl} download>
          <Cta arrow="right" textColor="text-blue-900" type="link">
            Télécharger
          </Cta>
        </a> : <Cta textColor="text-blue-900" type="link">{ status === 'deleted' ? 'Annulé' : 'En cours de paiement' }</Cta>
      }
    </div>
  )
}

const ProfileMyCardsAndInvoices = ({ savedCards, invoices }) => {
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
        <div className="mt-3 space-y-4 md:mt-2">
          {savedCards.length > 0 ? (
            <>
              {savedCards.map((savedCard) => {
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
            </>
          ) : (
            <Subtitle center>Vous n'avez pas de carte enregistrée</Subtitle>
          )}
        </div>
      </div>
      <div className="mt-10 md:mt-20">
        <Title type="1" center={true}>
          Mes factures
        </Title>
        <div className="mx-auto mt-12 max-w-4xl rounded-lg border-1 border-solid border-dark-100 lg:mt-16">
          {invoices.map((invoice) => {
            return (
              <Invoice
                key={invoice.id}
                id="1"
                period={[
                  moment(invoice.created * 1000).format('DD/MM/YYYY'),
                  moment(
                    moment(invoice.created * 1000).add(1, invoice.recurring)
                  ).format('DD/MM/YYYY'),
                ]}
                title={`Abonnement ${
                  invoice.recurring === 'year' ? 'annuel' : 'mensuel'
                }`}
                downloadUrl={invoice.downloadUrl}
                status={invoice.status}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

ProfileMyCardsAndInvoices.Layout = AccountDecorationLayout

export default ProfileMyCardsAndInvoices
