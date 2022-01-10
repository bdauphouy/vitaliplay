import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Cta from '@/components/utils/Cta'

const Invoice = ({ id, period, title }) => {
  console.log(period)
  return (
    <div
      className={`flex justify-between ${
        id === '0' ? '' : 'border-t-1'
      } border-solid border-dark-100 p-4`}>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-dark-500 font-body">
          {period.join(' / ')}
        </span>
        <h3 className="font-body text-md lg:text-lg text-dark-900 font-bold">
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
    <div className="py-10 lg:py-20 mt-20 px-6 md:px-24 min-h-[calc(100vh_-_165px)]">
      <Title type="1" center={true}>
        Mes factures
      </Title>
      <div className="max-w-4xl mx-auto mt-12 lg:mt-16 border-solid border-1 border-dark-100 rounded-lg">
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

export default ProfileMyInvoices
