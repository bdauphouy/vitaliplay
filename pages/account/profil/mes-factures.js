import Title from '@/components/utils/Title'
import Cta from '@/components/utils/Cta'
import AccountDecorationLayout from '@/components/layouts/AccountDecorationLayout'

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

const ProfileMyInvoices = () => {
  return (
    <div className="mt-20 min-h-[calc(100vh_-_165px)] py-10 px-6 md:px-24 lg:py-20">
      <Title type="1" center={true}>
        Mes factures
      </Title>
      <div className="mx-auto mt-12 max-w-4xl rounded-lg border-1 border-solid border-dark-100 lg:mt-16">
        <Invoice
          id="0"
          period={['17/09/2020', '16/09/2021']}
          title="Abonnement annuel"
        />
        <Invoice
          id="1"
          period={['17/09/2019', '16/09/2020']}
          title="Abonnement annuel"
        />
      </div>
    </div>
  )
}

ProfileMyInvoices.Layout = AccountDecorationLayout

export default ProfileMyInvoices
