import Head from 'next/head'
import SiteNav from '@/components/pages/site/SiteNav'
import SiteFooter from '@/components/pages/site/SiteFooter'

const SiteLayout = ({ children }) => {
  return (
    <>
      <SiteNav />
      {children}
      <SiteFooter />
    </>
  )
}

export default SiteLayout
