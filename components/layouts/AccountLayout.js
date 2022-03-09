import Head from 'next/head'
import AccountNav from '@/components/pages/account/AccountNav'
import AccountFooter from '@/components/pages/account/AccountFooter'

const AccountLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Vitaliplay - Compte</title>
      </Head>
      <AccountNav />
      {children}
      <AccountFooter />
    </>
  )
}

export default AccountLayout
